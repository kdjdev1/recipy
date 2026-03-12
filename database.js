// A procedural generator to mock 500+ recipes entirely client-side.
// This ensures there is no Node.js backend required while providing massive data.

const generateDatabase = () => {
    const cuisines = ['Italian', 'French', 'American', 'Mediterranean', 'Japanese', 'Mexican', 'Indian', 'Thai'];
    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    const tagsArr = ['Gluten-Free', 'Vegetarian', 'Vegan', 'Pescatarian', 'High Protein', 'Dairy-Free'];

    const adjectives = ['Rustic', 'Classic', 'Modern', 'Spicy', 'Garlic', 'Herb-Crusted', 'Smoked', 'Citrus', 'Creamy', 'Pan-Seared', 'Authentic', 'Slow-Cooked', 'Wood-Fired', 'Heritage', 'Fresh'];
    const nouns = ['Salmon', 'Chicken', 'Risotto', 'Pasta', 'Steak', 'Salad', 'Tacos', 'Curry', 'Ramen', 'Pizza', 'Halibut', 'Pork Belly', 'Lamb Chops', 'Gnocchi'];
    const suffixes = ['with Beurre Blanc', 'au Poivre', 'in Balsamic Glaze', 'with Chimichurri', 'al Pomodoro', 'with Roasted Vegetables', 'Supreme', 'with Lemon Butter', 'alla Vodka', 'with Truffle Oil'];

    const images = [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1490818387583-1b057d5f6e53?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?q=80&w=800&auto=format&fit=crop'
    ];

    const allRecipes = [];

    // Math.random utility
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Hardcode the first specific recipe to ensure the original featured one exists
    allRecipes.push({
        id: "1",
        title: "Pan-Seared Halibut with Beurre Blanc",
        cuisine: "French",
        difficulty: "Intermediate",
        time: 35,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
        tags: ["Gluten-Free", "Pescatarian", "High Protein"],
        description: "A delicate emulsion of butter, white wine, and shallots elevating a perfectly flaky white fish to restaurant-quality heights.",
        prepTime: 15,
        cookTime: 20,
        servings: 2,
        ingredientGroups: [
            {
                name: "For the Halibut",
                items: ["2 center-cut Halibut fillets (6 oz each)", "1 tbsp neutral oil", "Kosher salt and white pepper"]
            },
            {
                name: "For the Beurre Blanc",
                items: ["1/4 cup dry white wine", "1/4 cup white wine vinegar", "2 tbsp finely minced shallots", "8 tbsp cold unsalted butter, cubed"]
            }
        ],
        instructions: [
            {
                title: "Preparation",
                note: "",
                text: "Remove the halibut fillets from the refrigerator 15 minutes before cooking. Thoroughly pat them dry with paper towels to ensure a perfect sear; moisture is the enemy of a golden crust. Season generously with kosher salt and white pepper."
            },
            {
                title: "The Reduction (Gastrique)",
                note: "The key to a stable Beurre Blanc relies on reducing the acidic liquid until it forms a syrup-like consistency.",
                text: "In a small, heavy-bottomed saucepan, combine the white wine, white wine vinegar, and minced shallots. Bring to a boil over medium-high heat. Allow the mixture to reduce until only about 1.5 tablespoons of liquid remain (au sec). Lower the heat to the absolute minimum setting."
            },
            {
                title: "Emulsification",
                note: "",
                text: "Begin whisking in the cold butter cubes, one at a time. Do not add the next cube until the previous one is almost fully incorporated. Move the saucepan off and on the heat to maintain a lukewarm temperature; if it gets too hot, the butterfat will separate and 'break' the sauce."
            },
            {
                title: "Searing the Fish",
                note: "",
                text: "Heat a stainless steel or cast-iron skillet over medium-high heat. Add the neutral oil. Once the oil begins to shimmer, carefully lay the halibut fillets into the pan. Sear undisturbed for 3 to 4 minutes until a deep golden-brown crust forms. Gently flip and cook for another 2 to 3 minutes until opaque and flaky."
            },
            {
                title: "Plating",
                note: "",
                text: "Transfer the halibut to warm plates. Spoon the luxurious Beurre Blanc generously over the top and around the base of the fish. Garnish with micro-greens or finely cut chives. Serve immediately."
            }
        ]
    });

    // Generate 505 more recipes loop
    for (let i = 2; i <= 510; i++) {
        const title = `${rand(adjectives)} ${rand(nouns)} ${rand(suffixes)}`;
        const cuisine = rand(cuisines);
        const difficulty = rand(difficulties);
        const timeClass = randInt(1, 4); // 1 = fast, 4 = slow
        let time = timeClass === 1 ? randInt(10, 25) :
            timeClass === 2 ? randInt(30, 45) :
                timeClass === 3 ? randInt(50, 75) : randInt(80, 180);

        const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);

        let localTags = [];
        const numTags = randInt(1, 3);
        for (let j = 0; j < numTags; j++) {
            const t = rand(tagsArr);
            if (!localTags.includes(t)) localTags.push(t);
        }

        allRecipes.push({
            id: i.toString(),
            title: title,
            cuisine: cuisine,
            difficulty: difficulty,
            time: time,
            rating: rating,
            image: rand(images),
            tags: localTags,
            description: `Experience the rich culinary heritage of ${cuisine} cuisine with this premium ${title.toLowerCase()}. Masterfully curated for the home kitchen.`,
            prepTime: Math.floor(time * 0.3),
            cookTime: Math.ceil(time * 0.7),
            servings: randInt(2, 6),
            ingredientGroups: [
                {
                    name: "Primary Ingredients",
                    items: [
                        `${randInt(1, 3)} lbs premium ${rand(nouns).toLowerCase()}`,
                        `2 tbsp extra virgin olive oil`,
                        `1 cup fresh herbs, chopped`,
                        `Kosher salt to taste`
                    ]
                },
                {
                    name: "The Garnish",
                    items: [
                        `Fresh cracked black pepper`,
                        `Lemon wedges`,
                        `Micro-greens for presentation`
                    ]
                }
            ],
            instructions: [
                {
                    title: "Mise en Place",
                    note: "",
                    text: "Gather all ingredients. Prep your workstation by sharply dicing the aromatics and allowing the primary protein/vegetables to breathe at room temperature for 15 minutes."
                },
                {
                    title: "Initial Cooking Phase",
                    note: `For authentic ${cuisine} flavor, ensure your pan is properly pre-heated before searing.`,
                    text: `Heat your base oil in a heavy-bottomed pan. Add the primary ingredients and cook undisturbed until the initial maillard reaction creates a beautiful crust. This builds the fundamental flavor profile for the ${title.toLowerCase()}.`
                },
                {
                    title: "Development & Resting",
                    note: "",
                    text: "Lower the heat and introduce the secondary components. Allow the ingredients to simmer gently, fusing the aromatic components. Once cooked to the desired internal temperature, remove from heat and allow to rest for at least 5 minutes to redistribute juices."
                },
                {
                    title: "Service",
                    note: "",
                    text: "Plate on warm ceramics to preserve the temperature. Finish with the garnish, a final drizzle of high-quality olive oil, and immediate service."
                }
            ]
        });
    }

    return allRecipes;
};

// Initialize the global pseudo-database
window.recipesDB = generateDatabase();
