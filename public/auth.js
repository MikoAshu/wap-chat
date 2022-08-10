/* eslint-disable no-undef */
// Sending E-mail and Password for validation
// eslint-disable-next-line no-use-before-define
document.querySelector('#signin').addEventListener('click', () => {
  const email = document.querySelector('[name=email]').value;
  const password = document.querySelector('[name=password]').value;

  fetch('/v1/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())

    .then((data) => redirectUser(data))
    .catch((err) => console.log(err));
});

// Function for redirecting users

function redirectUser(data) {
  if (data.code === 401) {
    console.log('in 401');
    const element = document.querySelector('.invisible');
    element.classList.remove('invisible');
    document.querySelector('[name=password]').value = '';
    $('[name=password]').css('border-color', 'red');
  } else {
    const { token } = data.tokens.access;
    localStorage.setItem('token', token);

    fetch('/v1/chat/view', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.url)
      .then((data) => {
        window.location.href = data;
      })
      .catch((err) => console.log('error happend while getting v1/chat'));

    // document.cookie = `token=${token}; SameSite=None; Secure`

    // $.get('/v1/chat', function(data, status){
    //   console.log(data);
    // });
  }
}

// Redirectiing to register page

document.querySelector('#signup').addEventListener('click', () => {
  window.location.href = 'http://localhost:3000/v1/auth/register';
});
