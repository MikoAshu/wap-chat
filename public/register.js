/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable security/detect-possible-timing-attacks */
/* eslint-disable no-undef */
// When button click Redirecting to login page
document.querySelector('#signin').addEventListener('click', () => {
  window.location.href = 'http://localhost:3000/v1/auth/login';
});

// When button click registering the user
document.querySelector('#signup').addEventListener('click', () => {
  const name = document.querySelector('[name=name]').value;
  const email = document.querySelector('[name=email]').value;
  const password = document.querySelector('[name=password]').value;
  const rePassword = document.querySelector('[name=retype-password]').value;
  if (name === '' || email === '' || password === '' || rePassword === '') {
    alert('Please fill out all the fields');
  }

  if (password === rePassword) {
    $('#match').addClass('invisible');
    $('[name=retype-password]').removeAttr('style');

    fetch('/v1/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => response.json())
      .then((data) => validateUsers(data))
      .catch((err) => console.log(err));
  } else {
    document.querySelector('[name=retype-password]').value = '';
    $('[name=retype-password]').css('border-color', 'red');
    $('#match').removeClass('invisible');
    $('#match').text("Password does't match");
  }
});

function validateUsers(data) {
  if (data.code) {
    $('#match').removeClass('invisible');
    $('#match').html(data.message);
  } else {
    $('#match').addClass('invisible');
    window.location.href = 'http://localhost:3000/v1/chat/view';
  }
}
