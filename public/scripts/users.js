$(() => {

  const createLoginForm = () => {
    const $loginForm = $('<form id="loginForm" action="/user/login/" method="POST">');
    const $header = $('<header>').append("<h2>Sign In</h2>");
    const $emailId = $('<div>').append('<input type="email" name="email" placeholder="email" id="loginemail" required>');
    const $password = $('<div>').append('<input type="text" name="password" placeholder="password" id="password" required>');
    const $submit = $('<div class="submit">').append('<button type="submit">Login</button>', '<button type="button" id="loginCancel">Cancel</button>');
    return $loginForm.append($header, $emailId, $password, $submit);
  }

  const createRegisterForm = () => {
    const $loginForm = $('<form id="registerForm" action="/user/register/" method="POST">');
    const $header = $('<header>').append("<h2>Sign Up</h2>");
    const $name = $('<div>').append('<input type="text" name="name" placeholder="name" id="registername" required>');
    const $emailId = $('<div>').append('<input type="email" name="email" placeholder="email" id="registeremail" required>');
    const $password= $('<div>').append('<input type="text" name="password" placeholder="password" id="registerpassword" required>');
    const $submit = $('<div class="submit">').append('<button type="submit">Sign Up</button>', '<button type="button" id="registerCancel">Cancel</button>');
    return $loginForm.append($header, $name, $emailId, $password, $submit);
  }

  $('#login').click(() => {
    $('.inbox').slideUp('fast');
    $('.filterOptions').slideUp('fast');
    $('.registerForm').slideUp('fast');
    setTimeout(() => {
      $('.loginForm').empty()
      $('.loginForm').append(createLoginForm())
      $('.loginForm').slideToggle('fast');
      $('.loginForm').css('display', 'flex');
    }, 200);
  });

  $('#signup').click(() => {
    $('.inbox').slideUp('fast');
    $('.filterOptions').slideUp('fast');
    $('.loginForm').slideUp('fast');
    setTimeout(() => {
      $('.registerForm').empty();
      $('.registerForm').append(createRegisterForm())
      $('.registerForm').slideToggle('fast');
      $('.registerForm').css('display', 'flex');
    }, 200);
  });

  $('#loginCancel').click(() => {
    $('.loginForm').slideToggle('fast');
  })

  $('#registerCancel').click(() => {
    $('.registerForm').slideToggle('fast');
  })
});
