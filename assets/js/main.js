/* ============================================
   JENPORT - Anime Cosplay Portfolio
   JavaScript - Main Application
   ============================================ */

'use strict';

// ====== DOM READY ======
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initNavbar();
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

// ====== PRELOADER ======
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const barFill = document.getElementById('preloaderBarFill');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;
    barFill.style.width = progress + '%';

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.cursor = 'none';
        setTimeout(() => {
          if (window.innerWidth <= 768) {
            document.body.style.cursor = 'default';
          }
        }, 500);
      }, 500);
    }
  }, 200);
}

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

// ====== NAVBAR ======
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  });

  // Hamburger menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Active link update
  function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    let current = 'hero';

    sections.forEach(section => {
      const top = section.offsetTop - 200;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
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

// ====== GALLERY DATA - Anime Themed ======
const galleryData = [
  {
    id: 1,
    title: 'Naruto Uzumaki',
    category: 'shonen',
    image: 'https://placehold.co/600x800/1a1030/ff6b9d?text=Naruto&font=Raleway',
    description: 'Seventh Hokage inspired costume with custom jacket and headband.'
  },
  {
    id: 2,
    title: 'Sailor Moon',
    category: 'magical',
    image: 'https://placehold.co/600x800/1a1030/c084fc?text=Sailor+Moon&font=Raleway',
    description: 'Magical guardian outfit with hand-embroidered brooch and tiara.'
  },
  {
    id: 3,
    title: 'Mikasa Ackerman',
    category: 'shonen',
    image: 'https://placehold.co/600x800/1a1030/60a5fa?text=Mikasa&font=Raleway',
    description: 'Survey Corps uniform with 3D maneuver gear replica.'
  },
  {
    id: 4,
    title: 'Original - Star Mage',
    category: 'original',
    image: 'https://placehold.co/600x800/1a1030/fbbf24?text=Star+Mage&font=Raleway',
    description: 'Original magical girl character with cosmic star motifs.'
  },
  {
    id: 5,
    title: 'Tanjiro Kamado',
    category: 'shonen',
    image: 'https://placehold.co/600x800/1a1030/ff6b9d?text=Tanjiro&font=Raleway',
    description: 'Demon Slayer outfit with hand-painted hanafuda earrings.'
  },
  {
    id: 6,
    title: 'Hatsune Miku',
    category: 'magical',
    image: 'https://placehold.co/600x800/1a1030/c084fc?text=Miku&font=Raleway',
    description: 'Vocaloid diva costume with LED light-up hair accessories.'
  },
  {
    id: 7,
    title: 'Yoruichi Shihoin',
    category: 'shonen',
    image: 'https://placehold.co/600x800/1a1030/60a5fa?text=Yoruichi&font=Raleway',
    description: 'Bleach captain outfit with custom cat transformation details.'
  },
  {
    id: 8,
    title: 'Original - Shadow Fox',
    category: 'original',
    image: 'https://placehold.co/600x800/1a1030/ff6b9d?text=Shadow+Fox&font=Raleway',
    description: 'Original ninja fox spirit with glowing eyes and tail.'
  },
  {
    id: 9,
    title: 'Cardcaptor Sakura',
    category: 'magical',
    image: 'https://placehold.co/600x800/1a1030/fbbf24?text=Sakura&font=Raleway',
    description: 'Classic magical girl outfit with Clow Card props.'
  }
];

let currentFilter = 'all';
let visibleCount = 6;

// ====== GALLERY ======
function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

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
      div.className = 'gallery-item';
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

// ====== BLOG DATA - Anime Convention Events ======
const blogData = [
  {
    id: 1,
    title: 'Anime Expo 2026: My Best Cosplay Yet!',
    excerpt: 'From preparation to the main stage, here is my full experience at Anime Expo 2026 with my award-winning Naruto cosplay.',
    image: 'https://placehold.co/600x400/1a1030/ff6b9d?text=Anime+Expo+2026&font=Raleway',
    date: 'July 4, 2026',
    category: 'Conventions',
    categoryClass: 'events',
    readTime: '8 min read'
  },
  {
    id: 2,
    title: 'How I Built My Demon Slayer Costume',
    excerpt: 'A step-by-step breakdown of crafting Tanjiro\'s iconic outfit, from fabric selection to the final photoshoot.',
    image: 'https://placehold.co/600x400/1a1030/c084fc?text=Demon+Slayer+Build&font=Raleway',
    date: 'June 20, 2026',
    category: 'Tutorials',
    categoryClass: 'tutorials',
    readTime: '12 min read'
  },
  {
    id: 3,
    title: 'Top 10 Anime Conventions to Visit in 2026',
    excerpt: 'From Comiket to Crunchyroll Expo, discover the best anime conventions around the world for cosplayers and fans.',
    image: 'https://placehold.co/600x400/1a1030/60a5fa?text=Conventions+2026&font=Raleway',
    date: 'June 5, 2026',
    category: 'Events',
    categoryClass: 'events',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'LED Effects for Anime Cosplay: A Beginner\'s Guide',
    excerpt: 'Learn how to add glowing effects to your anime costumes with easy-to-follow LED integration techniques.',
    image: 'https://placehold.co/600x400/1a1030/fbbf24?text=LED+Guide&font=Raleway',
    date: 'May 18, 2026',
    category: 'Tutorials',
    categoryClass: 'tutorials',
    readTime: '10 min read'
  },
  {
    id: 5,
    title: 'Convention Survival Kit for Cosplayers',
    excerpt: 'After 60+ conventions, here is my ultimate cosplayer survival kit that keeps me comfortable and ready.',
    image: 'https://placehold.co/600x400/1a1030/ff6b9d?text=Con+Kit&font=Raleway',
    date: 'May 2, 2026',
    category: 'Tips',
    categoryClass: 'tips',
    readTime: '5 min read'
  },
  {
    id: 6,
    title: 'Behind the Scenes: My Miku Cosplay Photoshoot',
    excerpt: 'Go behind the camera and see how we brought Hatsune Miku to life with amazing lighting and editing.',
    image: 'https://placehold.co/600x400/1a1030/c084fc?text=Miku+Photoshoot&font=Raleway',
    date: 'April 15, 2026',
    category: 'Behind the Scenes',
    categoryClass: 'behind',
    readTime: '9 min read'
  }
];

// ====== BLOG ======
function initBlog() {
  const container = document.getElementById('blogFeatured');

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