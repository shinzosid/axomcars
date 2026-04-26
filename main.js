// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOjZ51fEzgaBPyZvkwsIjaza3Uu5NutF4",
    authDomain: "axom-cars.firebaseapp.com",
    databaseURL: "https://axom-cars-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "axom-cars",
    storageBucket: "axom-cars.firebasestorage.app",
    messagingSenderId: "1011433356105",
    appId: "1:1011433356105:web:7629781533d27dabf23898"
};

// Initialize Firebase
// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
}

// Lead Type Tracking
window.currentLeadType = 'General Inquiry';

// Test Drive Modal Handler
window.openTestDriveModal = function(modelId = '') {
    const modal = document.getElementById('helpModal');
    const modalTitle = modal.querySelector('h2');
    const modelSelect = document.getElementById('carModel');
    const helpForm = document.getElementById('helpForm');
    
    // Reset form to clear previous entries
    if (helpForm) helpForm.reset();
    
    // Set Lead Type
    window.currentLeadType = 'Test Drive';
    
    // Update Title
    modalTitle.textContent = 'Book Your Test Drive';
    
    // Pre-select model if provided
    if (modelId && modelSelect) {
        modelSelect.value = modelId.toLowerCase();
    }
    
    // Open Modal
    modal.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
    // Vehicle Range Data
    const carsData = {
        sierra: {
            name: "Sierra",
            tagline: "The Legend Returns",
            description: "Chaos Outside. Calm Within. Welcome Home, in every drive. Your commute, Reimagined.",
            colors: [
                { id: "yellow", name: "Andaman Adventure with Dual Tone", hex: "linear-gradient(90deg, #ed9f01 50%, #111 50%)", img: "images/cars/sierra/andamanadventure.avif" },
                { id: "grey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #818585 50%, #111 50%)", img: "images/cars/sierra/puregrey.avif" },
                { id: "red", name: "Bengal Rouge with Dual Tone", hex: "linear-gradient(90deg, #6b0000 50%, #111 50%)", img: "images/cars/sierra/bengal-rouge.avif" },
                { id: "cloud", name: "Coorg Cloud with Dual Tone", hex: "linear-gradient(90deg, #9ea1a1 50%, #111 50%)", img: "images/cars/sierra/coorgcloud.avif" },
                { id: "mist", name: "Munnar Mist with Dual Tone", hex: "linear-gradient(90deg, #4a4741 50%, #111 50%)", img: "images/cars/sierra/munnar-mist.avif" },
                { id: "white", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #e8ebe4 50%, #111 50%)", img: "images/cars/sierra/prestine-white.avif" }
            ],
            interior: "images/cars/sierra/sierraindoor.avif",
            lifestyle: "images/cars/sierra/sierraoutdoor.avif",
            accentColor: "#f1c40f"
        },
        harrier: {
            name: "Harrier",
            tagline: "We are Warriors, We are Harriers",
            description: "Unleash the warrior within with the Bold New Harrier. Designed to dominate every terrain with effortless power and futuristic technology.",
            colors: [
                { id: "crimson", name: "Nitro Crimson with Dual Tone", hex: "linear-gradient(90deg, #5c121e 50%, #111 50%)", img: "images/cars/harrier/nitro-crimson-right-3.avif" },
                { id: "yellow", name: "Sunlit Yellow with Dual Tone", hex: "linear-gradient(90deg, #d2c924 50%, #111 50%)", img: "images/cars/harrier/sunlit-yellow-right-10.avif" },
                { id: "red", name: "Fearless Red with Dual Tone", hex: "linear-gradient(90deg, #6f1a1c 50%, #111 50%)", img: "images/cars/harrier/fearless-red-right-6.avif" },
                { id: "daytonagrey", name: "Daytona Grey with Dual Tone", hex: "linear-gradient(90deg, #38393b 50%, #111 50%)", img: "images/cars/harrier/daytona-grey-right-175.avif" },
                { id: "white", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #ecedef 50%, #111 50%)", img: "images/cars/harrier/prestine-white-right-23.avif" },
                { id: "puregrey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #8a8b8f 50%, #111 50%)", img: "images/cars/harrier/pure-grey-right-85.avif" },
                { id: "green", name: "Seaweed Green with Dual Tone", hex: "linear-gradient(90deg, #4f5634 50%, #111 50%)", img: "images/cars/harrier/seaweed-green-right-26.avif" }
            ],
            interior: "images/cars/harrier/terrain-interior.jpg",
            lifestyle: "images/cars/harrier/harrier-exterior.jpg",
            accentColor: "#8b0000"
        },
        safari: {
            name: "Safari",
            tagline: "Reclaim Your Life",
            description: "The New Safari is more than an SUV; it's a statement of luxury and dominance. Experience the pinnacle of comfort and sophistication.",
            colors: [
                { id: "gold", name: "Cosmic Gold with Dual Tone", hex: "linear-gradient(90deg, #caac7c 50%, #111 50%)", img: "images/cars/safari/cosmic-gold-left-14.avif" },
                { id: "blue", name: "Royal Blue with Dual Tone", hex: "linear-gradient(90deg, #172f5e 50%, #111 50%)", img: "images/cars/safari/galactic-sapphire-left-16.avif" },
                { id: "white", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #fefefe 50%, #111 50%)", img: "images/cars/safari/frost-white-left-6.avif" },
                { id: "black", name: "Carbon Black", hex: "#000000", img: "images/cars/safari/oberon-black-right-40.avif" },
                { id: "copper", name: "Supernova Copper with Dual Tone", hex: "linear-gradient(90deg, #ca7f6a 50%, #111 50%)", img: "images/cars/safari/supernova-copper-left-17.avif" },
                { id: "grey", name: "Daytona Grey with Dual Tone", hex: "linear-gradient(90deg, #38393b 50%, #111 50%)", img: "images/cars/safari/daytona-grey-left-297.avif" },
                { id: "puregrey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #8a8b8f 50%, #111 50%)", img: "images/cars/safari/pure-grey-left-96.avif" }
            ],
            interior: "images/cars/safari/safari_interior.jpg",
            lifestyle: "images/cars/safari/safari-exterior.jpg",
            accentColor: "#d4af37"
        },
        nexon: {
            name: "Nexon",
            tagline: "It's #WayAhead",
            description: "Lead the way with the SUV that's ahead of its time. Futuristic design meets unmatched performance in the new Tata Nexon.",
            colors: [
                { id: "oceanblue", name: "Ocean Blue with Dual Tone", hex: "linear-gradient(90deg, #77a4a9 50%, #111 50%)", img: "images/cars/nexon/ocean-blue-right-1.avif" },
                { id: "puregrey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #8a8b8f 50%, #111 50%)", img: "images/cars/nexon/pure-grey-right-31.avif" },
                { id: "royalblue", name: "Royal Blue with Dual Tone", hex: "linear-gradient(90deg, #172f5e 50%, #111 50%)", img: "images/cars/nexon/royal-blue-right-1.avif" },
                { id: "daytongrey", name: "Daytona Grey with Dual Tone", hex: "linear-gradient(90deg, #53565b 50%, #111 50%)", img: "images/cars/nexon/daytona-grey-right-210.avif" },
                { id: "white", name: "Calgary White with Dual Tone", hex: "linear-gradient(90deg, #f6f6f6 50%, #111 50%)", img: "images/cars/nexon/calgary-white-right-43.avif" },
                { id: "beige", name: "Grassland Beige with Dual Tone", hex: "linear-gradient(90deg, #a4a089 50%, #111 50%)", img: "images/cars/nexon/grassland-beige-right-4.avif" }
            ],
            interior: "images/cars/nexon/interiornexon.png",
            lifestyle: "images/cars/nexon/exteriornexon.png",
            accentColor: "#1d70b8"
        },
        punch: {
            name: "Punch",
            tagline: "The no-compromise SUV",
            description: "Presenting the New Tata PUNCH, built to turn heads and designed to take command. The perfect blend of true SUV design and everyday practicality.",
            colors: [
                { id: "cyantific", name: "Cyantific with Dual Tone", hex: "linear-gradient(90deg, #26ccff 50%, #fff 50%)", img: "images/cars/punch/cyantific-right-17.avif" },
                { id: "bengalrogue", name: "Bengal Rogue with Dual Tone", hex: "linear-gradient(90deg, #ff0d33 50%, #fff 50%)", img: "images/cars/punch/bengal-rogue-right-6.avif" },
                { id: "white", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #fefefe 50%, #111 50%)", img: "images/cars/punch/pristine-white-right-71.avif" },
                { id: "grey", name: "Daytona Grey with Dual Tone", hex: "linear-gradient(90deg, #38393b 50%, #111 50%)", img: "images/cars/punch/daytona-grey-right-316.avif" },
                { id: "caramel", name: "Caramel with Dual Tone", hex: "linear-gradient(90deg, #e67317 50%, #111 50%)", img: "images/cars/punch/caramel-right-17.avif" },
                { id: "coorgclouds", name: "Coorg Clouds with Dual Tone", hex: "linear-gradient(90deg, #bccbcd 50%, #111 50%)", img: "images/cars/punch/coorg-clouds-right-10.avif" }
            ],
            interior: "images/cars/punch/new-punch-interior.png",
            lifestyle: "images/cars/punch/new-punch-exterior.png",
            accentColor: "#00ffff"
        },
        altroz: {
            name: "Altroz",
            tagline: "Feel Special",
            description: "Every journey in the Tata Altroz is designed to indulge you—with intelligent features, immersive sound, and intuitive control at your fingertips. It's more than just technology. It's thoughtful innovation that makes you feel special, every step of the way.",
            colors: [
                { id: "dune", name: "Dune Glow with Dual Tone", hex: "linear-gradient(90deg, #d8caba 50%, #111 50%)", img: "images/cars/altroz/dune-glow-right.avif" },
                { id: "blue", name: "Royal Blue with Dual Tone", hex: "linear-gradient(90deg, #002865 50%, #111 50%)", img: "images/cars/altroz/royal-blue-right-3.avif" },
                { id: "ember", name: "Ember Glow with Dual Tone", hex: "linear-gradient(90deg, #e72200 50%, #111 50%)", img: "images/cars/altroz/ember-glow-right.avif" },
                { id: "grey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #45464b 50%, #111 50%)", img: "images/cars/altroz/arcade-grey-right-52.avif" },
                { id: "white", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #e0e4dc 50%, #111 50%)", img: "images/cars/altroz/prestine-white-right-1.avif" }
            ],
            interior: "images/cars/altroz/altroz-interior.jpg",
            lifestyle: "images/cars/altroz/altroz-exterior.jpg",
            accentColor: "#d4af37"
        },
        tiago: {
            name: "Tiago",
            tagline: "It's Seriously fun",
            description: "Younger than ever. Bolder than ever. Inspired by the spirited youth, the All-new Tiago is hard to ignore. Drive around the city and watch heads turn towards you.",
            colors: [
                { id: "arizonablue", name: "Arizona Blue", hex: "#103d6e", img: "images/cars/tiago/arizona-blue-right-23.avif" },
                { id: "classyred", name: "Supernova Copper", hex: "#ca7f6a", img: "images/cars/tiago/classy-red-right.avif" },
                { id: "daytonagrey", name: "Daytona Grey", hex: "#38393b ", img: "images/cars/tiago/daytona-grey-right-211.avif" },
                { id: "mysticsea", name: "Ocean Blue", hex: "#679195", img: "images/cars/tiago/mystic-seadt-dt-right.avif" },
                { id: "polarwhite", name: "Pristine White", hex: "#dcdddf", img: "images/cars/tiago/polar-white-dt-right-1.avif" },
                { id: "tornadoblue", name: "Tornado Blue", hex: "#1864b3", img: "images/cars/tiago/tornado-blue-right-30.avif" }
            ],
            interior: "images/cars/tiago/tiagointerior.jpg",
            lifestyle: "images/cars/tiago/tiagoexterior.jpg",
            accentColor: "#1d70b8"
        },
        curvv: {
            name: "CURVV",
            tagline: "Where SUV muscle meets coupé finesse",
            description: "Merging the toughness and durability of an SUV with the elegant and sporty silhouette of a coupé.",
            colors: [
                { id: "goldessence", name: "Gold Essence with Dual Tone", hex: "linear-gradient(90deg, #caac7c 50%, #111 50%)", img: "images/cars/curvv/gold-essence-right-11.avif" },
                { id: "flamered", name: "Flame Red with Dual Tone", hex: "linear-gradient(90deg, #6e1618 50%, #111 50%)", img: "images/cars/curvv/flame-red-right-144.avif" },
                { id: "nitrocrimson", name: "Nitro Crimson with Dual Tone", hex: "linear-gradient(90deg, #5c121e 50%, #111 50%)", img: "images/cars/curvv/nitro-crimson-right-25.avif" },
                { id: "pristinewhite", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #ecedef 50%, #111 50%)", img: "images/cars/curvv/pristine-white-right-62.avif" },
                { id: "puregrey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #aaabb0 50%, #111 50%)", img: "images/cars/curvv/pure-grey-right-67.avif" },
                { id: "royalblue", name: "Royal Blue with Dual Tone", hex: "linear-gradient(90deg, #0061aa 50%, #111 50%)", img: "images/cars/curvv/royal-blue-right-68.avif" }
            ],
            interior: "images/cars/curvv/curvvinterior.jpg",
            lifestyle: "images/cars/curvv/curvvexterior.jpg",
            accentColor: "#d4af37"
        },
        tigor: {
            name: "Tigor",
            tagline: "Sedan for the Stars",
            description: "Stunning style, state-of-the-art features, comprehensive safety and seamlessly smooth drives of the New Tigor ensure you are in your element while exploring the city.",
            colors: [
                { id: "arizonablue", name: "Arizona Blue", hex: "#103d6e", img: "images/cars/tigor/arizona-blue-right-25.avif" },
                { id: "copper", name: "Supernova Cooper", hex: "#ca7f6a", img: "images/cars/tigor/classy-red-right-2.avif" },
                { id: "daytonagrey", name: "Daytona Grey", hex: "#38393b", img: "images/cars/tigor/daytona-grey-right-213.avif" },
                { id: "meteorbronze", name: "Meteor Bronze", hex: "#a07f52", img: "images/cars/tigor/meteor-bronze-right-41.avif" },
                { id: "opalwhite", name: "Pristine White", hex: "#fefefe", img: "images/cars/tigor/opal-white-right-39.avif" }
            ],
            interior: "images/cars/tigor/tigorinterior.jpg",
            lifestyle: "images/cars/tigor/tigorexterior.jpg",
            accentColor: "#b87333"
        }
    };

    function getBrightness(hexColor) {
        // If it's a gradient, extract the main color
        const hex = hexColor.includes('gradient') ?
            hexColor.split(',')[1].split(' ')[1].trim() :
            hexColor.trim();

        // Remove # if present
        const cleanHex = hex.replace('#', '');

        // Convert to RGB
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);

        // Calculate YIQ brightness
        return (r * 299 + g * 587 + b * 114) / 1000;
    }

    function updateVehicleUI(carId) {
        const car = carsData[carId];
        if (!car) return;

        // Update Text Content
        const nameEl = document.getElementById('vehicleName');
        const taglineEl = document.getElementById('vehicleTagline');
        const descEl = document.getElementById('vehicleDescription');

        if (nameEl) nameEl.textContent = car.name;
        if (taglineEl) taglineEl.textContent = car.tagline;
        if (descEl) descEl.textContent = car.description;

        // Update Colors & Background
        const swatchContainer = document.getElementById('colorSwatches');
        const colorNameEl = document.getElementById('selectedColorName');
        const displayContainer = document.querySelector('.vehicle-display-container');

        if (swatchContainer) {
            swatchContainer.innerHTML = '';
            car.colors.forEach((color, index) => {
                const swatch = document.createElement('div');
                swatch.className = `swatch ${index === 0 ? 'active' : ''}`;

                // Set background (supports hex or gradient)
                if (color.hex.includes('gradient')) {
                    swatch.style.backgroundImage = color.hex;
                    swatch.style.backgroundRepeat = 'no-repeat';
                    swatch.style.backgroundOrigin = 'border-box';
                    swatch.style.backgroundSize = '110% 100%';
                    swatch.style.backgroundPosition = 'center';
                } else {
                    swatch.style.backgroundColor = color.hex;
                }

                swatch.dataset.img = color.img;
                swatch.dataset.name = color.name;
                swatch.dataset.hex = color.hex;

                swatch.addEventListener('click', () => {
                    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
                    swatch.classList.add('active');

                    // Update color name display
                    if (colorNameEl) {
                        colorNameEl.style.opacity = '0';
                        setTimeout(() => {
                            colorNameEl.textContent = color.name;
                            colorNameEl.style.opacity = '1';
                        }, 200);
                    }

                    // Update main image and background
                    const mainImg = document.getElementById('mainVehicleImage');

                    if (mainImg) {
                        mainImg.style.opacity = '0';
                        setTimeout(() => {
                            mainImg.src = color.img;
                            mainImg.style.opacity = '1';
                        }, 300);
                    }

                    if (displayContainer) {
                        const bgColor = color.hex.includes('gradient') ? color.hex.split(',')[1].split(' ')[1] : color.hex;
                        displayContainer.style.backgroundColor = bgColor;

                        // Toggle light text based on brightness
                        const brightness = getBrightness(color.hex);
                        if (brightness < 128) {
                            displayContainer.classList.add('light-text');
                        } else {
                            displayContainer.classList.remove('light-text');
                        }
                    }
                });

                swatchContainer.appendChild(swatch);
            });

            // Set initial color state
            if (car.colors[0]) {
                if (colorNameEl) colorNameEl.textContent = car.colors[0].name;

                const initialColor = car.colors[0].hex;
                const brightness = getBrightness(initialColor);
                if (brightness < 128) {
                    displayContainer.classList.add('light-text');
                } else {
                    displayContainer.classList.remove('light-text');
                }

                if (displayContainer) {
                    const bgColor = initialColor.includes('gradient') ? initialColor.split(',')[1].split(' ')[1] : initialColor;
                    displayContainer.style.backgroundColor = bgColor;
                }
            }
        }

        // Set Initial Main State
        const mainImg = document.getElementById('mainVehicleImage');
        if (mainImg && car.colors[0]) mainImg.src = car.colors[0].img;

        // Update Gallery
        const interiorImg = document.getElementById('interiorImage');
        const lifestyleImg = document.getElementById('lifestyleImage');
        if (interiorImg) interiorImg.src = car.interior;
        if (lifestyleImg) lifestyleImg.src = car.lifestyle;

        // Update Active Tab Accent
        document.querySelectorAll('.model-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.car === carId) tab.classList.add('active');
        });

        // Update Learn More Link
        const learnMoreBtn = document.getElementById('learnMoreBtn');
        if (learnMoreBtn) {
            learnMoreBtn.href = `cars/${carId}.html`;
        }
    }

    const modelTabs = document.querySelectorAll('.model-tab');
    modelTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const carId = tab.dataset.car;
            updateVehicleUI(carId);
        });
    });

    // Handle direct car model selection from URL
    const urlParams = new URLSearchParams(window.location.search);
    const targetCar = urlParams.get('car');
    if (targetCar && document.querySelector(`.model-tab[data-car="${targetCar}"]`)) {
        updateVehicleUI(targetCar);
    } else if (document.getElementById('vehicleName')) {
        // Initialize with Sierra if on cars.html
        updateVehicleUI('sierra');
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.querySelector('.header-nav');

    if (menuToggle && headerNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            headerNav.classList.toggle('active');
            document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : '';
        });

        // Mobile Dropdown Toggle
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 991) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuToggle.classList.contains('active')) {
                const isClickInsideMenu = headerNav.contains(e.target);
                const isClickOnToggle = menuToggle.contains(e.target);

                if (!isClickInsideMenu && !isClickOnToggle) {
                    menuToggle.classList.remove('active');
                    headerNav.classList.remove('active');
                }
            }
        });
    }

    // Homepage Tab Filtering
    const rangeTabs = document.querySelectorAll('.tab[data-range]');
    const carCards = document.querySelectorAll('.car-card[data-category]');

    if (rangeTabs.length > 0) {
        rangeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.range;

                // Update tabs
                rangeTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Filter cards
                carCards.forEach(card => {
                    if (card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Contact Modal Logic ---
    function initHelpModal() {
        const modal = document.getElementById('helpModal');
        const closeBtn = document.getElementById('closeModal');
        const helpForm = document.getElementById('helpForm');

        if (!modal) return;

        // Check if user has seen the modal
        const modalSeen = localStorage.getItem('axom_modal_seen');

        if (!modalSeen) {
            // Show modal after 3 seconds
            setTimeout(() => {
                const modalTitle = modal.querySelector('h2');
                if (modalTitle) modalTitle.textContent = 'How can we help you?';
                window.currentLeadType = 'General Inquiry';
                modal.classList.add('active');
            }, 3000);
        }

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            localStorage.setItem('axom_modal_seen', 'true');
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                localStorage.setItem('axom_modal_seen', 'true');
            }
        });

        // Form submission
        helpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('visitorName').value;
            const mobile = document.getElementById('visitorMobile').value;
            const model = document.getElementById('carModel').value;
            const outlet = document.getElementById('outlet').value;
            const timestamp = new Date().toLocaleString();

            const newLead = {
                id: Date.now(),
                name,
                mobile,
                model,
                outlet,
                type: window.currentLeadType,
                date: timestamp
            };

            // 1. Save Lead to Firebase Firestore
            if (typeof db !== 'undefined') {
                db.collection("leads").add(newLead)
                .then((docRef) => {
                    console.log("Lead saved to Firestore with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding lead to Firestore: ", error);
                });
            }

            // Keep localStorage as a local backup
            const existingLeads = JSON.parse(localStorage.getItem('axom_leads') || '[]');
            existingLeads.unshift(newLead);
            localStorage.setItem('axom_leads', JSON.stringify(existingLeads));

            // 2. Show Success Message
            const formContainer = document.querySelector('.modal-form-container');
            formContainer.innerHTML = `
                <div class="success-message">
                    <div class="success-icon">✓</div>
                    <h3>Query Sent!</h3>
                    <p>Thank you, ${name}. Our team from ${outlet.toUpperCase()} will contact you shortly regarding the ${model.toUpperCase()}.</p>
                </div>
            `;

            // Mark as seen so it doesn't pop up again
            localStorage.setItem('axom_modal_seen', 'true');

            // Close modal after a short delay
            setTimeout(() => {
                modal.classList.remove('active');
            }, 3000);
        });
    }

    initHelpModal();
});
