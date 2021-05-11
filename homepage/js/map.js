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
	attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OSM</a>"
}).addTo(map);

L.marker(center).addTo(map)
	.bindPopup(`
		<h5 style=\"margin-bottom: 20px;\">Napkin AS</h5>

		<span style=\"display: block; margin-top: 4px;\">
			<b>Office:</b> Grenseveien 21, 4313 Sandnes
		</span>

		<span style=\"display: block; margin-top: 4px;\">
			<b>Phone:</b> <a href=\"tel:+4748006325\">+47 48 00 63 25</a>
		</span>

		<span style=\"display: block; margin-top: 4px;\">
			<b>E-mail:</b> <a href=\"mailto:contact@napkingis.no\">contact@napkingis.no</a>
		</span>
	`, {
		keepInView: true,
		closeButton: false,
		closeOnEscapeKey: false,
		closeOnClick: false
	})
	.openPopup();
