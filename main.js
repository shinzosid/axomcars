window.currentLeadType = 'General Inquiry';

// --- Carousel Functionality ---
window.moveCarousel = function (carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const images = carousel.querySelectorAll('.carousel-images img');
    if (images.length <= 1) return;

    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    if (activeIndex === -1) activeIndex = 0;

    images[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + direction + images.length) % images.length;
    images[activeIndex].classList.add('active');
};

function initAutoCarousels() {
    const carousels = document.querySelectorAll('.showroom-carousel');
    carousels.forEach(carousel => {
        setInterval(() => {
            window.moveCarousel(carousel.id, 1);
        }, 5000);
    });
}

function getBrightness(hexColor) {
    const hex = hexColor.includes('gradient') ?
        hexColor.split(',')[1].split(' ')[1].trim() :
        hexColor.trim();
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
}

// --- Test Drive Modal Handler ---
window.openTestDriveModal = function (modelId = '') {
    const modal = document.getElementById('helpModal');
    if (!modal) return;
    const modalTitle = modal.querySelector('h2');
    const submitBtn = modal.querySelector('button[type="submit"]');
    const modelSelect = document.getElementById('carModel');
    const helpForm = document.getElementById('helpForm');

    if (helpForm) helpForm.reset();
    window.currentLeadType = 'Test Drive';
    if (modalTitle) modalTitle.textContent = 'Book Your Test Drive';
    if (submitBtn) submitBtn.textContent = 'Book Now';
    if (modelId && modelSelect) modelSelect.value = modelId.toLowerCase();

    modal.classList.add('active');
};

// --- Booking Modal Handler ---
window.openBookingModal = function (modelId = '') {
    const modal = document.getElementById('helpModal');
    if (!modal) return;
    const modalTitle = modal.querySelector('h2');
    const submitBtn = modal.querySelector('button[type="submit"]');
    const modelSelect = document.getElementById('carModel');
    const helpForm = document.getElementById('helpForm');

    if (helpForm) helpForm.reset();
    window.currentLeadType = 'Booking';
    if (modalTitle) modalTitle.textContent = 'Book Your Car';
    if (submitBtn) submitBtn.textContent = 'Submit Booking Request';

    if (modelId && modelSelect) {
        const optionExists = Array.from(modelSelect.options).some(opt => opt.value === modelId.toLowerCase());
        if (optionExists) {
            modelSelect.value = modelId.toLowerCase();
        }
    }

    modal.classList.add('active');
};


document.addEventListener('DOMContentLoaded', () => {
    // --- Vehicle Range Data ---
    const carsData = {
        sierra: {
            name: "Sierra",
            price: "11,49,000",
            tagline: "The Legend Returns",
            description: "Chaos Outside. Calm Within. Welcome Home, in every drive. Your commute, Reimagined.",
            colors: [
                { id: "yellow", name: "Andaman Adventure with Dual Tone", hex: "linear-gradient(90deg, #ed9f01 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/sierra/andamanadventure.avif" },
                { id: "grey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #818585 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/sierra/puregrey.avif" },
                { id: "red", name: "Bengal Rouge with Dual Tone", hex: "linear-gradient(90deg, #6b0000 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/sierra/bengal-rouge.avif" },
                { id: "cloud", name: "Coorg Cloud with Dual Tone", hex: "linear-gradient(90deg, #9ea1a1 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/sierra/coorgcloud.avif" },
                { id: "mist", name: "Munnar Mist with Dual Tone", hex: "linear-gradient(90deg, #4a4741 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/sierra/munnar-mist.avif" },
                { id: "white", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #e8ebe4 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/sierra/prestine-white.avif" }
            ],
            interior: "https://cdn.axomcars.in/cars/sierra/sierraindoor.avif",
            lifestyle: "https://cdn.axomcars.in/cars/sierra/sierraoutdoor.avif",
            accentColor: "#f1c40f"
        },
        harrier: {
            name: "Harrier",
            pricePetrol: "12,89,000",
            priceDiesel: "13,99,990",
            tagline: "We are Warriors, We are Harriers",
            description: "Unleash the warrior within with the Bold New Harrier. Designed to dominate every terrain with effortless power and futuristic technology.",
            colors: [
                { id: "crimson", name: "Nitro Crimson with Dual Tone", hex: "linear-gradient(90deg, #5c121e 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/harrier/nitro-crimson-right-3.avif" },
                { id: "yellow", name: "Sunlit Yellow with Dual Tone", hex: "linear-gradient(90deg, #d2c924 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/harrier/sunlit-yellow-right-10.avif" },
                { id: "red", name: "Fearless Red with Dual Tone", hex: "linear-gradient(90deg, #6f1a1c 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/harrier/fearless-red-right-6.avif" },
                { id: "daytonagrey", name: "Daytona Grey with Dual Tone", hex: "linear-gradient(90deg, #38393b 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/harrier/daytona-grey-right-175.avif" },
                { id: "white", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #ecedef 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/harrier/prestine-white-right-23.avif" },
                { id: "puregrey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #8a8b8f 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/harrier/pure-grey-right-85.avif" },
                { id: "green", name: "Seaweed Green with Dual Tone", hex: "linear-gradient(90deg, #4f5634 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/harrier/seaweed-green-right-26.avif" }
            ],
            interior: "https://cdn.axomcars.in/cars/harrier/terrain-interior.avif",
            lifestyle: "https://cdn.axomcars.in/cars/harrier/harrier-exterior.avif",
            accentColor: "#8b0000"
        },
        safari: {
            name: "Safari",
            pricePetrol: "13,29,000",
            priceDiesel: "14,74,990",
            tagline: "Reclaim Your Life",
            description: "The New Safari is more than an SUV; it's a statement of luxury and dominance. Experience the pinnacle of comfort and sophistication.",
            colors: [
                { id: "gold", name: "Cosmic Gold with Dual Tone", hex: "linear-gradient(90deg, #caac7c 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/safari/cosmic-gold-left-14.avif" },
                { id: "blue", name: "Royal Blue with Dual Tone", hex: "linear-gradient(90deg, #172f5e 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/safari/galactic-sapphire-left-16.avif" },
                { id: "white", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #fefefe 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/safari/frost-white-left-6.avif" },
                { id: "black", name: "Carbon Black", hex: "#000000", img: "https://cdn.axomcars.in/cars/safari/oberon-black-right-40.avif" },
                { id: "copper", name: "Supernova Copper with Dual Tone", hex: "linear-gradient(90deg, #ca7f6a 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/safari/supernova-copper-left-17.avif" },
                { id: "grey", name: "Daytona Grey with Dual Tone", hex: "linear-gradient(90deg, #38393b 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/safari/daytona-grey-left-297.avif" },
                { id: "puregrey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #8a8b8f 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/safari/pure-grey-left-96.avif" }
            ],
            interior: "https://cdn.axomcars.in/cars/safari/safari_interior.avif",
            lifestyle: "https://cdn.axomcars.in/cars/safari/safari-exterior.avif",
            accentColor: "#d4af37"
        },
        nexon: {
            name: "Nexon",
            price: "7,36,990",
            tagline: "It's #WayAhead",
            description: "Lead the way with the SUV that's ahead of its time. Futuristic design meets unmatched performance in the new Tata Nexon.",
            colors: [
                { id: "oceanblue", name: "Ocean Blue with Dual Tone", hex: "linear-gradient(90deg, #77a4a9 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/nexon/ocean-blue-right-1.avif" },
                { id: "puregrey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #8a8b8f 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/nexon/pure-grey-right-31.avif" },
                { id: "royalblue", name: "Royal Blue with Dual Tone", hex: "linear-gradient(90deg, #172f5e 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/nexon/royal-blue-right-1.avif" },
                { id: "daytongrey", name: "Daytona Grey with Dual Tone", hex: "linear-gradient(90deg, #53565b 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/nexon/daytona-grey-right-210.avif" },
                { id: "white", name: "Calgary White with Dual Tone", hex: "linear-gradient(90deg, #f6f6f6 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/nexon/calgary-white-right-43.avif" },
                { id: "beige", name: "Grassland Beige with Dual Tone", hex: "linear-gradient(90deg, #a4a089 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/nexon/grassland-beige-right-4.avif" }
            ],
            interior: "https://cdn.axomcars.in/cars/nexon/interiornexon.avif",
            lifestyle: "https://cdn.axomcars.in/cars/nexon/exteriornexon.avif",
            accentColor: "#1d70b8"
        },
        punch: {
            name: "Punch",
            price: "5,64,990",
            tagline: "The no-compromise SUV",
            description: "Presenting the New Tata PUNCH, built to turn heads and designed to take command. The perfect blend of true SUV design and everyday practicality.",
            colors: [
                { id: "cyantific", name: "Cyantific with Dual Tone", hex: "linear-gradient(90deg, #26ccff 50%, #fff 50%)", img: "https://cdn.axomcars.in/cars/punch/cyantific-right-17.avif" },
                { id: "bengalrogue", name: "Bengal Rogue with Dual Tone", hex: "linear-gradient(90deg, #ff0d33 50%, #fff 50%)", img: "https://cdn.axomcars.in/cars/punch/bengal-rogue-right-6.avif" },
                { id: "white", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #fefefe 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/punch/pristine-white-right-71.avif" },
                { id: "grey", name: "Daytona Grey with Dual Tone", hex: "linear-gradient(90deg, #38393b 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/punch/daytona-grey-right-316.avif" },
                { id: "caramel", name: "Caramel with Dual Tone", hex: "linear-gradient(90deg, #e67317 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/punch/caramel-right-17.avif" },
                { id: "coorgclouds", name: "Coorg Clouds with Dual Tone", hex: "linear-gradient(90deg, #bccbcd 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/punch/coorg-clouds-right-10.avif" }
            ],
            interior: "https://cdn.axomcars.in/cars/punch/new-punch-interior.avif",
            lifestyle: "https://cdn.axomcars.in/cars/punch/new-punch-exterior.avif",
            accentColor: "#00ffff"
        },
        altroz: {
            name: "Altroz",
            price: "6,29,990",
            tagline: "Feel Special",
            description: "Every journey in the Tata Altroz is designed to indulge you—with intelligent features, immersive sound, and intuitive control at your fingertips. It's more than just technology. It's thoughtful innovation that makes you feel special, every step of the way.",
            colors: [
                { id: "dune", name: "Dune Glow with Dual Tone", hex: "linear-gradient(90deg, #d8caba 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/altroz/dune-glow-right.avif" },
                { id: "blue", name: "Royal Blue with Dual Tone", hex: "linear-gradient(90deg, #002865 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/altroz/royal-blue-right-3.avif" },
                { id: "ember", name: "Ember Glow with Dual Tone", hex: "linear-gradient(90deg, #e72200 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/altroz/ember-glow-right.avif" },
                { id: "grey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #45464b 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/altroz/arcade-grey-right-52.avif" },
                { id: "white", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #e0e4dc 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/altroz/prestine-white-right-1.avif" }
            ],
            interior: "https://cdn.axomcars.in/cars/altroz/altroz-interior.avif",
            lifestyle: "https://cdn.axomcars.in/cars/altroz/altroz-exterior.avif",
            accentColor: "#d4af37"
        },
        tiago: {
            name: "Tiago",
            price: "4,59,990",
            tagline: "Unexpected Tech. Unmissable WOW!",
            description: "Raising the bar with tech, head turning design, and a driving experience that truly feels JUST WOW.",
            colors: [
                { id: "varanasivibrance", name: "Varanasi Vibrance with Dual Tone", hex: "linear-gradient(90deg, #d75f4f 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/tiago/vibrance-varanasi.avif" },
                { id: "pangongpulse", name: "Pangong Pulse with Dual Tone", hex: "linear-gradient(90deg, #8ca8b4 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/tiago/pangong-pulse.avif" },
                { id: "sobosurge", name: "Sobo Surge with Dual Tone", hex: "linear-gradient(90deg, #ab9a91  50%, #111 50%)", img: "https://cdn.axomcars.in/cars/tiago/sobo-surge.avif" },
                { id: "grey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #808484 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/tiago/pure-grey.avif" },
                { id: "daytonagrey", name: "Daytona Grey with Dual Tone", hex: "linear-gradient(90deg, #38393b 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/tiago/matheran-monsoon.avif" },
                { id: "white", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #dcdddf 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/tiago/pristine-white.avif" }
            ],
            interior: "https://cdn.axomcars.in/cars/tiago/tiagointerior.avif",
            lifestyle: "https://cdn.axomcars.in/cars/tiago/tiagoexterior.avif",
            accentColor: "#1d70b8"
        },
        curvv: {
            name: "CURVV",
            price: "9,69,990",
            tagline: "Where SUV muscle meets coupé finesse",
            description: "Merging the toughness and durability of an SUV with the elegant and sporty silhouette of a coupé.",
            colors: [
                { id: "goldessence", name: "Gold Essence with Dual Tone", hex: "linear-gradient(90deg, #caac7c 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/curvv/gold-essence-right-11.avif" },
                { id: "flamered", name: "Flame Red with Dual Tone", hex: "linear-gradient(90deg, #6e1618 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/curvv/flame-red-right-144.avif" },
                { id: "nitrocrimson", name: "Nitro Crimson with Dual Tone", hex: "linear-gradient(90deg, #5c121e 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/curvv/nitro-crimson-right-25.avif" },
                { id: "pristinewhite", name: "Pristine White with Dual Tone", hex: "linear-gradient(90deg, #ecedef 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/curvv/pristine-white-right-62.avif" },
                { id: "puregrey", name: "Pure Grey with Dual Tone", hex: "linear-gradient(90deg, #aaabb0 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/curvv/pure-grey-right-67.avif" },
                { id: "royalblue", name: "Royal Blue with Dual Tone", hex: "linear-gradient(90deg, #0061aa 50%, #111 50%)", img: "https://cdn.axomcars.in/cars/curvv/royal-blue-right-68.avif" }
            ],
            interior: "https://cdn.axomcars.in/cars/curvv/curvvinterior.avif",
            lifestyle: "https://cdn.axomcars.in/cars/curvv/curvvexterior.avif",
            accentColor: "#d4af37"
        },
        tigor: {
            name: "Tigor",
            price: "5,54,990",
            tagline: "Sedan for the Stars",
            description: "Stunning style, state-of-the-art features, comprehensive safety and seamlessly smooth drives of the New Tigor ensure you are in your element while exploring the city.",
            colors: [
                { id: "arizonablue", name: "Arizona Blue", hex: "#103d6e", img: "https://cdn.axomcars.in/cars/tigor/arizona-blue-right-25.avif" },
                { id: "copper", name: "Supernova Cooper", hex: "#ca7f6a", img: "https://cdn.axomcars.in/cars/tigor/classy-red-right-2.avif" },
                { id: "daytonagrey", name: "Daytona Grey", hex: "#38393b", img: "https://cdn.axomcars.in/cars/tigor/daytona-grey-right-213.avif" },
                { id: "meteorbronze", name: "Meteor Bronze", hex: "#a07f52", img: "https://cdn.axomcars.in/cars/tigor/meteor-bronze-right-41.avif" },
                { id: "opalwhite", name: "Pristine White", hex: "#fefefe", img: "https://cdn.axomcars.in/cars/tigor/opal-white-right-39.avif" }
            ],
            interior: "https://cdn.axomcars.in/cars/tigor/tigorinterior.avif",
            lifestyle: "https://cdn.axomcars.in/cars/tigor/tigorexterior.avif",
            accentColor: "#b87333"
        },
        'nexon-ev': {
            name: "Nexon EV",
            tagline: "Meet the game changer",
            description: "A stunning leap forward in design, cabin comfort, performance, technology and safety for you and your family.",
            colors: [
                { id: "teal", name: "Empowered Teal", hex: "#008080", img: "https://cdn.axomcars.in/electric/nexon-ev/nexon-ev.avif" }
            ],
            interior: "https://cdn.axomcars.in/electric/nexon-ev/nexonev-interior.avif",
            lifestyle: "https://cdn.axomcars.in/electric/nexon-ev/nexonev-exterior.avif",
            accentColor: "#008080"
        },
        'punch-ev': {
            name: "Punch EV",
            tagline: "beyond everyday",
            description: "The electric SUV that's built for the city and beyond. Experience the perfect blend of compactness and capability.",
            colors: [
                { id: "green", name: "Empowered Oxide", hex: "#808000", img: "https://cdn.axomcars.in/electric/punch-ev/Punch-ev.avif" }
            ],
            interior: "https://cdn.axomcars.in/electric/punch-ev/punchev-interior.avif",
            lifestyle: "https://cdn.axomcars.in/electric/punch-ev/punchev-exterior.avif",
            accentColor: "#808000"
        },
        'tiago-ev': {
            name: "Tiago EV",
            tagline: "It's a Chill Car",
            description: "The most loved electric hatchback in India. Designed to make your everyday drive effortless and sustainable.",
            colors: [
                { id: "blue", name: "Tropical Mist", hex: "#add8e6", img: "https://cdn.axomcars.in/electric/tiago-ev/tiago-ev.avif" }
            ],
            interior: "https://cdn.axomcars.in/electric/tiago-ev/tiagoev-interior.avif",
            lifestyle: "https://cdn.axomcars.in/electric/tiago-ev/tiagoev-exterior.avif",
            accentColor: "#add8e6"
        },
        'tigor-ev': {
            name: "Tigor EV",
            tagline: "Life.ev with Tigor.ev",
            description: "The electric sedan that combines elegance with efficiency. Perfect for the professional who values style and sustainability.",
            colors: [
                { id: "blue", name: "Signature Teal Blue", hex: "#004c4c", img: "https://cdn.axomcars.in/electric/tigor-ev/tigor-ev.avif" }
            ],
            interior: "https://cdn.axomcars.in/electric/tigor-ev/tigorev-interior.avif",
            lifestyle: "https://cdn.axomcars.in/electric/tigor-ev/tigorev-exterior.avif",
            accentColor: "#004c4c"
        },
        'curvv-ev': {
            name: "Curvv EV",
            tagline: "Shaped for You",
            description: "The SUV Coupé is designed to impress with its blend of elegance and innovation. Every ride is a statement.",
            colors: [
                { id: "gold", name: "Virtual Sunrise", hex: "#caac7c", img: "https://cdn.axomcars.in/electric/curvv-ev/curvv-ev.avif" }
            ],
            interior: "https://cdn.axomcars.in/electric/curvv-ev/curvvev-interior.avif",
            lifestyle: "https://cdn.axomcars.in/electric/curvv-ev/curvvev-exterior.avif",
            accentColor: "#caac7c"
        },
        'harrier-ev': {
            name: "Harrier EV",
            tagline: "Delete Impossible",
            description: "Designed to silence doubt. Engineered to outrun limits. Takes the unbeaten path and makes it its own.",
            colors: [
                { id: "red", name: "Nitro Crimson", hex: "#5c121e", img: "https://cdn.axomcars.in/electric/harrier-ev/harrier-ev.avif" }
            ],
            interior: "https://cdn.axomcars.in/electric/harrier-ev/harrier-interior.avif",
            lifestyle: "https://cdn.axomcars.in/electric/harrier-ev/harrier-exterior.avif",
            accentColor: "#5c121e"
        }
    };

    function updateVehicleUI(carId) {
        const car = carsData[carId];
        if (!car) return;

        const nameEl = document.getElementById('vehicleName');
        const taglineEl = document.getElementById('vehicleTagline');
        const descEl = document.getElementById('vehicleDescription');
        if (nameEl) nameEl.textContent = car.name;
        if (taglineEl) taglineEl.textContent = car.tagline;
        if (descEl) descEl.textContent = car.description;

        const priceEl = document.getElementById('vehiclePrice');
        if (priceEl) {
            if (car.pricePetrol && car.priceDiesel) {
                priceEl.innerHTML = 'Ex-showroom price starts at:<br>Petrol: ₹' + car.pricePetrol + '*<br>Diesel: ₹' + car.priceDiesel + '*';
            } else if (car.price) {
                priceEl.innerHTML = 'Ex-showroom price starts at ₹' + car.price + '*';
            } else {
                priceEl.innerHTML = '';
            }
        }

        const swatchContainer = document.getElementById('colorSwatches');
        const colorNameEl = document.getElementById('selectedColorName');
        const displayContainer = document.querySelector('.vehicle-display-container');

        if (swatchContainer) {
            swatchContainer.innerHTML = '';
            car.colors.forEach((color, index) => {
                const swatch = document.createElement('div');
                swatch.className = 'swatch' + (index === 0 ? ' active' : '');

                if (color.hex.includes('gradient')) {
                    swatch.style.backgroundImage = color.hex;
                } else {
                    swatch.style.backgroundColor = color.hex;
                }



                swatch.addEventListener('click', () => {
                    document.querySelectorAll('.swatch').forEach(s => {
                        s.classList.remove('active');
                        s.classList.remove('swatch-loading');
                    });
                    swatch.classList.add('active');
                    if (colorNameEl) colorNameEl.textContent = color.name;

                    const mainImg = document.getElementById('mainVehicleImage');

                    if (mainImg) {
                        const nextImg = new Image();
                        const startTime = Date.now();
                        const carLoader = document.getElementById('carLoader');
                        if (carLoader) carLoader.style.display = 'block';
                        if (mainImg) {
                            mainImg.style.opacity = '0.7';
                            mainImg.style.filter = 'blur(2px)';
                        }

                        nextImg.src = color.img;

                        const performSwap = () => {
                            const elapsed = Date.now() - startTime;
                            const remaining = Math.max(0, 300 - elapsed);

                            setTimeout(() => {
                                if (carLoader) carLoader.style.display = 'none';
                                mainImg.src = color.img;
                                mainImg.style.display = 'block';
                                mainImg.style.opacity = '1';
                                mainImg.style.filter = 'none';
                            }, remaining);
                        };

                        if (nextImg.complete) {
                            performSwap();
                        } else {
                            mainImg.style.opacity = '0.3';
                            nextImg.onload = performSwap;
                        }
                    }


                    if (displayContainer) {
                        const bgColor = color.hex.includes('gradient') ? color.hex.split(',')[1].split(' ')[1] : color.hex;
                        displayContainer.style.backgroundColor = bgColor;
                        const brightness = getBrightness(color.hex);
                        if (brightness < 128) displayContainer.classList.add('light-text');
                        else displayContainer.classList.remove('light-text');
                    }
                });
                swatchContainer.appendChild(swatch);
            });
            if (colorNameEl && car.colors[0]) colorNameEl.textContent = car.colors[0].name;

            if (displayContainer && car.colors[0]) {
                const initialColor = car.colors[0].hex;
                const bgColor = initialColor.includes('gradient') ? initialColor.split(',')[1].split(' ')[1] : initialColor;
                displayContainer.style.backgroundColor = bgColor;
                if (getBrightness(initialColor) < 128) displayContainer.classList.add('light-text');
                else displayContainer.classList.remove('light-text');
            }
        }

        const mainImg = document.getElementById('mainVehicleImage');
        const carLoader = document.getElementById('carLoader');
        const interiorImg = document.getElementById('interiorImage');
        const lifestyleImg = document.getElementById('lifestyleImage');

        if (mainImg && car.colors[0]) {
            const initialImg = new Image();
            const startTime = Date.now();

            if (carLoader) carLoader.style.display = 'block';

            const initShow = () => {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, 300 - elapsed);

                setTimeout(() => {
                    if (carLoader) carLoader.style.display = 'none';
                    mainImg.src = car.colors[0].img;
                    mainImg.style.display = 'block';
                    mainImg.style.opacity = '1';
                }, remaining);
            };

            initialImg.src = car.colors[0].img;

            if (initialImg.complete) {
                initShow();
            } else {
                mainImg.style.opacity = '0';
                initialImg.onload = initShow;
                initialImg.onerror = () => {
                    if (carLoader) carLoader.style.display = 'none';
                };
                // Fallback for very slow connections
                setTimeout(() => {
                    if (mainImg.style.opacity === '0' && !initialImg.complete) {
                        // Keep showing loader
                    }
                }, 5000);
            }
        }

        if (interiorImg) interiorImg.src = car.interior;
        if (lifestyleImg) lifestyleImg.src = car.lifestyle;

        document.querySelectorAll('.model-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.car === carId) tab.classList.add('active');
        });

        const learnMoreBtn = document.getElementById('learnMoreBtn');
        if (learnMoreBtn) learnMoreBtn.href = `tata-assam-${carId}.html`;
        const bookNowBtn = document.querySelector('.cta-group .btn[href*="wa.me"], #waBookBtn');
        if (bookNowBtn) {
            const message = encodeURIComponent(`Hi Axom Cars, I am interested in booking the Tata ${car.name}. Please provide more details.`);
            bookNowBtn.href = `https://wa.me/917099064993?text=${message}`;
        }
    }

    const modelTabs = document.querySelectorAll('.model-tab');
    modelTabs.forEach(tab => {
        tab.addEventListener('click', () => updateVehicleUI(tab.dataset.car));
    });

    const urlParams = new URLSearchParams(window.location.search);
    const targetCar = urlParams.get('car');
    if (targetCar && carsData[targetCar]) {
        updateVehicleUI(targetCar);
    } else if (document.getElementById('vehicleDisplay') || document.getElementById('mainVehicleImage')) {
        updateVehicleUI('sierra');
    }

    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.querySelector('.header-nav');
    let navOverlay = document.getElementById('navOverlay');

    // Auto-inject overlay if missing (for other pages)
    if (!navOverlay && headerNav) {
        navOverlay = document.createElement('div');
        navOverlay.id = 'navOverlay';
        navOverlay.className = 'nav-overlay';
        document.body.prepend(navOverlay);
    }

    if (menuToggle && headerNav && navOverlay) {
        const toggleMenu = () => {
            menuToggle.classList.toggle('active');
            headerNav.classList.toggle('active');
            navOverlay.classList.toggle('active');

            // Toggle body scroll
            if (headerNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        menuToggle.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);
    }

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-dropdown');
        if (link) {
            const handleMobileDropdown = (e) => {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close all other dropdowns first
                    document.querySelectorAll('.dropdown').forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });

                    // Explicitly toggle the 'active' class
                    dropdown.classList.toggle('active');
                }
            };

            link.addEventListener('click', handleMobileDropdown);
            link.addEventListener('touchstart', handleMobileDropdown, { passive: false });
        }
    });

    const rangeTabs = document.querySelectorAll('.tab[data-range]');
    const carCards = document.querySelectorAll('.car-card[data-category]');
    if (rangeTabs.length > 0) {
        rangeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.range;
                rangeTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                carCards.forEach(card => {
                    card.style.display = (card.dataset.category === category || category === 'all') ? 'block' : 'none';
                });
            });
        });
    }

    const triggerHaptic = () => { if ('vibrate' in navigator) navigator.vibrate(10); };
    document.querySelectorAll('.btn-primary, .btn-test-drive, .whatsapp-sticky, #helpForm button, .mobile-cta-btn').forEach(el => {
        el.addEventListener('click', triggerHaptic);
    });

    const stickyBar = document.querySelector('.mobile-sticky-bar');
    const heroSection = document.querySelector('.hero');
    if (stickyBar && heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            if (heroBottom < 0) stickyBar.classList.add('visible');
            else stickyBar.classList.remove('visible');
        });
    }

    const helpForm = document.getElementById('helpForm');
    if (helpForm) {
        helpForm.addEventListener('submit', () => {
            const submitBtn = helpForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('btn-loading');
                submitBtn.innerHTML = 'Sending...';
            }
        });
    }

    function initHelpModal() {
        const modal = document.getElementById('helpModal');
        if (!modal) return;
        const modalSeen = localStorage.getItem('axom_modal_seen');
        if (!modalSeen) {
            setTimeout(() => {
                // Double check if user has already opened it manually via another button
                if (modal.classList.contains('active')) return;

                const modalTitle = modal.querySelector('h2');
                const submitBtn = modal.querySelector('button[type="submit"]');
                if (modalTitle) modalTitle.textContent = 'How can we help you?';
                if (submitBtn) submitBtn.textContent = 'Get Assistance';
                modal.classList.add('active');
            }, 8000);
        }

        // Save to localStorage when closed
        document.getElementById('closeModal')?.addEventListener('click', () => {
            modal.classList.remove('active');
            localStorage.setItem('axom_modal_seen', 'true');
        });

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                localStorage.setItem('axom_modal_seen', 'true');
            }
        });
    }


    initHelpModal();
    initAutoCarousels();

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // --- WhatsApp 'Book Now' Link Interceptor ---
    const bookButtons = document.querySelectorAll('a[href*="wa.me"]');
    bookButtons.forEach(btn => {
        // Exclude the general sticky WhatsApp contact button
        if (btn.classList.contains('whatsapp-sticky')) return;

        const text = btn.textContent.trim().toLowerCase();
        if (text === 'book now') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                let modelId = '';
                try {
                    const url = new URL(btn.href);
                    const textParam = url.searchParams.get('text') || '';
                    const match = textParam.match(/booking (?:the )?(?:Tata )?([^.]+)/i);
                    if (match && match[1]) {
                        const parsedModel = match[1].trim().toLowerCase();
                        modelId = parsedModel.replace(/\s+/g, '-');
                    }
                } catch (err) {
                    console.error('Error parsing WhatsApp URL:', err);
                }

                if (window.openBookingModal) {
                    window.openBookingModal(modelId);
                }
            });
        }
    });
});
