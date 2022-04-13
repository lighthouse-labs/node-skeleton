$(() => {

  // Generates messages in inbox
  const createMessages = (message) => {
    let $message = $(`
    <div id='${message.sender_id}' class="message">${message.sender}</div>
    `);
    return $message;
  };

  // Renders messsages into the inbox
  const renderMessages = () => {
    $.get('/api/inbox').then(data => {
      $('.inbox').empty();
      console.log('DATA:', data);
      data.forEach(message => {
        console.log('MESSAGE:', message)
        if ($('.username')[0].innerText === message.receiver) {
          $('.inbox').prepend(createMessages(message));
        }
      });
    });
  };


  // Messages inbox dropdown
  $('#messages').click((event) => {
    $('.inbox').slideToggle('slow');
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
    <div class="senderID">From ${chat.sender}</div> 
    <div>To: ${chat.receiver}</div>
    <div class="messageID">
      ${chat.messagetext}
    </div>
  </div>
  `);
    return $chat;
  };

  const renderChat = () => {
    $.get('/api/messages').then(data => {
      console.log('DATA:', data);
      $('.chatFeed').empty();
      data.forEach(chat => {
        $('.chatFeed').prepend(createChat(chat));
      });
    });
  };


  $('.inbox').click(function (event) {
    $('.inbox').slideUp('fast');
    $('.chatBox').slideUp('slow');
    $('.chatBox').css('display', 'block');
    event.preventDefault();

    $.ajax({
      type: 'GET',
      url: '/api/messages',
      data: $('.messages').serialize()
    }).then((data) => {
      renderChat(data);

    })
      .catch((err) => console.log(err.message));

  });

  $('.chatText').submit(function (event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: `/api/messages/${$('.username')[0].innerText}`,
      data: $('.chatText').serialize()
    }).then((data) => {
      renderChat(data);
      $('form').trigger('reset');
    })
      .catch((err) => console.log(err.message));
  });

  $('#chatClose').click(()=> {
    $('.chatBox').slideToggle('slow');
  });

});