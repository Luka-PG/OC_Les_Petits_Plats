import recipe from "./recipesCard.js";

export default class recipesList {

    /*construit une liste de filtres pour permettre le tri lors des recherches*/
    constructor(recipes) {
        this.allRecipes = recipes;
        this.filteredRecipes = recipes;
        this.filterList = []; /* liste des filtres */
        this.applyRecipesFilter();
        this.searchedInput = ""; /*mot recherché dans la barre de recherche des recettes*/
    }

    /*applique le(s) filtre(s) et trie la liste et l'affiche triée */
    applyRecipesFilter(isRemoved = false) {
        if (isRemoved) {
            this.filteredRecipes = this.allRecipes;
        }
        let list = this.filteredRecipes;
        this.filterList.forEach(filter => {
            list = filter.filterRecipeList(list);
        })
        this.filteredRecipes = list;
        this.filterList.forEach(filter => {
            filter.collectFilter(this);
        })
        this.displayListRecipe();
    }

    /* ferme les menu des filtres*/ 
    closeAllFilters() {
        this.filterList.forEach(filter => filter.closeFilterButton());
    }

    /* affiche la liste des résultats de la recherche*/
    displayListRecipe() {
        const recipeContainer = document.querySelector(".recipe-container");
        recipeContainer.textContent = "";
        this.filteredRecipes.forEach((elt) => {
            let recette = new recipe(elt);
            recipeContainer.appendChild(recette.render());
        })
    }

    /* création d'une div pour le message d'erreur lorsqu'il n'y a aucune recette correspondante à la recherche*/
    showEmptyListContainer(text) {
        let container = document.querySelector(".recipe-container");
        container.textContent = "";
        let textDiv = document.createElement("div");
        textDiv.className += "no-result";
        textDiv.textContent = text;
        container.appendChild(textDiv);
    }

    /*gère l'écoute d'inputs de la barre de recherche*/
    listenRecipesInput() {
        let input = document.querySelector(".recipe-input");
        input.addEventListener("input", (e) => {
            this.filterList.forEach(filter => {
                filter.closeFilterButton();
            })
            this.searchWithInput(e.target.value);
        })
    }

    /* gère l'input de la barre de recherche et lance le tri à chaque input dans la barre */
    searchWithInput(inputValue) {
        if (inputValue.length == 0) {
            this.filteredRecipes = this.allRecipes;
            this.searchedInput = "";
            this.searchRecipes(this.allRecipes);
            return
        }
        else if (inputValue.length < 3) {
            this.showEmptyListContainer("Votre mot recherché doit être plus longue que 3 mots"); 
            return
        }  
        this.searchedInput = inputValue.toLowerCase();
        this.searchRecipes(this.allRecipes);
    }

    /* cherche le(s) mot(s) clé(s) dans la liste des recettes  */
    searchRecipes(list) {

        let res = this.searchUsingFilter(list);
        if (res.length > 0) {
            this.filteredRecipes = res;
            this.applyRecipesFilter();
        }
        else {
            this.filteredRecipes = this.allRecipes;
            this.showEmptyListContainer("Aucune recette ne correspond à votre recherche!");
        }
    }
    /* cherche avec le(s) mot(s) recherché(s) la liste des recettes selon les noms, descriptions et ingrédients  */
    /* cherche la recette selon le nom, la description, ou les ingredients avec le(s) mot(s) recherché(s)*/
    searchUsingFilter(list) {
        return list.filter(recipe => {
            if ((recipe.name.toLowerCase().includes(this.searchedInput)) ||
                (recipe.description.toLowerCase().includes(this.searchedInput)) ||
                (recipe.ingredients.forEach(ing =>
                    ing.ingredient.toLowerCase().includes(this.searchedInput)))) return true;
        });
    }
}