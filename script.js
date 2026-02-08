/* ---------- PAGE SYSTEM ---------- */
const pages = document.querySelectorAll(".page");

function showPage(id) {
  pages.forEach(p => p.classList.remove("show"));
  const page = document.getElementById(id);
  if (page) page.classList.add("show");
}

/* ---------- OVERLAY ---------- */
const overlay = document.getElementById("overlay");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  initThreeScene();
  showPage("memoryPage");
  heartFirework();
});

/* ---------- NAVIGATION ---------- */
document.getElementById("toTextPage").addEventListener("click", () => {
  showPage("textPage");
  heartFirework();
});

document.getElementById("toMusicPage").addEventListener("click", () => {
  showPage("musicPage");
  heartFirework();
});

document.getElementById("toFinalPage").addEventListener("click", () => {
  showPage("finalPage");
  celebrateHearts();
  startFallingHearts();
});

/* ---------- MUSIC ---------- */
const bgMusic = document.getElementById("bgMusic");
const specialMusic = document.getElementById("specialMusic");
const playMusicBtn = document.getElementById("playMusic");

playMusicBtn.addEventListener("click", () => {
  bgMusic.volume = 0.4;
  bgMusic.play();
  playMusicBtn.innerText = "💖 Playing...";
  heartFirework();

  bgMusic.onended = () => {
    specialMusic.play();
  };
});


/* ---------- FLOATING HEARTS (DOM) ---------- */
function startFallingHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 8000);
  }, 400);
}
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 60) goNext();
  if (diff < -60) goPrev();
});

function goNext() {
  if (document.getElementById("memoryPage").classList.contains("show"))
    showPage("textPage");
  else if (document.getElementById("textPage").classList.contains("show"))
    showPage("musicPage");
  else if (document.getElementById("musicPage").classList.contains("show"))
    showPage("finalPage");
}

function goPrev() {
  if (document.getElementById("textPage").classList.contains("show"))
    showPage("memoryPage");
  else if (document.getElementById("musicPage").classList.contains("show"))
    showPage("textPage");
}
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("click", e => {
    const msg = document.createElement("div");
    msg.className = "floating-text";
    msg.innerText = "I love you 💕";
    msg.style.left = e.clientX + "px";
    msg.style.top = e.clientY + "px";

    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  });
});
