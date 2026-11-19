// --- Logika Login, Daftar Akun & Klaim Voucher ---
let currentUser = null;
let activeVoucher = null;

// Daftar Kode Voucher Valid
const validVouchers = {
    "WELCOME10": { discountPercent: 10, label: "Diskon 10% Pengguna Baru" },
    "GLOW15": { discountPercent: 15, label: "Diskon Spesial 15%" },
    "CANTIK20": { discountPercent: 20, label: "Diskon VIP 20%" }
};

// Buka Modal Login / Akun
function openAuthModal() {
    if (currentUser) {
        const confirmLogout = confirm(`Halo, ${currentUser.name}!\nVoucher aktif: ${activeVoucher ? activeVoucher.code + ' (' + activeVoucher.label + ')' : 'Belum ada'}\n\nApakah Anda ingin keluar (Logout)?`);
        if (confirmLogout) {
            currentUser = null;
            activeVoucher = null;
            updateCartUI();
            showToast("Anda berhasil keluar dari akun.");
        }
        return;
    }
    document.getElementById('authOverlay').classList.add('active');
    document.getElementById('authModal').classList.add('active');
    switchAuthMode('login');
}

// Tutup Modal Login
function closeAuthModal() {
    document.getElementById('authOverlay').classList.remove('active');
    document.getElementById('authModal').classList.remove('active');
}

// Beralih antara Mode Login & Create Account
function switchAuthMode(mode) {
    const loginView = document.getElementById('loginView');
    const signupView = document.getElementById('signupView');
    const backBtn = document.getElementById('authBackBtn');

    if (mode === 'signup') {
        loginView.style.display = 'none';
        signupView.style.display = 'block';
        backBtn.style.display = 'flex';
    } else {
        loginView.style.display = 'block';
        signupView.style.display = 'none';
        backBtn.style.display = 'none';
    }
}

// Validasi & Klaim Voucher
function applyVoucherCode(codeInput) {
    const cleanCode = codeInput.trim().toUpperCase();
    if (!cleanCode) return null;

    if (validVouchers[cleanCode]) {
        activeVoucher = {
            code: cleanCode,
            ...validVouchers[cleanCode]
        };
        return `Voucher ${cleanCode} aktif (${activeVoucher.label})!`;
    } else {
        return `Kode voucher "${cleanCode}" tidak valid, tetap masuk tanpa voucher.`;
    }
}

// Proses Submit Login
function handleLogin(event) {
    event.preventDefault();
    const identity = document.getElementById('loginIdentity').value;
    const voucherCode = document.getElementById('loginVoucher').value;

    currentUser = { name: identity };
    const voucherMsg = applyVoucherCode(voucherCode);

    closeAuthModal();
    updateCartUI();
    document.getElementById('loginForm').reset();

    if (voucherMsg) {
        showToast(`Selamat datang! ${voucherMsg}`);
    } else {
        showToast(`Selamat datang kembali, ${identity}! ♡`);
    }
}

// Proses Submit Daftar Akun Baru
function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const voucherCode = document.getElementById('signupVoucher').value;

    currentUser = { name: name };
    const voucherMsg = applyVoucherCode(voucherCode);

    closeAuthModal();
    updateCartUI();
    document.getElementById('signupForm').reset();

    if (voucherMsg) {
        showToast(`Akun dibuat! ${voucherMsg}`);
    } else {
        showToast(`Akun berhasil dibuat! Halo, ${name} ♡`);
    }
}

// Login Cepat via Sosial Media
function socialLogin(provider) {
    currentUser = { name: `Pengguna ${provider}` };
    closeAuthModal();
    showToast(`Berhasil masuk menggunakan ${provider}!`);
}

// Menghubungkan tombol ikon User di Navbar agar membuka Modal Login
const userNavBtn = document.querySelector('.nav-icons button[title="Akun Saya"]');
if (userNavBtn) {
    userNavBtn.addEventListener('click', openAuthModal);
}

// Memperbarui kalkulasi total keranjang agar otomatis memotong diskon voucher jika aktif
const originalUpdateCartUI = updateCartUI;
updateCartUI = function () {
    originalUpdateCartUI();
    if (activeVoucher && cart.length > 0) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = subtotal * (activeVoucher.discountPercent / 100);
        const finalTotal = subtotal - discountAmount;
        cartTotal.innerHTML = `<span style="text-decoration:line-through; color:#999; font-size:0.85rem; margin-right:6px;">${formatRupiah(subtotal)}</span> ${formatRupiah(finalTotal)}`;
    }
};
// --- Basis Data Produk ---
const backsound = document.getElementById("backsound");

// Atur volume agar tidak terlalu kencang mengagetkan (0.1 sampai 1.0)
backsound.volume = 0.4;

// Coba putar otomatis saat web terbuka
window.addEventListener("load", () => {
  backsound.play().catch(() => {
    // Jika browser memblokir autoplay, putar lagu saat user pertama kali klik/sentuh layar
    const startAudio = () => {
      backsound.play();
      // Hapus event listener setelah lagu berhasil diputar
      document.removeEventListener("click", startAudio);
      document.removeEventListener("touchstart", startAudio);
    };

    document.addEventListener("click", startAudio);
    document.addEventListener("touchstart", startAudio);
  });
});

const products = [
 
   {
        id: 1,
        name: "Cute Bow & Heart Press On Nails (24Pcs)",
        category: "nails",
        price: 80000,
        oldPrice: 100000,
        discount: "-20%",
        image: "img/Produk13.jpeg"
    },
    {
        id: 2,
        name: "Korean Hair Care",
        category: "Hair care",
        price: 425000,
        oldPrice: 500000,
        discount: "-15%",
        image: "img/Produk15.jpeg"
    },
    {
        id: 3,
        name: "Brightening Lips Serum",
        category: "skincare",
        price: 41000 ,
        oldPrice: 50000,
        discount: "-18%",
        image: "img/produk6.jpeg"
    },
    {
        id: 4,
        name: "Glow cushion Hexzo",
        category: "makeup",
        price: 957000,
        oldPrice: 110000,
        discount: "-13%",
        image: "img/cusion3.jpeg"
    },
    {
        id: 5,
        name: "Brings Serum 70%",
        category: "skincare",
        price: 48600,
        oldPrice: 60000,
        discount: "-19%",
        image: "img/produk3.jpeg"
    },
    {
        id: 6,
        name: "Bundling Brightening Body Lotion",
        category: "Body Care",
        price: 66400,
        oldPrice: 80000,
        discount: "-17%",
        image: "img/bodylotion.jpeg"
    }
];

// Data Keranjang Belanja
let cart = [];

// Elemen DOM
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartBadge = document.getElementById('cartBadge');
const cartTotal = document.getElementById('cartTotal');
const cartCountHeader = document.getElementById('cartCountHeader');
const toast = document.getElementById('toast');

// --- Fungsi-fungsi ---

// Format Mata Uang ke Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
}

// Menampilkan Produk ke Layar
function renderProducts(itemsToRender = products) {
    productsGrid.innerHTML = '';
    itemsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <span class="badge-discount">${product.discount}</span>
            <div class="product-img-box">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3 class="product-title">${product.name}</h3>
            <div class="price-row">
                <span class="price-current">${formatRupiah(product.price)}</span>
                <span class="price-old">${formatRupiah(product.oldPrice)}</span>
            </div>
            <button class="btn-add-cart" onclick="addToCart(${product.id})">
                <i class="fa-solid fa-cart-shopping"></i> Tambah ke Keranjang
            </button>
        `;
        productsGrid.appendChild(card);
    });
}

// Filter Produk Berdasarkan Kategori
function filterCategory(cat) {
    if (cat === 'all') {
        renderProducts(products);
    } else {
        const filtered = products.filter(p => p.category === cat);
        renderProducts(filtered);
    }
    document.getElementById('bestsellers').scrollIntoView({ behavior: 'smooth' });
}

// Menambahkan Item ke Keranjang Belanja
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`${product.name} berhasil ditambahkan!`);
}

// Menghapus Item dari Keranjang
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Memperbarui Tampilan Keranjang Belanja
function updateCartUI() {
    // Menghitung Jumlah Item Keranjang
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalCount;
    cartCountHeader.textContent = totalCount;

    // Menampilkan Item Keranjang
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align:center; color:#888; margin-top:40px;">Keranjang belanja Anda masih kosong.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${formatRupiah(item.price)} x ${item.quantity}</div>
                </div>
                <button class="cart-remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            cartItems.appendChild(itemElement);
        });
    }

    // Menhitung Total Harga Belanja
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = formatRupiah(totalPrice);
}

// Menampilkan Notifikasi Singkat (Toast)
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Buka dan Tutup Panel Keranjang Belanja
function openCart() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Fungsi Simulasi Pembayaran (Checkout)
function checkout() {
    if (cart.length === 0) {
        alert("Keranjang belanja Anda kosong!");
        return;
    }
    alert("Terima kasih! Pesanan Anda sedang diproses.");
    cart = [];
    updateCartUI();
    closeCart();
}

// --- Database Lengkap Semua Produk GlowNest ---
const allCatalogProducts = [
    {
        id: 101,
        name: "Perfect Glow Cushion",
        category: "makeup",
        price: 120200,
        desc: "cushion yang finish nya Glow dan ringan cocok untuk di pakai sehari hari karena sangat ringan",
        image: "img/cusion4.jpeg"
    },
    {
        id: 102,
        name: "Serum Brightening",
        category: "skincare",
        price: 55000,
        desc: " serum mencerakhan mengandung niacenemade 7% bisa menghilangkan bekas jerawat",
        image: "img/serum.jpeg"
    },
    {
        id: 103,
        name: "Serum Facial Wash",
        category: "skincare",
        price: 45000,
        desc: "facial wash dengan kandungan serum mencerahkan , menggandung niacenemade",
        image: "img/1.jpeg"
    },
    {
        id: 104,
        name: "Sleep Mask",
        category: "skincare",
        price: 95700,
        desc: "Masker yang bisa di bawa tidur untuk melembapkan dan mencerahkan kulit",
        image: "img/2.jpeg"
    },
    {
        id: 105,
        name: "Nails Art",
        category: "Nails Art",
        price: 40000,
        desc: "Kuku palsu dengan desainn macan tutul berwarna pink",
        image: "img/art3.jpeg"
    },
    {
        id: 106,
        name: "Paket Hemat Body Care Dove",
        category: "Body Care",
        price: 500000,
        desc: " satu paket Body care",
        image: "img/body1.jpeg"
    },
    {
        id: 107,
        name: "Cream Blash",
        category: "makeup",
        price: 52000,
        desc: " Blash dengan tekstur cream yang mudah di blandS",
        image: "img/produk4.jpeg"
    },
    {
        id: 108,
        name: "Micelar Water",
        category: "skincare",
        price: 38000,
        desc: "untuk doble clensing sebelum menggunakan facial wash",
        image: "img/produk2.jpeg"
    },
     {
        id: 109,
        name: "Lip Tint",
        category: "makeup",
        price: 19000,
        desc: "lip tint dengan tekstur wateri yang ringan dan warnanya cantik cantik ",
        image: "img/produk1.jpeg"
    },
    {
        id: 110,
        name: "Paket Hair Care",
        category: "Hair Care",
        price: 425000,
        desc: "paket lengkap hair cake gratis sisir",
        image: "img/Produk15.jpeg"
    },
    {
        id: 111,
        name: " Tripel Makeup Set",
        category: "makeup",
        price: 225000,
        desc: "isi cushion, blash on, lip tint, gratis jepitan rambut",
        image: "img/produk7.jpeg"
    },
    {
        id: 112,
        name: "Nails Art Bunga Sakura",
        category: "Nails Art",
        price: 48000,
        desc: "warna soft Pink kalem dengan motif bunga sakura  ",
        image: "img/art1.jpeg"
    },
    {
        id: 113,
        name: "Simple Nails Art",
        category: "Nails Art",
        price: 25000,
        desc: "desain elegan cocok untuk dipake sehari hari dengan warna pink coklat dengan motif gold ",
        image: "img/art2.jpeg"
    },
    {
        id: 114,
        name: "Sunscreen OMG",
        category: "skincare",
        price: 29000,
        desc: "melindungi kulit dari paparan sinar uva dan uvb",
        image: "img/3.jpeg"
    },

    {
        id: 115,
        name: "Moistruezer Glad2Glow",
        category: "skincare",
        price: 40000,
        desc: " mencerahkan dan melembabkan kulit ",
        image: "img/4.jpeg"
    },
    {
        id: 116,
        name: "Serum SKIN1004",
        category: "skincare",
        price: 110000,
        desc: " Serum wajah dengan kandungan Centella Asiatica murni untuk menenangkan kulit kemerahan, merawat skin barrier, dan melembapkan kulit sensitif. ",
        image: "img/5.jpeg"
    },

    {
        id: 117,
        name: "Sunscreen Skintific",
        category: "skincare",
        price: 70000,
        desc: " Tabir surya bertekstur ringan dengan perlindungan tinggi terhadap sinar UVA/UVB serta kandungan ceramide untuk menjaga kelembapan kulit.",
        image: "img/6.jpeg"
    },

    {
        id: 118,
        name: "Serum Aeskin",
        category: "skincare",
        price: 36000,
        desc: " Serum perawatan kulit harian untuk menutrisi wajah agar tampak lebih cerah, halus, dan terhidrasi sepanjang hari.",
        image: "img/7.jpeg"
    },

    {
        id: 119,
        name: "Simple Nails art",
        category: "Nails Art",
        price: 25000,
        desc: "desain elegan cocok untuk dipake sehari hari dengan warna pink coklat dengan motif gold ",
        image: "img/art4.jpeg"
    },

    {
        id: 120,
        name: "Simple Nails art",
        category: "Nails Art",
        price: 25000,
        desc: "desain elegan cocok untuk dipake sehari hari dengan warna pink coklat dengan motif gold ",
        image: "img/art5.jpeg"
    },

    {
        id: 121,
        name: "Bodylations Vasselin",
        category: "Body Care",
        price: 33000,
        desc: "Losion tubuh yang menutrisi dan mengunci kelembapan kulit kering agar terasa halus dan sehat terawat.",
        image: "img/body.jpeg"
    },

    {
        id: 122,
        name: "Bodylations Biodance",
        category: "Body Care",
        price: 30000,
        desc: "Losion perawatan tubuh bertekstur lembut yang cepat meresap untuk menjaga elastisitas dan kelembutan kulit.",
        image: "img/body2.jpeg"
    },

    {
        id: 123,
        name: "Bodylations Jhonshon",
        category: "Body Care",
        price: 27000,
        desc: "Losion lembut dengan aroma menenangkan untuk melembapkan kulit tubuh dan aman digunakan setiap hari.",
        image: "img/body3.jpeg"
    },
    
    {
        id: 124,
        name: "Bodylations Glad2glow",
        category: "Body Care",
        price: 35000,
        desc: "Losion tubuh dengan kandungan pencerah untuk membantu meratakan warna kulit dan menjaganya tetap lembap.  ",
        image: "img/bodylotion.jpeg"
    },

    {
        id: 125,
        name: "Cushion Matte Glad2Glow",
        category: "Makeup",
        price: 105000,
        desc: "Cushion dengan hasil akhir matte yang halus, tahan lama, dan mampu menutup noda di wajah tanpa terasa berat.",
        image: "img/cusion1.jpeg"
    },

    {
        id: 126,
        name: "Cushion Yijun PCK",
        category: "Makeup",
        price: 60000,
        desc: "Cushion ringan dengan daya tutup merata untuk tampilan wajah segar dan natural sepanjang hari.  ",
        image: "img/cusion2.jpeg"
    },

    {
        id: 127,
        name: "Cushion Hexzo",
        category: "Makeup",
        price: 55000,
        desc: "Alas bedak praktis berbentuk cushion yang mudah dibaurkan untuk meratakan warna kulit dengan hasil alami.",
        image: "img/cusion3.jpeg"
    },

    {
        id: 128,
        name: "Lip Cream M&O",
        category: "Makeup",
        price: 21000,
        desc: " Lip cream bertekstur lembut dengan pigmentasi tinggi yang nyaman di bibir dan tidak mudah luntur.",
        image: "img/produk.jpeg"
    },

    {
        id: 129,
        name: "Micellar Water Garnier",
        category: "skincare",
        price: 28000,
        desc: "Pembersih wajah tanpa bilas yang efektif mengangkat makeup, kotoran, dan minyak berlebih dalam sekali usap. ",
        image: "img/produk3.jpeg"
    },

    {
        id: 130,
        name: "Day Cream Glad2Glow",
        category: "skincare",
        price: 45000,
        desc: "Krim pagi bertekstur ringan yang melembapkan sekaligus membantu mencerahkan kulit kusam sebelum beraktivitas.",
        image: "img/produk5.jpeg"
    },

    {
        id: 131,
        name: "Lip Serum Glad2Glow",
        category: "skincare",
        price: 70000,
        desc: "Serum bibir untuk melembapkan bibir kering dan pecah-pecah sekaligus mengembalikan warna cerah alami bibir.",
        image: "img/produk6.jpeg"
    },

    {
        id: 132,
        name: "Lip Serum Rare Beauty",
        category: "makeup",
        price: 30000,
        desc: "Perawatan bibir bernutrisi tinggi yang membuat bibir terasa lembut, kenyal, dan tampak sehat berkilau.",
        image: "img/produk8.jpeg"
    },

    {
        id: 133,
        name: "Lip Gloss Dior",
        category: "makeup",
        price: 700000,
        desc: "Lip gloss mewah yang memberikan efek bibir penuh, lembap, dan kilau elegan tanpa rasa lengket.",
        image: "img/produk10.jpeg"
    },
    
    {
        id: 134,
        name: "Satu Set Make-up Kylie",
        category: "makeup",
        price: 120000,
        desc: "Paket lengkap riasan wajah dalam satu set untuk menciptakan tampilan makeup natural hingga glamor.",
        image: "img/produk11.jpeg"
    },

    {
        id: 135,
        name: "Bodylations FirstKiss",
        category: "Body care",
        price: 34000,
        desc: " Losion tubuh wangi menyegarkan yang melembutkan kulit sekaligus memberikan keharuman tahan lama.",
        image: "img/produk12.jpeg"
    },

    {
        id: 136,
        name: "Simple Nails art",
        category: "Nails Art",
        price: 25000,
        desc: "desain elegan cocok untuk dipake sehari hari dengan warna pink coklat dengan motif gold ",
        image: "img/Produk13.jpeg"
    },

    {
        id: 137,
        name: "Satu Set Skincare SKIN1004",
        category: "skincare",
        price: 956000,
        desc: "Paket lengkap perawatan wajah berisi pembersih, toner, ampoule, dan krim untuk menenangkan serta memperbaiki skin barrier secara menyeluruh.",
        image: "img/Produk14.jpeg"
    },

    {
        id: 138,
        name: "Lip Stik Dior",
        category: "makeup",
        price: 670000,
        desc: "Lipstik ikonik dengan warna intens yang tahan lama dan diperkaya bahan pelembap agar bibir tetap halus.",
        image: "img/produk19.jpeg"
    },

    {
        id: 139,
        name: "Setting Spray Dazzelme",
        category: "makeup",
        price: 40000,
        desc: "Semprotan pengunci makeup agar riasan menempel sempurna, bebas kilap, dan tahan lama seharian.",
        image: "img/setingsprey.jpeg"
    },

    {
        id: 140,
        name: "Satu Set Skincare KNNT",
        category: "skincare",
        price: 25000,
        desc: "desain elegan cocok untuk dipake sehari hari dengan warna pink coklat dengan motif goldPaket hemat perawatan kulit harian praktis untuk membersihkan, melembapkan, dan menjaga kesegaran kulit wajah.",
        image: "img/skincare1.jpeg"
    },
    
    
];

let currentCatalogCategory = 'all';
let showAllItems = false;

// Render Katalog Semua Produk
function renderAllProducts() {
    const grid = document.getElementById('allProductsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const searchKeyword = document.getElementById('productSearchInput')?.value.toLowerCase() || '';

    if (!grid) return;

    // Filter berdasarkan kategori dan kata kunci pencarian
    let filtered = allCatalogProducts.filter(item => {
        const matchCategory = currentCatalogCategory === 'all' || item.category === currentCatalogCategory;
        const matchSearch = item.name.toLowerCase().includes(searchKeyword) || item.desc.toLowerCase().includes(searchKeyword);
        return matchCategory && matchSearch;
    });

    // Batasi 6 produk awal jika belum klik "Jelajahi Lebih Banyak"
    const itemsToDisplay = showAllItems ? filtered : filtered.slice(0, 6);

    grid.innerHTML = '';

    if (itemsToDisplay.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#888; padding:30px;">Produk yang Anda cari tidak ditemukan.</p>`;
    } else {
        itemsToDisplay.forEach(item => {
            const card = document.createElement('div');
            card.className = 'editorial-card';
            card.innerHTML = `
                <div class="editorial-img-wrap">
                    <span class="editorial-cat-badge">${item.category}</span>
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="editorial-info">
                    <div>
                        <h3 class="editorial-title">${item.name}</h3>
                        <p class="editorial-desc">${item.desc}</p>
                    </div>
                    <div class="editorial-bottom">
                        <span class="editorial-price">${formatRupiah(item.price)}</span>
                        <button class="btn-shop-pill" onclick="addCatalogItemToCart(${item.id})">
                            Tambahkan Ke Keranjang 
                        </button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Atur visibilitas tombol "Jelajahi Lebih Banyak"
    if (loadMoreBtn) {
        if (filtered.length <= 6) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.innerHTML = showAllItems
                ? 'Tampilkan Lebih Sedikit <i class="fa-solid fa-chevron-up"></i>'
                : 'Jelajahi Lebih Banyak <i class="fa-solid fa-chevron-down"></i>';
        }
    }
}

// Filter Tab Kategori pada Katalog
function filterAllCatalog(category, btnElement) {
    currentCatalogCategory = category;
    showAllItems = false;

    document.querySelectorAll('.filter-tab').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    renderAllProducts();
}

// Pencarian Langsung (Live Search)
function searchAllProducts() {
    renderAllProducts();
}

// Toggle Lihat Semua / Lebih Sedikit
function toggleShowAllProducts() {
    showAllItems = !showAllItems;
    renderAllProducts();
}

// Tambahkan Produk dari Katalog ke Keranjang Belanja
function addCatalogItemToCart(productId) {
    const product = allCatalogProducts.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    if (typeof showToast === 'function') {
        showToast(`${product.name} ditambahkan ke keranjang!`);
    }
}

// Jalankan Render Awal Katalog
renderAllProducts();


// --- Data Awal Ulasan Pelanggan ---
let reviews = [
    {
        id: 1,
        name: "Lusi oktafia",
        role: "Pembeli Terverifikasi",
        rating: 5,
        text: "Kualitas press-on nails nya bagus banget! Tahan lama dan warnanya persis seperti di foto. Pengiriman juga super cepat!",
        avatar: "img/lusi.jpeg"
    },
    {
        id: 2,
        name: "Elsa Imut",
        role: "Pembeli Terverifikasi",
        rating: 5,
        text: "Suka banget sama lip gloss nya, lembut di bibir dan gak bikin kering. Paketnya juga dikemas rapi dan estetik banget ♡",
        avatar: "img/elsa.jpeg"
    },
    {
        id: 3,
        name: "Anis Winda Wati",
        role: "Pembeli Terverifikasi",
        rating: 4,
        text: "makeup nya bagus banget sesuai sama yang di foto dan pengirimannya juga cepat best banget",
        avatar: "img/anis.jpeg"
    }
];

let selectedRating = 5;

// Render Daftar Ulasan Pelanggan
function renderReviews() {
    const reviewsGrid = document.getElementById('reviewsGrid');
    if (!reviewsGrid) return;

    reviewsGrid.innerHTML = '';
    reviews.forEach(review => {
        // Membuat Bintang Rating
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                starsHtml += '<i class="fa-solid fa-star"></i> ';
            } else {
                starsHtml += '<i class="fa-regular fa-star"></i> ';
            }
        }

        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div>
                <div class="review-header">
                    <img src="${review.avatar}" alt="${review.name}" class="reviewer-avatar">
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <span>${review.role}</span>
                    </div>
                </div>
                <div class="review-stars">
                    ${starsHtml}
                </div>
                <div class="review-body">
                    <p class="review-text">${review.text}</p>
                </div>
            </div>
            <div class="verified-badge">
                <i class="fa-solid fa-circle-check"></i> Pembelian Terverifikasi
            </div>
        `;
        reviewsGrid.appendChild(card);
    });
}

// Buka/Tutup Form Review
function toggleReviewForm() {
    const wrapper = document.getElementById('reviewFormWrapper');
    const btn = document.getElementById('toggleReviewFormBtn');
    
    wrapper.classList.toggle('open');
    if (wrapper.classList.contains('open')) {
        btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Batal';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-pen"></i> Tulis Ulasan';
    }
}

// Fitur Pemilihan Bintang Rating
document.querySelectorAll('.star-btn').forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = parseInt(this.getAttribute('data-value'));
        document.querySelectorAll('.star-btn').forEach(s => {
            const val = parseInt(s.getAttribute('data-value'));
            if (val <= selectedRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
});

// Fungsi Submit Form Review Baru
function submitReview(event) {
    event.preventDefault();
    const nameInput = document.getElementById('reviewerName').value;
    const textInput = document.getElementById('reviewerText').value;

    // Avatar default untuk reviewer baru
    const randomAvatar = `img/PP.jpg`;

    const newReview = {
        id: Date.now(),
        name: nameInput,
        role: "Pembeli Terverifikasi",
        rating: selectedRating,
        text: textInput,
        avatar: randomAvatar
    };

    reviews.unshift(newReview); // Tambahkan ke urutan paling awal
    renderReviews();

    // Reset Form
    document.getElementById('reviewForm').reset();
    toggleReviewForm();
    
    // Tampilkan Notifikasi
    if (typeof showToast === 'function') {
        showToast("Terima kasih! Ulasan Anda telah diterbitkan.");
    }
    // --- Logika Halaman Checkout & Alamat Pengiriman ---

// Membuka Bagian Checkout saat tombol di keranjang diklik
checkout = function () {
    if (cart.length === 0) {
        alert("Keranjang belanja Anda masih kosong! Silakan pilih produk terlebih dahulu.");
        return;
    }

    closeCart(); // Tutup laci keranjang samping
    const checkoutSec = document.getElementById('checkoutSection');
    if (checkoutSec) {
        checkoutSec.style.display = 'block';
        renderCheckoutSummary();
        checkoutSec.scrollIntoView({ behavior: 'smooth' });
    }
};

// Menutup Bagian Checkout
function closeCheckoutSection() {
    const checkoutSec = document.getElementById('checkoutSection');
    if (checkoutSec) {
        checkoutSec.style.display = 'none';
    }
}

// Menampilkan Daftar Item & Kalkulasi Harga di Kolom Kanan Checkout
function renderCheckoutSummary() {
    const orderList = document.getElementById('checkoutOrderList');
    const subtotalEl = document.getElementById('chkSubtotal');
    const extrasEl = document.getElementById('chkExtras');
    const grandTotalEl = document.getElementById('chkGrandTotal');
    const voucherLine = document.getElementById('chkVoucherLine');
    const discountEl = document.getElementById('chkDiscount');
    const hasGreetingCard = document.getElementById('chkGreetingCard')?.checked;

    if (!orderList) return;

    // Render item keranjang
    orderList.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'chk-order-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="chk-order-details">
                <h4>${item.name}</h4>
                <p>Jumlah: <strong>${item.quantity} pcs</strong></p>
                <p>Harga: ${formatRupiah(item.price * item.quantity)}</p>
            </div>
        `;
        orderList.appendChild(div);
    });

    // Hitung Subtotal, Voucher, Kartu Ucapan, dan Total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const extraFee = hasGreetingCard ? 15000 : 0;

    let discountAmount = 0;
    if (typeof activeVoucher !== 'undefined' && activeVoucher) {
        discountAmount = subtotal * (activeVoucher.discountPercent / 100);
        voucherLine.style.display = 'flex';
        discountEl.textContent = `- ${formatRupiah(discountAmount)}`;
    } else {
        voucherLine.style.display = 'none';
    }

    const grandTotal = subtotal - discountAmount + extraFee;

    subtotalEl.textContent = formatRupiah(subtotal);
    extrasEl.textContent = formatRupiah(extraFee);
    grandTotalEl.textContent = formatRupiah(grandTotal);
}

// Memproses Pesanan Setelah Alamat & Pembayaran Diisi
function processFinalOrder(event) {
    event.preventDefault();

    const firstName = document.getElementById('chkFirstName').value;
    const lastName = document.getElementById('chkLastName').value;
    const address1 = document.getElementById('chkAddress1').value;
    const city = document.getElementById('chkCity').value;
    const postalCode = document.getElementById('chkPostalCode').value;
    const shipDate = document.getElementById('chkDate').value;
    const shipTime = document.getElementById('chkTime').value;

    alert(
        `Terima kasih, ${firstName} ${lastName}! ♡\n\n` +
        `Pesanan Anda berhasil dibuat dan akan dikirim ke:\n` +
        `${address1}, ${city} (${postalCode})\n` +
        `Jadwal Pengiriman: ${shipDate} - ${shipTime}`
    );

    // Kosongkan keranjang dan reset form
    cart = [];
    updateCartUI();
    document.getElementById('checkoutForm').reset();
    closeCheckoutSection();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
}

// Jalankan fungsi render awal
renderReviews();
// Pengait Event (Event Listeners)
cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Menampilkan Produk Pertama Kali Saat Halaman Dimuat
renderProducts();