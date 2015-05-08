// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 **/
function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
    //alert("Loaded!");
    var obj = {
        url: "http://127.0.0.1:3000",
        name: "session"
    };
    chrome.cookies.get(obj, function(instaRentCookie) {
        Cookies.set("session",instaRentCookie.value);
        $.get("http://127.0.0.1:3000/payments/getRentDueIn", function(data) {
            if(data.status)
                renderStatus("Your rent for this month is: " + data.response.rent + " and is due in: " + data.response.rentDueIn + " days!");
            else
                renderStatus(data.response);
        });
    });
});
