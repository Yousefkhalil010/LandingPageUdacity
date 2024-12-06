/**
 * DOM Manipulation Script
 * 
 * Features:
 * - Dynamically builds a navigation menu.
 * - Smooth scrolling to sections upon clicking navigation links.
 * - Highlights the active section and corresponding navigation link during scrolling.
 * 
 * Version: ES6
 * Dependencies: None
 */


// Currently highlighted section
let activeSection = document.querySelector('.active-section');

// Currently highlighted navigation link
let activeNav = document.querySelector('.active-nav');

// Last recorded scroll position (to detect scroll direction)
let lastScrollY = 0;

// All page sections
const sections = document.querySelectorAll('section');

// Button to scroll back to the top
const goUpButton = document.querySelector('#go-up-button');


//Initializes the navigation bar and adds event listeners.
 
function initialSetup() {
    const navBar = document.querySelector('#navbar__list');
    const fragment = document.createDocumentFragment();

    sections.forEach((section) => {
        const navButton = createNavButton(section);
        fragment.appendChild(navButton);
    });

    navBar.appendChild(fragment);
    addListeners(navBar);
}

 // Creates a navigation button for a given section.
function createNavButton(section) {
    const navButton = document.createElement('li');
    navButton.classList.add('menu__link');
    navButton.textContent = section.dataset.nav;
    navButton.setAttribute('data-id', section.id);
    navButton.id = `nav-${section.id}`;

    if (!activeNav) {
        navButton.classList.add('active-nav');
        activeNav = navButton;
    }

    return navButton;
}

/**
 * Adds all required event listeners to the page.
 * @param {HTMLElement} navBar - The navigation bar element.
 */
function addListeners(navBar) {
    navBar.addEventListener('click', handleNavClick);
    document.addEventListener('scroll', handleScroll);
    goUpButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Handles navigation button clicks to scroll to the appropriate section.
 * 
 * @param {Event} event - The click event.
 */
function handleNavClick(event) {
    const section = document.querySelector(`#${event.target.dataset.id}`);
    section.scrollIntoView({ behavior: 'smooth' });
}


 // Checks the current scroll position and updates the active section and navigation link.
function handleScroll() {
    const viewportHeight = window.innerHeight;
    const scrollThreshold = window.scrollY > lastScrollY ? viewportHeight / 3 : viewportHeight * 2 / 3;

    // Show or hide the "go to top" button
    goUpButton.classList.toggle('hide', window.scrollY <= 500);

    sections.forEach((section) => {
        const { top, bottom } = section.getBoundingClientRect();

        if (top < scrollThreshold && bottom > scrollThreshold && section !== activeSection) {
            updateActiveSection(section);
            updateActiveNav(document.querySelector(`#nav-${section.id}`));
        }
    });

    lastScrollY = window.scrollY;
}

function updateActiveSection(section) {
    activeSection.classList.remove('active-section');
    section.classList.add('active-section');
    activeSection = section;
}

function updateActiveNav(nav) {
    activeNav.classList.remove('active-nav');
    nav.classList.add('active-nav');
    activeNav = nav;
}

// Start the program
initialSetup();
