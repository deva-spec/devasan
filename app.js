// ==========================
// Recipe Data
// ==========================

const recipes = [
  { id: 1, title: "Spaghetti Carbonara", time: 25, difficulty: "easy", description: "Classic Italian pasta with eggs and cheese.", category: "pasta" },
  { id: 2, title: "Chicken Curry", time: 60, difficulty: "medium", description: "Spicy and flavorful Indian curry.", category: "curry" },
  { id: 3, title: "Beef Wellington", time: 120, difficulty: "hard", description: "Tender beef wrapped in pastry.", category: "meat" },
  { id: 4, title: "Greek Salad", time: 15, difficulty: "easy", description: "Fresh salad with feta and olives.", category: "salad" },
  { id: 5, title: "Ramen", time: 90, difficulty: "hard", description: "Japanese noodle soup with rich broth.", category: "soup" },
  { id: 6, title: "Pancakes", time: 20, difficulty: "easy", description: "Fluffy breakfast pancakes.", category: "breakfast" },
  { id: 7, title: "Butter Chicken", time: 70, difficulty: "medium", description: "Creamy tomato-based chicken curry.", category: "curry" },
  { id: 8, title: "Chocolate Soufflé", time: 80, difficulty: "hard", description: "Light and airy chocolate dessert.", category: "dessert" }
];

// ==========================
// State
// ==========================

let currentFilter = "all";
let currentSort = "none";

const recipeContainer = document.querySelector("#recipe-container");

// ==========================
// Create Card
// ==========================

const createRecipeCard = (recipe) => `
  <div class="recipe-card">
    <h3>${recipe.title}</h3>
    <div class="recipe-meta">
      <span>⏱️ ${recipe.time} min</span>
      <span class="difficulty ${recipe.difficulty}">
        ${recipe.difficulty}
      </span>
    </div>
    <p>${recipe.description}</p>
  </div>
`;

// ==========================
// Render
// ==========================

const renderRecipes = (recipesArray) => {
  recipeContainer.innerHTML = recipesArray
    .map(createRecipeCard)
    .join("");
};

// ==========================
// Pure Filter
// ==========================

const filterRecipes = (recipesArray, filter) => {
  switch (filter) {
    case "easy":
    case "medium":
    case "hard":
      return recipesArray.filter(r => r.difficulty === filter);

    case "quick":
      return recipesArray.filter(r => r.time < 30);

    default:
      return [...recipesArray];
  }
};

// ==========================
// Pure Sort
// ==========================

const sortRecipes = (recipesArray, sortType) => {
  const sorted = [...recipesArray];

  switch (sortType) {
    case "name":
      return sorted.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "time":
      return sorted.sort((a, b) => a.time - b.time);

    default:
      return sorted;
  }
};

// ==========================
// Update Display
// ==========================

const updateDisplay = () => {
  const filtered = filterRecipes(recipes, currentFilter);
  const sorted = sortRecipes(filtered, currentSort);
  renderRecipes(sorted);
};

// ==========================
// Button Helpers
// ==========================

const setActiveButton = (buttons, clicked) => {
  buttons.forEach(btn => btn.classList.remove("active"));
  clicked.classList.add("active");
};

// FILTER BUTTONS
const filterButtons = document.querySelectorAll("[data-filter]");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    setActiveButton(filterButtons, button);
    updateDisplay();
  });
});

// SORT BUTTONS
const sortButtons = document.querySelectorAll("[data-sort]");
sortButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentSort = button.dataset.sort;
    setActiveButton(sortButtons, button);
    updateDisplay();
  });
});

// ==========================
// Initialize
// ==========================

updateDisplay();