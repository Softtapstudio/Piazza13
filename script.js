function nextScreen(num) {
  const currentScreen = document.querySelector(".screen.active");
  const nextScreen = document.getElementById("screen" + num);

  if (!currentScreen || !nextScreen) return;

  currentScreen.classList.remove("active");
  nextScreen.classList.add("active");

  if (num === 4) {
    document.getElementById("message").innerText = texts[0];
  }

  if (num === 5) {
    createConfetti();

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, i) => {
      setTimeout(() => {
        card.style.animation = "drop 0.8s ease forwards";

        setTimeout(() => {
          card.classList.add("float");
        }, 800);

      }, i * 150);
    });

    setTimeout(() => {
      document.getElementById("finalText").classList.add("show");
    }, 1400);
  }
}

function moveNo() {
  const btn = document.getElementById("noBtn");

  btn.style.position = "absolute";
  btn.style.left = Math.random() * 80 + "%";
  btn.style.top = Math.random() * 80 + "%";

  // 👇 ADD THIS LINE
  document.getElementById("noText").innerText = "Hehe 😏 you can't say no!";
}

let mediaIndex = 0;

const media = [
  "images/video1.mp4",
  "images/video2.mp4"
];

const texts = [
  "From the moment I met you… 💖",
  "You became my happiness… ✨"
];

function nextMedia() {
  const video = document.getElementById("media");
  const message = document.getElementById("message");

  mediaIndex++;

  if (mediaIndex < media.length) {
    video.src = media[mediaIndex];
    video.load();
    video.play();

    message.innerText = texts[mediaIndex];
  } else {
    nextScreen(5);
  }
}

function createConfetti() {
  for (let i = 0; i < 20; i++) {
    const c = document.createElement("div");
    c.style.position = "fixed";
    c.style.width = "10px";
    c.style.height = "10px";
    c.style.background = "red";
    c.style.left = Math.random() * 100 + "vw";
    c.style.top = "-10px";
    document.body.appendChild(c);

    setTimeout(() => c.remove(), 2000);
  }
}

function restart() {
  location.reload();
}