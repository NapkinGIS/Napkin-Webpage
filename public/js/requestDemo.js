"use strict";

$("form#requestForm").submit(function(ev) {
  ev.preventDefault();
});

$("button#sendRequest").click(function(ev) {
  let name = $("input#fullName").val(),
      title = $("input#title").val(),
      email = $("input#email").val(),
      company = $("input#company").val(),
      message = $("textarea#message").val();

  if(!name || name.replace(/\s/g, '') === ''
  || !title || title.replace(/\s/g, '') === ''
  || !email || email.replace(/\s/g, '') === ''
  || !company || company.replace(/\s/g, '') === ''
  || !message || message.replace(/\s/g, '') === '')
    return;

  $("#loadingModal").modal("show");

  let n = name.split(/\ /ig);
  let lastName = n[n.length - 1];
  n.pop();
  let firstName = n.join(' ');

  $.ajax({
    type: "POST",
    url: "https://crm.napkingis.no/napkin/api.php",
    //contentType: "application/json",
    data: {
      firstName: firstName,
      lastName: lastName,
      title: title,
      emailAddress: email,
      accountName: company,
      description: message
    },
    //dataType: "json",
    success: function(result, status, xhr) {
      setTimeout(function() {
        $("#loadingModal").modal("hide");

        $("#alertArea").html(`
          <div class=\"alert alert-info alert-dismissible fade show\" role=\"alert\" style=\"max-width: 500px; float: right;\">
            <strong>Thank you!</strong> We will get back to you as soon as possible.

            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">
              <span aria-hidden=\"true\">&times;</span>
            </button>
          </div>
        `);

        setTimeout(function() {
          window.location.assign("index.html");
        }, 6000);
      }, 500);
    },
    error: function(xhr, status, error) {
      console.log(xhr.status);
      console.log(error);

      setTimeout(function() {
        $("#loadingModal").modal("hide");

        $("#alertArea").html(`
          <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" style=\"max-width: 500px; float: right;\">
            <strong>Error!</strong> Sorry, something went wrong. Please refresh the page and try again.

            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">
              <span aria-hidden=\"true\">&times;</span>
            </button>
          </div>
        `);
      }, 500);
    }
  });
});
