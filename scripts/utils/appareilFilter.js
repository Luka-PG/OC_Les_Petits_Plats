import filter from '../components/filter.js';

/*construit le filtre d'appareils pour tri des recettes*/
export default class appareil extends filter {
    constructor(recipes) {
        super(recipes, 'appareil');
        this.collectFilter(recipes);
        this.input = document.querySelector(".appareil-input");
    }

    /* trie la liste des appareils restants */
    collectFilter(recipes) {
        this.array = [];
        recipes.filteredRecipes.forEach(recipe => {
            if (!this.array.find(e => e.toLowerCase() === recipe.appliance.toLowerCase()) && !this.chosenFilterArray.includes(recipe.appliance))
                this.array.push(recipe.appliance)
        })
    }

    /*filtre la liste des recettes selon la liste des appareils choisie*/ 
    filterRecipeList(recipes) {
        if(this.chosenFilterArray.length != 0){
            return recipes.filter(recipe => this.chosenFilterArray.includes(recipe.appliance));
        }
        return recipes;
    }
}
