$(() => {
  $('#fetch-users').on('click', () => {
    $.ajax({
      method: "GET",
      url: "/api/users"
    }).done((data) => {
      const $usersDiv = $("#users");
      $usersDiv.empty();
      for(const user of data.users) {
        $("<div>").text(user.name).appendTo($usersDiv);
      }
    });
  });
});
