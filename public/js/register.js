"use strict";

$("form#requestForm").submit(function(ev) {
  ev.preventDefault();
});

$("button#sendRequest").click(function(ev) {
  let db = firebase.firestore();

  let name = $("input#fullName").val(),
      title = $("input#title").val(),
      email = $("input#email").val(),
      company = $("input#company").val();

  $("#loadingModal").modal("show");

  db.collection("requests").add({
    name: name,
    title: title,
    email: email,
    company: company
  })
  .then(function(docRef) {
    //console.log("Document written with ID: ", docRef.id);

    setTimeout(function() {
      window.location.assign("visual/index.html#reg");
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
});
