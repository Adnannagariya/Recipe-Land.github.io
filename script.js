document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.querySelector('#search-btn');
  const searchInput = document.querySelector('#search-input');
  const recipeContainer = document.querySelector('.recipe-container');

  searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    const apiUrl = `https://api.edamam.com/search?q=${searchTerm}&app_id=3c3fa539&app_key=7c8b3b509e3f7c25211e48ddfd7ce853&cuisineType=Indian`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        displayRecipes(data.hits);
      })
      .catch((error) => {
        console.log('Error fetching recipes:', error);
      });
  });

  function displayRecipes(recipes) {
    if (recipeContainer) {
      recipeContainer.innerHTML = '';

      recipes.forEach((recipe) => {
        const recipeData = recipe.recipe;
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeImage = document.createElement('img');
        recipeImage.src = recipeData.image;
        recipeImage.alt = recipeData.label;
        recipeCard.appendChild(recipeImage);

        const recipeTitle = document.createElement('h2');
        recipeTitle.textContent = recipeData.label;
        recipeCard.appendChild(recipeTitle);

        const recipeIngredients = document.createElement('ul');
        recipeData.ingredientLines.forEach((ingredient) => {
          const ingredientItem = document.createElement('li');
          ingredientItem.textContent = ingredient;
          recipeIngredients.appendChild(ingredientItem);
        });
        recipeCard.appendChild(recipeIngredients);

        recipeContainer.appendChild(recipeCard);
      });
    }
  }

  // Your other code here
});
