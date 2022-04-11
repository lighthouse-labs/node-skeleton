$(() => {

  // Generates messages in inbox
  const createMessages = (message) => {
console.log(message)
    let $message = $(`
    <div class="message">${message.name}</div>
    `);
    return $message;
  };

  // Renders messsages into the inbox
  const renderMessages = () => {
    $.get('/api/messages').then(data => {
      $('.inbox').empty();
      data.forEach(message => {
        $('.inbox').prepend(createMessages(message));
      });
    });
  };

  // Messages inbox dropdown
  $('#messages').click(() => {
    $('.inbox').slideToggle('fast');
    $('.inbox').css('display', 'flex');
  });

  $('#messages').click((event) => {
    event.preventDefault();

    $.ajax({
      type: 'GET',
      url: '/api/messages',
      data: $('#messages').serialize()
    }).then((data) => {
      renderMessages(data);
    });
  });

});