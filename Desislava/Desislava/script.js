// Initial sample data
const defaultRecipes = [
    { id: 1, title: "Spaghetti Carbonara", category: "traditional", instructions: "Boil pasta, fry guanciale, mix egg and cheese..." },
    { id: 2, title: "Vegan Tacos", category: "vegan", instructions: "Use lentils or walnuts as meat substitute, add salsa..." },
    { id: 3, title: "Low Carb Salad", category: "dietary", instructions: "Mix spinach, grilled chicken, and avocado..." }
];

// Load recipes from local storage or use defaults
let recipes = JSON.parse(localStorage.getItem('myRecipes')) || defaultRecipes;
let savedIds = JSON.parse(localStorage.getItem('savedRecipes')) || [];

function displayRecipes(filter = 'all') {
    const grid = document.getElementById('recipeGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = filter === 'all' ? recipes : recipes.filter(r => r.category === filter);
    const savedList = filter === 'saved' ? recipes.filter(r => savedIds.includes(r.id)) : filtered;

    savedList.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <span class="category-tag">${recipe.category}</span><br>
            <button class="btn btn-view" onclick="toggleRecipe(${recipe.id})">View Recipe</button>
            <button class="btn btn-save" onclick="saveRecipe(${recipe.id})">Save</button>
            <div id="detail-${recipe.id}" class="recipe-detail">${recipe.instructions}</div>
        `;
        grid.appendChild(card);
    });
}

function toggleRecipe(id) {
    const el = document.getElementById(`detail-${id}`);
    el.style.display = el.style.display === 'block' ? 'none' : 'block';
}

function saveRecipe(id) {
    if (!savedIds.includes(id)) {
        savedIds.push(id);
        localStorage.setItem('savedRecipes', JSON.stringify(savedIds));
        alert("Recipe saved!");
    }
}

function addRecipe(event) {
    event.preventDefault();
    const newRecipe = {
        id: Date.now(),
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        instructions: document.getElementById('instructions').value
    };
    recipes.push(newRecipe);
    localStorage.setItem('myRecipes', JSON.stringify(recipes));
    window.location.href = 'index.html'; // Redirect to home
}
