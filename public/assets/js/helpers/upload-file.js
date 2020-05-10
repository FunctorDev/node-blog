$(document).ready(function ($) {
  const initUploadThumbnail = () => {
    $('.c-upload-file__input').on('change', function () {
      const file = $('.c-upload-file__input').prop('files')[0];

      if (file) {
        const url = URL.createObjectURL(file);

        $(this)
          .siblings('.c-upload-file__label')
          .find('.js-no-image')
          .addClass('d-none');

        $(this)
          .siblings('.c-upload-file__label')
          .css({
            background: `url(${url})`,
          });
      }
    });
  };

  initUploadThumbnail();
});
