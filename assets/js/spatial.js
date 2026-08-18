/* ============================================
   JENPORT - Spatial / 3D Parallax JS
   Mouse depth, starfield, floating anime cards
   ============================================ */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  initSpatialStars();
  initFloatingCards();
  if (finePointer && !reduceMotion) {
    initMouseParallax();
    initGalleryTilt();
  }
});

// ====== STARFIELD (deep layer, no images) ======
function initSpatialStars() {
  const container = document.getElementById('spatialStars');
  if (!container) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const starCount = window.innerWidth < 768 ? 40 : 90;
  let html = '';
  for (let i = 0; i < starCount; i++) {
    const size = 1 + Math.random() * 3;
    html += `<span class="spatial-star" style="top:${Math.random() * 100}%;left:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-delay:${Math.random() * 4}s;animation-duration:${2 + Math.random() * 3}s"></span>`;
  }
  container.innerHTML = html;

  // Nebula orbs (pure CSS, blurred)
  if (!reduceMotion) {
    container.insertAdjacentHTML('beforeend', `
      <div class="spatial-orb pink" style="top:15%;left:8%"></div>
      <div class="spatial-orb purple" style="bottom:10%;right:6%"></div>
      <div class="spatial-orb blue" style="top:55%;left:55%"></div>
    `);
  }
}

// ====== FLOATING ANIME CARDS (foreground depth layer) ======
function initFloatingCards() {
  const front = document.getElementById('spatialFront');
  if (!front) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- YOUR 3D ANIME ART GOES HERE ----
  // Drop files into assets/images/ and point each 'src' at them, e.g.
  //   { cls: 'spatial-card-a', src: 'assets/images/anime-1.png' }
  // Leave 'src' as '' to show an animated anime placeholder until you're ready.
  const cardImages = [
    { cls: 'spatial-card-a', label: 'Art 1', src: 'assets/images/art1.png' },
    { cls: 'spatial-card-b', label: 'Art 2', src: 'assets/images/art2.png' },
    { cls: 'spatial-card-c', label: 'Art 3', src: 'assets/images/art3.png' },
    { cls: 'spatial-card-d', label: 'Art 4', src: 'assets/images/art4.png' }
  ];

  cardImages.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'spatial-card ' + p.cls;
    card.style.animationDelay = (i * 1.2) + 's';
    if (p.src) {
      card.innerHTML = `<img src="${p.src}" alt="Anime artwork" loading="lazy" />`;
    } else {
      card.innerHTML = `
        <div class="spatial-placeholder gradient-${i + 1}">
          <span class="sp-placeholder-label">${p.label}</span>
        </div>`;
    }
    front.appendChild(card);
  });

  // respect reduced motion: pause float
  if (reduceMotion) {
    front.querySelectorAll('.spatial-card').forEach(c => {
      c.style.animation = 'none';
    });
  }
}

// ====== MOUSE PARALLAX (tilts the whole scene on cursor) ======
function initMouseParallax() {
  const scene = document.getElementById('spatial3d');
  if (!scene) return;

  let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

  document.addEventListener('mousemove', (e) => {
    tx = (e.clientX / window.innerWidth) * 2 - 1;
    ty = (e.clientY / window.innerHeight) * 2 - 1;
    if (!raf) {
      raf = requestAnimationFrame(applyTilt);
    }
  });

  function applyTilt() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    scene.style.setProperty('--px', (cx * 6).toFixed(2));
    scene.style.setProperty('--py', (-cy * 6).toFixed(2));
    raf = null;
  }
}

// ====== GALLERY CARD 3D TILT (delegated, survives re-renders) ======
function initGalleryTilt() {
  document.addEventListener('mousemove', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const rect = item.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    item.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-5px)`;
  });

  document.addEventListener('mouseleave', () => {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.style.transform = '';
    });
  });
}

// ====== REDUCED-MOTION: keep spatial layout, drop JS parallax ======
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
  document.body.classList.toggle('reduce-motion', e.matches);
});
