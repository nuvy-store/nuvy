/* ======================================================
   SETTINGS — edit these two things to make the site yours
   ====================================================== */

// Your WhatsApp number, country code first, no + no spaces no dashes.
// Example for a Moroccan number 06 12 34 56 78 -> '212612345678'
const WHATSAPP_NUMBER = '212675535823';

// The message sent to you on WhatsApp when someone orders.
// {qty}, {name}, {unitPrice} and {total} get filled in automatically.
function buildOrderMessage(qty, name, unitPrice, total) {
  return `Hello NUVY ,
I would like to place the following order:

Flavor: ${name}
Quantity: ${qty}
Price per box: ${unitPrice} DH
===================================
*Total: ${total} DH*

Please confirm and share payment details. Thank you.`;
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
    name: 'Coconut Almond Crunch x10',
    flavor: 'flavor-coconut',
    image: 'images/coconut-almond.png',
    ingredients: 'coconut · dates · almonds',
    tagline: 'Rich almonds rolled in toasted coconut, sweetened only with dates.',
    description: 'A coconut base rolled in toasted almond pieces, sweetened only with dates — no refined sugar, no fillers.',
    unitNote: 'Each box holds about 10 hand-rolled bites.',
    fullIngredients: 'Dates, coconut flakes, almonds, a pinch of sea salt.',
    nutrition: 'Approx. 140 kcal · 5g protein · 9g sugar (from dates only) per bite.',
    allergens: 'Contains tree nuts (almonds). Made in a kitchen that also handles peanuts, pistachios and walnuts.',
    storage: 'Store in a cool, dry place. Keeps fresh up to 2 weeks at room temperature, or a month refrigerated.',
    price: 89
  },
  {
    id: 'peanut-power',
    name: 'Peanut Butter Power x10',
    flavor: 'flavor-peanut',
    image: null,
    ingredients: 'oats · peanut butter · maple',
    tagline: 'Creamy peanut butter and rolled oats, a touch of maple syrup.',
    description: 'Rolled oats and real peanut butter for a snack that actually keeps you full, lightly sweetened with maple syrup.',
    unitNote: 'Each box holds about 10 hand-rolled bites.',
    fullIngredients: 'Rolled oats, peanut butter, maple syrup, a pinch of sea salt.',
    nutrition: 'Approx. 150 kcal · 6g protein · 7g sugar per bite.',
    allergens: 'Contains peanuts. Made in a kitchen that also handles tree nuts.',
    storage: 'Store in a cool, dry place. Keeps fresh up to 2 weeks at room temperature, or a month refrigerated.',
    price: 89
  },
  {
    id: 'coconut-lime',
    name: 'Coconut Lime Refresher x10',
    flavor: 'flavor-coconut',
    image: null,
    ingredients: 'coconut · cashew · lime',
    tagline: 'Bright lime zest and toasted coconut over a creamy cashew base.',
    description: 'A lighter, brighter bite — toasted coconut and creamy cashew lifted with fresh lime zest.',
    unitNote: 'Each box holds about 10 hand-rolled bites.',
    fullIngredients: 'Cashews, dates, desiccated coconut, fresh lime zest.',
    nutrition: 'Approx. 135 kcal · 4g protein · 8g sugar (from dates only) per bite.',
    allergens: 'Contains tree nuts (cashews). Made in a kitchen that also handles peanuts.',
    storage: 'Store in a cool, dry place. Keeps fresh up to 2 weeks at room temperature, or a month refrigerated.',
    price: 89
  },
  {
    id: 'chai-walnut',
    name: 'Spiced Chai Walnut x10',
    flavor: 'flavor-chai',
    image: null,
    ingredients: 'walnut · chai spice · dates',
    tagline: 'Warm cinnamon and cardamom rolled into toasted walnut.',
    description: 'Toasted walnut warmed up with real chai spices — cinnamon, cardamom and a hint of clove.',
    unitNote: 'Each box holds about 10 hand-rolled bites.',
    fullIngredients: 'Dates, walnuts, cinnamon, cardamom, clove.',
    nutrition: 'Approx. 150 kcal · 4g protein · 9g sugar (from dates only) per bite.',
    allergens: 'Contains tree nuts (walnuts). Made in a kitchen that also handles almonds and pistachios.',
    storage: 'Store in a cool, dry place. Keeps fresh up to 2 weeks at room temperature, or a month refrigerated.',
    price: 89
  },
  {
    id: 'espresso-almond',
    name: 'Espresso Almond Boost x10',
    flavor: 'flavor-espresso',
    image: null,
    ingredients: 'espresso · almond · cacao',
    tagline: 'A real coffee kick paired with almond and dark cacao.',
    description: 'A genuine coffee kick from real espresso, balanced with almond and dark cacao — built for early mornings.',
    unitNote: 'Each box holds about 10 hand-rolled bites.',
    fullIngredients: 'Dates, almonds, raw cacao powder, finely ground espresso.',
    nutrition: 'Approx. 145 kcal · 5g protein · 9g sugar (from dates only) per bite. Contains caffeine.',
    allergens: 'Contains tree nuts (almonds). Made in a kitchen that also handles peanuts and walnuts.',
    storage: 'Store in a cool, dry place. Keeps fresh up to 2 weeks at room temperature, or a month refrigerated.',
    price: 99
  }
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
        <span class="price">${p.price} DH</span>
        <a href="product.html?id=${p.id}" class="btn btn-buy">Buy now</a>
      </div>
    </article>
  `).join('');
  setupReveal(productGrid);
}

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
        ${product.image
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
      </div>
    `;
    setupReveal(productDetail);

    let qty = 1;
    const MIN_QTY = 1;
    const MAX_QTY = 20;

    const qtyValueEl = document.getElementById('qtyValue');
    const totalPriceEl = document.getElementById('totalPrice');
    const orderBtn = document.getElementById('orderBtn');

    function refresh() {
      const total = qty * product.price;
      qtyValueEl.textContent = qty;
      totalPriceEl.textContent = `${total} DH`;
      const message = buildOrderMessage(qty, product.name, product.price, total);
      orderBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    document.getElementById('qtyMinus').addEventListener('click', () => {
      if (qty > MIN_QTY) { qty--; refresh(); }
    });
    document.getElementById('qtyPlus').addEventListener('click', () => {
      if (qty < MAX_QTY) { qty++; refresh(); }
    });

    orderBtn.addEventListener('click', (e) => {
      if (isPlaceholderNumber()) {
        e.preventDefault();
        showToast('Add your real WhatsApp number to WHATSAPP_NUMBER in script.js to enable ordering.');
      }
    });

    refresh();
  }
}

/* Reveal for any static (non-JS-rendered) sections on the current page */
setupReveal(document);
