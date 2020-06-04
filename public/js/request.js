/*©agpl*************************************************************************
*                                                                              *
* Napkin Visual – Visualisation solution for the NapkinGIS platform            *
* Copyright (C) 2020  Napkin AS                                                *
*                                                                              *
* This program is free software: you can redistribute it and/or modify         *
* it under the terms of the GNU Affero General Public License as published by  *
* the Free Software Foundation, either version 3 of the License, or            *
* (at your option) any later version.                                          *
*                                                                              *
* This program is distributed in the hope that it will be useful,              *
* but WITHOUT ANY WARRANTY; without even the implied warranty of               *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                 *
* GNU Affero General Public License for more details.                          *
*                                                                              *
* You should have received a copy of the GNU Affero General Public License     *
* along with this program.  If not, see <http://www.gnu.org/licenses/>.        *
*                                                                              *
*****************************************************************************©*/

"use strict";

$("form#requestForm").submit(function(ev) {
  ev.preventDefault();
});

$("button#sendRequest").click(function(ev) {
  let name = $("input#fullName").val(),
      title = $("input#title").val(),
      email = $("input#email").val(),
      phone = $("input#phone").val(),
      company = $("input#company").val(),
      message = $("textarea#message").val();

  if(!name || name.replace(/\s/g, '') === ''
  || !title || title.replace(/\s/g, '') === ''
  || !email || email.replace(/\s/g, '') === ''
  || !phone || phone.replace(/\s/g, '') === ''
  || !company || company.replace(/\s/g, '') === ''
  || !message || message.replace(/\s/g, '') === '')
    return;

  $("#loadingModal").modal("show");

  let payload = {
    emailAddress: email,
    phoneNumber: phone,
    title: title,
    accountName: company,
    description: message
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
    url: "https://crm.napkingis.no:443/api/v1/LeadCapture/3abe73a6b8f1202c5c5814d4b676f9f1",
    //contentType: "application/json",
    data: JSON.stringify(payload),
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
          window.location.assign("/index.html");
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
