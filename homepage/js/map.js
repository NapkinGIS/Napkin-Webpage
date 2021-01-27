/*©agpl*************************************************************************
*                                                                              *
* Napkin Homepage – Codebase for the napkingis.no homepage                     *
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

let center = [ 58.888597 , 5.718308 ]; // [ 60.381609 , 5.327975 ]
let map = L.map("map", {
  center: center,
  zoom: 16
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
}).addTo(map);

center[0] += 0.0005;
L.marker(center).addTo(map)
  .bindPopup(`
    <h5>Napkin AS</h5>

    <span style=\"display: block; margin-top: 4px;\">
      <b>Office:</b> Grenseveien 21, 4313 Sandnes
    </span>

    <span style=\"display: block; margin-top: 4px;\">
      <b>Phone:</b> +47 48 00 63 25
    </span>

    <span style=\"display: block; margin-top: 4px;\">
      <b>E-mail:</b> contact@napkingis.no
    </span>
  `)
  .openPopup();
