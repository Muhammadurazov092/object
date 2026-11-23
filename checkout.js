/**
 * Buyurtmani rasmiylashtirish (Checkout) — LocalStorage asosida Vanilla JS
 */

const ORDERS_STORAGE_KEY = "shop_orders";
const USER_STORAGE_KEY = "shop_user";

// Buyurtmalar ro'yxatini olish
function getOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Buyurtmalarni o'qishda xatolik:", e);
    return [];
  }
}

// Yangi buyurtmani saqlash
function saveOrder(order) {
  try {
    const orders = getOrders();
    orders.unshift(order); // eng yangisi boshida bo'ladi
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error("Buyurtmani saqlashda xatolik:", e);
  }
}

// Foydalanuvchi ma'lumotlarini olish
function getUserProfile() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {
      fullname: "Anvar Karimov",
      phone: "+998 90 123 45 67",
      email: "anvar@example.com",
      region: "Toshkent shahri",
      address: "Chilonzor tumani, 9-mavze, 15-uy"
    };
  } catch (e) {
    return null;
  }
}

// Foydalanuvchi ma'lumotlarini saqlash
function saveUserProfile(profile) {
  try {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Profilni saqlashda xatolik:", e);
  }
}

// checkout.html sahifasini initsializatsiya qilish
function initCheckoutPage() {
  const cart = getCart();
  const totals = getCartTotals();

  // Agar savat bo'sh bo'lsa, foydalanuvchini ogohlantirib savat sahifasiga qaytaramiz
  if (cart.length === 0) {
    const summaryContainer = document.getElementById("checkoutSummary");
    if (summaryContainer) {
      summaryContainer.innerHTML = `
        <div class="empty-state text-center" style="padding: 2rem;">
          <p>Savatingizda mahsulot mavjud emas!</p>
          <a href="catalog.html" class="btn btn-primary mt-2">Katalogga o'tish</a>
        </div>
      `;
    }
    return;
  }

  // Profil ma'lumotlarini formaga avtomatik joylash
  const user = getUserProfile();
  if (user) {
    const fnInput = document.getElementById("checkoutFullname");
    const phInput = document.getElementById("checkoutPhone");
    const emInput = document.getElementById("checkoutEmail");
    const regInput = document.getElementById("checkoutRegion");
    const addrInput = document.getElementById("checkoutAddress");

    if (fnInput && !fnInput.value) fnInput.value = user.fullname || "";
    if (phInput && !phInput.value) phInput.value = user.phone || "";
    if (emInput && !emInput.value) emInput.value = user.email || "";
    if (regInput && !regInput.value) regInput.value = user.region || "Toshkent shahri";
    if (addrInput && !addrInput.value) addrInput.value = user.address || "";
  }

  // Savat xulosasini chiqarish
  renderCheckoutSummary(cart, totals);

  // Formani tinglash
  const form = document.getElementById("checkoutForm");
  if (form) {
    form.addEventListener("submit", handleCheckoutSubmit);
  }
}

// Buyurtma xulosasini chiqarish
function renderCheckoutSummary(cart, totals) {
  const container = document.getElementById("checkoutItemsList");
  const totalsContainer = document.getElementById("checkoutTotals");

  if (container) {
    container.innerHTML = cart.map(item => `
      <div class="checkout-item">
        <img src="${item.image}" alt="${item.name}" class="checkout-item-thumb">
        <div class="checkout-item-details">
          <div class="checkout-item-title">${item.name}</div>
          <div class="checkout-item-meta">${item.quantity} x ${formatPrice(item.price)}</div>
        </div>
        <div class="checkout-item-total">${formatPrice(item.price * item.quantity)}</div>
      </div>
    `).join("");
  }

  if (totalsContainer) {
    totalsContainer.innerHTML = `
      <div class="summary-row">
        <span>Mahsulotlar soni:</span>
        <span>${totals.count} ta</span>
      </div>
      <div class="summary-row">
        <span>Oraliq jami:</span>
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
        <span>To'lov uchun jami:</span>
        <span class="total-amount">${formatPrice(totals.grandTotal)}</span>
      </div>
    `;
  }
}

// Buyurtmani jo'natish (Submit)
function handleCheckoutSubmit(event) {
  event.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    if (typeof showToast === "function") showToast("Savatingiz bo'sh!", "error");
    return;
  }

  const fullname = document.getElementById("checkoutFullname")?.value.trim();
  const phone = document.getElementById("checkoutPhone")?.value.trim();
  const email = document.getElementById("checkoutEmail")?.value.trim();
  const region = document.getElementById("checkoutRegion")?.value;
  const address = document.getElementById("checkoutAddress")?.value.trim();
  const notes = document.getElementById("checkoutNotes")?.value.trim() || "";

  // To'lov turi
  const paymentMethodInput = document.querySelector('input[name="paymentMethod"]:checked');
  const paymentMethod = paymentMethodInput ? paymentMethodInput.value : "Naqd pul orqali";

  // Yetkazib berish turi
  const deliveryMethodInput = document.querySelector('input[name="deliveryMethod"]:checked');
  const deliveryMethod = deliveryMethodInput ? deliveryMethodInput.value : "Standart kuryer";

  // Validatsiya
  if (!fullname || !phone || !address) {
    if (typeof showToast === "function") {
      showToast("Iltimos, barcha majburiy maydonlarni to'ldiring!", "error");
    }
    return;
  }

  const totals = getCartTotals();
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);

  const newOrder = {
    id: Date.now(),
    orderNumber: orderNumber,
    date: new Date().toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    items: [...cart],
    totals: { ...totals },
    customer: {
      fullname,
      phone,
      email,
      region,
      address,
      notes
    },
    paymentMethod,
    deliveryMethod,
    status: "Qabul qilindi"
  };

  // Buyurtmani saqlash
  saveOrder(newOrder);

  // Profil ma'lumotlarini yangilash
  saveUserProfile({
    fullname,
    phone,
    email,
    region,
    address
  });

  // Savatni tozalash
  localStorage.removeItem(CART_STORAGE_KEY);
  localStorage.removeItem(PROMO_STORAGE_KEY);
  updateCartBadges();

  // Muvaffaqiyat xabari va modal
  showSuccessModal(newOrder);
}

// Buyurtma muvaffaqiyatli qabul qilinganligi haqidagi modal
function showSuccessModal(order) {
  const modal = document.getElementById("orderSuccessModal");
  if (modal) {
    document.getElementById("modalOrderNumber").textContent = order.orderNumber;
    document.getElementById("modalOrderAmount").textContent = formatPrice(order.totals.grandTotal);
    document.getElementById("modalCustomerPhone").textContent = order.customer.phone;
    modal.classList.add("active");
  } else {
    alert(`Buyurtmangiz muvaffaqiyatli qabul qilindi!\nBuyurtma raqami: ${order.orderNumber}\nSumma: ${formatPrice(order.totals.grandTotal)}`);
    window.location.href = "orders.html";
  }
}
