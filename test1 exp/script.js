const searchInput = document.querySelector('#searchInput');
const resultsList = document.querySelector('#results');
const searchButton = document.querySelector("#searchButton");

// Replace with your actual API key
const apiKey = 'MkiS/TqnFYbCxh1TQljyJA==8Oq7UF3OAxhWioq0';

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    searchRecipes();
});

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    if (!searchValue) {
        resultsList.innerHTML = '<li class="error">Please enter a search term.</li>';
        return;
    }

    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(searchValue)}`, {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        displayRecipes(data); // Adjust this line based on the actual structure of the response
    } catch (error) {
        resultsList.innerHTML = `<li class="error">Error fetching recipes: ${error.message}</li>`;
    }
}

function displayRecipes(recipes) {
    let html = '';
    if (recipes.length === 0) {
        html = '<li class="error">No recipes found.</li>';
    } else {
        recipes.forEach((recipe) => {
            html += `
            <li class="recipe-item">
                <div>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h3>${recipe.title}</h3>
                </div>
                <div class="recipe-link">
                    <a href="${recipe.url}" target="_blank">View Recipe</a>
                </div>
            </li>
            `;
        });
    }
    resultsList.innerHTML = html;
}
