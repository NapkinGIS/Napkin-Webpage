"use strict";

$("form#requestForm").submit(function(ev) {
  ev.preventDefault();
});

$("button#sendRequest").click(function(ev) {
  const client = new Client(
    "https://crm.napkingis.no",
    "c3be3e3271d7d6f221883ac8ca916be1"
  );

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

  let n = name.split(/\ /ig);
  let lastName = n[n.length - 1];
  n.pop();
  let firstName = n.join(' ');

  client.request("POST", "Lead", {
    firstName: firstName,
    lastName: lastName,
    title: title,
    emailAddress: email,
    accountName: company
  })
  .then((response) => {
    setTimeout(function() {
      window.location.assign("visual/index.html");
    }, 500);
  })
  .catch((res) => {
    console.log(res.statusCode, res.statusMessage);

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
