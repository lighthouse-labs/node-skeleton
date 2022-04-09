// Client facing scripts here
$(document).ready(function() {

  $('#carMake').change(function() {
    const make = $(this).val();
    $('#carModel option').each(function() {
      if ($(this).data('tag') !== make) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });

  $('.filter').click(function() {
    $('.filterOptions').slideToggle('fast');
    $('.filterOptions').css('display', 'flex');
    $('.newForm').hide();
  });

  $('.newPost').click(function() {
    $('.newForm').slideToggle('fast');
    $('.newForm').css('display', 'flex');
    $('.filterOptions').hide();
  });

});
