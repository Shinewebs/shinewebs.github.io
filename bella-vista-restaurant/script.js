/* =========================================
   BELLA VISTA
   WEBSITE JAVASCRIPT
========================================= */


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


/* =========================================
   RESERVATION SYSTEM
========================================= */

const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");

let savedReservation = null;
let editButton = null;


/* Set today's date as the minimum date */

const dateInput = document.getElementById("date");

if (dateInput) {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;
}


/* Reservation form */

if (reservationForm && formMessage) {

    reservationForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* Collect reservation information */

        savedReservation = {
            name: document.getElementById("name")?.value || "",
            email: document.getElementById("email")?.value || "",
            date: document.getElementById("date")?.value || "",
            time: document.getElementById("time")?.value || "",
            guests: document.getElementById("guests")?.value || "",
            phone: document.getElementById("phone")?.value || "",
            request: document.getElementById("request")?.value || ""
        };


        /* Format the date nicely */

        let formattedDate = savedReservation.date;

        if (savedReservation.date) {
            const dateObject = new Date(
                savedReservation.date + "T00:00:00"
            );

            formattedDate = dateObject.toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );
        }


        /* Show confirmation */

        formMessage.innerHTML = `
            <div class="reservation-success">
                <div class="success-icon">✓</div>

                <div class="success-content">
                    <h3>Reservation Request Received! ✨</h3>

                    <p>
                        Thank you, <strong>${escapeHtml(savedReservation.name)}</strong>!
                        Your table request has been received.
                    </p>

                    <div class="reservation-summary">
                        <div>
                            <span>📅 Date</span>
                            <strong>${escapeHtml(formattedDate)}</strong>
                        </div>

                        <div>
                            <span>🕐 Time</span>
                            <strong>${escapeHtml(savedReservation.time)}</strong>
                        </div>

                        <div>
                            <span>👥 Guests</span>
                            <strong>${escapeHtml(savedReservation.guests)}</strong>
                        </div>
                    </div>

                    <p class="confirmation-note">
                        Our team will contact you to confirm your reservation.
                    </p>
                </div>
            </div>
        `;


        /* Create Edit button */

        if (!editButton) {

            editButton = document.createElement("button");

            editButton.id = "editReservation";

            editButton.className = "edit-reservation";

            editButton.type = "button";

            editButton.textContent = "✏️ Edit Reservation";


            formMessage.appendChild(editButton);


            /* Edit button */

            editButton.addEventListener("click", function () {

                restoreReservation();

            });

        }


        editButton.style.display = "inline-flex";


        /* Scroll to confirmation */

        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

}


/* =========================================
   RESTORE RESERVATION
========================================= */

function restoreReservation() {

    if (!savedReservation) return;


    /* Put saved information back into the form */

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const guestsInput = document.getElementById("guests");
    const phoneInput = document.getElementById("phone");
    const requestInput = document.getElementById("request");


    if (nameInput) nameInput.value = savedReservation.name;

    if (emailInput) emailInput.value = savedReservation.email;

    if (dateInput) dateInput.value = savedReservation.date;

    if (timeInput) timeInput.value = savedReservation.time;

    if (guestsInput) guestsInput.value = savedReservation.guests;

    if (phoneInput) phoneInput.value = savedReservation.phone;

    if (requestInput) requestInput.value = savedReservation.request;


    /* Remove confirmation message */

    formMessage.innerHTML = "";


    /* Hide edit button */

    if (editButton) {
        editButton.style.display = "none";
    }


    /* Scroll back to reservation form */

    reservationForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    /* Focus on name */

    setTimeout(() => {

        if (nameInput) {
            nameInput.focus();
        }

    }, 600);

}


/* =========================================
   SECURITY HELPER
========================================= */

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   SMOOTH NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");


        if (navLinks.classList.contains("active")) {

            menuToggle.textContent = "✕";

            menuToggle.setAttribute(
                "aria-label",
                "Close menu"
            );

        } else {

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

        }

    });


    document.querySelectorAll("#navLinks a").forEach((link) => {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

        });

    });

}


/* =========================================
   MENU FILTERS
========================================= */

const menuFilters = document.querySelectorAll(".menu-filter");
const menuCards = document.querySelectorAll(".menu-card");

menuFilters.forEach((filter) => {

    filter.addEventListener("click", function () {

        const category = this.dataset.category;


        /* Remove active state */

        menuFilters.forEach((button) => {
            button.classList.remove("active");
        });


        /* Activate selected filter */

        this.classList.add("active");


        /* Show matching menu cards */

        menuCards.forEach((card) => {

            const cardCategory = card.dataset.category;

            const matches =
                category === "all" ||
                cardCategory === category;


            if (matches) {

                card.style.display = "";

                setTimeout(() => {

                    card.classList.add("show");

                }, 20);

            } else {

                card.style.display = "none";

                card.classList.remove("show");

            }

        });

    });

});


/* =========================================
   BELLA AI
========================================= */

const aiButton = document.getElementById("aiButton");
const aiChat = document.getElementById("aiChat");
const aiClose = document.getElementById("aiClose");
const aiForm = document.getElementById("aiForm");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");
const aiSuggestions = document.querySelectorAll(".ai-suggestion");


/* Open AI */

if (aiButton && aiChat) {

    aiButton.addEventListener("click", function () {

        aiChat.classList.toggle("active");


        if (aiChat.classList.contains("active")) {

            setTimeout(() => {

                if (aiInput) {
                    aiInput.focus();
                }

            }, 200);

        }

    });

}


/* Close AI */

if (aiClose && aiChat) {

    aiClose.addEventListener("click", function () {

        aiChat.classList.remove("active");

    });

}


/* Add AI message */

function addAiMessage(message, type) {

    if (!aiMessages) return;


    const messageElement =
        document.createElement("div");


    messageElement.className =
        "ai-message " + type;


    messageElement.textContent = message;


    aiMessages.appendChild(messageElement);


    aiMessages.scrollTop =
        aiMessages.scrollHeight;

}


/* Bella AI responses */

function getBellaResponse(message) {

    const text = message.toLowerCase().trim();


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {
        return "👋 Hi! Welcome to Bella Vista Italian Kitchen! How can I help you today?";
    }


    if (
        text.includes("pizza") ||
        text.includes("pizzas")
    ) {
        return "🍕 We have Bella Vista Pizza for $16 and our Margherita Special for $15. Both are customer favorites!";
    }


    if (
        text.includes("pasta") ||
        text.includes("spaghetti") ||
        text.includes("alfredo")
    ) {
        return "🍝 Our pasta options are Truffle Pasta for $22 and Creamy Alfredo for $19.";
    }


    if (
        text.includes("starter") ||
        text.includes("bruschetta") ||
        text.includes("appetizer")
    ) {
        return "🥖 Our Classic Bruschetta is $9 and is a delicious way to start your meal!";
    }


    if (
        text.includes("salad") ||
        text.includes("healthy")
    ) {
        return "🥗 Our Italian Garden Salad is $13 and is a fresh choice from our menu.";
    }


    if (
        text.includes("dessert") ||
        text.includes("tiramisu") ||
        text.includes("sweet")
    ) {
        return "🍰 Our Signature Tiramisu is $10 — a perfect way to finish your meal!";
    }


    if (
        text.includes("drink") ||
        text.includes("lemonade") ||
        text.includes("beverage")
    ) {
        return "🍋 Our Italian Lemonade is $6 and is a refreshing choice with your meal.";
    }


    if (
        text.includes("vegetarian") ||
        text.includes("veggie")
    ) {
        return "🌿 Our demo menu includes vegetarian-friendly options such as Margherita Special, Italian Garden Salad, Classic Bruschetta and Creamy Alfredo.";
    }


    if (
        text.includes("price") ||
        text.includes("cost") ||
        text.includes("cheap") ||
        text.includes("how much")
    ) {
        return "💰 Our menu prices currently range from $6 to $22. Ask me about a specific dish and I'll tell you its price!";
    }


    if (
        text.includes("hour") ||
        text.includes("hours") ||
        text.includes("open") ||
        text.includes("close") ||
        text.includes("closing")
    ) {
        return "🕐 We're open Monday–Thursday from 11 AM–10 PM and Friday–Sunday from 11 AM–11 PM.";
    }


    if (
        text.includes("location") ||
        text.includes("where") ||
        text.includes("address") ||
        text.includes("located")
    ) {
        return "📍 We're located at 123 Bella Vista Avenue, New York, NY 10001.";
    }


    if (
        text.includes("reserve") ||
        text.includes("reservation") ||
        text.includes("book") ||
        text.includes("table")
    ) {
        return "📅 You can reserve a table using our Reserve a Table section on the website. Just enter your details and submit the form!";
    }


    if (
        text.includes("phone") ||
        text.includes("call") ||
        text.includes("contact") ||
        text.includes("number")
    ) {
        return "📞 You can contact Bella Vista at +1 (555) 234-5678.";
    }


    if (
        text.includes("menu") ||
        text.includes("food") ||
        text.includes("eat")
    ) {
        return "🍽️ We serve starters, pizza, pasta, salads, desserts and drinks. You can explore everything in our Menu section!";
    }


    if (
        text.includes("thank") ||
        text.includes("thanks")
    ) {
        return "😊 You're very welcome! Bella Vista is happy to help. Enjoy your meal! 🍝✨";
    }


    return "😊 I can help you with our menu, prices, opening hours, location, contact information or reservations. What would you like to know?";

}


/* Send AI message */

function sendAiMessage(message) {

    if (!message || !message.trim()) return;


    addAiMessage(message, "user");


    if (aiInput) {
        aiInput.value = "";
    }


    setTimeout(() => {

        const response =
            getBellaResponse(message);


        addAiMessage(
            response,
            "bot"
        );

    }, 400);

}


/* AI form */

if (aiForm && aiInput) {

    aiForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            sendAiMessage(
                aiInput.value
            );

        }
    );

}


/* AI suggestion buttons */

aiSuggestions.forEach((suggestion) => {

    suggestion.addEventListener(
        "click",
        function () {

            const question =
                this.textContent;

            sendAiMessage(question);

        }
    );

});