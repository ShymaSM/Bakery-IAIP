/* =========================================================
   RAMEEM BAKERY
   Main JavaScript
========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    /* ================= MOBILE NAVIGATION ================= */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navbar.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });


    /* Close mobile menu after clicking navigation */

    document.querySelectorAll(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });


    /* ================= ACTIVE NAVIGATION ================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    });


    /* ================= CART ================= */

    let cart = [];

    const cartButton = document.getElementById("cartButton");
    const cartModal = document.getElementById("cartModal");
    const closeCart = document.getElementById("closeCart");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const checkoutBtn = document.getElementById("checkoutBtn");


    function openCart() {

        cartModal.classList.add("active");
        document.body.style.overflow = "hidden";

    }


    function closeCartModal() {

        cartModal.classList.remove("active");
        document.body.style.overflow = "";

    }


    cartButton.addEventListener("click", openCart);

    closeCart.addEventListener("click", closeCartModal);

    cartOverlay.addEventListener("click", closeCartModal);


    /* Add products */

    const addCartButtons = document.querySelectorAll(".add-cart");

    addCartButtons.forEach(button => {

        button.addEventListener("click", () => {

            const productName = button.dataset.product;
            const productPrice = Number(button.dataset.price);

            const existingProduct = cart.find(
                item => item.name === productName
            );

            if (existingProduct) {

                existingProduct.quantity += 1;

            } else {

                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });

            }

            updateCart();

            showToast(`${productName} added to cart`);

        });

    });


    function updateCart() {

        cartItems.innerHTML = "";

        if (cart.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <p>Your cart is empty.</p>
                </div>
            `;

            cartCount.textContent = "0";
            cartTotal.textContent = "₹0";

            return;

        }


        let totalItems = 0;
        let totalPrice = 0;


        cart.forEach((item, index) => {

            totalItems += item.quantity;

            totalPrice += item.price * item.quantity;


            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `
                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>
                        ₹${item.price} × ${item.quantity}
                    </p>

                </div>

                <strong>
                    ₹${item.price * item.quantity}
                </strong>

                <button
                    class="remove-item"
                    data-index="${index}"
                    aria-label="Remove item">

                    <i class="fa-solid fa-trash"></i>

                </button>
            `;

            cartItems.appendChild(cartItem);

        });


        cartCount.textContent = totalItems;

        cartTotal.textContent = `₹${totalPrice}`;


        /* Remove item */

        document.querySelectorAll(".remove-item").forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                cart.splice(index, 1);

                updateCart();

            });

        });

    }


    /* Order button */

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your cart is empty");

            return;

        }

        showToast("Thank you! Your order request is ready.");

        setTimeout(() => {

            closeCartModal();

        }, 1500);

    });


    /* ================= WISHLIST ================= */

    const wishlistButtons = document.querySelectorAll(".wishlist");

    wishlistButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("liked");

            const icon = button.querySelector("i");

            if (button.classList.contains("liked")) {

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                showToast("Added to favorites");

            } else {

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

            }

        });

    });


    /* ================= FEEDBACK ================= */

    const feedbackForm = document.getElementById("feedbackForm");
    const reviewsArea = document.getElementById("reviewsArea");


    feedbackForm.addEventListener("submit", event => {

        event.preventDefault();


        const customerName =
            document.getElementById("customerName").value.trim();

        const customerFeedback =
            document.getElementById("customerFeedback").value.trim();


        if (!customerName || !customerFeedback) {

            showToast("Please fill in both fields");

            return;

        }


        /* Create first letter avatar */

        const avatar =
            customerName.charAt(0).toUpperCase();


        /* Create review card */

        const reviewCard = document.createElement("div");

        reviewCard.className = "review-card";


        reviewCard.innerHTML = `

            <div class="review-top">

                <div class="review-avatar">
                    ${escapeHTML(avatar)}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(customerName)}
                    </strong>

                    <div class="rating">

                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>

                    </div>

                </div>

            </div>

            <p>
                “${escapeHTML(customerFeedback)}”
            </p>

        `;


        /* Add new feedback to the beginning */

        reviewsArea.prepend(reviewCard);


        /* Clear form */

        feedbackForm.reset();


        showToast("Thank you for your feedback!");

    });


    /* Protect user-generated feedback from HTML injection */

    function escapeHTML(value) {

        const div = document.createElement("div");

        div.textContent = value;

        return div.innerHTML;

    }


    /* ================= TOAST ================= */

    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    let toastTimer;


    function showToast(message) {

        toastMessage.textContent = message;

        toast.classList.add("show");


        clearTimeout(toastTimer);


        toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }


    /* ================= ESC KEY ================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeCartModal();

            navbar.classList.remove("active");

        }

    });


});