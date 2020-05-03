$(document).ready(function ($) {
  $('.js-verify-secret-key').on('submit', (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-undef
    const values = serializeForm($(e.currentTarget).serializeArray());
    $(e.currentTarget).find('[type="submit"]').button('loading');
    $.ajax({
      method: 'POST',
      url: '/api/secret-key',
      data: values,
      success: (res) => {
        $('.js-verify-secret-key-alert').addClass('d-none');
        if (res && res.url) {
          window.location.href = res.url;
        }
      },
      error: () => {
        $('.js-verify-secret-key-alert').removeClass('d-none');
      },
      complete: () => {
        $(e.currentTarget).find('[type="submit"]').button('reset');
      }
    });
  });
});
