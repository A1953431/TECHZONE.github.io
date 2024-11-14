// Mostrar y ocultar el modal de inicio de sesión
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');

loginBtn.onclick = () => loginModal.style.display = 'block';
closeLogin.onclick = () => loginModal.style.display = 'none';

window.onclick = (event) => {
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }
};

// Manejo de formulario de compra como invitado
const guestForm = document.getElementById('guestForm');

guestForm.onsubmit = (e) => {
    e.preventDefault(); // Evita el envío del formulario

    // Validar si los términos y condiciones están aceptados
    const termsAccepted = document.getElementById('terms').checked;
    if (!termsAccepted) {
        alert('Debes aceptar los términos y condiciones para continuar.');
        return;
    }

    // Obtener los valores del formulario
    const guestName = document.getElementById('name').value;
    const guestEmail = document.getElementById('guestEmail').value;

    alert(`Gracias por iniciar sesion, ${guestName}. ¡Revisa tu correo electrónico (${guestEmail}) para más detalles!`);

    // Limpiar el formulario después de usarlo
    guestForm.reset();

    // Cerrar el modal de inicio de sesión después de completar la compra como invitado
    loginModal.style.display = 'none';
};

// Manejo del inicio de sesión
const loginForm = document.getElementById('loginForm');
const welcomeMessage = document.getElementById('welcomeMessage');

loginForm.onsubmit = (e) => {
    e.preventDefault(); // Evita el envío del formulario

    // Obtener el correo electrónico del usuario
    const email = document.getElementById('email').value;

    // Mostrar mensaje de bienvenida
    welcomeMessage.textContent = `¡Bienvenido de nuevo! ${email}`;
    welcomeMessage.style.display = 'block'; // Mostrar el mensaje

    // Limpiar el formulario después de usarlo
    loginForm.reset();

    // Cerrar el modal de inicio de sesión
    loginModal.style.display = 'none';
};

// Mostrar y ocultar el modal de carrito
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElem = document.getElementById('cartTotal');
const cartCountElem = document.getElementById('cartCount');

cartBtn.onclick = () => cartModal.style.display = 'block';
closeCart.onclick = () => cartModal.style.display = 'none';


// Manejo de búsqueda
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');
const productCards = document.querySelectorAll('.product-card');

searchButton.onclick = () => {
    const searchTerm = searchInput.value.toLowerCase();
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            card.style.display = 'block'; // Mostrar el producto
        } else {
            card.style.display = 'none'; // Ocultar el producto
        }
    });
};

// Mostrar y ocultar el modal de pago
const checkoutBtn = document.getElementById('checkoutBtn');
const paymentModal = document.getElementById('paymentModal');
const closePayment = document.getElementById('closePayment');
const paymentForm = document.getElementById('paymentForm');
const paymentMethod = document.getElementById('paymentMethod');
const cardDetails = document.getElementById('cardDetails');

checkoutBtn.onclick = () => {
    cartModal.style.display = 'none';
    paymentModal.style.display = 'block';
};

closePayment.onclick = () => paymentModal.style.display = 'none';

paymentMethod.onchange = () => {
    if (paymentMethod.value === 'debito' || paymentMethod.value === 'credito' || paymentMethod.value === 'amex') {
        cardDetails.style.display = 'block'; // Mostrar detalles de la tarjeta
    } else {
        cardDetails.style.display = 'none'; // Ocultar detalles de la tarjeta
    }
};

// Manejo del carrito de compras
let cart = [];
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = parseFloat(productCard.querySelector('.product-price').dataset.price);
        const productImage = productCard.querySelector('.product-image').src;

        // Obtener cantidad seleccionada
        const quantity = parseInt(productCard.querySelector('.quantity-input').value) || 1;

        // Comprobar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += quantity; // Incrementar la cantidad
        } else {
            const product = { name: productName, price: productPrice, image: productImage, quantity: quantity };
            cart.push(product);
        }
        updateCart();
    });
});

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;">
            <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
            <button class="remove-from-cart" data-index="${index}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
    });

    cartTotalElem.textContent = total.toFixed(2);
    cartCountElem.textContent = cart.length;

    // Agregar evento de eliminación a los botones
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1); // Eliminar producto del carrito
            updateCart(); // Actualizar vista del carrito
        });
    });
}

// Manejo del modal de detalles de producto
const productDetailsModal = document.getElementById('productDetailsModal');
const closeProductDetails = document.getElementById('closeProductDetails');
const productNameElem = document.getElementById('productName');
const productPriceElem = document.getElementById('productPrice');

document.querySelectorAll('.product-card').forEach(card => {
    card.querySelector('button.add-to-cart').onclick = () => {
        const productName = card.querySelector('.product-name').textContent;
        const productPrice = card.querySelector('.product-price').dataset.price;
        const productImage = card.querySelector('.product-image').src;

        productNameElem.textContent = productName;
        productPriceElem.textContent = `$${productPrice}`;
        document.getElementById('productImage').src = productImage;

        productDetailsModal.style.display = 'block';
    };
});

closeProductDetails.onclick = () => productDetailsModal.style.display = 'none';

// Opcional: Manejo del envío del formulario de pago
document.getElementById('paymentForm').onsubmit = (e) => {
    e.preventDefault();
    alert('Pago realizado. ¡Gracias por su compra!');
    cart = []; // Limpiar carrito después de pagar
    updateCart(); // Actualizar vista del carrito
    paymentModal.style.display = 'none'; // Cerrar modal de pago
    window.history.back(); // Regresar a la página anterior
};

// Mostrar u ocultar los detalles de la tarjeta según el método de pago
document.getElementById('paymentMethod').addEventListener('change', function() {
    const cardDetails = document.getElementById('cardDetails');
    const selectedMethod = this.value;

    if (selectedMethod === 'debito' || selectedMethod === 'credito' || selectedMethod === 'amex') {
        cardDetails.style.display = 'block'; // Mostrar detalles de la tarjeta
    } else {
        cardDetails.style.display = 'none'; // Ocultar detalles de la tarjeta
    }
});

// Manejo del botón "Regresar"
document.getElementById('goBackBtn').onclick = () => {
    document.getElementById('paymentModal').style.display = 'none';
    document.getElementById('cartModal').style.display = 'block'; // Regresar al carrito
};

// Manejo del cierre del modal de pago
document.getElementById('closePayment').onclick = () => {
    document.getElementById('paymentModal').style.display = 'none';
};

// Opcional: Manejo del envío del formulario de pago
document.getElementById('paymentForm').onsubmit = (e) => {
    e.preventDefault();
    alert('Pago realizado. ¡Gracias por su compra!');

    // Obtener los datos del cliente del formulario de pago
    const fullName = document.getElementById('fullName').value;
    const shippingEmail = document.getElementById('shippingEmail').value;
    const shippingAddress = document.getElementById('shippingAddress').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    // Generar la factura PDF después del pago exitoso
    generateInvoicePDF(fullName, shippingEmail, shippingAddress, paymentMethod);

    cart = []; // Limpiar carrito después de pagar
    updateCart(); // Actualizar vista del carrito
    paymentModal.style.display = 'none'; // Cerrar modal de pago
    window.history.back(); // Regresar a la página anterior
};

// Función para generar la factura PDF
function generateInvoicePDF(fullName, shippingEmail, shippingAddress, paymentMethod) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Detalles de los productos
    const items = cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
    }));

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    // Crear el contenido del PDF
    doc.setFontSize(20);
    doc.text("Factura de Compra", 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Cliente: ${fullName}`, 14, 30);
    doc.text(`Correo: ${shippingEmail}`, 14, 40);
    doc.text(`Dirección: ${shippingAddress}`, 14, 50);
    doc.text(`Método de pago: ${paymentMethod}`, 14, 60);

    let y = 70; // Inicializamos la posición vertical para los productos
    items.forEach(item => {
        doc.text(`${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`, 14, y);
        y += 10;
    });

    doc.text(`Total: $${total}`, 14, y + 10);

    // Guardar el PDF
    doc.save('factura.pdf');
}
