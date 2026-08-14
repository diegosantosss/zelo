const CONFIG = {
  whatsappNumero: "5583987192524",
  whatsappDisplay: "(83) 98719-2524",
  instagram: "https://instagram.com/zelodesapego",
  mensagens: {
    comprar:   "Oi! Vim pelo site do Zêlo Desapego 💖 Quero ver o que tem disponível pra comprar.",
    desapegar: "Oi! Vim pelo site do Zêlo Desapego. Tenho um produto pra desapegar e queria enviar pra vocês.",
    procuro:   "Oi! Vim pelo site do Zêlo Desapego. Estou procurando um produto específico, pode me ajudar a garimpar?"
  }
};

function linkWhats(tipo, produto) {
  let texto;
  if (produto) {
    texto = `Oi! Vim pelo site do Zêlo Desapego 💖 Tenho interesse em: ${produto}. Ainda está disponível?`;
  } else {
    texto = CONFIG.mensagens[tipo] || CONFIG.mensagens.comprar;
  }
  return `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(texto)}`;
}

document.querySelectorAll("[data-wa]").forEach(el => {
  el.setAttribute("href", linkWhats(el.dataset.wa, el.dataset.produto));
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

document.querySelectorAll("[data-wa-display]").forEach(el => {
  el.textContent = CONFIG.whatsappDisplay;
});

document.querySelectorAll(".card[data-wa]").forEach(card => {
  card.addEventListener("click", () => window.open(linkWhats(card.dataset.wa, card.dataset.produto), "_blank", "noopener"));
});

const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const overlay = document.getElementById("menuOverlay");

function abrirMenu(abrir) {
  menu.classList.toggle("is-open", abrir);
  toggle.classList.toggle("is-open", abrir);
  toggle.setAttribute("aria-expanded", String(abrir));
  overlay.hidden = !abrir;
  document.body.style.overflow = abrir ? "hidden" : "";
}

toggle.addEventListener("click", () => abrirMenu(!menu.classList.contains("is-open")));
overlay.addEventListener("click", () => abrirMenu(false));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => abrirMenu(false)));

const track = document.getElementById("carouselTrack");
const slides = track ? Array.from(track.children) : [];
const dotsWrap = document.getElementById("carouselDots");
let atual = 0;
let timer;

function irPara(i) {
  atual = (i + slides.length) % slides.length;
  slides.forEach(s => s.style.transform = `translateX(-${atual * 100}%)`);
  dotsWrap.querySelectorAll("button").forEach((d, idx) => d.classList.toggle("is-active", idx === atual));
}

if (slides.length) {
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Ir para o destaque ${i + 1}`);
    b.addEventListener("click", () => { irPara(i); reiniciar(); });
    dotsWrap.appendChild(b);
  });

  document.getElementById("nextBtn").addEventListener("click", () => { irPara(atual + 1); reiniciar(); });
  document.getElementById("prevBtn").addEventListener("click", () => { irPara(atual - 1); reiniciar(); });

  function auto() { timer = setInterval(() => irPara(atual + 1), 5000); }
  function reiniciar() { clearInterval(timer); auto(); }

  irPara(0);
  auto();

  const carousel = document.getElementById("carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", auto);

  let x0 = null;
  track.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
  track.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { irPara(atual + (dx < 0 ? 1 : -1)); reiniciar(); }
    x0 = null;
  }, { passive: true });
}

const reel = document.getElementById("reel");
const videoModal = document.getElementById("videoModal");
const videoModalPlayer = document.getElementById("videoModalPlayer");
const videoModalClose = document.getElementById("videoModalClose");

function abrirVideo(src) {
  videoModalPlayer.src = src;
  videoModal.hidden = false;
  document.body.style.overflow = "hidden";
  videoModalPlayer.play().catch(() => {});
}

function fecharVideo() {
  videoModalPlayer.pause();
  videoModalPlayer.removeAttribute("src");
  videoModalPlayer.load();
  videoModal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".reel__card[data-video]").forEach(card => {
  card.addEventListener("click", () => abrirVideo(card.dataset.video));
});

if (videoModal) {
  videoModalClose.addEventListener("click", fecharVideo);
  videoModal.addEventListener("click", e => { if (e.target === videoModal) fecharVideo(); });
}

if (reel) {
  const passo = () => reel.querySelector(".reel__card").offsetWidth + 18;
  document.getElementById("reelNext").addEventListener("click", () => reel.scrollBy({ left: passo(), behavior: "smooth" }));
  document.getElementById("reelPrev").addEventListener("click", () => reel.scrollBy({ left: -passo(), behavior: "smooth" }));
}

document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  abrirMenu(false);
  if (videoModal && !videoModal.hidden) fecharVideo();
});

const palavras = document.querySelectorAll(".switch__word");
if (palavras.length) {
  let p = 0;
  setInterval(() => {
    palavras[p].classList.remove("is-on");
    p = (p + 1) % palavras.length;
    palavras[p].classList.add("is-on");
  }, 2600);
}

const ano = document.getElementById("ano");
if (ano) ano.textContent = new Date().getFullYear();