/* =========================================================
   LUNA & OAK CAFÉ
   PREMIUM WEBSITE JAVASCRIPT
========================================================= */


/* =========================================================
   1. ELEMENTS
========================================================= */

const navbar = document.getElementById("navbar");

const mobileMenu = document.getElementById("mobileMenu");

const navLinks = document.getElementById("navLinks");

const navReserveButton =
    document.getElementById("navReserveButton");

const heroMenuButton =
    document.getElementById("heroMenuButton");

const heroStoryButton =
    document.getElementById("heroStoryButton");

const storyButton =
    document.getElementById("storyButton");

const fullMenuButton =
    document.getElementById("fullMenuButton");

const featureReserveButton =
    document.getElementById("featureReserveButton");

const reservationForm =
    document.getElementById("reservationForm");

const reservationDate =
    document.getElementById("reservationDate");

const reservationMessageBox =
    document.getElementById("reservationMessageBox");

const menuModal =
    document.getElementById("menuModal");

const closeMenuModal =
    document.getElementById("closeMenuModal");

const successModal =
    document.getElementById("successModal");

const closeSuccessModal =
    document.getElementById("closeSuccessModal");


/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */

if (mobileMenu && navLinks) {

    mobileMenu.addEventListener("click", function () {

        const isOpen =
            navLinks.classList.toggle("active");

        mobileMenu.classList.toggle(
            "active",
            isOpen
        );

        mobileMenu.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });

}


/* =========================================================
   CLOSE MOBILE NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll(".nav-links a");


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks) {

            navLinks.classList.remove("active");

        }

        if (mobileMenu) {

            mobileMenu.classList.remove("active");

            mobileMenu.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

});


/* =========================================================
   3. SMOOTH SCROLL
========================================================= */

function scrollToSection(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (!section) {
        return;
    }

    section.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* =========================================================
   4. HERO — MENU
========================================================= */

if (heroMenuButton) {

    heroMenuButton.addEventListener(
        "click",
        function () {

            scrollToSection("menu");

        }
    );

}


/* =========================================================
   5. HERO — STORY
========================================================= */

if (heroStoryButton) {

    heroStoryButton.addEventListener(
        "click",
        function () {

            scrollToSection("story");

        }
    );

}


/* =========================================================
   6. STORY BUTTON
========================================================= */

if (storyButton) {

    storyButton.addEventListener(
        "click",
        function () {

            scrollToSection("gallery");

        }
    );

}


/* =========================================================
   7. RESERVATION NAVIGATION
========================================================= */

function openReservationSection() {

    scrollToSection("reservation");

}


if (navReserveButton) {

    navReserveButton.addEventListener(
        "click",
        function () {

            openReservationSection();

        }
    );

}


if (featureReserveButton) {

    featureReserveButton.addEventListener(
        "click",
        function () {

            openReservationSection();

        }
    );

}


/* =========================================================
   8. FULL MENU MODAL
========================================================= */

function openMenuModal() {

    if (!menuModal) {
        return;
    }

    menuModal.classList.add("active");

    menuModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeMenuModalFunction() {

    if (!menuModal) {
        return;
    }

    menuModal.classList.remove("active");

    menuModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


if (fullMenuButton) {

    fullMenuButton.addEventListener(
        "click",
        function () {

            openMenuModal();

        }
    );

}


if (closeMenuModal) {

    closeMenuModal.addEventListener(
        "click",
        function () {

            closeMenuModalFunction();

        }
    );

}


if (menuModal) {

    menuModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "modal-backdrop"
                )
            ) {

                closeMenuModalFunction();

            }

        }
    );

}


/* =========================================================
   9. RESERVATION DATE
========================================================= */

function setMinimumReservationDate() {

    if (!reservationDate) {
        return;
    }

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    reservationDate.min = today;

}


setMinimumReservationDate();


/* =========================================================
   10. RESERVATION FORM
========================================================= */

if (reservationForm) {

    reservationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* Validate browser fields */

            if (!reservationForm.checkValidity()) {

                reservationForm.reportValidity();

                return;

            }


            /* Clear previous message */

            if (reservationMessageBox) {

                reservationMessageBox.textContent = "";

            }


            /* Get values */

            const guestName =
                document
                    .getElementById("guestName")
                    .value
                    .trim();

            const guestPhone =
                document
                    .getElementById("guestPhone")
                    .value
                    .trim();

            const date =
                document
                    .getElementById("reservationDate")
                    .value;

            const time =
                document
                    .getElementById("reservationTime")
                    .value;

            const guests =
                document
                    .getElementById("guestCount")
                    .value;


            /* Phone validation */

            const phonePattern =
                /^[0-9+\-\s()]{7,20}$/;


            if (!phonePattern.test(guestPhone)) {

                if (reservationMessageBox) {

                    reservationMessageBox.textContent =
                        "Please enter a valid phone number.";

                }

                return;

            }


            /* Create confirmation */

            const confirmationText =
                `Thank you, ${guestName}.

Your reservation request for ${guests}
on ${date} at ${time} has been received.

Our team will contact you at
${guestPhone} to confirm your table.`;


            /* Show success modal */

            openSuccessModal(
                confirmationText
            );


            /* Reset form */

            reservationForm.reset();


            /* Restore minimum date */

            setMinimumReservationDate();

        }
    );

}


/* =========================================================
   11. SUCCESS MODAL
========================================================= */

function openSuccessModal(message) {

    if (!successModal) {
        return;
    }


    const successText =
        successModal.querySelector(
            ".success-modal-content > p:not(.section-eyebrow)"
        );


    if (successText) {

        successText.textContent = message;

    }


    successModal.classList.add("active");

    successModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeSuccessModalFunction() {

    if (!successModal) {
        return;
    }

    successModal.classList.remove(
        "active"
    );

    successModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


if (closeSuccessModal) {

    closeSuccessModal.addEventListener(
        "click",
        function () {

            closeSuccessModalFunction();

        }
    );

}


if (successModal) {

    successModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "modal-backdrop"
                )
            ) {

                closeSuccessModalFunction();

            }

        }
    );

}


/* =========================================================
   12. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }

        closeMenuModalFunction();

        closeSuccessModalFunction();


        /* Also close mobile menu */

        if (navLinks) {

            navLinks.classList.remove(
                "active"
            );

        }

        if (mobileMenu) {

            mobileMenu.classList.remove(
                "active"
            );

            mobileMenu.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================================
   13. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -45px 0px"
            }

        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   14. NAVBAR SCROLL EFFECT
========================================================= */

function updateNavbar() {

    if (!navbar) {
        return;
    }


    if (window.scrollY > 40) {

        navbar.style.boxShadow =
            "0 12px 35px rgba(61, 13, 25, 0.10)";

        navbar.style.background =
            "rgba(252, 250, 246, 0.97)";

    } else {

        navbar.style.boxShadow =
            "none";

        navbar.style.background =
            "rgba(252, 250, 246, 0.92)";

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    {
        passive: true
    }
);


updateNavbar();


/* =========================================================
   15. CLOSE MOBILE MENU ON RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 850
        ) {

            if (navLinks) {

                navLinks.classList.remove(
                    "active"
                );

            }

            if (mobileMenu) {

                mobileMenu.classList.remove(
                    "active"
                );

                mobileMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


/* =========================================================
   16. IMAGE LOADING
========================================================= */

const allImages =
    document.querySelectorAll("img");


allImages.forEach(function (image) {

    if (image.complete) {

        image.classList.add(
            "image-loaded"
        );

    } else {

        image.addEventListener(
            "load",
            function () {

                image.classList.add(
                    "image-loaded"
                );

            },
            {
                once: true
            }
        );

    }

});


/* =========================================================
   17. PREMIUM MENU CARD INTERACTION
========================================================= */

/*
   Adds a very subtle 3D movement
   when the mouse moves across a card.

   It does NOT run on touch devices.
*/

const menuCards =
    document.querySelectorAll(".menu-card");


if (
    window.matchMedia &&
    window.matchMedia("(hover: hover)").matches
) {

    menuCards.forEach(function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    ((x - centerX) / centerX) * 2;

                const rotateX =
                    ((centerY - y) / centerY) * 2;


                card.style.transform =
                    `translateY(-12px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   18. GALLERY INTERACTION
========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");


if (
    window.matchMedia &&
    window.matchMedia("(hover: hover)").matches
) {

    galleryItems.forEach(function (item) {

        item.addEventListener(
            "mousemove",
            function (event) {

                const image =
                    item.querySelector("img");

                if (!image) {
                    return;
                }


                const rect =
                    item.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const moveX =
                    ((x / rect.width) - 0.5) * 5;

                const moveY =
                    ((y / rect.height) - 0.5) * 5;


                image.style.transform =
                    `scale(1.07)
                     translate(${moveX}px, ${moveY}px)`;

            }
        );


        item.addEventListener(
            "mouseleave",
            function () {

                const image =
                    item.querySelector("img");

                if (!image) {
                    return;
                }

                image.style.transform = "";

            }
        );

    });

}


/* =========================================================
   19. BUTTON PRESS MICRO-INTERACTION
========================================================= */

const allButtons =
    document.querySelectorAll(
        ".button, .nav-reserve, .text-button"
    );


allButtons.forEach(function (button) {

    button.addEventListener(
        "mousedown",
        function () {

            button.style.transform =
                "scale(0.97)";

        }
    );


    button.addEventListener(
        "mouseup",
        function () {

            button.style.transform = "";

        }
    );


    button.addEventListener(
        "mouseleave",
        function () {

            button.style.transform = "";

        }
    );

});


/* =========================================================
   20. PARALLAX HERO
========================================================= */

const heroBackground =
    document.querySelector(
        ".hero-background img"
    );


if (heroBackground) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY <
                window.innerHeight
            ) {

                const movement =
                    window.scrollY * 0.12;

                heroBackground.style.transform =
                    `scale(1.04)
                     translateY(${movement}px)`;

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   21. MODAL MENU CARD STAGGER
========================================================= */

if (menuModal) {

    menuModal.addEventListener(
        "transitionend",
        function () {

            if (
                !menuModal.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            const categories =
                menuModal.querySelectorAll(
                    ".full-menu-category"
                );


            categories.forEach(
                function (category, index) {

                    category.style.animation =
                        `modalCategoryIn
                         0.55s
                         ${index * 0.08}s
                         both`;

                }
            );

        }
    );

}


/* =========================================================
   22. RESERVATION INPUT FOCUS POLISH
========================================================= */

const formInputs =
    document.querySelectorAll(
        "#reservationForm input, #reservationForm select, #reservationForm textarea"
    );


formInputs.forEach(function (input) {

    input.addEventListener(
        "focus",
        function () {

            const group =
                input.closest(".form-group");

            if (group) {

                group.classList.add(
                    "is-focused"
                );

            }

        }
    );


    input.addEventListener(
        "blur",
        function () {

            const group =
                input.closest(".form-group");

            if (group) {

                group.classList.remove(
                    "is-focused"
                );

            }

        }
    );

});


/* =========================================================
   23. PREVENT ACCIDENTAL IMAGE DRAG
========================================================= */

allImages.forEach(function (image) {

    image.addEventListener(
        "dragstart",
        function (event) {

            event.preventDefault();

        }
    );

});


/* =========================================================
   24. LUNA & OAK READY
========================================================= */

console.log(
    "☕ Luna & Oak — premium experience ready."
);