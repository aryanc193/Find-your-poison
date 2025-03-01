import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1";

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.render("index.ejs", { error: null, drinks: null });
});

app.get("/get-drink", async (req, res) => {
  try {
    let query = "";

    if (req.query.id) {
      query = `/lookup.php?i=${req.query.id}`;
    } else if (req.query.name) {
      query = `/search.php?s=${req.query.name}`;
    }

    if (!query) {
      return res.json({ drinks: [] });
    }

    console.log("Fetching data from:", API_URL + query); // ✅ Log API URL

    const response = await axios.get(API_URL + query);
    const drinks = response.data.drinks || [];

    console.log("Drinks fetched:", JSON.stringify(drinks, null, 2)); // ✅ Log drink data

    res.json({ drinks }); // ✅ Send response
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

{
  /*
  Search cocktail by name
www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

List all cocktails by first letter
www.thecocktaildb.com/api/json/v1/1/search.php?f=a

Search ingredient by name
www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka

Lookup full cocktail details by id
www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

Lookup ingredient by ID
www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552

Search by ingredient
www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka
Filter by alcoholic
www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic
www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic

Filter by Category
www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink
www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail

Filter by Glass
www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass
www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute

List the categories, glasses, ingredients or alcoholic filters
www.thecocktaildb.com/api/json/v1/1/list.php?c=list
www.thecocktaildb.com/api/json/v1/1/list.php?g=list
www.thecocktaildb.com/api/json/v1/1/list.php?i=list
www.thecocktaildb.com/api/json/v1/1/list.php?a=list


 Images
Drink thumbnails
Add /small to the end of the cocktail image URL
/images/media/drink/vrwquq1478252802.jpg/small (200x200 px)
/images/media/drink/vrwquq1478252802.jpg/medium (350x350 px)
/images/media/drink/vrwquq1478252802.jpg/large (500x500 px)

Ingredient Thumbnails
www.thecocktaildb.com/images/ingredients/gin-Small.png
(100x100 px)
www.thecocktaildb.com/images/ingredients/gin-Medium.png
(350x350 px)
www.thecocktaildb.com/images/ingredients/gin.png
(700x700 px)
  */
}
