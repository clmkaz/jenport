/* ============================================
   JENPORT - Advanced Cosplay Portfolio
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

// ====== GALLERY DATA ======
const galleryData = [
  {
    id: 1,
    title: 'Dragon Empress',
    category: 'fantasy',
    image: 'https://placehold.co/600x800/1a1a2e/e94560?text=Dragon+Empress&font=Raleway',
    description: 'Elaborate dragon-inspired fantasy armor with LED effects.'
  },
  {
    id: 2,
    title: 'Cyber Knight',
    category: 'sci-fi',
    image: 'https://placehold.co/600x800/16213e/00d4ff?text=Cyber+Knight&font=Raleway',
    description: 'Cyberpunk knight armor with neon trim and LED accents.'
  },
  {
    id: 3,
    title: 'Sakura Champion',
    category: 'anime',
    image: 'https://placehold.co/600x800/2d1b3e/ff6b9d?text=Sakura&font=Raleway',
    description: 'Cherry blossom themed battle outfit from popular anime.'
  },
  {
    id: 4,
    title: 'Void Walker',
    category: 'original',
    image: 'https://placehold.co/600x800/1a1a2e/7b2fff?text=Void+Walker&font=Raleway',
    description: 'Original character concept from the Void Realm series.'
  },
  {
    id: 5,
    title: 'Phoenix Guardian',
    category: 'fantasy',
    image: 'https://placehold.co/600x800/3e1a1a/e94560?text=Phoenix&font=Raleway',
    description: 'Fire-themed guardian armor with flowing cape and wings.'
  },
  {
    id: 6,
    title: 'Neon Samurai',
    category: 'sci-fi',
    image: 'https://placehold.co/600x800/1a2e1a/00ff88?text=Neon+Samurai&font=Raleway',
    description: 'Cyber samurai with holographic projections and light-up blade.'
  },
  {
    id: 7,
    title: 'Moon Priestess',
    category: 'fantasy',
    image: 'https://placehold.co/600x800/1a1a3e/8888ff?text=Moon+Priestess&font=Raleway',
    description: 'Ethereal moon-themed ceremonial robes with crystal staff.'
  },
  {
    id: 8,
    title: 'Shadow Assassin',
    category: 'anime',
    image: 'https://placehold.co/600x800/1a1a1a/ff4444?text=Shadow&font=Raleway',
    description: 'Stealth assassin from hit anime series Shadow Realm.'
  },
  {
    id: 9,
    title: 'Steam Punk Engineer',
    category: 'original',
    image: 'https://placehold.co/600x800/2e1a0e/ff8844?text=SteamPunk&font=Raleway',
    description: 'Victorian-era inspired steampunk engineer with brass gadgets.'
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

// ====== BLOG DATA ======
const blogData = [
  {
    id: 1,
    title: 'Building My First Foam Armor: A Complete Guide',
    excerpt: 'Everything I learned from sculpting, shaping, and painting my first full foam armor set for convention season.',
    image: 'https://placehold.co/600x400/1a1a2e/e94560?text=Foam+Armor&font=Raleway',
    date: 'June 15, 2026',
    category: 'Tutorials',
    readTime: '8 min read'
  },
  {
    id: 2,
    title: 'Behind the Scenes: Dragon Empress Costume',
    excerpt: 'A deep dive into the 3-month journey of creating my award-winning Dragon Empress cosplay from concept to completion.',
    image: 'https://placehold.co/600x400/16213e/00d4ff?text=Dragon+Costume&font=Raleway',
    date: 'May 28, 2026',
    category: 'Behind the Scenes',
    readTime: '12 min read'
  },
  {
    id: 3,
    title: 'Top 10 Cosplay Conventions to Visit in 2026',
    excerpt: 'From local meetups to international stages, here are the must-visit conventions for every cosplay enthusiast.',
    image: 'https://placehold.co/600x400/2d1b3e/ff6b9d?text=Conventions&font=Raleway',
    date: 'May 10, 2026',
    category: 'Events',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'LED Integration for Cosplay: Wiring Basics',
    excerpt: 'Learn how to add programmable LED strips to your costumes with this beginner-friendly electronics guide.',
    image: 'https://placehold.co/600x400/1a2e1a/00ff88?text=LED+Guide&font=Raleway',
    date: 'April 22, 2026',
    category: 'Tutorials',
    readTime: '10 min read'
  },
  {
    id: 5,
    title: 'Convention Survival Kit: What I Always Pack',
    excerpt: 'After 100+ events, here is my ultimate cosplayer survival kit checklist to keep you comfortable and prepared.',
    image: 'https://placehold.co/600x400/3e1a1a/e94560?text=Kit&font=Raleway',
    date: 'April 5, 2026',
    category: 'Tips',
    readTime: '5 min read'
  },
  {
    id: 6,
    title: 'From Sketch to Stage: My Design Process',
    excerpt: 'How I transform character concepts into wearable costumes, from initial sketches to the final convention debut.',
    image: 'https://placehold.co/600x400/1a1a3e/8888ff?text=Design+Process&font=Raleway',
    date: 'March 18, 2026',
    category: 'Behind the Scenes',
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
      submitBtn.style.background = 'linear-gradient(135deg, #00d4ff, #0077ff)';

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
      btn.style.background = 'linear-gradient(135deg, #00d4ff, #0077ff)';
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
console.log('%c JENPORT Cosplay Portfolio ',
  'background: #e94560; color: #fff; font-size: 14px; padding: 10px 20px; border-radius: 4px; font-family: Orbitron;'
);
console.log('%c Welcome to my cosplay world! ',
  'color: #00d4ff; font-size: 12px; font-family: Rajdhani;'
);