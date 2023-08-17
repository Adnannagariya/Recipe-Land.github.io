    document.addEventListener('DOMContentLoaded', () => {
      const recipeContainer = document.querySelector('.recipe-container');
      const searchBtn = document.querySelector('#search-btn');
      const searchInput = document.querySelector('#search-input');

      searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            if (data.meals) {
              displayRecipes(data.meals);
            } else {
              recipeContainer.innerHTML = '<p>No recipes found. Please try a different search term.</p>';
            }
          })
          .catch((error) => {
            console.log('Error fetching recipes:', error);
          });
      });

      function displayRecipes(recipes) {
        recipeContainer.innerHTML = '';

        recipes.forEach((recipe) => {
          const recipeCard = document.createElement('div');
          recipeCard.classList.add('recipe-card');

          const recipeImage = document.createElement('img');
          recipeImage.src = recipe.strMealThumb;
          recipeImage.alt = recipe.strMeal;
          recipeCard.appendChild(recipeImage);

          const recipeTitle = document.createElement('h2');
          recipeTitle.textContent = recipe.strMeal;
          recipeCard.appendChild(recipeTitle);

          const recipeIngredients = document.createElement('ul');
          for (let i = 1; i <= 20; i++) {
            const ingredient = recipe['strIngredient' + i];
            const measure = recipe['strMeasure' + i];
            if (ingredient && ingredient.trim() !== '') {
              const ingredientItem = document.createElement('li');
              ingredientItem.textContent = `${measure} ${ingredient}`;
              recipeIngredients.appendChild(ingredientItem);
            }
          }
          recipeCard.appendChild(recipeIngredients);

          recipeContainer.appendChild(recipeCard);
        });
      }
    });