/**
 * Mahsulotlar bazasi va yordamchi funksiyalar (Vanilla JS)
 */

const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB Natural Titanium",
    category: "Smartfonlar",
    price: 15400000,
    oldPrice: 17200000,
    rating: 4.9,
    reviewsCount: 128,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Apple iPhone 15 Pro Max — A17 Pro protsessori, titan korpus, Dynamic Island va 5x optik zumga ega ilg'or kamera tizimi bilan ta'minlangan eng kuchli flagman smartfon.",
    features: [
      "Protsessor: Apple A17 Pro (3nm)",
      "Ekran: 6.7 dyuym Super Retina XDR OLED, 120Hz",
      "Asosiy kamera: 48 MP + 12 MP + 12 MP",
      "Akkumulyator: 4422 mAh, tezkor quvvatlash",
      "Og'irligi: 221 g, Titan qoplama"
    ],
    colors: ["Titanium", "Qora titan", "Oq titan", "Moviy titan"],
    inStock: true,
    tags: ["popular", "sale", "new"]
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 12GB/512GB Grey",
    category: "Smartfonlar",
    price: 14200000,
    oldPrice: 15900000,
    rating: 4.8,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Galaxy AI imkoniyatlari bilan boyitilgan Samsung Galaxy S24 Ultra. S-Pen qalami, 200MP kamerasi va yorqin Dynamic AMOLED 2X ekrani bilan har qanday vazifada beqiyos.",
    features: [
      "Protsessor: Snapdragon 8 Gen 3 for Galaxy",
      "Ekran: 6.8 dyuym Dynamic AMOLED 2X, 2600 nit",
      "Kamera: 200 MP + 50 MP + 12 MP + 10 MP",
      "Akkumulyator: 5000 mAh, 45W quvvatlash",
      "S-Pen qalam to'plamda mavjud"
    ],
    colors: ["Kulrang", "Qora", "Sariq", "Binafsha"],
    inStock: true,
    tags: ["popular", "sale"]
  },
  {
    id: 3,
    name: "MacBook Pro 16 M3 Max 36GB / 1TB Space Black",
    category: "Noutbuklar",
    price: 38500000,
    oldPrice: 41000000,
    rating: 5.0,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Professional mutaxassislar uchun yaratilgan Apple MacBook Pro 16. M3 Max chipi yordamida 3D modellashtirish, video montaj va kodlash jarayonlarini bir lahzada bajaring.",
    features: [
      "Chip: Apple M3 Max (14-yadro CPU, 30-yadro GPU)",
      "Xotira: 36 GB birlashtirilgan xotira, 1TB SSD",
      "Displey: 16.2 dyuym Liquid Retina XDR, ProMotion 120Hz",
      "Avtonomiya: 22 soatgacha ishlash vaqti",
      "Portlar: 3x Thunderbolt 4, HDMI, SDXC, MagSafe 3"
    ],
    colors: ["Space Black", "Silver"],
    inStock: true,
    tags: ["popular", "new"]
  },
  {
    id: 4,
    name: "Asus ROG Zephyrus G16 OLED Core Ultra 9 / RTX 4080",
    category: "Noutbuklar",
    price: 29900000,
    oldPrice: 32500000,
    rating: 4.7,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ultra yupqa alyuminiy korpus, aqlbovar qilmas 2.5K 240Hz OLED ekran va eng quvvatli RTX 4080 grafikasi — o'yinlar hamda grafik ishlar uchun ideal tanlov.",
    features: [
      "Protsessor: Intel Core Ultra 9 185H",
      "Videokarta: NVIDIA GeForce RTX 4080 12GB",
      "Tezkor xotira: 32 GB LPDDR5X, 2TB PCIe 4.0 SSD",
      "Ekran: 16 dyuym OLED 2.5K 240Hz 0.2ms",
      "Og'irligi: bor-yo'g'i 1.85 kg"
    ],
    colors: ["Eclipse Gray", "Platinum White"],
    inStock: true,
    tags: ["popular"]
  },
  {
    id: 5,
    name: "Sony WH-1000XM5 Simsiz Shovqin So'ndiruvchi Quloqchin",
    category: "Audio texnika",
    price: 4350000,
    oldPrice: 4900000,
    rating: 4.9,
    reviewsCount: 180,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Sanoatdagi eng yaxshi faol shovqinni bekor qilish (ANC) texnologiyasi, kristall toza qo'ng'iroq sifati va 30 soatgacha to'xtovsiz musiqa tinglash imkoniyati.",
    features: [
      "Shovqinni so'ndirish: 8 ta mikrofon va 2 ta protsessor",
      "Batareya muddati: ANC bilan 30 soat, 3 daqiqa zaryad = 3 soat musiqa",
      "Ovoz sifati: Hi-Res Audio, LDAC qo'llab-quvvatlaydi",
      "Qo'shimcha: Speak-to-Chat, sensorli boshqaruv",
      "Og'irligi: 250 g ultra qulay dizayn"
    ],
    colors: ["Qora", "Kumushrang", "Ko'k"],
    inStock: true,
    tags: ["popular", "sale"]
  },
  {
    id: 6,
    name: "Apple AirPods Pro 2 (USB-C MagSafe Case)",
    category: "Audio texnika",
    price: 2950000,
    oldPrice: 3300000,
    rating: 4.9,
    reviewsCount: 240,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80"
    ],
    description: "H2 chipi bilan jihozlangan AirPods Pro 2: 2 baravar kuchli shovqin so'ndirish, moslashuvchan audio va yangilangan USB-C zaryadlash qutisi.",
    features: [
      "Chip: Apple H2 eshitish chipi",
      "Faol shovqinni so'ndirish va Shaffoflik rejimi",
      "Moslashuvchan audio va Fazoviy ovoz (Spatial Audio)",
      "Batareya: quloqchinda 6 soat, keys bilan 30 soat",
      "Himoya: IP54 chang va suvdan himoyalangan"
    ],
    colors: ["Oq"],
    inStock: true,
    tags: ["popular"]
  },
  {
    id: 7,
    name: "Apple Watch Ultra 2 GPS + Cellular 49mm Titanium",
    category: "Aqlli soatlar",
    price: 9800000,
    oldPrice: 10800000,
    rating: 4.8,
    reviewsCount: 56,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ekstremal sharoitlar va sportchilar uchun mo'ljallangan mustahkam titan korpusli aqlli soat. 3000 nit yorqinlikdagi displey va 72 soatlik energiya tejash rejimi.",
    features: [
      "Korpus: 49 mm aerokosmik titan",
      "Displey: 3000 nit yorqinlik, sapfir shisha",
      "Suvga chidamlilik: 100 metrgacha sho'ng'ish",
      "Datchiklar: EKG, puls, qon kislorodi, chuqurlik o'lchagich",
      "Aloqa: GPS ikki chastotali, LTE Cellular"
    ],
    colors: ["Titanium / Orange Alpine Loop", "Titanium / Blue Ocean Band"],
    inStock: true,
    tags: ["popular", "new"]
  },
  {
    id: 8,
    name: "Samsung Galaxy Watch 6 Classic 47mm LTE",
    category: "Aqlli soatlar",
    price: 3800000,
    oldPrice: 4400000,
    rating: 4.6,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Klassik aylanuvchi bezel, zamonaviy salomatlik monitoringi va tana tuzilishini tahlil qilish imkoniyatiga ega premium klassik soat.",
    features: [
      "Displey: 1.5 dyuym Super AMOLED, Sapfir oyna",
      "Korpus: Zanglamas po'lat, aylanuvchi bezel",
      "Salomatlik: Qon bosimi, EKG, uyqu tahlili",
      "Batareya: 425 mAh, WPC simsiz quvvatlash",
      "Operatsion tizim: Wear OS Powered by Samsung"
    ],
    colors: ["Qora", "Kumush"],
    inStock: true,
    tags: ["sale"]
  },
  {
    id: 9,
    name: "Dyson V15 Detect Absolute Simsiz Changyutgich",
    category: "Maishiy texnika",
    price: 8900000,
    oldPrice: 9900000,
    rating: 4.9,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Lazer nuri bilan ko'rinmas changlarni aniq ko'rsatib beruvchi aqlli changyutgich. Piezo-datchik orqali zarrachalarni avtomatik hisoblab, quvvatni moslashtiradi.",
    features: [
      "So'rish quvvati: 240 AW kuchli dvigatel",
      "Filtrlash: 99.99% mikroskopik zarralarni ushlab qoladi",
      "Akkumulyator: 60 daqiqagacha tinimsiz tozalash",
      "Displey: LCD ekranda tozalik statistikasi",
      "To'plamda: Fluffy Optic lazer cho'tkasi va 6 ta nasadka"
    ],
    colors: ["Sariq / Nikel"],
    inStock: true,
    tags: ["popular"]
  },
  {
    id: 10,
    name: "DeLonghi Magnifica S Avtomatik Qahva Mashinasi",
    category: "Maishiy texnika",
    price: 6200000,
    oldPrice: 7100000,
    rating: 4.7,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Donador qahvadan yangi espressolar, nozik kapuchino va xushbo'y lattelar tayyorlaydigan Italiya sifati. Integratsiyalashgan qahva tegirmoniga ega.",
    features: [
      "Bosim: 15 bar professional nasos",
      "Tegirmon: 13 xil darajada maydalash imkoniyati",
      "Kappuchinator: Manuel sut ko'pirtirgich tizimi",
      "Suv idishi hajmi: 1.8 litr olinadigan idish",
      "Tozalash: Avtomatik yuvish va ohakdan tozalash"
    ],
    colors: ["Qora", "Kumushrang"],
    inStock: true,
    tags: ["sale"]
  },
  {
    id: 11,
    name: "Sony PlayStation 5 Slim 1TB + DualSense",
    category: "Aksessuarlar",
    price: 6700000,
    oldPrice: 7500000,
    rating: 4.9,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Yangi ixcham dizayndagi PlayStation 5 Slim. 1TB SSD xotira, 4K 120Hz geyming, Ray Tracing va haptik qaytaruvchi DualSense boshqaruvchisi bilan o'yinlar olamiga sho'ng'ing.",
    features: [
      "Grafika: AMD RDNA 2, 10.3 TFLOPS",
      "Xotira: 1TB ultra tezkor NVMe SSD",
      "Format: 4K 120 FPS va 8K video chiqishi",
      "Tovush: Tempest 3D AudioTech tizimi",
      "DualSense: Moslashuvchan triggerlar va tebranish"
    ],
    colors: ["Oq"],
    inStock: true,
    tags: ["popular", "sale"]
  },
  {
    id: 12,
    name: "Apple MagSafe 15W Tezkor Zaryadlovchi Qurilma",
    category: "Aksessuarlar",
    price: 520000,
    oldPrice: 650000,
    rating: 4.5,
    reviewsCount: 114,
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "iPhone 12 va undan yuqori modellarga magnit orqali mustahkam yopishuvchi asl Apple simsiz zaryadlash moslamasi. 15W gacha tez zaryadlash.",
    features: [
      "Quvvati: 15W gacha simsiz tezkor quvvatlash",
      "Moslik: iPhone 12, 13, 14, 15 seriyalari va AirPods",
      "Ulanish: 1 metrli o'rnatilgan USB-C kabeli",
      "Xavfsizlik: Harorat va kuchlanishdan himoya tizimi"
    ],
    colors: ["Oq"],
    inStock: true,
    tags: ["popular"]
  }
];

// Yordamchi funksiyalar:
function formatPrice(amount) {
  if (amount === undefined || amount === null) return "0 so'm";
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
}

function getAllProducts() {
  return PRODUCTS;
}

function getProductById(id) {
  const numericId = parseInt(id, 10);
  return PRODUCTS.find(p => p.id === numericId) || null;
}

function getCategories() {
  const categories = PRODUCTS.map(p => p.category);
  return ["Barchasi", ...Array.from(new Set(categories))];
}

function getFeaturedProducts(limit = 4) {
  return PRODUCTS.filter(p => p.tags.includes("popular")).slice(0, limit);
}

function getDiscountedProducts(limit = 4) {
  return PRODUCTS.filter(p => p.oldPrice && p.oldPrice > p.price).slice(0, limit);
}

function getRelatedProducts(productId, limit = 4) {
  const current = getProductById(productId);
  if (!current) return PRODUCTS.slice(0, limit);
  return PRODUCTS.filter(p => p.category === current.category && p.id !== current.id).slice(0, limit);
}

function renderRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let starsHTML = "";

  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<span class="star filled">★</span>`;
  }
  if (hasHalf) {
    starsHTML += `<span class="star half">★</span>`;
  }
  const remaining = 5 - fullStars - (hasHalf ? 1 : 0);
  for (let i = 0; i < remaining; i++) {
    starsHTML += `<span class="star empty">☆</span>`;
  }
  return starsHTML;
}

function filterProducts({ category, search, minPrice, maxPrice, sortBy, inStockOnly }) {
  let list = [...PRODUCTS];

  if (category && category !== "Barchasi") {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search && search.trim() !== "") {
    const q = search.trim().toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (minPrice !== undefined && minPrice !== null && !isNaN(minPrice)) {
    list = list.filter(p => p.price >= minPrice);
  }

  if (maxPrice !== undefined && maxPrice !== null && !isNaN(maxPrice)) {
    list = list.filter(p => p.price <= maxPrice);
  }

  if (inStockOnly) {
    list = list.filter(p => p.inStock);
  }

  if (sortBy) {
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name-asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  return list;
}
