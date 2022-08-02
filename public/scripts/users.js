// Client facing scripts here
$(() => {
  $("#fetch-users").on("click", () => {
    $.ajax({
      method: "GET",
      url: "/api/users"
    })
    .done((response) => {
      const $usersDiv = $("#users");
      $usersDiv.empty();

      for(const user of response.users) {
        $("<div>").text(user.name).appendTo($usersDiv);
      }
    });
  });
});
