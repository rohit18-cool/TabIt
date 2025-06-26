# TabIt - Receipt Storage App

A beautiful, modern receipt storage interface inspired by Apple's design language. Built with vanilla HTML, CSS, and JavaScript for a smooth, native-like experience.

## ✨ Features

### 🎨 Design
- **Apple-inspired UI**: Clean, minimal design with rounded corners and subtle shadows
- **Responsive Design**: Optimized for mobile and desktop viewing
- **Dark Mode Support**: Automatic dark mode detection and styling
- **Smooth Animations**: Elegant transitions and hover effects
- **Glass Morphism**: Backdrop blur effects for modern aesthetics

### 🧾 Receipt Management
- **Expandable Receipts**: Click to expand and view full receipt details
- **Multiple Receipt Types**: Coffee shops, restaurants, grocery stores, gas stations, online purchases
- **Receipt Details**: Complete item breakdown, totals, taxes, and payment information
- **Status Indicators**: Visual status indicators for paid receipts
- **Date Organization**: Automatic date-based organization

### 🔍 Filtering & Search
- **Smart Filters**: Filter by All, Recent (7 days), or This Month
- **Quick Search**: Search through receipts by merchant or amount
- **Category Filtering**: Filter by receipt categories (food, grocery, transport, shopping)

### ⚡ Quick Actions
- **Scan Receipt**: Camera integration for receipt scanning
- **Analytics**: Spending analysis and insights
- **Search**: Quick receipt search functionality
- **Export**: Export receipts for record keeping

### 🧭 Navigation
- **Bottom Navigation**: Intuitive tab-based navigation
- **Active States**: Clear visual feedback for current section
- **Smooth Transitions**: Fluid navigation between sections

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Safari, Firefox, Edge)
- No additional dependencies required

### Installation
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start managing your receipts with Apple Wallet-style interface!

### File Structure
```
TabIt/
├── index.html          # Main HTML structure with receipt cards
├── styles.css          # Apple-inspired CSS styling
├── script.js           # Interactive JavaScript functionality
└── README.md           # Project documentation
```

## 🎯 Key Features

### Interactive Receipt Cards
- **Expandable Design**: Click any receipt to see full details
- **Smooth Animations**: Elegant expand/collapse animations
- **Haptic Feedback**: Simulated haptic feedback for mobile devices
- **Touch Gestures**: Swipe support for mobile devices

### Receipt Details
- **Complete Information**: Merchant details, receipt numbers, addresses
- **Item Breakdown**: Individual items with prices
- **Totals Calculation**: Subtotal, tax, tips, and final total
- **Payment Information**: Payment method and card details
- **Receipt Footer**: Additional merchant information

### Accessibility
- **Keyboard Navigation**: Full keyboard support with Escape to close
- **Focus States**: Clear focus indicators for accessibility
- **Screen Reader Support**: Semantic HTML structure
- **High Contrast**: Readable text and contrast ratios

### Performance
- **Optimized Animations**: Hardware-accelerated CSS transitions
- **Efficient JavaScript**: Minimal DOM manipulation
- **Fast Loading**: Optimized assets and code structure

## 🎨 Design System

### Colors
- **Primary Blue**: `#007aff` (Apple's signature blue)
- **Background**: `#f5f5f7` (Light gray)
- **Text**: `#1d1d1f` (Dark gray)
- **Secondary Text**: `#86868b` (Medium gray)
- **Success Green**: `#34c759` (Payment status)

### Typography
- **Font Family**: SF Pro Display (Apple's system font)
- **Font Weights**: 300, 400, 500, 600, 700
- **Letter Spacing**: Optimized for readability

### Receipt Categories
- **Coffee Shops**: Red gradient (`#ff6b6b` to `#ee5a24`)
- **Grocery Stores**: Teal gradient (`#4ecdc4` to `#44a08d`)
- **Restaurants**: Purple gradient (`#667eea` to `#764ba2`)
- **Gas Stations**: Pink gradient (`#f093fb` to `#f5576c`)
- **Online Purchases**: Blue gradient (`#4facfe` to `#00f2fe`)

## 📱 Mobile Optimization

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Touch Targets**: Minimum 44px touch targets
- **Safe Areas**: Support for device safe areas
- **Viewport Optimization**: Proper viewport meta tags

### Performance
- **Fast Loading**: Optimized for mobile networks
- **Smooth Scrolling**: Hardware-accelerated scrolling
- **Touch Responsive**: Optimized touch interactions

## 🔧 Customization

### Adding New Receipts
1. Duplicate the receipt HTML structure in `index.html`
2. Update the receipt data attributes (`data-category`, `data-date`)
3. Customize the receipt icon and colors in `styles.css`
4. Add receipt details in the expanded section

### Adding New Categories
1. Add new CSS classes for category-specific styling
2. Update the gradient colors for new categories
3. Add appropriate icons for new receipt types

### Styling Modifications
- Modify CSS variables for easy theming
- Update gradients for different receipt categories
- Customize animations and transitions

## 🌟 Future Enhancements

### Planned Features
- **Real Camera Integration**: Actual receipt scanning functionality
- **OCR Processing**: Optical Character Recognition for receipt text
- **Cloud Storage**: Sync receipts across devices
- **Receipt Analytics**: Spending patterns and insights
- **Export Options**: PDF, CSV, and email export

### Technical Improvements
- **PWA Support**: Progressive Web App capabilities
- **Offline Storage**: Local storage for receipt data
- **Backend Integration**: API connectivity for cloud storage
- **Machine Learning**: Smart receipt categorization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Apple Inc.**: Design inspiration from Apple Wallet
- **Font Awesome**: Icons used throughout the interface
- **Google Fonts**: SF Pro Display font family

---

**TabIt** - Your digital receipt wallet with Apple's elegance! 🧾💳