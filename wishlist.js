/**
 * Saralanganlar (Wishlist / Sevimlilar) boshqaruvi — LocalStorage asosida Vanilla JS
 */

const WISHLIST_STORAGE_KEY = "shop_wishlist";

// Saralanganlar ro'yxatini olish
function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Saralanganlarni o'qishda xatolik:", e);
    return [];
  }
}

// Saralanganlarni saqlash
function saveWishlist(list) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
    updateWishlistBadges();
  } catch (e) {
    console.error("Saralanganlarni saqlashda xatolik:", e);
  }
}

// Mahsulot saralanganlar ichida bormi?
function isInWishlist(productId) {
  const list = getWishlist();
  return list.includes(parseInt(productId, 10));
}

// Saralanganlarga qo'shish yoki olib tashlash (toggle)
function toggleWishlist(productId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const id = parseInt(productId, 10);
  let list = getWishlist();
  const product = getProductById(id);
  const isPresent = list.includes(id);

  if (isPresent) {
    list = list.filter(item => item !== id);
    saveWishlist(list);
    if (typeof showToast === "function") {
      showToast(product ? `"${product.name.slice(0, 20)}..." saralanganlardan olib tashlandi` : "Olib tashlandi", "info");
    }
  } else {
    list.push(id);
    saveWishlist(list);
    if (typeof showToast === "function") {
      showToast(product ? `"${product.name.slice(0, 20)}..." saralanganlarga qo'shildi ❤️` : "Saralanganlarga qo'shildi!", "success");
    }
  }

  // Sahifadagi yurakcha tugmalarining faol holatini yangilash
  updateWishlistButtons();

  // Agar favorites.html da bo'lsak, qayta chizamiz
  if (window.location.pathname.includes("favorites.html") || document.getElementById("favoritesContainer")) {
    renderWishlistPage();
  }
}

// Aniq o'chirish
function removeFromWishlist(productId) {
  const id = parseInt(productId, 10);
  let list = getWishlist();
  list = list.filter(item => item !== id);
  saveWishlist(list);

  if (typeof showToast === "function") {
    showToast("Saralanganlardan o'chirildi", "info");
  }

  updateWishlistButtons();
  renderWishlistPage();
}

// Saralanganlarning barchasini savatga ko'chirish
function moveAllWishlistToCart() {
  const list = getWishlist();
  if (list.length === 0) return;

  list.forEach(id => {
    addToCart(id, 1);
  });

  if (typeof showToast === "function") {
    showToast("Barcha mahsulotlar savatga qo'shildi!", "success");
  }
}

// Headerdagi nishonni yangilash
function updateWishlistBadges() {
  const list = getWishlist();
  const badges = document.querySelectorAll(".wishlist-badge");
  badges.forEach(badge => {
    badge.textContent = list.length;
    if (list.length > 0) {
      badge.style.display = "inline-flex";
    } else {
      badge.style.display = "none";
    }
  });
}

// Sahifadagi yurakcha tugmalari faol holatini yangilash
function updateWishlistButtons() {
  const list = getWishlist();
  const buttons = document.querySelectorAll(".wishlist-toggle-btn");
  buttons.forEach(btn => {
    const id = parseInt(btn.getAttribute("data-id"), 10);
    if (list.includes(id)) {
      btn.classList.add("active");
      btn.setAttribute("title", "Saralanganlardan o'chirish");
    } else {
      btn.classList.remove("active");
      btn.setAttribute("title", "Saralanganlarga qo'shish");
    }
  });
}

// favorites.html sahifasini chizish
function renderWishlistPage() {
  const container = document.getElementById("favoritesContainer");
  const emptyState = document.getElementById("favoritesEmptyState");
  const headerActions = document.getElementById("favoritesHeaderActions");

  if (!container) return;

  const list = getWishlist();
  const products = list.map(id => getProductById(id)).filter(p => p !== null);

  if (products.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    if (headerActions) headerActions.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (headerActions) headerActions.style.display = "flex";

  container.innerHTML = products.map(product => {
    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-badge-group">
          ${product.oldPrice ? `<span class="badge badge-sale">Chegirma</span>` : ""}
        </div>
        <button class="wishlist-toggle-btn active" data-id="${product.id}" onclick="removeFromWishlist(${product.id})" title="Saralanganlardan o'chirish" aria-label="Sevimlilardan o'chirish">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
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
              Savatga qo'shish
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}
