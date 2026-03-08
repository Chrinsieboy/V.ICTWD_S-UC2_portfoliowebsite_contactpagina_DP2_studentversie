function naiveEmailCheck(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function setupValidation() {
    const form = document.getElementById('contactForm');
    const hp = document.getElementById('website');
    const name = document.getElementById('Name');
    const email = document.getElementById('Email');
    const subject = document.getElementById('Subject');
    const msg = document.getElementById('Message');

    const showErr = (id, message) => {
        document.getElementById(id).textContent = message;
    }

    const validateName = (value) => {
        if (!value) return 'Naam is verplicht';
        if (value.length > 40) return 'Naam is te lang, maximaal 40 karakters toegestaan';
        return '';
    }

    const validateEmail = (value) => {
        if (!value) return 'Email is verplicht';
        if (value.length > 100) return 'Email is te lang, maximaal 100 karakters toegestaan';
        if (!naiveEmailCheck(value)) return 'Emailadres is ongeldig, gebruik naam@domein.nl';
        return '';
    }

    const validateSubject = (value) => {
        if (!value) return 'Onderwerp is verplicht';
        if (value.length > 100) return 'Onderwerp is te lang, maximaal 100 karakters toegestaan';
        return '';
    }

    const validateMessage = (value) => {
        if (!value) return 'Bericht is verplicht';
        if (value.length > 1000) return 'Bericht is te lang, maximaal 1000 karakters toegestaan';
        if (value.length < 10) return 'Bericht is te kort, minimaal van 10 karakters toegestaan'
        return '';
    }

    const touchedFields = new Set();

    showErr('nameErr', '');
    showErr('emailErr', '');
    showErr('subjectErr', '');
    showErr('msgErr', '');
    
    [name, email, msg, subject].forEach(element => {
        element.addEventListener('blur', () => {
            touchedFields.add(element);

            if (element === name) {
                showErr('nameErr', validateName(element.value));
            }
            if (element === email) {
                showErr('emailErr', validateEmail(element.value));
            }
            if (element === subject) {
                showErr('subjectErr', validateSubject(element.value));
            }
            if (element === msg) {
                showErr('msgErr', validateMessage(element.value));
            }
        });

        element.addEventListener('input', () => {
            if (!touchedFields.has(element)) return;

            if (element === name) {
                showErr('nameErr', validateName(element.value));
            }
            if (element === email) {
                showErr('emailErr', validateEmail(element.value));
            }
            if (element === subject) {
                showErr('subjectErr', validateSubject(element.value));
            }
            if (element === msg) {
                showErr('msgErr', validateMessage(element.value));
            }
        });
    });

    form.addEventListener('submit', (e) => {
        if (hp.value) {
            e.preventDefault();
            alert('Spam gedetecteerd (client-side)!');
            return false;
        }

        touchedFields.add(name);
        touchedFields.add(email);
        touchedFields.add(subject);
        touchedFields.add(msg);

        const nameError = validateName(name.value);
        const emailError = validateEmail(email.value);
        const subjectError = validateSubject(subject.value);
        const msgError = validateMessage(msg.value);

        showErr('nameErr', nameError);
        showErr('emailErr', emailError);
        showErr('subjectErr', subjectError);
        showErr('msgErr', msgError);

        if (nameError || emailError || subjectError || msgError) {
            e.preventDefault();
            return false;
        }

        return true;
    });
}

window.addEventListener('DOMContentLoaded', setupValidation);