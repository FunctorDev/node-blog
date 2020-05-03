$(document).ready(function ($) {
  const initEditor = () => {
    window.tinymce.init({
      selector: '#js-editor-video-desc',
      setup: function (editor) {
        editor.on('change', function () {
          editor.save();
        });
      },
      entity_encoding: 'raw',
      height: 500,
      menubar: true,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount responsivefilemanager',
      ],
      toolbar: [
        'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
        'responsivefilemanager | link | image | media | table | code | anchor | preview | wordcount | visualblocks | searchreplace | charmap',
      ],

      external_filemanager_path: '/filemanager/',
      filemanager_title: 'Quản lý media',
      external_plugins: { filemanager: '/filemanager/plugin.min.js' },
      visualblocks_default_state: true,
    });
  };

  const initUploadThumbnail = () => {
    $('.u-upload-file__input').on('change', function () {
      const file = $('.u-upload-file__input').prop('files')[0];

      if (file) {
        const url = URL.createObjectURL(file);

        $(this)
          .siblings('.u-upload-file__label')
          .find('.js-no-image')
          .addClass('d-none');

        $(this)
          .siblings('.u-upload-file__label')
          .css({
            background: `url(${url})`,
          });
      }
    });
  };

  const videoFormData = (form) => {
    // eslint-disable-next-line no-undef
    const values = serializeForm($(form).serializeArray());
    const data = new FormData();
    data.append('title', values.title);
    data.append('description', values.description);
    data.append('target_url', values.target_url);
    data.append('slug', values.slug);

    return data;
  };

  const upsertVideoError = (alertElement, errors) => {
    const err = errors && errors.responseJSON && errors.responseJSON.errors;
    const errorsHtml =
      err && err.length
        ? err.map((item) => `<p>${item.message}</p>`).join('')
        : `<p>Đã có lỗi xảy ra: ${errors && errors.message}</p>`;

    $(alertElement).html(errorsHtml).removeClass('d-none');
    window.scrollTo(0, 0);
  };

  $('.js-form-new-video').on('submit', (e) => {
    e.preventDefault();

    const data = videoFormData(e.currentTarget);
    data.append(
      'thumbnail',
      $(e.currentTarget).find('.u-upload-file__input').prop('files')[0],
    );
    $.ajax({
      method: 'POST',
      url: '/api/videos/new',
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: data,
      dataType: 'json',
      success: () => {
        window.location.href = '/admin/videos';
      },
      error: (errors) => {
        upsertVideoError('.js-form-new-video-alert', errors);
      },
    });
  });

  $('.js-form-edit-video').on('submit', (e) => {
    e.preventDefault();

    const id = $(e.currentTarget).find('input[name="id"]').val();
    const thumbnailUrl = $(e.currentTarget).find('input[name="thumbnail_url"]').val();
    const data = videoFormData(e.currentTarget);
    data.append(
      'thumbnail',
      $(e.currentTarget).find('.u-upload-file__input').prop('files')[0] || thumbnailUrl,
    );
    $.ajax({
      method: 'POST',
      url: '/api/videos/edit/' + id,
      enctype: 'multipart/form-data',
      processData: false,
      contentType: false,
      data: data,
      dataType: 'json',
      success: () => {
        window.location.href = '/admin/videos';
      },
      error: (errors) => {
        upsertVideoError('.js-form-edit-video-alert', errors);
      },
    });
  });

  $('.js-delete-video').on('click', (e) => {
    const button = e.currentTarget;
    const id = button.dataset.id;

    $.ajax({
      method: 'DELETE',
      url: '/api/videos',
      data: {
        id,
      },
      success: () => {
        $(`#video-${id}`).remove();
      },
    });
  });

  initEditor();
  initUploadThumbnail();
});
