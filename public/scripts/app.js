$(() => {
    $.ajax({
        method: "GET",
        url: "/api/users"
    }).done((users) => {
        for(user of users) {
            $("<div>").text(user.name).appendTo($("body"));
        }
    });;
});

// PRE_LOGIN PAGE
    // GET PRELOGIN
    // POST.REDIRECT PERSONAL PAGE AFTER LOGIN
    // POST.REDIRECT REGISTRATION

// REGISTRATION PAGE
    // GET REGISTRATION
    // POST USER
    // CREATE NEW ENTRY IN USER TABLE

// PERSONAL PAGE
    // GET USER/PAGE
    // POST USER/PAGE (TASK)
    // PUT USER/PAGE (UPDATE)

// USER PROFILE
    // GET USER
    // PUT USER/UPDATE

// ADMIN PAGE
    // GET ADMIN
    // GET USER TABLE
    // DELETE USER

// TASKS PAGE
    // GET TASK PAGE
    // PUT TASK TABLE
    // UPDATE TASK
