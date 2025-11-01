// DOM Elements
const languageSelector = document.getElementById('language-selector');
const sidebar = document.querySelector('.sidebar');
const navItems = document.querySelectorAll('.nav-item');
const addProductButton = document.querySelector('.action-button');
const viewAllOrdersButton = document.querySelectorAll('.action-button')[1];
const actionIcons = document.querySelectorAll('.action-icons i');
const closeModalButton = document.querySelector('.close-modal');
const helpModal = document.getElementById('voice-command-help');
const searchInput = document.querySelector('.search-container input');

// Translations
const translations = {
  'en-US': {
    'nav.dashboard': 'Dashboard',
    'nav.orders': 'Orders',
    'nav.customers': 'Customers',
    'nav.help': 'Help',
    'search.placeholder': 'Search products, orders, customers...',
    'stats.totalSales': 'Total Sales',
    'stats.activeOrders': 'Active Orders',
    'stats.products': 'Products',
    'stats.customers': 'Customers',
    'products.title': 'My Products',
    'products.addNew': 'Add Product',
    'products.table.product': 'Product',
    'products.table.category': 'Category',
    'products.table.price': 'Price',
    'products.table.stock': 'Stock',
    'products.table.actions': 'Actions',
    'orders.title': 'Recent Orders',
    'orders.viewAll': 'View All',
    'voiceHelp.title': 'Voice Commands',
    'voiceHelp.navigation': 'Navigation Commands',
    'voiceHelp.products': 'Product Commands',
    'voiceHelp.orders': 'Order Commands',
    'voiceHelp.general': 'General Commands'
  },
  'hi-IN': {
    'nav.dashboard': 'डैशबोर्ड',
    'nav.orders': 'ऑर्डर',
    'nav.customers': 'ग्राहक',
    'nav.help': 'सहायता',
    'search.placeholder': 'उत्पाद, ऑर्डर, ग्राहक खोजें...',
    'stats.totalSales': 'कुल बिक्री',
    'stats.activeOrders': 'सक्रिय ऑर्डर',
    'stats.products': 'उत्पाद',
    'stats.customers': 'ग्राहक',
    'products.title': 'मेरे उत्पाद',
    'products.addNew': 'उत्पाद जोड़ें',
    'products.table.product': 'उत्पाद',
    'products.table.category': 'श्रेणी',
    'products.table.price': 'कीमत',
    'products.table.stock': 'स्टॉक',
    'products.table.actions': 'क्रियाएँ',
    'orders.title': 'हाल के ऑर्डर',
    'orders.viewAll': 'सभी देखें',
    'voiceHelp.title': 'आवाज़ कमांड',
    'voiceHelp.navigation': 'नेविगेशन कमांड',
    'voiceHelp.products': 'उत्पाद कमांड',
    'voiceHelp.orders': 'ऑर्डर कमांड',
    'voiceHelp.general': 'सामान्य कमांड'
  }
};

// Products data store
let products = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    category: 'Vegetables',
    price: '₹40/kg',
    stock: { status: 'in-stock', amount: '120kg' },
    image: '/api/placeholder/40/40'
  },
  {
    id: 2,
    name: 'Basmati Rice',
    category: 'Grains',
    price: '₹90/kg',
    stock: { status: 'low-stock', amount: '25kg' },
    image: '/api/placeholder/40/40'
  },
  {
    id: 3,
    name: 'Alphonso Mangoes',
    category: 'Fruits',
    price: '₹350/dozen',
    stock: { status: 'out-of-stock', amount: '0' },
    image: '/api/placeholder/40/40'
  },
  {
    id: 4,
    name: 'Wild Honey',
    category: 'Other',
    price: '₹450/liter',
    stock: { status: 'in-stock', amount: '15L' },
    image: '/api/placeholder/40/40'
  }
];

// Orders data store
let orders = [
  {
    id: 'ORD-2854',
    customer: 'Meera Patel',
    date: 'Today, 14:30',
    price: '₹1,250',
    status: 'pending'
  },
  {
    id: 'ORD-2853',
    customer: 'Fresh Mart Store',
    date: 'Today, 10:15',
    price: '₹8,500',
    status: 'shipped'
  },
  {
    id: 'ORD-2852',
    customer: 'Raj Kumar',
    date: 'Yesterday, 16:45',
    price: '₹750',
    status: 'delivered'
  },
  {
    id: 'ORD-2851',
    customer: 'Green Grocery',
    date: 'Yesterday, 09:20',
    price: '₹5,280',
    status: 'delivered'
  }
];

// Apply language based on selected option
function applyLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Handle placeholders separately
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
}

// Initialize language
languageSelector.addEventListener('change', () => {
  applyLanguage(languageSelector.value);
});

// Initialize sidebar navigation
navItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove active class from all items
    navItems.forEach(nav => nav.classList.remove('active'));
    // Add active class to clicked item
    item.classList.add('active');
    
    // Handle help menu item specifically
    if (item.getAttribute('data-i18n') === 'nav.help') {
      helpModal.classList.add('visible');
    }
  });
});

// Handle modal close button
closeModalButton.addEventListener('click', () => {
  helpModal.classList.remove('visible');
});

// Close modal when clicking outside
helpModal.addEventListener('click', (e) => {
  if (e.target === helpModal) {
    helpModal.classList.remove('visible');
  }
});

// Handle add product button
addProductButton.addEventListener('click', () => {
  showProductForm();
});

// Handle view all orders button
viewAllOrdersButton.addEventListener('click', () => {
  showAllOrders();
});

// Handle product actions (edit, delete)
actionIcons.forEach(icon => {
  icon.addEventListener('click', (e) => {
    const action = e.target.classList.contains('fa-edit') ? 'edit' : 'delete';
    const productRow = e.target.closest('tr');
    const productName = productRow.querySelector('.product-name span').textContent;
    const productId = products.findIndex(p => p.name === productName);
    
    if (action === 'edit') {
      editProduct(productId);
    } else {
      deleteProduct(productId, productRow);
    }
  });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  filterProducts(searchTerm);
  filterOrders(searchTerm);
});

// Functions for product operations
function showProductForm(product = null) {
  // Create modal for adding/editing product
  const modal = document.createElement('div');
  modal.className = 'help-modal visible';
  
  const isEdit = product !== null;
  const title = isEdit ? 'Edit Product' : 'Add New Product';
  const submitText = isEdit ? 'Update Product' : 'Add Product';
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div style="padding: 20px;">
        <form id="product-form">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Product Name</label>
            <input type="text" id="product-name" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" 
              value="${isEdit ? product.name : ''}">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Category</label>
            <select id="product-category" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              <option value="Vegetables" ${isEdit && product.category === 'Vegetables' ? 'selected' : ''}>Vegetables</option>
              <option value="Fruits" ${isEdit && product.category === 'Fruits' ? 'selected' : ''}>Fruits</option>
              <option value="Grains" ${isEdit && product.category === 'Grains' ? 'selected' : ''}>Grains</option>
              <option value="Other" ${isEdit && product.category === 'Other' ? 'selected' : ''}>Other</option>
            </select>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Price</label>
            <input type="text" id="product-price" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" 
              value="${isEdit ? product.price : ''}">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Stock Status</label>
            <select id="product-stock-status" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
              <option value="in-stock" ${isEdit && product.stock.status === 'in-stock' ? 'selected' : ''}>In Stock</option>
              <option value="low-stock" ${isEdit && product.stock.status === 'low-stock' ? 'selected' : ''}>Low Stock</option>
              <option value="out-of-stock" ${isEdit && product.stock.status === 'out-of-stock' ? 'selected' : ''}>Out of Stock</option>
            </select>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Stock Amount</label>
            <input type="text" id="product-stock-amount" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" 
              value="${isEdit ? product.stock.amount : ''}">
          </div>
          <button type="submit" class="action-button" style="width: 100%;">${submitText}</button>
        </form>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Handle close button
  modal.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // Handle form submission
  const form = modal.querySelector('#product-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: isEdit ? product.id : products.length + 1,
      name: document.getElementById('product-name').value,
      category: document.getElementById('product-category').value,
      price: document.getElementById('product-price').value,
      stock: {
        status: document.getElementById('product-stock-status').value,
        amount: document.getElementById('product-stock-amount').value
      },
      image: '/api/placeholder/40/40'
    };
    
    if (isEdit) {
      // Update existing product
      products[product.id] = newProduct;
      updateProductTable();
    } else {
      // Add new product
      products.push(newProduct);
      addProductToTable(newProduct);
    }
    
    // Close modal
    document.body.removeChild(modal);
  });
}

function editProduct(productId) {
  showProductForm(products[productId]);
}

function deleteProduct(productId, productRow) {
  // Confirm deletion
  const confirmDelete = confirm(`Are you sure you want to delete ${products[productId].name}?`);
  
  if (confirmDelete) {
    // Remove from array
    products.splice(productId, 1);
    
    // Remove from table
    productRow.remove();
  }
}

function addProductToTable(product) {
  const productsTable = document.querySelector('.products-table tbody');
  
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>
      <div class="product-name">
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <span>${product.name}</span>
      </div>
    </td>
    <td>${product.category}</td>
    <td>${product.price}</td>
    <td><span class="stock-status ${product.stock.status}">${getStockStatusText(product.stock)}</span></td>
    <td>
      <div class="action-icons">
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash-alt"></i>
      </div>
    </td>
  `;
  
  productsTable.appendChild(newRow);
  
  // Add event listeners to new action icons
  const newActionIcons = newRow.querySelectorAll('.action-icons i');
  newActionIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      const action = e.target.classList.contains('fa-edit') ? 'edit' : 'delete';
      const productRow = e.target.closest('tr');
      const productName = productRow.querySelector('.product-name span').textContent;
      const productId = products.findIndex(p => p.name === productName);
      
      if (action === 'edit') {
        editProduct(productId);
      } else {
        deleteProduct(productId, productRow);
      }
    });
  });
}

function updateProductTable() {
  const rows = document.querySelectorAll('.products-table tbody tr');
  
  for (let i = 0; i < rows.length; i++) {
    const product = products[i];
    if (product) {
      rows[i].innerHTML = `
        <td>
          <div class="product-name">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <span>${product.name}</span>
          </div>
        </td>
        <td>${product.category}</td>
        <td>${product.price}</td>
        <td><span class="stock-status ${product.stock.status}">${getStockStatusText(product.stock)}</span></td>
        <td>
          <div class="action-icons">
            <i class="fas fa-edit"></i>
            <i class="fas fa-trash-alt"></i>
          </div>
        </td>
      `;
    }
  }
  
  // Reattach event listeners
  const allActionIcons = document.querySelectorAll('.action-icons i');
  allActionIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      const action = e.target.classList.contains('fa-edit') ? 'edit' : 'delete';
      const productRow = e.target.closest('tr');
      const productName = productRow.querySelector('.product-name span').textContent;
      const productId = products.findIndex(p => p.name === productName);
      
      if (action === 'edit') {
        editProduct(productId);
      } else {
        deleteProduct(productId, productRow);
      }
    });
  });
}

function getStockStatusText(stock) {
  switch(stock.status) {
    case 'in-stock':
      return `In Stock (${stock.amount})`;
    case 'low-stock':
      return `Low Stock (${stock.amount})`;
    case 'out-of-stock':
      return 'Out of Stock';
    default:
      return '';
  }
}

function showAllOrders() {
  // Create modal for showing all orders
  const modal = document.createElement('div');
  modal.className = 'help-modal visible';
  
  let ordersHTML = '';
  
  orders.forEach(order => {
    ordersHTML += `
      <div class="order-item">
        <div class="order-info">
          <div class="order-id">${order.id}</div>
          <div>
            <div class="customer-name">${order.customer}</div>
            <div class="order-date">${order.date}</div>
          </div>
        </div>
        <div class="order-price">${order.price}</div>
        <div class="order-status status-${order.status}">${capitalizeFirstLetter(order.status)}</div>
      </div>
    `;
  });
  
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">All Orders</h2>
        <button class="close-modal">&times;</button>
      </div>
      <div style="padding: 20px;">
        <div class="orders-list">
          ${ordersHTML}
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Handle close button
  modal.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

function filterProducts(searchTerm) {
  const rows = document.querySelectorAll('.products-table tbody tr');
  
  rows.forEach(row => {
    const productName = row.querySelector('.product-name span').textContent.toLowerCase();
    const category = row.querySelectorAll('td')[1].textContent.toLowerCase();
    
    if (productName.includes(searchTerm) || category.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function filterOrders(searchTerm) {
  const orderItems = document.querySelectorAll('.orders-list .order-item');
  
  orderItems.forEach(item => {
    const orderId = item.querySelector('.order-id').textContent.toLowerCase();
    const customerName = item.querySelector('.customer-name').textContent.toLowerCase();
    
    if (orderId.includes(searchTerm) || customerName.includes(searchTerm)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Menu toggle for mobile responsiveness
let menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
document.body.appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(languageSelector.value);
});