let fullName = document.getElementById('fullNameContactForm');
let mail = document.getElementById('emailContactForm');
let messages = document.getElementById('messageContactForm');
const formContact = document.forms[0];

// ******************************************
//                   EVENTS
// ******************************************
formContact.addEventListener('submit', (e) => {
    e.preventDefault();
    dataSend ();
});

fullName.addEventListener('click', () => {
    messageContactForm.innerHTML = ` `;
});

// ******************************************
//                   FUNCTIONS
// ******************************************
function dataSend () {
    console.log('Datos enviados correctamente');
    alert('Datos enviados correctamente');
    fullName.value = '';
    mail.value = '';
    messages.value = '';
};