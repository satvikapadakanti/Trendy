TrendyShop - Elegant E-Commerce Website
Objective
TrendyShop is a single-page e-commerce website built with HTML, CSS, and JavaScript. It allows users to browse products, filter by category, add items to a cart, view detailed product descriptions, select sizes, register/login, and complete purchases. An admin dashboard enables product and order management. Prices are displayed in Indian Rupees (INR).
Features

Product Listing: Browse products with category filters.
Shopping Cart: Add/remove products and view cart summary.
Authentication: User registration and login system.
Checkout Process: Complete orders (payment gateway not integrated).
Admin Dashboard: Add products and view orders.
Homepage: Hero banner with call-to-action and featured products carousel.
Creative Elements: Vibrant design with gradient borders, smooth animations, and modern typography inspired by top e-commerce platforms.

Setup Instructions

Clone the repository:git clone <repository-url>


Open index.html in a web browser to run the site locally. Alternatively, use a local server (e.g., VS Code Live Server or python -m http.server).
Ensure a stable internet connection to load product images from Unsplash and Google Fonts for styling.

File Structure

index.html: Main structure with all sections (home, products, cart, login, register, admin).
styles.css: Global styles with modern, vibrant design and image fallback.
script.js: All logic for product display, cart, authentication, and admin functionality.
README.md: Project documentation.

Notes

Uses localStorage for cart and order persistence.
Product images are sourced from Unsplash for reliable and professional visuals.
Hero banner uses an Unsplash image for a premium look.
No backend or database; data is stored in memory or localStorage.
Payment gateway integration is excluded as per requirements.
Implemented as a single-page application with 4 files for simplicity.
Prices are in INR, converted from USD at 1 USD = 83.5 INR.
Image elements include a fallback background color to handle loading issues.

Future Enhancements

Integrate a backend (e.g., Node.js, Express) for persistent storage.
Add real payment gateway integration.
Implement advanced search and filtering options.
Enhance admin dashboard with analytics.

Built with ❤️ by Satvika Padakanti.
