// ALBUM

$("#portfolio").mixItUp({
  selectors: {
    target: ".tile",
    filter: ".filter",
    sort: ".sort-btn",
  },
  animation: {
    animateResizeContainer: false,
    effects: "fade scale",
  },
});

// ON SCROLL

$(document).on("scroll", function () {
  // PARALLAX INTRO
  var top0 = $(document).scrollTop() / 4;
  $("#landscape0").css({ bottom: -top0 });

  var top2 = $(document).scrollTop() / 8;
  $("#landscape2").css({ bottom: -top2 });

  var top3 = $(document).scrollTop() * 1;
  $("#landscape3").css({ bottom: -top3 });

  // FADEIN FADEOUT
  if (window.scrollY > 200) {
    $(".scroll").fadeOut();
  } else {
    $(".scroll").fadeIn();
  }
  if (window.scrollY > 700) {
    $(".header").addClass("shadow");
  } else {
    $(".header").removeClass("shadow");
  }
});

// CONTACT FORM

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});

// MOUSE SMOOTH MOVEMENT

const ball = document.querySelector("div.ball");
const ball2 = document.querySelector("div.ball2");

let mouseX = 0;
let mouseY = 0;

let ballX = 0;
let ballY = 0;
let ballX2 = 0;
let ballY2 = 0;

let speed = 0.1;
let speed2 = 0.15;

function animate() {
  let distX = mouseX - ballX;
  let distY = mouseY - ballY;
  let distX2 = mouseX - ballX2;
  let distY2 = mouseY - ballY2;

  ballX = ballX + distX * speed;
  ballY = ballY + distY * speed;
  ballX2 = ballX2 + distX2 * speed2;
  ballY2 = ballY2 + distY2 * speed2;

  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
  ball2.style.left = ballX2 + "px";
  ball2.style.top = ballY2 + "px";

  requestAnimationFrame(animate);
}
animate();

document.addEventListener("mousemove", function (event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
});

// FORBIDEN INSPECT

// document.addEventListener("contextmenu", (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//   if (
//     event.keyCode === 123 ||
//     ctrlShiftKey(e, "I") ||
//     ctrlShiftKey(e, "J") ||
//     ctrlShiftKey(e, "C") ||
//     (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
//   )
//     return false;
// };
