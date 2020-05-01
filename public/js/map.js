"use strict";

let center = [60.381418, 5.326884];

let map = L.map("map", {
  center: [60.381609, 5.327975],
  zoom: 16
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
}).addTo(map);

L.marker([60.381109, 5.327975]).addTo(map)
  .bindPopup(`
    <h5>Napkin AS</h5>
    <span style=\"display: block; margin-top: 4px;\"><b>Office:</b> Thormøhlens Gate 41, 5006 Bergen</span>
    <span style=\"display: block; margin-top: 4px;\"><b>Phone:</b> +47 48 00 63 25</span>
    <span style=\"display: block; margin-top: 4px;\"><b>E-mail:</b> contact@napkingis.no</span>
  `)
  .openPopup();
