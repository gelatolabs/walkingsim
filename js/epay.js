/*
 * 
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 * 
 * Copyright (c) 2016 Kyle Farwell <m@kfarwell.org>
 *
 * Permission to use, copy, modify, and/or distribute this software for
 * any purpose with or without fee is hereby granted, provided that the
 * above copyright notice and this permission notice appear in all copies.
 *
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

var updateCoins = function() {
    document.getElementById("cash").innerHTML = "Cash: $" + docCookies.getItem("cash");
}

items = [
    ["0", 10],
    ["1", 20]
]

var buyItem = function(item, cost) {
    if (docCookies.hasItem(item)) {
        alert("You already own that item!");
    } else if (docCookies.getItem("cash") < cost) {
        alert("You can't afford that!");
    } else {
        docCookies.setItem(item, "owned", 31536000);
        docCookies.setItem("cash", +docCookies.getItem("cash") - cost, 31536000);
        updateItems();
        updateCoins();
    }
};

var updateItems = function() {
    for (var i in items) {
        if (docCookies.hasItem(items[i][0])) {
            // hide owned items
            document.getElementById(items[i][0]).style.display = "none";
        } else if (docCookies.getItem("cash") < items[i][1]) {
            // make items that cannot be afforded red
            document.getElementById(items[i][0]).style.backgroundColor = "#ff0000";
        }
    }
}

updateItems();
updateCoins();
