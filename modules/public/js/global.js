(function ($) {

  'use strict';

  var values = {};

  /* [ File Input Config ] */
  try {
    var file_input_container = $('.js-input-file');
    if (file_input_container[0]) {
      file_input_container.each(function () {
        var that = $(this);
        var fileInput = that.find(".input-file");
        var info = that.find(".input-file__info");
        fileInput.on("change", function () {
          // console.log(this);
          var fileName;
          fileName = $(this).val();
          if (fileName.substring(3,11) == 'fakepath') {
            fileName = fileName.substring(12);
          }
          if (fileName == "") {
            info.text("No file chosen");
          } else {
            info.text(fileName);
          }
          /* Converting image to base64 */
          var reader = new FileReader();
          var baseString;
          reader.onload = function (evt) {
            values["thumb"] = reader.result;
          };
          reader.readAsDataURL(this.files[0]);
        });
      });
    }
  } catch (err) {
    console.log(err);
  }

  $("#module_register").click(function (evt) {

    evt.preventDefault();
    // console.log("form is submitted");
    $.each($('#module_data input').serializeArray(), function (i,field) {
      values[field.name] = field.value;
    });
    $.each($('#module_data textarea').serializeArray(), function (i,field) {
      values[field.name] = field.value;
    });
    // console.log("values", values);

    $.ajax({
      url: '/module',
      type: 'POST',
      data: values,
      // dataType: 'application/json', // what type of data do we expect back from the server
      contentType: 'application/x-www-form-urlencoded',
      encode: true,
      success: function (res) {
        // console.log(res);
        location.reload();
      },
      error: function (err) {
        console.log('Error', err);
      }
    });

  });

})(jQuery);
