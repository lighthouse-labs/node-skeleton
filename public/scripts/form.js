$(() => {

  const createMakeOptions = (makes) => {
    const make = makes.make;
    const $option = $(`<option id=${make} name=${make} value=${make}>`);
    $option.text(make)
    return $option;
  }

  const renderMakeOptions = (makes) => {
    for (const make of makes) {
      console.log(make);
      $('#make').append(createMakeOptions(make));
    }
  };

  const loadMakeOptions = () => {
    $.ajax({
      url: '/api/make',
      method: 'GET'
    }).done((makes) => {
      $('#make').empty();
      renderMakeOptions(makes);
    })
  };

  loadMakeOptions();

  $('#make').click(function(makes) {
    console.log(makes);
  })










});
