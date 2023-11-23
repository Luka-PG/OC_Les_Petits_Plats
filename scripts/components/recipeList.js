import recipe from "./recipesCard.js";

export default class recipesList {

    /*construit une liste de filtres pour permettre le tri lors des recherches*/
    constructor(recipes) {
        this.allRecipes = recipes;
        this.filteredRecipes = recipes;
        this.filterList = []; /* liste des filtres */
        this.applyRecipesFilter();
        this.displayRecipeNumber()
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
        this.displayRecipeNumber()
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
            this.displayRecipeNumber()
            return
        }
        else if (inputValue.length < 3) {
            return
        }  
        this.searchedInput = inputValue.toLowerCase();
        this.searchRecipes(this.allRecipes);
        this.displayRecipeNumber()
    }

    /* cherche le(s) mot(s) clé(s) dans la liste des recettes  */
    searchRecipes(list) {

        let res = this.searchUsingIteration(list);
        if (res.length > 0) {
            this.filteredRecipes = res;
            this.applyRecipesFilter();
            this.displayRecipeNumber()
        }
        else {
            this.showEmptyListContainer("Aucune recette ne correspond à votre recherche!");
            this.filteredRecipes = []
            this.displayRecipeNumber()
        }
    }


    searchUsingIteration(list) {
        let res = [];
        for (let i = 0; i < list.length; i++) {
            if ((list[i].name.toLowerCase().includes(this.searchedInput)) ||
                (list[i].description.toLowerCase().includes(this.searchedInput))) {
                if (!res.includes(list[i])) {
                    res.push(list[i]);
                    continue;
                }
            }
            for (let j = 0; j < list[i].ingredients.length; j++) {
                if (list[i].ingredients[j].ingredient.toLowerCase().includes(this.searchedInput)) {
                    if (!res.includes(list[i])) {
                        res.push(list[i]);
                        continue;
                    }
                }
            }
        }
        return res;
    }

    displayRecipeNumber() {
        let recipeCount = this.filteredRecipes.length

        let recipeNumber = document.querySelector(".recipe-number");
        recipeNumber.textContent = `${recipeCount} recettes` 
        
    }
}