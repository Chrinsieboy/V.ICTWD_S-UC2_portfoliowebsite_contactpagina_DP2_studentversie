using Microsoft.AspNetCore.Mvc;
using Portfoliowebsite.Services;

namespace Portfoliowebsite.Controllers
{
    public class ContactController : Controller
    {
        private readonly string xssRegexCheck = @"((\%3C)|<)((\%2F)|\/)*[a-z0-9\%]+((\%3E)|>)|((\%3C)|<)((\%2F)|\/)*[a-z0-9\%]+((\%3E)|>).*((\%3C)|<)\/\1((\%3E)|>)|(javascript:|vbscript:|data:text\/html|data:text\/javascript)";
        private readonly string emailRegexCheck = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
        private readonly IEmailSender _email;
        public ContactController(IEmailSender email) => _email = email;

        public IActionResult Index() => View();

        [HttpPost]
        public async Task<IActionResult> Index(string Name, string Email, string Subject, string Message, string website)
        {
            // Honeypot Field Check
            if (!string.IsNullOrEmpty(website))
            {
                return View();
            }

            // Check if any of the fields are empty
            if (string.IsNullOrEmpty(Name) || string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(Subject) || string.IsNullOrEmpty(Message))
            {
                Console.WriteLine("All fields are required!");
                return View();
            }

            // Email format validation with regex 
            if (!System.Text.RegularExpressions.Regex.IsMatch(Email, emailRegexCheck, System.Text.RegularExpressions.RegexOptions.IgnoreCase))
            {
                Console.WriteLine("Emailadress is invalid!");
                return View();
            }

            // Check if the fields exceed the maximum length or if the message is too short
            if (Name.Length > 40 || Email.Length > 100 || Subject.Length > 100 || Message.Length > 1000)
            {
                Console.WriteLine("One or more fields exceed the maximum allowed length!");
                return View();
            } else if (Message.Length < 10)
            {
                Console.WriteLine("Message is too Short!");
                return View();
            }

            // Check if one of the fields contains potential XSS attack vectors
            if (System.Text.RegularExpressions.Regex.IsMatch(Name, xssRegexCheck, System.Text.RegularExpressions.RegexOptions.IgnoreCase) ||
                System.Text.RegularExpressions.Regex.IsMatch(Email, xssRegexCheck, System.Text.RegularExpressions.RegexOptions.IgnoreCase) ||
                System.Text.RegularExpressions.Regex.IsMatch(Subject, xssRegexCheck, System.Text.RegularExpressions.RegexOptions.IgnoreCase) ||
                System.Text.RegularExpressions.Regex.IsMatch(Message, xssRegexCheck, System.Text.RegularExpressions.RegexOptions.IgnoreCase))
            {
                Console.WriteLine("Input contains potential XSS attack vectors!");
                return View();
            }

            // 

            await _email.SendAsync(Name, Email, Subject, Message);

            TempData["ThanksName"] = Name;
            TempData["ThanksEmail"] = Email;
            TempData["ThanksMessage"] = Message;

            return RedirectToAction(nameof(Thanks));
        }

        public IActionResult Thanks()
        {
            return View();
        }
    }
}
