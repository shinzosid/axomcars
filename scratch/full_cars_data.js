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
