$(document).ready(function ($) {
  const initEditor = () => {
    window.tinymce.init({
      selector: '#js-editor-post-content',
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
      external_plugins: {filemanager: '/filemanager/plugin.min.js'},
      visualblocks_default_state: true,
    });
  };

  initEditor();
});
