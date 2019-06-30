const form = document.querySelector (".signup-form");


form.addEventListener ('submit', e => {
    e.preventDefault();
    console.log (form.username.value);
});


const usenamePattern = /^[a-z0-9_-]{3,15}$/;
let validateUsername = usenamePattern.test(form.username.value);
