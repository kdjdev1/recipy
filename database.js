// js/database.js

(function () {
    // Helper function to pick a random item from an array
    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Helper function to pick multiple unique random items
    const randomItems = (arr, count) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    // Helper for random number between min and max
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const cuisines = ["Italian", "French", "Japanese", "Mexican", "Indian", "Mediterranean", "American", "Thai", "Korean"];
    const difficulties = ["Beginner", "Intermediate", "Advanced"];
    const tagsPool = ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "High Protein", "Low Carb", "Pescatarian", "Dairy-Free", "Quick & Easy"];

    const dishTypes = ["Salad", "Soup", "Stew", "Roast", "Curry", "Pasta", "Noodles", "Sandwich", "Bowl", "Tacos", "Pizza"];
    const proteins = ["Chicken", "Beef", "Pork", "Tofu", "Salmon", "Shrimp", "Lamb", "Lentils", "Chickpeas", "Halibut"];
    const cookingMethods = ["Pan-Seared", "Roasted", "Grilled", "Slow-Cooked", "Baked", "Fried", "Steamed", "Braised"];
    const adjectives = ["Spicy", "Crispy", "Creamy", "Aromatic", "Classic", "Heritage", "Rustic", "Zesty", "Savory", "Sweet & Sour"];

    const imageKeywords = ["food", "meal", "cooking", "cuisine", "recipe", "dish", "plate", "dinner"];

    const baseIngredients = [
        "2 cups vegetables", "1 tbsp olive oil", "1 tsp salt", "1/2 tsp black pepper",
        "2 cloves garlic, minced", "1 onion, diced", "1 cup broth", "2 tbsp butter",
        "1/4 cup fresh herbs", "1 lemon, juiced", "1 tsp spices", "1 cup grain or pasta"
    ];

    const generateTitle = (protein, method, type, adj) => {
        const patterns = [
            `${adj} ${method} ${protein} ${type}`,
            `${method} ${protein} with ${adj} Sauce`,
            `Classic ${adj} ${type}`,
            `${protein} and Vegetable ${type}`,
            `Rustic ${method} ${protein}`
        ];
        return randomItem(patterns);
    };

    const generateInstructions = () => {
        return [
            {
                title: "Preparation",
                text: "Gather all ingredients. Wash and chop vegetables as needed. Pat proteins dry with a paper towel and season generously with salt and pepper.",
                note: "Proper mise en place is key to a smooth cooking experience."
            },
            {
                title: "Initial Cooking",
                text: "Heat oil or butter in a large pan over medium-high heat. Add aromatics (garlic, onions) and sauté until fragrant, about 2-3 minutes. Add the main protein and cook until browned on all sides."
            },
            {
                title: "Building Flavor",
                text: "Lower the heat to medium. Add spices, herbs, and any liquid elements (broth, wine, or sauce base). Bring to a gentle simmer and let the flavors meld together for 10-15 minutes.",
                note: "Do not let it boil vigorously; a gentle simmer prevents proteins from becoming tough."
            },
            {
                title: "Finishing Touches",
                text: "Taste and adjust seasoning if necessary. Stir in finishing ingredients like fresh herbs, a squeeze of citrus, or a knob of cold butter for richness. Serve immediately while hot."
            }
        ];
    };

    // Generate exactly 510 recipes
    const generateDatabase = (count) => {
        const db = [];
        for (let i = 1; i <= count; i++) {
            const protein = randomItem(proteins);
            const method = randomItem(cookingMethods);
            const type = randomItem(dishTypes);
            const adj = randomItem(adjectives);
            const cuisine = randomItem(cuisines);

            const prepTime = randomInt(5, 30);
            const cookTime = randomInt(10, 120);

            db.push({
                id: i.toString(),
                title: generateTitle(protein, method, type, adj),
                cuisine: cuisine,
                difficulty: randomItem(difficulties),
                time: prepTime + cookTime,
                prepTime: prepTime,
                cookTime: cookTime,
                servings: randomInt(2, 6),
                rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1), // Random rating between 4.0 and 5.0
                image: `https://images.unsplash.com/photo-${randomInt(100000, 999999)}-${randomInt(10000, 99999)}?q=80&w=800&auto=format&fit=crop`, // Simulated random unsplash-like URL (would normally use precise IDs, using a placeholder random query approach for variety)
                tags: randomItems(tagsPool, randomInt(1, 3)),
                description: `Experience the vibrant flavors of ${cuisine} cuisine with this ${adj.toLowerCase()} ${protein.toLowerCase()} dish. Perfect for a weeknight dinner or special occasion, offering a perfect balance of texture and taste.`,
                ingredientGroups: [
                    {
                        name: "Main Ingredients",
                        items: [`1 lb ${protein}`, ...randomItems(baseIngredients, 4)]
                    },
                    {
                        name: "Aromatics & Seasoning",
                        items: randomItems(baseIngredients, 3)
                    }
                ],
                instructions: generateInstructions()
            });

            // Fix image URL to use actual valid placeholders since random strings might 404
            // Since we need 500, we'll cycle through a few known good ones to guarantee images load, with random seed
            const goodImages = [
                "1546069901-ba9599a7e63c", "1565299624946-b28f40a0ae38", "1512621776951-a57141f2eefd",
                "1473093295043-cdd812d0e601", "1604908176997-125f25cc6f3d", "1555939594-58d7cb561ad1",
                "1476224203463-3a13a5b3a436", "1482049141049-7cbea51dc854", "1499028043690-3cb83ed4ef8e"
            ];
            db[i - 1].image = `https://images.unsplash.com/photo-${randomItem(goodImages)}?q=80&w=800&auto=format&fit=crop&${i}`;
        }
        return db;
    };

    // Attach to global window object
    window.recipesDB = generateDatabase(510);
})();
