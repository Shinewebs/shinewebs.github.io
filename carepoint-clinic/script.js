/* =========================================================
   CAREPOINT CLINIC — JAVASCRIPT
========================================================= */


/* =========================
   MOBILE MENU
========================= */

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("active");

        if (nav.classList.contains("active")) {
            menuButton.textContent = "✕";
        } else {
            menuButton.textContent = "☰";
        }

    });


    // Close menu when clicking a navigation link

    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuButton.textContent = "☰";

        });

    });

}


/* =========================
   HEADER SCROLL EFFECT
========================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================
   APPOINTMENT DATE
========================= */

const dateInput = document.getElementById("date");

if (dateInput) {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    dateInput.min = formattedDate;

}


/* =========================
   APPOINTMENT FORM
========================= */

const appointmentForm =
    document.getElementById("appointmentForm");

if (appointmentForm) {

    appointmentForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();


        if (!name) {

            alert("Please enter your name.");

            return;

        }


        alert(
            `Thank you, ${name}! Your appointment request has been received. This is a demo website, so no real appointment has been booked.`
        );


        appointmentForm.reset();


        // Restore today's minimum date after reset

        if (dateInput) {

            const today = new Date();

            const year = today.getFullYear();

            const month =
                String(today.getMonth() + 1).padStart(2, "0");

            const day =
                String(today.getDate()).padStart(2, "0");

            dateInput.min =
                `${year}-${month}-${day}`;

        }

    });

}


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
    ".service-card, .doctor-card, .review-card, .contact-card, .about-content, .about-image, .appointment-content, .appointment-form-wrapper"
);


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const observer = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================
   CURRENT YEAR
========================= */

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================
   SMOOTH ANCHOR SCROLL
========================= */

const allAnchorLinks =
    document.querySelectorAll('a[href^="#"]');


allAnchorLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (
            targetId &&
            targetId !== "#"
        ) {

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const headerHeight =
                    header ? header.offsetHeight : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }

        }

    });

});


/* =========================
   PAGE LOADED
========================= */

console.log(
    "CarePoint Clinic website loaded successfully! ✚"
);