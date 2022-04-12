$(() => {

  // Generates messages in inbox
  const createMessages = (message) => {
    let $message = $(`
    <div id='${message.sender_id}' class="message">${message.name}</div>
    `);
    return $message;
  };

  // Renders messsages into the inbox
  const renderMessages = () => {
    $.get('/api/inbox').then(data => {
      $('.inbox').empty();
      data.forEach(message => {
        console.log('message:', message);
        if ($('.username')[0].innerText === message.name) {
          $('.inbox').prepend(createMessages(message));
        }
      });
    });
  };


  // Messages inbox dropdown
  $('#messages').click((event) => {
    $('.inbox').slideToggle('fast');
    $('.inbox').css('display', 'flex');
    event.preventDefault();

    $.ajax({
      type: 'GET',
      url: '/api/messages',
      data: $('#messages').serialize()
    }).then((data) => renderMessages(data))
      .catch((err) => console.log(err.message));
  });

  const createChat = (chat) => {
    let $chat = $(`
    <div class="${chat.admin}Admin">
    <div class="senderID">${chat.sender}:</div>
    <div class="messageID">
      ${chat.messagetext}
    </div>
  </div>
  `);
    return $chat;
  };

  const renderChat = () => {
    $.get('/api/messages').then(data => {
      $('.chatFeed').empty();
      data.forEach(chat => {
        $('.chatFeed').append(createChat(chat));
      });
    });
  };


  $('.inbox').click(function (event) {
    $('.chatBox').slideUp('fast');
    $('.chatBox').css('display', 'block');
    event.preventDefault();

    $.ajax({
      type: 'GET',
      url: '/api/messages',
      data: $('.messages').serialize()
    }).then((data) => renderChat(data))
      .catch((err) => console.log(err.message));

  });


});