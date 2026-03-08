function naiveEmailCheck(email) {
    return /@/.test(email);
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
        return '';
    }

    [name, email, msg, subject].forEach(element => {
        if (element === name) {
            element.addEventListener('input', () => {
                showErr('nameErr', validateName(element.value));
            });
        }
        if (element === email) {
            element.addEventListener('input', () => {
                showErr('emailErr', validateEmail(element.value));
            });
        }
        if (element === subject) {
            element.addEventListener('input', () => {
                showErr('subjectErr', validateSubject(element.value));
            });
        }
        if (element === msg) {
            element.addEventListener('input', () => {
                showErr('msgErr', validateMessage(element.value));
            });
        }
    });

    form.addEventListener('submit', (e) => {
        if (hp.value) {
            e.preventDefault();
            alert('Spam gedetecteerd (client-side)!');
            return false;
        }

        return true;
    });
}

window.addEventListener('DOMContentLoaded', setupValidation);