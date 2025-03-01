document.addEventListener("DOMContentLoaded", () => {
  // const filterButton = document.getElementById("filterButton");
  const form = document.getElementById("myForm");
  const drinkResultsDiv = document.getElementById("drinkResults");

  // let isAlcoholic = true; // Default: YES (Alcoholic)

  // // 🔹 Toggle button for filtering Alcoholic/Non-Alcoholic drinks
  // filterButton.addEventListener("click", async () => {
  //   isAlcoholic = !isAlcoholic;
  //   filterButton.textContent = isAlcoholic ? "YES" : "NO";

  //   // Change button background color dynamically
  //   filterButton.style.background = isAlcoholic
  //     ? "linear-gradient(to right, #ff0000 0%, #630000 100%)"
  //     : "linear-gradient(to right, #630000 0%, #ff0000 100%)";

  //   fetchAndUpdateDrinks(); // Fetch drinks when toggling filter
  // });

  // 🔹 Handle Search Form Submission
  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload
    fetchAndUpdateDrinks(); // Fetch drinks based on inputs
  });

  // 🔹 Function to fetch drinks from server
  async function fetchAndUpdateDrinks() {
    let queryParams = new URLSearchParams();

    // Get input values
    const idInput = document.getElementById("idInput").value.trim();
    const nameInput = document.getElementById("nameInput").value.trim();
    // const tagsInput = document.getElementById("tagsInput").value.trim();
    // const categoryInput = document.getElementById("catInput").value.trim();

    // Add search parameters only if they have values
    if (idInput) queryParams.append("id", idInput);
    if (nameInput) queryParams.append("name", nameInput);
    // if (tagsInput) queryParams.append("tags", tagsInput);
    // if (categoryInput) queryParams.append("category", categoryInput);
    
    // // Always include Alcoholic/Non-Alcoholic filter
    // queryParams.append("alcoholic", isAlcoholic ? "Alcoholic" : "Non_Alcoholic");

    console.log(`Fetching from: /get-drink?${queryParams.toString()}`);

    try {
      const response = await fetch(`/get-drink?${queryParams.toString()}`);
      const data = await response.json();

      console.log("Response from server:", data);
      updateDrinkResults(data.drinks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // 🔹 Function to update UI with drink results
  function updateDrinkResults(drinks) {
    drinkResultsDiv.innerHTML = ""; // Clear previous results

    if (!drinks || drinks.length === 0) {
      drinkResultsDiv.innerHTML = "<h4>No drinks found.</h4>";
      return;
    }

    drinkResultsDiv.innerHTML = drinks
      .map(
        (drink) => `
        <div class="drink-card">
          <div class="drink-text">
            <h2><span>[#${drink.idDrink}]</span> ${drink.strDrink} <span>(${drink.strAlcoholic})</span></h2>
            <p><strong>Category:</strong> ${drink.strCategory}</p>
            <p><strong>Ingredients:</strong> ${getIngredients(drink)}</p>
            <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
          </div>
          <div class="drink-image">
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
          </div>
        </div>
      `
      )
      .join("");
  }

  // 🔹 Function to extract ingredients + measurements
  function getIngredients(drink) {
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`] || "";
      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients.join(", ");
  }
});
