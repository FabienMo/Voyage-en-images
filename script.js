// MENU

$("a.link_anchor").click(function () {
  $("html, body").animate(
    {
      scrollTop: $($(this).attr("href")).offset().top,
    },
    1000
  );
  return false;
});

// ALBUM ON LOAD

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var categories = shuffle($("#portfolio>div").get());
$("#portfolio").html(categories);

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
  load: {
    filter: "south-africa",
    sort: "south-africa",
  },
});

const button = document.getElementById("south-africa");
function autoClick() {
  button.click();
}

button.addEventListener("click", function () {
  console.log("Button was clicked automatically!");
});
setTimeout(autoClick, 100);

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

document.addEventListener("contextmenu", (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, "I") ||
    ctrlShiftKey(e, "J") ||
    ctrlShiftKey(e, "C") ||
    (e.ctrlKey && e.keyCode === "U".charCodeAt(0))
  )
    return false;
};

// PORTFOLIO MODAL
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".carousel-container");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".carousel-button.prev");
const nextBtn = document.querySelector(".carousel-button.next");

let currentImages = [];
let currentIndex = 0;

// Add click event to portfolio images
$("#portfolio").on("click", ".tile", function (e) {
  e.preventDefault();
  e.stopPropagation();

  // Vérifier si un filtre est actif
  const activeFilter = $("#filters .filter.active").data("filter");
  let tiles;

  if (activeFilter === "all" || !activeFilter) {
    // Si aucun filtre ou "all", prendre toutes les images
    tiles = $("#portfolio .tile img");
  } else {
    // Sinon, prendre les images de la catégorie active
    const category = $(this)
      .attr("class")
      .split(" ")
      .find((cls) =>
        ["namibia", "kenya", "south-africa", "norway", "indonesia"].includes(
          cls
        )
      );

    if (!category) return;
    tiles = $(`.${category} img`);
  }

  // Récupérer les images
  currentImages = tiles
    .map(function () {
      return $(this).attr("data-full") || $(this).attr("src");
    })
    .get();

  // Trouver l'index de l'image cliquée
  const clickedImage = $(this).find("img")[0];
  currentIndex = tiles.index(clickedImage);

  // Mettre à jour et afficher le carousel
  updateCarousel();
  modal.style.display = "block";
});

function updateCarousel() {
  modalContent.innerHTML = `<img src="${currentImages[currentIndex]}" alt="">`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateCarousel();
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateCarousel();
}

// Event listeners
closeBtn.addEventListener("click", () => (modal.style.display = "none"));
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (modal.style.display === "block") {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") modal.style.display = "none";
  }
});
