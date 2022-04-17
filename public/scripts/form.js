$(() => {

  $('#make').select2();
  $('#model').select2();
  $('#transmission').select2();
  $('#year').select2();

  const createMakeOptions = makes => {
    const make = makes.make;
    const $option = $(`<option name=${make} value=${make}>`);
    $option.text(make);
    return $option;
  };

  const renderMakeOptions = makes => {
    for (const make of makes) {
      $('#make').append(createMakeOptions(make));
    }
  };

  const loadMakeOptions = () => {
    $.ajax({
      url: '/form/make',
      method: 'GET'
    }).done(makes => {
      const $default = $('<option name="" value="">').text('Select Make');
      $('#make').empty();
      $('#make').append($default);
      renderMakeOptions(makes);
    });
  };

  loadMakeOptions();

  const createModelOptions = models => {
    const make = models.make;
    const model = models.model;
    const $option = $(`<option name=${model} value=${model} data-tag=${make}>`);

    $option.text(model);
    return $option;
  };

  const renderModelOptions = models => {
    const selectedMake = $('#make').val();
    if (selectedMake === '') {
      for (const model of models) {
        $('#model').append(createModelOptions(model));
      }
    } else {
      for (const model of models) {
        if (model.make === selectedMake) {
          $('#model').append(createModelOptions(model));
        }
      }
    }
  };

  const loadModelOptions = () => {
    $.ajax({
      url: '/form/model',
      method: 'GET'
    }).done((models) => {
      const $default = $('<option name="" value="">').text('Select Model');
      $('#model').empty();
      $('#model').append($default);
      renderModelOptions(models);
    });
  };

  loadModelOptions();

  $('#make').change(() => {
    loadModelOptions();
  });

  const createRenderYears = () => {
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1886; year--) {
      const $option = $(`<option name=${year} value=${year}>`);
      $option.text(year);
      $('#year').append($option);
    }
  };

  const loadYears = () => {
    const $default = $('<option name="" value="">').text('Select Year');
    $('#year').empty();
    $('#year').append($default);
    createRenderYears();
  };

  loadYears();


  $('#createList').on('submit', (event) => {
    const data = $('#createList').serialize();
    event.preventDefault();
    $('.newForm').slideUp('slow');
    $('.filterOptions').slideUp('slow');

    if (!$('#imageURL').val().trim() ||
    !$('#price').val().trim() ||
    !$('#color').val().trim()) {
      console.log($('#make').val());
      $('#invalid').text('Please fill in empty field!').slideDown('slow');
      setTimeout(() => {
        $('#invalid').text('');
        $('#invalid').slideUp('slow');
      }, 2000);
      return;
    }
    $.ajax({
      url: '/listing',
      method: 'POST',
      data: data
    }).done((listings) => {
      $('.listings').empty();
      renderListing(listings);
      $('.messageButton').css('display', 'none');
      $('.listingSold').css('display', 'flex');
      $('#createList').reset();
    });
  });
});
