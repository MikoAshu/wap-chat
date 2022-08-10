// Sending E-mail and Password for validation
// import $ from jquery;
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
  if (data.code == 401) {
    console.log('in 401');
    // removing class invisible when email or password is incorrect
    let element = document.querySelector('.invisible');
    element.classList.remove('invisible');
    alert('Incorrect email or password');
  } else {
    // storing the token in the localstorage

    const token = data.tokens.access.token;
    document.cookie = `token=${token}; SameSite=None; Secure`
    
    // localStorage.setItem('token', token);

    // sending token with the next request to the chat page

    $.get('/v1/chat', function(data, status){
      console.log(data);
    });


    // fetch('/v1/chat', {
    //   method: 'GET',   
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);
    //     response.url;
    //   })
    //   .then((data) => {
    //     console.log('data', data);
    //     window.location.href = data;
    //   })
    //   .catch((err) => console.log('error happend while getting v1/chat'));
  }
}

// Redirectiing to register page

document.querySelector('#signup').addEventListener('click', () => {
  window.location.href = '';
});
