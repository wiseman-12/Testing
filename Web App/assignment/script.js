function toggleNav() {
    var navList = document.querySelector('.hero nav ul');
    navList.classList.toggle('open'); // Toggle the 'open' class to show/hide the navigation
}


// Function to close navigation menu when clicking outside
document.addEventListener('click', function(event) {
    var navList = document.querySelector('.hero nav ul');
    var hamburgerMenu = document.querySelector('.hamburger-menu');
    var isClickInsideNav = navList.contains(event.target);
    var isClickInsideHamburgerMenu = hamburgerMenu.contains(event.target);
    if (!isClickInsideNav && !isClickInsideHamburgerMenu) {
        navList.classList.remove('open'); // Close the navigation if clicked outside the menu or hamburger menu
    }
});
// Function to toggle navigation menu and close button
function toggleNav() {
    var navList = document.querySelector('.hero nav ul');
    var closeBtn = document.querySelector('.hero nav .close-btn');
    navList.classList.toggle('open'); // Toggle the 'open' class to show/hide the navigation
    closeBtn.classList.toggle('open'); // Toggle the 'open' class to show/hide the close button
}
