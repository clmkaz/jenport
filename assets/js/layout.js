/* ============================================
   JENPORT - Shared Layout Injector
   Injects the side-dock nav + footer into every
   page via <div id="siteNav"> and <div id="siteFooter">.
   ============================================ */
'use strict';

(function () {
  const currentPage = document.body.dataset.page || 'home';

  const navLinks = [
    { page: 'home',    href: 'index.html',   icon: 'fa-house',      label: 'Home' },
    { page: 'about',   href: 'about.html',   icon: 'fa-heart',      label: 'About' },
    { page: 'gallery', href: 'gallery.html', icon: 'fa-images',     label: 'Gallery' },
    { page: 'events',  href: 'events.html',  icon: 'fa-calendar',   label: 'Events' },
    { page: 'contact', href: 'contact.html', icon: 'fa-envelope',   label: 'Contact' }
  ];

  const dock = document.createElement('nav');
  dock.className = 'dock';
  dock.id = 'siteDock';
  dock.innerHTML = `
    <div class="dock-inner">
      <a href="index.html" class="dock-logo" aria-label="Home">
        <span class="logo-text">FRE<span class="logo-accent">N</span>CES</span>
        <small>Cosplay Artist & Model</small>
      </a>
      <ul class="dock-menu" id="dockMenu">
        ${navLinks.map(l => `
          <li>
            <a class="dock-link${l.page === currentPage ? ' active' : ''}" data-page="${l.page}" href="${l.href}">
              <i class="fas ${l.icon}"></i>
              <span>${l.label}</span>
            </a>
          </li>`).join('')}
      </ul>
      <div class="dock-actions">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
          <i class="fas fa-moon"></i>
        </button>
      </div>
    </div>
  `;

  const navSlot = document.getElementById('siteNav');
  if (navSlot) navSlot.replaceWith(dock);

  // Shared cursor (one source of truth for every page)
  const cursor = `<div class="cursor-glow" id="cursorGlow"></div><div class="cursor-dot" id="cursorDot"></div>`;
  document.body.insertAdjacentHTML('afterbegin', cursor);

  // Footer
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-brand">
        <div class="footer-logo-wrap">
          <span class="logo-text">FRE<span class="logo-accent">N</span>CES</span>
        </div>
        <p>Cosplay artist & model bringing characters to life — for conventions, editorial, and brand campaigns. ✦</p>
        <div class="footer-social">
          <a href="https://guns.lol/frencesjnz" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://guns.lol/frencesjnz" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="https://guns.lol/frencesjnz" target="_blank" rel="noopener" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          <a href="https://guns.lol/frencesjnz" target="_blank" rel="noopener" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <div class="footer-links">
        <h4>Quick Links</h4>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="gallery.html">Gallery</a>
        <a href="events.html">Events</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-links">
        <h4>Services</h4>
        <a href="contact.html">Cosplay Services</a>
        <a href="contact.html">Modeling</a>
        <a href="contact.html">Content Creation</a>
        <a href="contact.html">Bookings</a>
      </div>
      <div class="footer-newsletter">
        <h4>Get In Touch</h4>
        <p>frencesjenmadalipay@gmail.com</p>
        <a href="contact.html" class="footer-contact-link">Start a project →</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Frences. All rights reserved. | Cosplay Artist &amp; Model — Ilocos Norte, Philippines</p>
    </div>
  `;

  const footerSlot = document.getElementById('siteFooter');
  if (footerSlot) footerSlot.replaceWith(footer);

  // Restore saved theme on the injected toggle
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('jen-port-theme');
  if (toggle && savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    toggle.querySelector('i').className = 'fas fa-sun';
  }

  // Page transition: fade out then go to target
  const pageEl = document.querySelector('.page');
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-page]');
    if (!link || link.classList.contains('active')) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    e.preventDefault();
    const target = link.getAttribute('href');
    document.body.classList.remove('page-enter');
    void pageEl ? pageEl.offsetWidth : 0;
    document.body.classList.add('page-fade');
    setTimeout(() => {
      window.location.href = target;
    }, 250);
  });
})();