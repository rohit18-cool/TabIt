// TabIt - Receipt Scanner App
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    setupReceiptInteractions();
    setupFilterInteractions();
    setupActionInteractions();
    setupNavigation();
    setupHeaderActions();
    setupCameraModal();
    setupAnimations();
    setupHapticFeedback();
    updateEmptyState();
}

// Update empty state visibility
function updateEmptyState() {
    const emptyState = document.getElementById('empty-state');
    const receipts = document.querySelectorAll('.receipt-item');
    
    if (receipts.length === 0) {
        if (emptyState) {
            emptyState.classList.remove('hidden');
        }
    } else {
        if (emptyState) {
            emptyState.classList.add('hidden');
        }
    }
}

// Receipt interactions
function setupReceiptInteractions() {
    const receipts = document.querySelectorAll('.receipt-item');
    
    receipts.forEach(receipt => {
        const expandBtn = receipt.querySelector('.expand-btn');
        
        receipt.addEventListener('click', function(e) {
            if (e.target.closest('.expand-btn')) return;
            
            triggerHapticFeedback();
            toggleReceiptExpansion(this);
        });
        
        if (expandBtn) {
            expandBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                triggerHapticFeedback();
                toggleReceiptExpansion(receipt);
            });
        }
        
        receipt.addEventListener('mouseenter', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateY(-2px) scale(1.01)';
            }
        });
        
        receipt.addEventListener('mouseleave', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = '';
            }
        });
    });
}

// Toggle receipt expansion
function toggleReceiptExpansion(receipt) {
    const expandedContent = receipt.querySelector('.receipt-expanded');
    const expandBtn = receipt.querySelector('.expand-btn');
    const isExpanded = receipt.classList.contains('expanded');
    
    // Close all other receipts first
    const allReceipts = document.querySelectorAll('.receipt-item');
    allReceipts.forEach(r => {
        if (r !== receipt && r.classList.contains('expanded')) {
            r.classList.remove('expanded');
            r.querySelector('.receipt-expanded').classList.remove('show');
            r.querySelector('.expand-btn').classList.remove('rotated');
        }
    });
    
    // Toggle current receipt
    if (isExpanded) {
        receipt.classList.remove('expanded');
        expandedContent.classList.remove('show');
        expandBtn.classList.remove('rotated');
    } else {
        receipt.classList.add('expanded');
        expandedContent.classList.add('show');
        expandBtn.classList.add('rotated');
        
        setTimeout(() => {
            receipt.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }
}

// Filter interactions
function setupFilterInteractions() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            triggerHapticFeedback();
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterReceipts(filter);
        });
    });
}

// Filter receipts
function filterReceipts(filter) {
    const receipts = document.querySelectorAll('.receipt-item');
    const currentDate = new Date();
    let visibleCount = 0;
    
    receipts.forEach(receipt => {
        const receiptDate = new Date(receipt.getAttribute('data-date'));
        let showReceipt = true;
        
        switch (filter) {
            case 'recent':
                const sevenDaysAgo = new Date(currentDate.getTime() - (7 * 24 * 60 * 60 * 1000));
                showReceipt = receiptDate >= sevenDaysAgo;
                break;
            case 'month':
                showReceipt = receiptDate.getMonth() === currentDate.getMonth() && 
                             receiptDate.getFullYear() === currentDate.getFullYear();
                break;
            case 'all':
            default:
                showReceipt = true;
                break;
        }
        
        if (showReceipt) {
            receipt.style.display = 'block';
            receipt.style.animation = 'fadeInUp 0.6s ease forwards';
            visibleCount++;
        } else {
            receipt.style.display = 'none';
        }
    });
    
    // Show empty state if no receipts match filter
    const emptyState = document.getElementById('empty-state');
    if (visibleCount === 0 && receipts.length > 0) {
        if (emptyState) {
            emptyState.classList.remove('hidden');
            emptyState.querySelector('h3').textContent = 'No Receipts Found';
            emptyState.querySelector('p').textContent = `No receipts match the "${filter}" filter`;
        }
    } else {
        if (emptyState) {
            emptyState.classList.add('hidden');
        }
    }
    
    showNotification(`Showing ${filter} receipts`);
}

// Action interactions
function setupActionInteractions() {
    const actions = document.querySelectorAll('.action-item');
    
    actions.forEach(action => {
        action.addEventListener('click', function() {
            triggerHapticFeedback();
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            const actionTitle = this.querySelector('.action-title').textContent;
            handleAction(actionTitle);
        });
        
        action.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        action.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Navigation setup
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            triggerHapticFeedback();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            const navText = this.querySelector('span').textContent;
            handleNavigation(navText);
        });
    });
}

// Header actions
function setupHeaderActions() {
    const scanBtn = document.getElementById('scan-receipt-btn');
    const addBtn = document.getElementById('add-receipt-btn');
    const settingsBtn = document.querySelector('.header-actions .icon-button:last-child');
    
    if (scanBtn) {
        scanBtn.addEventListener('click', function() {
            triggerHapticFeedback();
            openCameraModal();
        });
    }
    
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            triggerHapticFeedback();
            openCameraModal();
        });
    }
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            triggerHapticFeedback();
            showSettings();
        });
    }
}

// Camera modal setup
function setupCameraModal() {
    const cameraModal = document.getElementById('camera-modal');
    const closeBtn = document.getElementById('close-camera');
    const captureBtn = document.getElementById('capture-receipt');
    const uploadBtn = document.getElementById('upload-receipt');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            triggerHapticFeedback();
            closeCameraModal();
        });
    }
    
    if (captureBtn) {
        captureBtn.addEventListener('click', function() {
            triggerHapticFeedback();
            captureReceipt();
        });
    }
    
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            triggerHapticFeedback();
            uploadFromGallery();
        });
    }
    
    // Close modal when clicking outside
    if (cameraModal) {
        cameraModal.addEventListener('click', function(e) {
            if (e.target === cameraModal) {
                closeCameraModal();
            }
        });
    }
}

// Open camera modal
function openCameraModal() {
    const cameraModal = document.getElementById('camera-modal');
    if (cameraModal) {
        cameraModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        showNotification('Camera opened - position receipt in frame');
    }
}

// Close camera modal
function closeCameraModal() {
    const cameraModal = document.getElementById('camera-modal');
    if (cameraModal) {
        cameraModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Capture receipt
function captureReceipt() {
    showNotification('Capturing receipt...');
    
    // Simulate processing time
    setTimeout(() => {
        showNotification('Processing receipt with OCR...');
        
        setTimeout(() => {
            showNotification('Receipt scanned successfully!');
            closeCameraModal();
            
            // Simulate adding a new receipt with OCR data
            setTimeout(() => {
                addNewReceiptFromOCR();
            }, 1000);
        }, 2000);
    }, 1000);
}

// Upload from gallery
function uploadFromGallery() {
    showNotification('Opening gallery...');
    
    // Simulate file selection
    setTimeout(() => {
        showNotification('Processing receipt from gallery...');
        
        setTimeout(() => {
            showNotification('Receipt uploaded successfully!');
            closeCameraModal();
            
            // Simulate adding a new receipt with OCR data
            setTimeout(() => {
                addNewReceiptFromOCR();
            }, 1000);
        }, 2000);
    }, 1000);
}

// Add new receipt from OCR data (simulation)
function addNewReceiptFromOCR() {
    const receiptsGrid = document.querySelector('.receipts-grid');
    const newReceipt = createReceiptFromOCRData();
    
    if (receiptsGrid && newReceipt) {
        receiptsGrid.insertBefore(newReceipt, receiptsGrid.firstChild);
        
        // Add animation
        newReceipt.style.opacity = '0';
        newReceipt.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            newReceipt.style.opacity = '1';
            newReceipt.style.transform = 'translateY(0)';
        }, 100);
        
        // Update empty state
        updateEmptyState();
        
        showNotification('New receipt added to your collection!');
    }
}

// Create receipt from OCR data (simulation)
function createReceiptFromOCRData() {
    // This would be populated with real OCR data from the scanned receipt
    const ocrData = simulateOCRData();
    const currentDate = new Date();
    
    const receipt = document.createElement('div');
    receipt.className = `receipt-item ${ocrData.category}`;
    receipt.setAttribute('data-category', ocrData.category);
    receipt.setAttribute('data-date', currentDate.toISOString().split('T')[0]);
    
    receipt.innerHTML = `
        <div class="receipt-header">
            <div class="receipt-icon">
                <i class="${ocrData.icon}"></i>
            </div>
            <div class="receipt-status active">Scanned</div>
        </div>
        <div class="receipt-content">
            <div class="receipt-title">${ocrData.merchant}</div>
            <div class="receipt-subtitle">${ocrData.categoryName}</div>
            <div class="receipt-details">
                <span class="receipt-amount">$${ocrData.total}</span>
                <span class="receipt-date">${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
        </div>
        <div class="receipt-actions">
            <button class="expand-btn">
                <i class="fas fa-chevron-down"></i>
            </button>
        </div>
        
        <div class="receipt-expanded">
            <div class="receipt-full-details">
                <div class="receipt-header-expanded">
                    <h3>${ocrData.merchant}</h3>
                    <p>${ocrData.address}</p>
                    <p>Receipt #: ${ocrData.receiptNumber}</p>
                </div>
                
                <div class="receipt-items">
                    ${ocrData.items.map(item => `
                        <div class="receipt-item-row">
                            <span>${item.name}</span>
                            <span>$${item.price}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="receipt-totals">
                    <div class="receipt-subtotal">
                        <span>Subtotal</span>
                        <span>$${ocrData.subtotal}</span>
                    </div>
                    ${ocrData.tax ? `
                        <div class="receipt-tax">
                            <span>Tax</span>
                            <span>$${ocrData.tax}</span>
                        </div>
                    ` : ''}
                    ${ocrData.tip ? `
                        <div class="receipt-tip">
                            <span>Tip</span>
                            <span>$${ocrData.tip}</span>
                        </div>
                    ` : ''}
                    <div class="receipt-total">
                        <span>Total</span>
                        <span>$${ocrData.total}</span>
                    </div>
                </div>
                
                <div class="receipt-footer">
                    <p>Payment Method: ${ocrData.paymentMethod}</p>
                    <p>Card: ${ocrData.cardNumber}</p>
                    <p>${ocrData.footerMessage}</p>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners to new receipt
    setupReceiptInteractions();
    
    return receipt;
}

// Simulate OCR data extraction
function simulateOCRData() {
    const receiptTypes = [
        {
            category: 'coffee-shop',
            categoryName: 'Coffee & Food',
            icon: 'fas fa-coffee',
            merchants: ['Starbucks', 'Dunkin\'', 'Peet\'s Coffee', 'Blue Bottle'],
            items: [
                { name: 'Venti Caramel Macchiato', price: '6.25' },
                { name: 'Blueberry Muffin', price: '2.20' },
                { name: 'Cappuccino', price: '4.50' }
            ]
        },
        {
            category: 'grocery-store',
            categoryName: 'Groceries',
            icon: 'fas fa-shopping-cart',
            merchants: ['Whole Foods', 'Trader Joe\'s', 'Safeway', 'Kroger'],
            items: [
                { name: 'Organic Bananas (2 lbs)', price: '3.98' },
                { name: 'Free Range Eggs (12)', price: '5.99' },
                { name: 'Organic Milk (1/2 gal)', price: '4.49' },
                { name: 'Whole Grain Bread', price: '3.99' }
            ]
        },
        {
            category: 'restaurant',
            categoryName: 'Dining',
            icon: 'fas fa-utensils',
            merchants: ['The Italian Bistro', 'Chipotle', 'Panera Bread', 'Subway'],
            items: [
                { name: 'Margherita Pizza', price: '18.99' },
                { name: 'Caesar Salad', price: '12.99' },
                { name: 'Garlic Bread', price: '4.99' }
            ]
        },
        {
            category: 'gas-station',
            categoryName: 'Fuel',
            icon: 'fas fa-gas-pump',
            merchants: ['Shell', 'Exxon', 'BP', 'Chevron'],
            items: [
                { name: 'Premium Gasoline (12.5 gal)', price: '52.34' },
                { name: 'Price per gallon', price: '4.19' }
            ]
        },
        {
            category: 'online-purchase',
            categoryName: 'Online Purchase',
            icon: 'fas fa-shopping-bag',
            merchants: ['Amazon', 'eBay', 'Etsy', 'Target.com'],
            items: [
                { name: 'Wireless Bluetooth Headphones', price: '79.99' },
                { name: 'Phone Case (iPhone 15)', price: '10.00' }
            ]
        }
    ];
    
    const randomType = receiptTypes[Math.floor(Math.random() * receiptTypes.length)];
    const randomMerchant = randomType.merchants[Math.floor(Math.random() * randomType.merchants.length)];
    
    // Calculate totals
    const subtotal = randomType.items.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    return {
        category: randomType.category,
        categoryName: randomType.categoryName,
        icon: randomType.icon,
        merchant: randomMerchant,
        address: '123 Main Street, New York, NY',
        receiptNumber: `${randomMerchant.substring(0, 2).toUpperCase()}-${Date.now().toString().slice(-6)}`,
        items: randomType.items,
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        tip: randomType.category === 'restaurant' ? (subtotal * 0.2).toFixed(2) : null,
        total: total.toFixed(2),
        paymentMethod: 'Apple Pay',
        cardNumber: '**** **** **** 1234',
        footerMessage: 'Thank you for your purchase!'
    };
}

// Animation setup
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.receipt-item, .action-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// Haptic feedback
function setupHapticFeedback() {
    if ('vibrate' in navigator) {
        window.hapticEnabled = true;
    }
}

function triggerHapticFeedback() {
    if (window.hapticEnabled) {
        navigator.vibrate(10);
    }
}

// Action handlers
function handleAction(actionTitle) {
    switch (actionTitle) {
        case 'Scan Receipt':
            openCameraModal();
            break;
        case 'Analytics':
            showAnalytics();
            break;
        case 'Search':
            showSearch();
            break;
        case 'Export':
            showExport();
            break;
        default:
            showNotification(`Opening ${actionTitle}...`);
    }
}

// Navigation handlers
function handleNavigation(navText) {
    switch (navText) {
        case 'Receipts':
            showNotification('Already on Receipts');
            break;
        case 'Analytics':
            showNotification('Opening Analytics...');
            break;
        case 'Search':
            showNotification('Opening Search...');
            break;
        case 'Profile':
            showNotification('Opening Profile...');
            break;
    }
}

// Modal functions
function showAnalytics() {
    showNotification('Opening Spending Analytics...');
}

function showSearch() {
    showNotification('Opening Receipt Search...');
}

function showExport() {
    showNotification('Exporting receipts...');
}

function showSettings() {
    showNotification('Settings opened');
}

// Notification system
function showNotification(message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<div class="notification-content"><span>${message}</span></div>`;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const expandedReceipts = document.querySelectorAll('.receipt-item.expanded');
        expandedReceipts.forEach(receipt => {
            toggleReceiptExpansion(receipt);
        });
        
        const cameraModal = document.getElementById('camera-modal');
        if (cameraModal && cameraModal.classList.contains('show')) {
            closeCameraModal();
        }
    }
});

// Calculate receipt stats
function calculateReceiptStats() {
    const receipts = document.querySelectorAll('.receipt-item');
    let totalAmount = 0;
    let receiptCount = receipts.length;
    
    receipts.forEach(receipt => {
        const amountText = receipt.querySelector('.receipt-amount').textContent;
        const amount = parseFloat(amountText.replace('$', ''));
        if (!isNaN(amount)) {
            totalAmount += amount;
        }
    });
    
    console.log(`Receipt Stats: ${receiptCount} receipts, Total: $${totalAmount.toFixed(2)}`);
    return { count: receiptCount, total: totalAmount };
}

setTimeout(calculateReceiptStats, 1000);

