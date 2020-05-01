"use strict";

$("form#requestForm").submit(function(ev) {
  ev.preventDefault();
});

$("button#sendRequest").click(function(ev) {
  let db = firebase.firestore();

  let name = $("input#fullName").val(),
      title = $("input#title").val(),
      email = $("input#email").val(),
      company = $("input#company").val(),
      message = $("textarea#message").val();

  $("#loadingModal").modal("show");

  db.collection("requests").add({
    name: name,
    title: title,
    email: email,
    company: company,
    message: message
  })
  .then(function(docRef) {
    //console.log("Document written with ID: ", docRef.id);

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
  })
  .catch(function(error) {
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
  });

  /*$.ajax({
    type: "POST",
    url: "http://crm.napkingis.no/NewLead.php",
    data: {
      first_name: first_name,
      last_name: last_name,
      title: title,
      email: email,
      company: company,
      message: message
    },
    //dataType: "json",
    success: function(result, status, xhr) {
      $("#alertArea").html(`
        <div class=\"alert alert-info alert-dismissible fade show\" role=\"alert\" style=\"max-width: 500px; float: right;\">
          <strong>Thank you!</strong> We will get back to you as soon as possible.

          <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">
            <span aria-hidden=\"true\">&times;</span>
          </button>
        </div>
      `);
    },
    error: function(xhr, status, error) {
      console.log(xhr.status);
      console.log(error);
    }
  });*/
});
