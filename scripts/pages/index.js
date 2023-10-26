
import recipes from "../../data/recipesData.js";
import ustensil from "../utils/ustensilFilter.js";
import ingredient from '../utils/ingredientsFilter.js';
import appareil from '../utils/appareilFilter.js';
import recipesList from '../components/recipeList.js'


let listeRecettes = new recipesList(recipes);

/*écoute la barre de recherche des recettes*/
listeRecettes.listenRecipesInput();

/*affiche la liste des recettes*/
listeRecettes.displayListRecipe();


/*ajoute les filtres*/
let ustensilFilter = new ustensil(listeRecettes);
listeRecettes.filterList.push(ustensilFilter);

let ingredientFilter = new ingredient(listeRecettes);
listeRecettes.filterList.push(ingredientFilter);

let appareilFilter = new appareil(listeRecettes);
listeRecettes.filterList.push(appareilFilter);


/*écoute les intéractions avec les filtres*/
listeRecettes.filterList.forEach(filter => filter.listenFilterButton());


