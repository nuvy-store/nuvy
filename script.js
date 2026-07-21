/* ======================================================
   SETTINGS — edit these two things to make the site yours
   ====================================================== */

// Your WhatsApp number, country code first, no + no spaces no dashes.
// Example for a Moroccan number 06 12 34 56 78 -> '212612345678'
const WHATSAPP_NUMBER = '212675535823';

// The message sent to you on WhatsApp when someone orders.
// {qty}, {name}, {unitPrice} and {total} get filled in automatically.
function buildOrderMessage(qty, name, unitPrice, total, location, deliveryFee) {
  return `مرحبًا بفريق NUVY,
أرغب في طلب المنتج التالي:

Flavor: ${name}
Quantity: ${qty}
Price per box: ${unitPrice} DH
Delivery location: ${location || 'Not specified'}
Delivery fee: ${deliveryFee || 0} DH
==================================
*Total: ${total} DH*

بانتظار تأكيدكم وإرسال تفاصيل الدفع.
شكرًا لكم.`;
}

/* ======================================================
   PRODUCT DATA — the single place to add, edit or remove flavors.
   Changing something here updates the homepage card AND that
   flavor's order page automatically — never edit the same
   thing in two places.

   image: leave as null to use the illustrated speckled ball.
   To use a real photo instead, put the file in an "images" folder
   next to index.html, then set e.g. image: 'images/cacao-almond.jpg'
   ====================================================== */
const PRODUCTS = [
  {
    id: 'coconut-almond',
    name: 'Coconut Almond Crunch x8',
    flavor: 'flavor-coconut',
    image: 'images/coconut-almond.png',
    image2: 'images/pakaging1.png',
    ingredients: 'coconut · dates · almonds',
    tagline: 'Rich almonds rolled in toasted coconut, sweetened only with dates.',
    description: 'A coconut base rolled in toasted almond pieces, sweetened only with dates — no refined sugar, no fillers.',
    unitNote: 'Each box holds about 8 hand-rolled bites.',
    fullIngredients: 'Dates, coconut flakes, almonds, a pinch of sea salt.',
    nutrition: 'Approx. 140 kcal · 5g protein · 9g sugar (from dates only) per bite.',
    allergens: 'Contains tree nuts (almonds). Made in a kitchen that also handles peanuts, pistachios and walnuts.',
    storage: 'Store in a cool, dry place. Keeps fresh up to 2 weeks at room temperature, or a month refrigerated.',
    oldPrice: 38,
    price: 29
  },
  // {
  //   id: 'Lemon-Coconut',
  //   name: 'Lemon Coconut Bite x10',
  //   flavor: 'flavor-lemon',
  //   image: 'images/Lemon-Coconut-Bite.png',
  //   image2: 'images/Lemon-Coconut-Bite.png',
  //   ingredients: 'lemon · cashews · coconut',
  //   tagline: 'Creamy cashews and sweet Medjool dates, brightened with fresh lemon and coconut flakes.',
  //   description: 'Rich cashews and sweet dates create a filling bite, balanced with zesty lemon and a delicate coconut finish.',
  //   unitNote: 'Each box holds about 10 hand-rolled bites.',
  //   fullIngredients: 'lemon and coconut flakes, peanut butter, vanilla, a pinch of sea salt.',
  //   nutrition: '# Approx. 150 kcal · 6g protein · 7g sugar per bite.',
  //   allergens: 'Contains peanuts. Made in a kitchen that also handles tree nuts.',
  //   storage: 'Store in a cool, dry place. Keeps fresh up to 2 weeks at room temperature, or a month refrigerated.',
  //   oldPrice: 129,
  //   price: 67
  // }
  // {
  //   id: 'coconut-lime',
  //   name: 'Coconut Lime Refresher x10',
  //   flavor: 'flavor-coconut',
  //   image: null,
  //   ingredients: 'coconut · cashew · lime',
  //   tagline: 'Bright lime zest and toasted coconut over a creamy cashew base.',
  //   description: 'A lighter, brighter bite — toasted coconut and creamy cashew lifted with fresh lime zest.',
  //   unitNote: 'Each box holds about 10 hand-rolled bites.',
  //   fullIngredients: 'Cashews, dates, desiccated coconut, fresh lime zest.',
  //   nutrition: 'Approx. 135 kcal · 4g protein · 8g sugar (from dates only) per bite.',
  //   allergens: 'Contains tree nuts (cashews). Made in a kitchen that also handles peanuts.',
  //   storage: 'Store in a cool, dry place. Keeps fresh up to 2 weeks at room temperature, or a month refrigerated.',
  //   price: 89
  // },
  // {
  //   id: 'chai-walnut',
  //   name: 'Spiced Chai Walnut x10',
  //   flavor: 'flavor-chai',
  //   image: null,
  //   ingredients: 'walnut · chai spice · dates',
  //   tagline: 'Warm cinnamon and cardamom rolled into toasted walnut.',
  //   description: 'Toasted walnut warmed up with real chai spices — cinnamon, cardamom and a hint of clove.',
  //   unitNote: 'Each box holds about 10 hand-rolled bites.',
  //   fullIngredients: 'Dates, walnuts, cinnamon, cardamom, clove.',
  //   nutrition: 'Approx. 150 kcal · 4g protein · 9g sugar (from dates only) per bite.',
  //   allergens: 'Contains tree nuts (walnuts). Made in a kitchen that also handles almonds and pistachios.',
  //   storage: 'Store in a cool, dry place. Keeps fresh up to 2 weeks at room temperature, or a month refrigerated.',
  //   price: 89
  // },
  // {
  //   id: 'espresso-almond',
  //   name: 'Espresso Almond Boost x10',
  //   flavor: 'flavor-espresso',
  //   image: null,
  //   ingredients: 'espresso · almond · cacao',
  //   tagline: 'A real coffee kick paired with almond and dark cacao.',
  //   description: 'A genuine coffee kick from real espresso, balanced with almond and dark cacao — built for early mornings.',
  //   unitNote: 'Each box holds about 10 hand-rolled bites.',
  //   fullIngredients: 'Dates, almonds, raw cacao powder, finely ground espresso.',
  //   nutrition: 'Approx. 145 kcal · 5g protein · 9g sugar (from dates only) per bite. Contains caffeine.',
  //   allergens: 'Contains tree nuts (almonds). Made in a kitchen that also handles peanuts and walnuts.',
  //   storage: 'Store in a cool, dry place. Keeps fresh up to 2 weeks at room temperature, or a month refrigerated.',
  //   price: 99
  // }
];

/* ======================================================
   SHARED UI — nav toggle, scroll reveal, toast
   (runs on every page)
   ====================================================== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupReveal(root = document) {
  const revealEls = root.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));
}

const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3600);
}

function isPlaceholderNumber() {
  return !WHATSAPP_NUMBER || WHATSAPP_NUMBER === '212600000000';
}

// Returns either a real product photo or the illustrated speckled ball,
// depending on whether this product has an "image" set.
function buildVisualMarkup(product, sizeClass) {
  if (product.image2) {
    return `
      <div class="product-swap">
        <img src="${product.image}" alt="${product.name}" class="product-photo ${sizeClass}">
        <img src="${product.image2}" alt="${product.name}" class="product-photo ${sizeClass} swap-in">
      </div>`;
  }
  if (product.image) {
    return `<img src="${product.image}" alt="${product.name}" class="product-photo ${sizeClass}">`;
  }
  return `<div class="ball ${sizeClass} ${product.flavor}" aria-hidden="true"></div>`;
}

/* ======================================================
   SHOP GRID — renders into any page that has #productGrid
   ====================================================== */
const productGrid = document.getElementById('productGrid');
if (productGrid) {
  productGrid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card reveal">
      ${buildVisualMarkup(p, 'ball-card')}
      <p class="stamp-tag">${p.ingredients}</p>
      <h3>${p.name}</h3>
      <p class="product-desc">${p.tagline}</p>
      <div class="product-footer">
        <div class="price-wrapper">
          <span class="price-old">${p.oldPrice} DH</span>
          <span class="price">${p.price} DH</span>
        </div>
        <a href="product.html?id=${p.id}" class="btn btn-buy">Buy now</a>
      </div>
    </article>
  `).join('') + `
    <article class="product-card coming-soon reveal" style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
      <p class="stamp-tag">More flavors on the way</p>
      <h3>Coming Soon</h3>
      <p class="product-desc">New recipes are in the kitchen. Stay tuned.</p>
    </article>
  `;
  setupReveal(productGrid);

  productGrid.querySelectorAll('.product-swap').forEach(swap => {
    let shown = false;
    setInterval(() => {
      shown = !shown;
      swap.classList.toggle('is-active', shown);
    }, 4500);
  });
}
//<div class="ball ball-card flavor-matcha" aria-hidden="true"></div>


/* ======================================================
   PRODUCT PAGE — render detail + quantity calculator
   ====================================================== */
const productDetail = document.getElementById('productDetail');
if (productDetail) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    productDetail.innerHTML = `
      <div class="not-found reveal">
        <h1>We couldn't find that flavor.</h1>
        <p>It may have been renamed or removed. Take a look at the full lineup below.</p>
        <a href="#shop" class="btn btn-primary">See all flavors</a>
      </div>
    `;
  } else {
    document.title = `${product.name} — NUVY`;

    productDetail.innerHTML = `
      <div class="detail-visual reveal" aria-hidden="true">
        ${product.image2
          ? `<div class="product-swap detail-swap">
               <img src="${product.image}" alt="${product.name}" class="product-photo ball-xl">
               <img src="${product.image2}" alt="${product.name}" class="product-photo ball-xl swap-in">
             </div>
             <button type="button" class="swap-arrow swap-arrow-left" aria-label="Show first photo">&#8249;</button>
             <button type="button" class="swap-arrow swap-arrow-right" aria-label="Show second photo">&#8250;</button>
             <div class="swap-dots">
               <button type="button" class="swap-dot is-active" aria-label="Show first photo"></button>
               <button type="button" class="swap-dot" aria-label="Show second photo"></button>
             </div>`
          : product.image
            ? `<img src="${product.image}" alt="${product.name}" class="product-photo ball-xl" style="position:absolute; left:10%; top:5%;">`
            : `<div class="ball ball-xl ${product.flavor}" style="--x:18%; --y:8%;"></div>
               <div class="ball ball-md2 ${product.flavor}" style="--x:55%; --y:38%;"></div>
               <div class="ball ball-sm2 ${product.flavor}" style="--x:8%; --y:55%;"></div>`}
      </div>
      <div class="detail-info reveal">
        <p class="stamp-tag">${product.ingredients}</p>
        <h1>${product.name}</h1>
        <p class="detail-desc">${product.description}</p>
        <p class="unit-note">${product.unitNote}</p>

        <div class="qty-row">
          <span class="qty-label">Quantity</span>
          <div class="qty-control">
            <button type="button" id="qtyMinus" aria-label="Decrease quantity">−</button>
            <span id="qtyValue" aria-live="polite">1</span>
            <button type="button" id="qtyPlus" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <p class="price-line">
          <span id="unitPriceLabel">${product.price} DH</span> / box
        </p>
        <p class="total-line">Total: <strong id="totalPrice">${product.price} DH</strong></p>

        <a href="#" id="orderBtn" class="btn btn-primary btn-large" target="_blank" rel="noopener">Order on WhatsApp</a>
        <p class="order-note">You'll be taken to WhatsApp with your order pre-written. We'll reply with payment details.</p>

        <div class="delivery-select">
          <p class="delivery-label">Where are you ordering from?</p>
          <p class="delivery-error" id="deliveryError" style="display:none;">⚠ Please select where you're ordering from</p>
          <div class="delivery-options">
            <button type="button" class="delivery-option" id="deliveryMarrakech"> 
            
            <span class="free-shipping-badge">Free Shipping</span>

            Marrakech <span>0 DH</span>  </button>
            <button type="button" class="delivery-option" id="deliveryOther">Outside Marrakech <span>(+30 DH)</span></button>
          </div>
          <select id="citySelect" class="city-select" style="display:none;">
            <option value="">Select your city</option>
            <option value="Casablanca">Casablanca</option>
            <option value="Rabat">Rabat</option>
            <option value="Fès">Fès</option>
            <option value="Tanger">Tanger</option>
            <option value="Agadir">Agadir</option>
            <option value="Meknès">Meknès</option>
            <option value="Oujda">Oujda</option>
            <option value="Kénitra">Kénitra</option>
            <option value="Tétouan">Tétouan</option>
            <option value="Safi">Safi</option>
            <option value="Other">Other city</option>
          </select>
        </div>
      </div>

      <div class="product-extra">
        <details>
          <summary>Full ingredients</summary>
          <p>${product.fullIngredients}</p>
        </details>
        <details>
          <summary>Nutrition</summary>
          <p>${product.nutrition}</p>
        </details>
        <details>
          <summary>Allergens</summary>
          <p>${product.allergens}</p>
        </details>
        <details>
          <summary>Storage</summary>
          <p>${product.storage}</p>
        </details>
      </div>
    `;
    setupReveal(productDetail);

    const detailSwap = productDetail.querySelector('.detail-swap');
    if (detailSwap) {
      const leftArrow = productDetail.querySelector('.swap-arrow-left');
      const rightArrow = productDetail.querySelector('.swap-arrow-right');
      const dots = productDetail.querySelectorAll('.swap-dot');
      let swapShown = false;

      function setSwapShown(value) {
        swapShown = value;
        detailSwap.classList.toggle('is-active', swapShown);
        dots.forEach((dot, i) => dot.classList.toggle('is-active', (i === 1) === swapShown));
      }

      if (leftArrow) leftArrow.addEventListener('click', () => setSwapShown(false));
      if (rightArrow) rightArrow.addEventListener('click', () => setSwapShown(true));
      dots.forEach((dot, i) => dot.addEventListener('click', () => setSwapShown(i === 1)));
    }

    let qty = 1;
    const MIN_QTY = 1;
    const MAX_QTY = 20;
    let deliveryFee = 0;
    let deliveryLocation = '';

    const qtyValueEl = document.getElementById('qtyValue');
    const totalPriceEl = document.getElementById('totalPrice');
    const orderBtn = document.getElementById('orderBtn');
    const deliveryMarrakechBtn = document.getElementById('deliveryMarrakech');
    const deliveryOtherBtn = document.getElementById('deliveryOther');
    const citySelect = document.getElementById('citySelect');
    const deliveryErrorEl = document.getElementById('deliveryError');

    function refresh() {
      const total = qty * product.price + deliveryFee;
      qtyValueEl.textContent = qty;
      totalPriceEl.textContent = `${total} DH`;
      const message = buildOrderMessage(qty, product.name, product.price, total, deliveryLocation, deliveryFee);
      orderBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    document.getElementById('qtyMinus').addEventListener('click', () => {
      if (qty > MIN_QTY) { qty--; refresh(); }
    });
    document.getElementById('qtyPlus').addEventListener('click', () => {
      if (qty < MAX_QTY) { qty++; refresh(); }
    });

    deliveryMarrakechBtn.addEventListener('click', () => {
      deliveryFee = 0;
      deliveryLocation = 'Marrakech';
      deliveryMarrakechBtn.classList.add('is-active');
      deliveryOtherBtn.classList.remove('is-active');
      citySelect.style.display = 'none';
      citySelect.value = '';
      deliveryErrorEl.style.display = 'none';
      refresh();
    });

    deliveryOtherBtn.addEventListener('click', () => {
      deliveryFee = 30;
      deliveryLocation = citySelect.value || '';
      deliveryOtherBtn.classList.add('is-active');
      deliveryMarrakechBtn.classList.remove('is-active');
      citySelect.style.display = 'block';
      if (deliveryLocation) deliveryErrorEl.style.display = 'none';
      refresh();
    });

    citySelect.addEventListener('change', () => {
      deliveryLocation = citySelect.value;
      if (deliveryLocation) deliveryErrorEl.style.display = 'none';
      refresh();
    });

    orderBtn.addEventListener('click', (e) => {
      if (isPlaceholderNumber()) {
        e.preventDefault();
        showToast('Add your real WhatsApp number to WHATSAPP_NUMBER in script.js to enable ordering.');
        return;
      }
      if (!deliveryLocation) {
        e.preventDefault();
        deliveryErrorEl.style.display = 'block';
      }
    });

    refresh();
  }
}

/* Reveal for any static (non-JS-rendered) sections on the current page */
setupReveal(document);