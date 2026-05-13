const defaultRecipes = [
    { 
        id: 1, 
        title: "Spaghetti Carbonara", 
        category: "traditional", 
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=1000",
        instructions: "Boil spaghetti. Crisp guanciale in a pan. Whisk eggs and pecorino romano. Toss pasta with meat, then remove from heat and stir in egg mixture quickly for a creamy finish." 
    },
    { 
        id: 2, 
        title: "Vegan Tacos", 
        category: "vegan", 
        image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=1000",
        instructions: "Warm corn tortillas. Fill with seasoned black beans, avocado slices, pickled onions, and fresh cilantro. Squeeze lime over the top before serving." 
    },
    { 
        id: 3, 
        title: "Low Carb Salad", 
        category: "dietary", 
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
        instructions: "Layer mixed greens, grilled chicken, halved cherry tomatoes, and sliced cucumber. Drizzle with olive oil and lemon juice." 
    },
    { 
        id: 4, 
        title: "Beef Stroganoff", 
        category: "traditional", 
        image: "https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_1280.jpg",
        instructions: "Sear beef strips. Sauté mushrooms and onions. Add beef broth and mustard. Stir in sour cream at the end and serve over egg noodles." 
    }
];

const STORAGE_KEY = 'myRecipes_v3';
let recipes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultRecipes;
let savedIds = JSON.parse(localStorage.getItem('savedRecipes')) || [];

function displayRecipes(filter = 'all') {
    const grid = document.getElementById('recipeGrid');
    if (!grid) return;
    grid.innerHTML = '';

    let list = recipes;
    if (filter === 'saved') {
        list = recipes.filter(r => savedIds.includes(r.id));
    } else if (filter !== 'all') {
        list = recipes.filter(r => r.category === filter);
    }

    list.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => toggleRecipe(recipe.id);

        card.innerHTML = `
            <div class="card-image">
                <img src="${recipe.image}" 
                     alt="${recipe.title}" 
                     onerror="this.src='https://images.unsplash.com/photo-1495195129352-aed325a55b65?auto=format&fit=crop&q=80&w=1000'">
            </div>
            <div class="card-body">
                <span class="category-tag">${recipe.category}</span>
                <h3>${recipe.title}</h3>
                <div id="detail-${recipe.id}" class="recipe-detail">
                    <strong>Instructions:</strong><br>${recipe.instructions}
                </div>
                <button class="btn btn-save" onclick="event.stopPropagation(); saveRecipe(${recipe.id})">♡ Save</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function toggleRecipe(id) {
    const el = document.getElementById(`detail-${id}`);
    const isVisible = el.style.display === 'block';
    el.style.display = isVisible ? 'none' : 'block';
}

function saveRecipe(id) {
    if (!savedIds.includes(id)) {
        savedIds.push(id);
        localStorage.setItem('savedRecipes', JSON.stringify(savedIds));
        alert("Added to your collection!");
    }
}

function addRecipe(event) {
    event.preventDefault();
    const newRecipe = {
        id: Date.now(),
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        image: document.getElementById('imageUrl').value || "https://images.unsplash.com/photo-1495195129352-aed325a55b65?auto=format&fit=crop&q=80&w=1000",
        instructions: document.getElementById('instructions').value
    };
    recipes.push(newRecipe);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes)); 
    window.location.href = 'index.html'; 
}
