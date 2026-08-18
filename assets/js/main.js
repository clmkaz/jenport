/* ============================================
   JENPORT - Anime Cosplay Portfolio
   JavaScript - Main Application
   ============================================ */

'use strict';

// ====== DOM READY ======
document.addEventListener('DOMContentLoaded', () => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer) initCursor();
  initThemeToggle();
  initGallery();
  initLightbox();
  initBlog();
  initTestimonialsSlider();
  initCounterAnimation();
  initContactForm();
  initNewsletterForm();
  initBackToTop();
  initScrollAnimations();
  initSmoothScroll();
  // New anime effects
  initSakuraPetals();
  initEnergyParticles();
  initTypewriterEffect();
  initSparkles();
});

// ====== CUSTOM CURSOR ======
function initCursor() {
  const glow = document.getElementById('cursorGlow');
  const dot = document.getElementById('cursorDot');
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    dot.style.opacity = '1';
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    glow.style.opacity = '0';
  });

  // Smooth follow for glow
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

}

// ====== THEME TOGGLE ======
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const icon = toggle.querySelector('i');

  // Check saved theme
  const savedTheme = localStorage.getItem('jen-port-theme');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    icon.className = 'fas fa-sun';
  }

  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      icon.className = 'fas fa-moon';
      localStorage.setItem('jen-port-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      icon.className = 'fas fa-sun';
      localStorage.setItem('jen-port-theme', 'light');
    }
  });
}

// ====== GALLERY DATA - Frences' Cosplay Portfolio ======
const galleryData = [
  {
    id: 1,
    title: 'Raiden Shogun',
    category: 'fantasy',
    image: 'https://placehold.co/600x800/1a1030/ff6b9d?text=Raiden+Shogun&font=Raleway',
    description: 'Genshin Impact - Electro Archon with hand-crafted details.'
  },
  {
    id: 2,
    title: 'Nazuna Nanakusa',
    category: 'magical',
    image: 'https://placehold.co/600x800/1a1030/c084fc?text=Nazuna&font=Raleway',
    description: 'Call of the Night - the mysterious vampire of the night.'
  },
  {
    id: 3,
    title: 'Shuten-dōji',
    category: 'fantasy',
    image: 'https://placehold.co/600x800/1a1030/60a5fa?text=Shuten-douji&font=Raleway',
    description: 'Fate/Grand Order alternate universe interpretation.'
  },
  {
    id: 4,
    title: 'Toge Inumaki (Female)',
    category: 'shonen',
    image: 'https://placehold.co/600x800/1a1030/fbbf24?text=Toge+Inumaki&font=Raleway',
    description: 'Jujutsu Kaisen - a gender-bend on the cursed speech user.'
  },
  {
    id: 5,
    title: 'Christmas Ballerina',
    category: 'original',
    image: 'https://placehold.co/600x800/1a1030/ff6b9d?text=Ballerina&font=Raleway',
    description: 'Original concept blending holiday cheer with a dancer\'s grace.'
  },
  {
    id: 6,
    title: 'Toodles Galore (Humanized)',
    category: 'original',
    image: 'https://placehold.co/600x800/1a1030/c084fc?text=Toodles&font=Raleway',
    description: 'Tom and Jerry - a charming humanized take on the kitten.'
  }
];

let currentFilter = 'all';
let visibleCount = 6;

// ====== GALLERY ======
function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!grid) return;

  renderGalleryItems();

  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      visibleCount = 6;
      grid.innerHTML = '';
      renderGalleryItems();
    });
  });

  // Load more
  loadMoreBtn.addEventListener('click', () => {
    visibleCount += 3;
    grid.innerHTML = '';
    renderGalleryItems();
  });

  function renderGalleryItems() {
    const filtered = currentFilter === 'all'
      ? galleryData
      : galleryData.filter(item => item.category === currentFilter);

    const toShow = filtered.slice(0, visibleCount);

    toShow.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'gallery-item gallery-tilt';
      div.style.animationDelay = (index * 0.1) + 's';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="gallery-overlay">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
        <div class="gallery-hover-effects">
          <div class="hover-ring">
            <i class="fas fa-search-plus"></i>
          </div>
        </div>
      `;
      div.addEventListener('click', () => openLightbox(item, filtered));
      grid.appendChild(div);

      // Trigger animation
      setTimeout(() => {
        div.style.opacity = '1';
        div.style.transform = 'translateY(0)';
      }, 50);
      div.style.opacity = '0';
      div.style.transform = 'translateY(30px)';
      div.style.transition = 'all 0.5s ease';
    });

    // Hide/show load more
    loadMoreBtn.style.display = visibleCount >= filtered.length ? 'none' : 'inline-flex';
  }
}

// ====== LIGHTBOX ======
let lightboxItems = [];
let currentLightboxIndex = 0;

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const close = document.getElementById('lightboxClose');
  const prev = document.getElementById('lightboxPrev');
  const next = document.getElementById('lightboxNext');

  close.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lightbox.classList.remove('active');
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  prev.addEventListener('click', () => navigateLightbox(-1));
  next.addEventListener('click', () => navigateLightbox(1));
}

function openLightbox(item, items) {
  lightboxItems = items;
  currentLightboxIndex = items.findIndex(i => i.id === item.id);
  updateLightboxContent();
  document.getElementById('lightbox').classList.add('active');
}

function navigateLightbox(direction) {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = lightboxItems.length - 1;
  if (currentLightboxIndex >= lightboxItems.length) currentLightboxIndex = 0;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = lightboxItems[currentLightboxIndex];
  document.getElementById('lightboxImage').src = item.image;
  document.getElementById('lightboxImage').alt = item.title;
  document.getElementById('lightboxTitle').textContent = item.title;
  document.getElementById('lightboxDesc').textContent = item.description;
}

// ====== BLOG DATA - Convention Events & Updates ======
const blogData = [
  {
    id: 1,
    title: 'Judging the Ilocos Norte Cosplay Cup',
    excerpt: 'Honored to sit on the judge\'s panel at our regional cosplay competition and mentor the next wave of local talent.',
    image: 'https://placehold.co/600x400/1a1030/ff6b9d?text=Ilocos+North+Cosplay+Cup&font=Raleway',
    date: 'August 2026',
    category: 'Judging',
    categoryClass: 'events',
    readTime: 'Guest Appearance'
  },
  {
    id: 2,
    title: 'Anime Fest PH: Raiden Shogun Photoshoot',
    excerpt: 'Debuting my Raiden Shogun build on the main stage at this year\'s Anime Fest PH with an all-day photoshoot.',
    image: 'https://placehold.co/600x400/1a1030/c084fc?text=Anime+Fest+PH&font=Raleway',
    date: 'July 2026',
    category: 'Conventions',
    categoryClass: 'tutorials',
    readTime: 'Main Stage'
  },
  {
    id: 3,
    title: 'Local Cosplay Organization Meetup',
    excerpt: 'Leading our monthly cosplay org meetup in Ilocos Norte - workshops, planning, and community building.',
    image: 'https://placehold.co/600x400/1a1030/60a5fa?text=Org+Meetup&font=Raleway',
    date: 'June 2026',
    category: 'Community',
    categoryClass: 'events',
    readTime: 'Monthly'
  },
  {
    id: 4,
    title: 'Editorial Shoot: Winter Ballerina',
    excerpt: 'A collaborative editorial feature exploring my Christmas Ballerina concept with a local studio.',
    image: 'https://placehold.co/600x400/1a1030/fbbf24?text=Editorial+Shoot&font=Raleway',
    date: 'May 2026',
    category: 'Editorial',
    categoryClass: 'tutorials',
    readTime: 'Collaboration'
  },
  {
    id: 5,
    title: 'Open for Convention Bookings',
    excerpt: 'Now accepting guesting, judging, and appearance bookings for 2026-2027 events across the Philippines.',
    image: 'https://placehold.co/600x400/1a1030/ff6b9d?text=Now+Booking&font=Raleway',
    date: '2026-2027',
    category: 'Bookings',
    categoryClass: 'tips',
    readTime: 'Available'
  },
  {
    id: 6,
    title: 'Behind the Scenes: My Nazuna Build',
    excerpt: 'Go behind the scenes of my Nazuna Nanakusa costume - from wig styling to the final shoot.',
    image: 'https://placehold.co/600x400/1a1030/c084fc?text=Nazuna+BTS&font=Raleway',
    date: 'April 2026',
    category: 'Behind the Scenes',
    categoryClass: 'behind',
    readTime: 'BTS Feature'
  }
];

// ====== BLOG ======
function initBlog() {
  const container = document.getElementById('blogFeatured');
  if (!container) return;

  blogData.forEach((post, index) => {
    const card = document.createElement('article');
    card.className = 'blog-featured-card';
    card.style.animationDelay = (index * 0.15) + 's';
    card.innerHTML = `
      <span class="blog-category-badge ${post.categoryClass}">${post.category}</span>
      <img src="${post.image}" alt="${post.title}" class="blog-featured-image" loading="lazy" />
      <div class="blog-featured-overlay">
        <div class="blog-featured-content">
          <div class="blog-featured-meta">
            <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
            <span><i class="far fa-folder"></i> ${post.category}</span>
            <span><i class="far fa-clock"></i> ${post.readTime}</span>
          </div>
          <h3 class="blog-featured-title">${post.title}</h3>
          <p class="blog-featured-excerpt">${post.excerpt}</p>
          <a href="#" class="blog-featured-link">
            Read Full Story <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ====== TESTIMONIALS SLIDER ======
function initTestimonialsSlider() {
  const slider = document.getElementById('testimonialsSlider');
  if (!slider) return;
  const dots = document.querySelectorAll('#testimonialsDots .dot');
  let currentSlide = 0;
  const totalSlides = dots.length;

  function goToSlide(index) {
    currentSlide = index;
    slider.scrollTo({
      left: slider.clientWidth * currentSlide,
      behavior: 'smooth'
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Auto-advance
  let autoSlide = setInterval(() => {
    const next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
  }, 5000);

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
  slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      const next = (currentSlide + 1) % totalSlides;
      goToSlide(next);
    }, 5000);
  });
}

// ====== COUNTER ANIMATION ======
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);
    element.textContent = current;

    if (current >= target) {
      clearInterval(timer);
      element.textContent = target + '+';
    }
  }, duration / steps);
}

// ====== CONTACT FORM ======
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    // Simulate sending
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
      submitBtn.style.background = 'linear-gradient(135deg, #60a5fa, #c084fc)';

      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  });
}

// ====== NEWSLETTER FORM ======
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn = form.querySelector('button');

    if (input.value) {
      btn.innerHTML = '<i class="fas fa-check"></i>';
      btn.style.background = 'linear-gradient(135deg, #60a5fa, #c084fc)';
      input.value = '';

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
        btn.style.background = '';
      }, 2000);
    }
  });
}

// ====== BACK TO TOP ======
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ====== SCROLL ANIMATIONS ======
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.about-content, .gallery-grid, .blog-featured, ' +
    '.contact-content, .testimonials-slider, .about-image-wrapper, ' +
    '.about-text, .contact-info, .contact-form, .hero-content'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ====== SMOOTH SCROLL ======
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// NEW ANIME EFFECTS
// ============================================

// ====== SAKURA PETAL PARTICLES ======
function initSakuraPetals() {
  const container = document.createElement('div');
  container.className = 'sakura-container';
  document.body.appendChild(container);

  const petalCount = window.innerWidth < 768 ? 15 : 30;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    const size = 8 + Math.random() * 12;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (8 + Math.random() * 12) + 's';
    petal.style.animationDelay = (Math.random() * 15) + 's';
    petal.style.opacity = 0.3 + Math.random() * 0.4;
    container.appendChild(petal);
  }
}

// ====== ENERGY PARTICLE FIELD ======
function initEnergyParticles() {
  const field = document.createElement('div');
  field.className = 'energy-field';
  document.body.appendChild(field);

  const particleCount = window.innerWidth < 768 ? 10 : 25;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'energy-particle';
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 0.5) * 200;
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.setProperty('--dx', dx + 'px');
    particle.style.setProperty('--dy', dy + 'px');
    particle.style.animationDuration = (6 + Math.random() * 8) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    field.appendChild(particle);
  }
}

// ====== TYPEWRITER EFFECT ======
function initTypewriterEffect() {
  const heroDesc = document.getElementById('heroDesc');
  if (!heroDesc) return;

  const originalText = heroDesc.textContent;
  heroDesc.textContent = '';
  heroDesc.classList.add('typewriter-text');

  let charIndex = 0;
  function typeChar() {
    if (charIndex < originalText.length) {
      heroDesc.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 30 + Math.random() * 20);
    } else {
      heroDesc.classList.remove('typewriter-text');
    }
  }

  // Start typing after preloader
  setTimeout(typeChar, 1200);
}

// ====== SPARKLE EFFECT ON GALLERY ITEMS ======
function initSparkles() {
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';

    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = (Math.random() * 2) + 's';
      sparkle.style.animationDuration = (1 + Math.random() * 1.5) + 's';
      sparkleContainer.appendChild(sparkle);
    }

    item.appendChild(sparkleContainer);
  });
}

// ====== PERFORMANCE OPTIMIZATIONS ======
// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.src;
    });
  }
});

// Console greeting
console.log('%c ✨ JEN - Anime Cosplay Portfolio ✨ ',
  'background: #ff6b9d; color: #fff; font-size: 14px; padding: 10px 20px; border-radius: 4px; font-family: Bangers; letter-spacing: 2px;'
);
console.log('%c 🌸 Anime Effects Loaded 🌸 ',
  'color: #c084fc; font-size: 12px; font-family: Poppins;'
);
console.log('%c Bringing anime characters to life! ✦ ',
  'color: #ff6b9d; font-size: 12px; font-family: Poppins;'
);