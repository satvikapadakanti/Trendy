const products = [
    { id: 1, name: "Men's Casual Shirt", price: 29.99 * 83.5, category: "men", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c", description: "Comfortable cotton shirt for everyday wear.", sizes: ["S", "M", "L", "XL"] },
    { id: 2, name: "Women's Summer Dress", price: 49.99 * 83.5, category: "women", image: "https://www.pexels.com/photo/western-dress-2024-shoot-by-dhanno-19281495/", description: "Light and breezy dress for summer.", sizes: ["S", "M", "L"] },
    { id: 3, name: "Men's Sneakers", price: 59.99 * 83.5, category: "men", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", description: "Stylish and durable sneakers.", sizes: ["8", "9", "10", "11"] },
    { id: 4, name: "Women's Handbag", price: 39.99 * 83.5, category: "women", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3", description: "Elegant handbag for all occasions.", sizes: ["One Size"] }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
    if (sectionId === 'products') displayProducts();
    if (sectionId === 'cart') displayCart();
    if (sectionId === 'admin') displayOrders();
    if (sectionId === 'product-detail') displayProductDetails();
    if (sectionId === 'home') displayFeaturedProducts();
}

function displayFeaturedProducts() {
    const carousel = document.getElementById('featured-carousel');
    carousel.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price.toFixed(2)}</p>
            <button onclick="showProductDetail(${product.id})">View Details</button>
        `;
        carousel.appendChild(productCard);
    });
}

function displayProducts(filter = 'all') {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="showProductDetail(${product.id})">View Details</button>
        `;
        productGrid.appendChild(productCard);
    });
}

function showProductDetail(id) {
    const product = products.find(p => p.id === id);
    const productDetail = document.getElementById('product-detail');
    productDetail.innerHTML = `
        <div class="product-detail">
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h2>${product.name}</h2>
                <p>₹${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <div class="size-selector">
                    <label for="size">Size:</label>
                    <select id="size">
                        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                    </select>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
    showSection('product-detail');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });
    updateCartCount();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    orders.push({ id: orders.length + 1, items: cart, date: new Date() });
    localStorage.setItem('orders', JSON.stringify(orders));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Order placed successfully!');
    showSection('home');
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin123') {
        alert('Admin login successful!');
        showSection('admin');
    } else if (username && password) {
        alert('Login successful!');
        showSection('home');
    } else {
        alert('Invalid credentials');
    }
}

function register() {
    const username = document.getElementById('username-reg').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password-reg').value;
    if (username && email && password) {
        alert('Registration successful! Please login.');
        showSection('login');
    } else {
        alert('Please fill all fields');
    }
}

function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;
    const image = document.getElementById('product-image').value;
    const description = document.getElementById('product-description').value;
    const sizes = document.getElementById('product-sizes').value.split(',').map(s => s.trim());

    if (name && price && category && image && description && sizes.length) {
        products.push({ id: products.length + 1, name, price, category, image, description, sizes });
        alert('Product added successfully!');
        document.querySelector('.admin-form').reset();
        displayProducts();
        displayFeaturedProducts();
    } else {
        alert('Please fill all fields');
    }
}

function displayOrders() {
    const ordersTable = document.getElementById('orders-table');
    ordersTable.innerHTML = '';
    orders.forEach(order => {
        const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</td>
            <td>₹${total.toFixed(2)}</td>
        `;
        ordersTable.appendChild(row);
    });
}

document.getElementById('category-filter').addEventListener('change', (e) => {
    displayProducts(e.target.value);
});

showSection('home');
updateCartCount();
displayFeaturedProducts();