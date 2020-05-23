"use strict";

$("form#requestForm").submit(function(ev) {
  ev.preventDefault();
});

$("button#sendRequest").click(function(ev) {
  let name = $("input#fullName").val(),
      title = $("input#title").val(),
      email = $("input#email").val(),
      company = $("input#company").val();

  if(!name || name.replace(/\s/g, '') === ''
  || !title || title.replace(/\s/g, '') === ''
  || !email || email.replace(/\s/g, '') === ''
  || !company || company.replace(/\s/g, '') === '')
    return;

  $("#loadingModal").modal("show");

  let payload = {
    emailAddress: email,
    title: title,
    accountName: company
  };

  let n = name.split(/\ /ig);
  if(n.length < 2) {
    payload.lastName = "_";
    payload.firstName = name;
  }else{
    payload.lastName = n.pop();
    payload.firstName = n.join(' ');
  }

  $.ajax({
    type: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    url: "https://crm.napkingis.no:443/api/v1/LeadCapture/0d06fdd55cea242ccbf31e31f5852deb",
    //contentType: "application/json",
    data: JSON.stringify(payload),
    //dataType: "json",
    success: function(result, status, xhr) {
      setTimeout(function() {
        window.location.assign("/visual/sample.html");
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
