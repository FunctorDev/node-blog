$(document).ready(function ($) {
  $('.js-form-login').on('submit', (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-undef
    const values = serializeForm($(e.currentTarget).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/auth/login',
      data: values,
      success: (res) => {
        const cookies = new UniversalCookie();
        const options = {
          path: '/',
          maxAge: 1 * 24 * 60 * 60,
          // secure: true,
          // httpOnly: true,
        };
        cookies.set('token', res.token, options);
        window.location.href = '/admin';
      },
      error: (err) => {
        if (err && err.responseJSON && !err.responseJSON.auth) {
          $('.js-login-alert').removeClass('d-none');
        }
      },
    });
  });
});
