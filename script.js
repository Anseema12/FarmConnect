const products = [
    { id: 1, name: "Organic Strawberries", price: 4.99, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?crop=w300&fit=crop" },
    { id: 2, name: "Fresh Spinach", price: 3.49, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?crop=w300&fit=crop" },
    { id: 3, name: "Free-Range Eggs", price: 5.99, image: "https://images.unsplash.com/photo-1551292831-023188e78222?crop=w300&fit=crop" },
    { id: 4, name: "Organic Milk", price: 4.29, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?crop=w300&fit=crop" },
];

let cart = [];

document.getElementById('startShoppingBtn').addEventListener('click', () => {
    document.getElementById('shop').classList.remove('hidden');
    renderProducts();
});

function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto;">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    alert(`${product.name} has been added to your cart!`);
    showCart();
}

function showCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        cartItems.appendChild(cartItem);
    });

    cartModal.classList.remove('hidden');
}

document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartModal').classList.add('hidden');
});
// Inside your form submission event handler, replace the redirect part
if (isValid) {
    // Store user data (in a real app, this would be sent to a server)
    const userData = {
        role: userRoleInput.value,
        fullName: fullName.value,
        email: email.value,
        contact: contact.value,
        username: username.value,
        password: password.value
    };
    
    // Save to localStorage (for demo purposes)
    const users = JSON.parse(localStorage.getItem('farmConnectUsers') || '[]');
    users.push(userData);
    localStorage.setItem('farmConnectUsers', JSON.stringify(users));
    
    // Also save current user to session
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    alert('Registration successful!');
    
    // Redirect based on role
    if (userData.role === 'farmer') {
        window.location.href = 'consumer-dashboard.html'; // Change this to your farmer dashboard URL
    } else {
        window.location.href = 'login.html';
    }
}