import filter from '../components/filter.js';

/*construit le filtre d'ingredients pour tri des recettes*/
export default class ingredient extends filter {
    constructor(recipes) {
        super(recipes, 'ingredient');
        this.collectFilter(recipes);
        this.input = document.querySelector(".ingredient-input");
    }

 /* trie la liste des ingredients restants */
    collectFilter(recipes) {
        this.array = [];
        recipes.filteredRecipes.forEach(recipe => {
            recipe.ingredients.forEach(elt => {
                if (!this.array.find(e => e.toLowerCase() === elt.ingredient.toLowerCase()) && !this.chosenFilterArray.includes(elt.ingredient))
                    this.array.push(elt.ingredient)
            })
        })
    }

    /*filtre la liste des recettes selon la liste des ingrédients choisie*/
    filterRecipeList(recipes) {
        if (this.chosenFilterArray.length != 0) {
            let ingredientsFiltered = [];
            recipes.filter(recipe => {
                let ingredientsArray = [];
                recipe.ingredients.forEach(ing => {
                    ingredientsArray.push(ing.ingredient)
                });
                if (this.chosenFilterArray.every(e => ingredientsArray.includes(e)))
                ingredientsFiltered.push(recipe);
            });
            return ingredientsFiltered;
        }
        return recipes;
    }
}