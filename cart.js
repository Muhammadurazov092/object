/**
 * Savat (Cart) boshqaruvi — LocalStorage asosida Vanilla JS
 */

const CART_STORAGE_KEY = "shop_cart";
const PROMO_STORAGE_KEY = "shop_applied_promo";

// Savatni olish
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Savat ma'lumotlarini o'qishda xatolik:", e);
    return [];
  }
}

// Savatni saqlash
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
  } catch (e) {
    console.error("Savatni saqlashda xatolik:", e);
  }
}

// Mahsulotni savatga qo'shish
function addToCart(productId, quantity = 1, selectedColor = null) {
  const product = getProductById(productId);
  if (!product) {
    if (typeof showToast === "function") showToast("Mahsulot topilmadi!", "error");
    return;
  }

  let cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id && (!selectedColor || item.color === selectedColor));

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
      category: product.category,
      color: selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : null),
      quantity: quantity
    });
  }

  saveCart(cart);
  if (typeof showToast === "function") {
    showToast(`"${product.name.slice(0, 25)}..." savatga qo'shildi!`, "success");
  }
}

// Miqdorni o'zgartirish
function updateCartQuantity(productId, quantity) {
  let cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === parseInt(productId, 10));

  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    saveCart(cart);
    renderCartPage();
  }
}

// Savatdan o'chirish
function removeFromCart(productId) {
  let cart = getCart();
  const item = cart.find(i => i.id === parseInt(productId, 10));
  cart = cart.filter(i => i.id !== parseInt(productId, 10));
  saveCart(cart);

  if (typeof showToast === "function") {
    showToast(item ? `"${item.name.slice(0, 20)}..." savatdan olib tashlandi` : "Mahsulot o'chirildi", "info");
  }

  renderCartPage();
}

// Savatni tozalash
function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  localStorage.removeItem(PROMO_STORAGE_KEY);
  updateCartBadges();
  renderCartPage();
  if (typeof showToast === "function") {
    showToast("Savat tozalandi", "info");
  }
}

// Savatdagi hisob-kitoblar
function getCartTotals() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Yetkazib berish: 1 000 000 dan yuqori bepul, aks holda 30 000 so'm
  let shipping = 0;
  if (subtotal > 0) {
    shipping = subtotal >= 1000000 ? 0 : 30000;
  }

  // Promokod tekshiruvi (masalan: "BONUS10" -> 10% chegirma, "SALE50" -> 50 000 so'm chegirma)
  const appliedPromo = localStorage.getItem(PROMO_STORAGE_KEY);
  let discount = 0;

  if (appliedPromo === "BONUS10") {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === "SALE50") {
    discount = Math.min(50000, subtotal);
  }

  const grandTotal = Math.max(0, subtotal - discount + shipping);

  return {
    count: totalCount,
    subtotal: subtotal,
    shipping: shipping,
    discount: discount,
    grandTotal: grandTotal,
    appliedPromo: appliedPromo
  };
}

// Promokodni qo'llash
function applyPromoCode(code) {
  const cleanCode = code ? code.trim().toUpperCase() : "";
  if (cleanCode === "BONUS10") {
    localStorage.setItem(PROMO_STORAGE_KEY, "BONUS10");
    if (typeof showToast === "function") showToast("10% chegirma muvaffaqiyatli qo'llandi!", "success");
    renderCartPage();
    return true;
  } else if (cleanCode === "SALE50") {
    localStorage.setItem(PROMO_STORAGE_KEY, "SALE50");
    if (typeof showToast === "function") showToast("50 000 so'm chegirma qo'llandi!", "success");
    renderCartPage();
    return true;
  } else {
    if (typeof showToast === "function") showToast("Yaroqsiz promokod! ('BONUS10' yoki 'SALE50' ni sinab ko'ring)", "error");
    return false;
  }
}

// Promokodni bekor qilish
function removePromoCode() {
  localStorage.removeItem(PROMO_STORAGE_KEY);
  if (typeof showToast === "function") showToast("Promokod bekor qilindi", "info");
  renderCartPage();
}

// Headerdagi nishonlar (badge)ni yangilash
function updateCartBadges() {
  const totals = getCartTotals();
  const badges = document.querySelectorAll(".cart-badge");
  badges.forEach(badge => {
    badge.textContent = totals.count;
    if (totals.count > 0) {
      badge.style.display = "inline-flex";
    } else {
      badge.style.display = "none";
    }
  });
}

// cart.html sahifasini chizish
function renderCartPage() {
  const cartContainer = document.getElementById("cartItemsContainer");
  const cartSummaryContainer = document.getElementById("cartSummaryContainer");
  const cartEmptyState = document.getElementById("cartEmptyState");
  const cartContent = document.getElementById("cartContent");

  if (!cartContainer) return;

  const cart = getCart();
  const totals = getCartTotals();

  if (cart.length === 0) {
    if (cartContent) cartContent.style.display = "none";
    if (cartEmptyState) cartEmptyState.style.display = "block";
    return;
  }

  if (cartContent) cartContent.style.display = "grid";
  if (cartEmptyState) cartEmptyState.style.display = "none";

  // Mahsulotlar ro'yxatini chiqarish
  cartContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    return `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <a href="product.html?id=${item.id}">
            <img src="${item.image}" alt="${item.name}">
          </a>
        </div>
        <div class="cart-item-info">
          <span class="cart-item-category">${item.category || "Elektronika"}</span>
          <h3 class="cart-item-title">
            <a href="product.html?id=${item.id}">${item.name}</a>
          </h3>
          ${item.color ? `<div class="cart-item-color">Rang: <strong>${item.color}</strong></div>` : ""}
          <div class="cart-item-unit-price">${formatPrice(item.price)}</div>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-control">
            <button class="qty-btn minus" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" aria-label="Kamaytirish">−</button>
            <input type="number" class="qty-input" value="${item.quantity}" min="1" max="99" onchange="updateCartQuantity(${item.id}, parseInt(this.value, 10) || 1)">
            <button class="qty-btn plus" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" aria-label="Ko'paytirish">+</button>
          </div>
          <div class="cart-item-total-price">${formatPrice(itemTotal)}</div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="O'chirish" aria-label="O'chirish">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join("");

  // Xulosa blokini chizish
  if (cartSummaryContainer) {
    cartSummaryContainer.innerHTML = `
      <div class="summary-card">
        <h3 class="summary-title">Buyurtma xulosasi</h3>
        <div class="summary-row">
          <span>Jami mahsulotlar (${totals.count} dona):</span>
          <span>${formatPrice(totals.subtotal)}</span>
        </div>
        <div class="summary-row">
          <span>Yetkazib berish:</span>
          <span>${totals.shipping === 0 ? '<strong class="text-success">Bepul</strong>' : formatPrice(totals.shipping)}</span>
        </div>
        ${totals.discount > 0 ? `
          <div class="summary-row text-success">
            <span>Chegirma (${totals.appliedPromo}):</span>
            <span>-${formatPrice(totals.discount)}</span>
          </div>
        ` : ""}
        <hr class="summary-divider">
        <div class="summary-row summary-total">
          <span>Umumiy to'lov:</span>
          <span class="total-amount">${formatPrice(totals.grandTotal)}</span>
        </div>

        <div class="promo-box">
          <label for="promoInput" class="promo-label">Promokod bormi?</label>
          <div class="promo-input-group">
            <input type="text" id="promoInput" placeholder="Masalan: BONUS10" value="${totals.appliedPromo || ""}" ${totals.appliedPromo ? "disabled" : ""}>
            ${totals.appliedPromo ? `
              <button class="btn btn-secondary btn-sm" onclick="removePromoCode()">Bekor qilish</button>
            ` : `
              <button class="btn btn-primary btn-sm" onclick="applyPromoCode(document.getElementById('promoInput').value)">Qo'llash</button>
            `}
          </div>
          <small class="promo-hint">Sinab ko'ring: <code>BONUS10</code> (10% chegirma) yoki <code>SALE50</code></small>
        </div>

        <a href="checkout.html" class="btn btn-primary btn-block btn-lg checkout-btn">
          Buyurtmani rasmiylashtirish
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>

        <div class="cart-bottom-actions">
          <a href="catalog.html" class="btn btn-link">← Xaridni davom ettirish</a>
          <button class="btn btn-link text-danger" onclick="if(confirm('Savatdagi barcha mahsulotlarni o\'chirmoqchimisiz?')) clearCart();">Savatni tozalash</button>
        </div>
      </div>
    `;
  }
}
