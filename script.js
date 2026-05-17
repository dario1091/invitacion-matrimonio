/* ===========================
   PÉTALOS
=========================== */
(function createSparkles() {
  const container = document.getElementById('petals');
  const count = 25;

  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    spark.classList.add('petal');

    // Alterna entre destello puntual y destello en cruz
    const isCross = Math.random() > 0.4;
    const isBig   = Math.random() > 0.65;
    if (isCross) spark.classList.add('cross');
    if (isBig)   spark.classList.add('big');

    const size = isBig ? (Math.random() * 4 + 5) : (Math.random() * 3 + 2);

    spark.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 7 + 6}s;
      animation-delay: ${Math.random() * 12}s;
    `;
    container.appendChild(spark);
  }
})();

/* ===========================
   MÚSICA
=========================== */
const musicBtn = document.getElementById('musicBtn');
const bgMusic  = document.getElementById('bgMusic');
let playing = false;

function startMusic() {
  bgMusic.volume = 0.7;
  bgMusic.play().then(() => {
    playing = true;
    musicBtn.classList.add('playing');
    musicBtn.title = 'Pausar música';
  }).catch(() => {});
}

// Intenta autoplay al cargar
window.addEventListener('load', () => startMusic());

// Si el navegador bloqueó el autoplay, arranca al primer toque del usuario
function onFirstInteraction() {
  if (!playing) startMusic();
  document.removeEventListener('click', onFirstInteraction);
  document.removeEventListener('touchstart', onFirstInteraction);
}
document.addEventListener('click', onFirstInteraction);
document.addEventListener('touchstart', onFirstInteraction);

// Botón manual para pausar/reanudar
musicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (playing) {
    bgMusic.pause();
    playing = false;
    musicBtn.classList.remove('playing');
    musicBtn.title = 'Reproducir música';
  } else {
    startMusic();
  }
});

/* ===========================
   LLUVIA DE SOBRES
=========================== */
(function createEnvelopes() {
  const container = document.getElementById('giftEnvelopes');
  if (!container) return;

  const emojis = ['✉️', '💌', '✉️', '💌', '✉️'];
  const count = 10;

  for (let i = 0; i < count; i++) {
    const env = document.createElement('span');
    env.classList.add('envelope');
    env.textContent = emojis[i % emojis.length];

    env.style.cssText = `
      left: ${Math.random() * 88 + 2}%;
      font-size: ${Math.random() * 0.8 + 1}rem;
      animation-duration: ${Math.random() * 2 + 2.5}s;
      animation-delay: ${Math.random() * 3}s;
    `;
    container.appendChild(env);
  }
})();

/* ===========================
   CUENTA REGRESIVA
=========================== */
const weddingDate = new Date('2026-06-26T18:40:00');

function updateCountdown() {
  const now  = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById('days').textContent    = '00';
    document.getElementById('hours').textContent   = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = n => String(n).padStart(2, '0');

  const secEl = document.getElementById('seconds');
  secEl.classList.remove('tick');
  void secEl.offsetWidth; // reflow
  secEl.classList.add('tick');

  document.getElementById('days').textContent    = pad(days);
  document.getElementById('hours').textContent   = pad(hours);
  document.getElementById('minutes').textContent = pad(minutes);
  document.getElementById('seconds').textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ===========================
   SCROLL REVEAL
=========================== */
const revealEls = document.querySelectorAll(
  '.verse-section, .parents-section, .details-section, .gallery-section, .song-section, .rsvp-section, .detail-card, .parent-card'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ===========================
   LIGHTBOX
=========================== */
const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
const timelineItems = Array.from(document.querySelectorAll('.timeline-img-clickable img'));
const allLightboxImgs = [...timelineItems, ...galleryItems];

const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = allLightboxImgs[index].src;
  lightboxImg.alt = allLightboxImgs[index].alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + allLightboxImgs.length) % allLightboxImgs.length;
  lightboxImg.src = allLightboxImgs[currentIndex].src;
}

function showNext() {
  currentIndex = (currentIndex + 1) % allLightboxImgs.length;
  lightboxImg.src = allLightboxImgs[currentIndex].src;
}

// Galería
galleryItems.forEach((img, i) => {
  img.parentElement.addEventListener('click', () => openLightbox(timelineItems.length + i));
});

// Timeline
timelineItems.forEach((img, i) => {
  img.parentElement.addEventListener('click', () => openLightbox(i));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
});

/* ===========================
   SMOOTH SCROLL
=========================== */
document.querySelectorAll('.scroll-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(btn.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
