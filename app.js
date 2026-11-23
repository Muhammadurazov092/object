/**
 * Asosiy dastur skripti (Global UI, Navigatsiya, Toast, Kartochkalar) — Vanilla JS
 */

// Toast xabarnoma ko'rsatish funksiyasi
function showToast(message, type = "success") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let iconSvg = "";
  if (type === "success") {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === "error") {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  } else {
    iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-message">${message}</div>
    <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Yopish">&times;</button>
  `;

  container.appendChild(toast);

  // 3.5 soniyadan keyin avtomatik yo'qolishi
  setTimeout(() => {
    toast.classList.add("toast-fade-out");
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 400);
  }, 3500);
}

// Barcha sahifalarda umumiy foydalaniladigan mahsulot kartochkasi HTML generatori
function renderProductCardHTML(product) {
  const isFavorite = typeof isInWishlist === "function" && isInWishlist(product.id);
  const discountPercent = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-badge-group">
        ${discountPercent > 0 ? `<span class="badge badge-sale">-${discountPercent}%</span>` : ""}
        ${product.tags && product.tags.includes("new") ? `<span class="badge badge-new">Yangi</span>` : ""}
      </div>
      <button class="wishlist-toggle-btn ${isFavorite ? "active" : ""}" data-id="${product.id}" onclick="toggleWishlist(${product.id}, event)" title="${isFavorite ? "Saralanganlardan o'chirish" : "Saralanganlarga qo'shish"}" aria-label="Sevimlilar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="${isFavorite ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      <a href="product.html?id=${product.id}" class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
      </a>
      <div class="product-content">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-rating">
          <div class="stars">${renderRatingStars(product.rating)}</div>
          <span class="rating-value">(${product.rating})</span>
          <span class="rating-count">${product.reviewsCount} ta sharh</span>
        </div>
        <div class="product-price-row">
          <div class="prices">
            <span class="current-price">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ""}
          </div>
        </div>
        <div class="product-card-actions">
          <button class="btn btn-primary btn-sm btn-block" onclick="addToCart(${product.id}, 1)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Savatga
          </button>
        </div>
      </div>
    </div>
  `;
}

// Qidiruv maydoni (Global Search)
function setupSearchBar() {
  const searchForms = document.querySelectorAll(".global-search-form");
  searchForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[name='search']");
      const query = input ? input.value.trim() : "";
      if (query) {
        window.location.href = `catalog.html?search=${encodeURIComponent(query)}`;
      } else {
        window.location.href = `catalog.html`;
      }
    });
  });
}

// Mobil menyu (Hamburger Toggle)
function setupMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("mainNavigation");
  const overlay = document.getElementById("navOverlay");

  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      if (overlay) overlay.classList.toggle("open");
      document.body.classList.toggle("no-scroll");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("open");
      overlay.classList.remove("open");
      document.body.classList.remove("no-scroll");
    });
  }
}

// Navigatsiyada faol sahifani ajratib ko'rsatish
function highlightActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath || (currentPath === "" && linkPath === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Sahifa yuklanganda global initsializatsiya
document.addEventListener("DOMContentLoaded", () => {
  if (typeof updateCartBadges === "function") updateCartBadges();
  if (typeof updateWishlistBadges === "function") updateWishlistBadges();
  setupSearchBar();
  setupMobileMenu();
  highlightActiveNav();
});
