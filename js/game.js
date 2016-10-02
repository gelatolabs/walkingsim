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
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

/* fit canvas to window */
var sizeCanvas = function() {
    if (window.innerWidth / 1.33 <= window.innerHeight) {
        /* fit width if the whole 1.33:1 (4:3) canvas will fit */
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth / 1.33;
    } else {
        /* else fit height */
        canvas.width = window.innerHeight * 1.33;
        canvas.height = window.innerHeight;
    }
    canvas.style.top = (window.innerHeight - canvas.height) / 2 + "px";
    canvas.style.left = (window.innerWidth - canvas.width) / 2 + "px";
};

/* create canvas */
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.style.position = "absolute";
sizeCanvas();
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
document.body.appendChild(canvas);

/* variables */
if (!docCookies.hasItem("cash"))
    docCookies.setItem("cash", 0, 31536000);
var cash = parseInt(docCookies.getItem("cash"));

var lastKey = 40;

var tripMessages = [
    "Alas",
    "Balls",
    "Bullshit",
    "D'oh",
    "Damn",
    "Damnit",
    "FUCK",
    "Fight me",
    "Fuck off",
    "Fuck you",
    "Fuck",
    "Fuck's sake",
    "Fucker",
    "God damnit",
    "I MERELY STUMBLED",
    "Learn to walk",
    "Motherfuck",
    "Motherfucker",
    "Not again",
    "Oops",
    "Shit",
    "Walking is hard",
    "Woe is me",
];

/* audio */
var music = new Audio("snd/music.ogg");
music.loop = true;
music.play();

var footstep = new Audio("snd/footstep.ogg");
var footstep1 = new Audio("snd/footstep.ogg");

/* game object definitions */
var bg = {
    w: canvas.height * 8,
    h: canvas.height,
    x: 0,
    y: 0,

    ready: false
};
bg.img = new Image();
bg.img.onload = function() {
    bg.ready = true;
};
bg.img.src = "img/bg.png";

var bg1 = {
    w: canvas.height * 8,
    h: canvas.height,
    x: canvas.height * 8,
    y: 0,

    ready: false
};
bg1.img = new Image();
bg1.img.onload = function() {
    bg1.ready = true;
};
bg1.img.src = "img/bg.png";

var dude = {
    w: canvas.width / 3,
    h: canvas.width / 3 * 1.791,
    x: canvas.width / 2 - canvas.width / 6,
    y: canvas.width / 4,

    ready: false
};
dude.img = new Image();
dude.img.onload = function() {
    dude.ready = true;
};
dude.img.src = "img/dude40.png";

var controls = {
    w: canvas.width,
    h: canvas.width * 0.095,
    x: 0,
    y: 0,

    ready: false
};
controls.img = new Image();
controls.img.onload = function() {
    controls.ready = true;
};
controls.img.src = "img/controls40.png";

/* game events */
var walk = function(key) {
    lastKey = key;

    if(key === 40) {
        cash++;
        docCookies.setItem("cash", cash, 31536000);
    }

    bg.x -= bg.w / 200;
    bg1.x -= bg.w / 200;

    if(bg.x + bg.w < 0)
        bg.x = bg.w;
    if(bg1.x + bg1.w < 0)
        bg1.x = bg1.w;

    dude.ready = false;
    dude.img.src = "img/dude" + key + ".png";

    controls.ready = false;
    controls.img.src = "img/controls" + key + ".png";

    if(key === 83)
        footstep.play();
    else if(key === 40)
        footstep1.play();
};

var trip = function() {
    lastKey = 40;

    cash = Math.floor(cash * 0.8);
    if(cash < 0) cash = 0;
    docCookies.setItem("cash", cash, 31536000);

    dude.img.src = "img/dude40.png";
    controls.img.src = "img/controls40.png";

    var btnText = tripMessages[Math.floor(Math.random() * tripMessages.length)];
    var buttons = {};
    buttons[btnText] = function() { $(this).dialog("close"); }
    $("#trip").dialog({buttons: buttons});
}

/* input events */
document.getElementsByTagName("body")[0].addEventListener("keyup", function(e) {
    if($(".ui-dialog").css("display") !== "block") {
        switch(e.which) {
            case 65:
                if(lastKey === 40)
                    walk(65);
                else
                    trip();
                break;
            case 87:
                if(lastKey === 65)
                    walk(87);
                else
                    trip();
                break;
            case 68:
                if(lastKey === 87)
                    walk(68);
                else
                    trip();
                break;
            case 83:
                if(lastKey === 68)
                    walk(83);
                else
                    trip();
                break;
            case 37:
                if(lastKey === 83)
                    walk(37);
                else
                    trip();
                break;
            case 38:
                if(lastKey === 37)
                    walk(38);
                else
                    trip();
                break;
            case 39:
                if(lastKey === 38)
                    walk(39);
                else
                    trip();
                break;
            case 40:
                if(lastKey === 39)
                    walk(40);
                else
                    trip();
                break;
            case 69:
                window.location.href = "epay.html";
                break;
        }
    }
});

var render = function() {
    if (bg.ready)
        ctx.drawImage(bg.img, bg.x, bg.y, bg.w, bg.h);
    if (bg1.ready)
        ctx.drawImage(bg1.img, bg1.x, bg1.y, bg1.w, bg1.h);
    if (dude.ready)
        ctx.drawImage(dude.img, dude.x, dude.y, dude.w, dude.h);
    if (controls.ready)
        ctx.drawImage(controls.img, controls.x, controls.y, controls.w, controls.h);
};

/* main game loop */
var main = function() {
    render();
    requestAnimationFrame(main);
};

/* make requestAnimationFrame work in stupid browsers (all of them) */
var w = window;
requestAnimationFrame =
        w.requestAnimationFrame
        || w.webkitRequestAnimationFrame
        || w.msRequestAnimationFrame
        || w.mozRequestAnimationFrame;

/* start game */
render();
requestAnimationFrame(main);
main();
