// Client facing scripts here
$(document).ready(function() {


  $('.filter').click(function() {
    $('.filterOptions').slideToggle('fast');
    $('.filterOptions').css('display', 'flex');
    $('.newForm').slideUp('fast');
  });

  $('.newPost').click(function() {
    $('.newForm').slideToggle('fast');
    $('.newForm').css('display', 'flex');
    $('.filterOptions').slideUp('fast');
  });

  $('#carMake').select2({});
  $('#carModel').select2({});
  $('#carTransmission').select2();

  $('#carMake').change(function() {
    const make =  $(this).val();
    console.log('hello!');

    $('#carModel option').each(function() {
      if ($(this).data('tag') !== make) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });


});
