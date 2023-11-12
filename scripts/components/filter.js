export default class filter {
  /*construit un filtre pour trier la liste des recettes, la classe principale des filtres appareil, ustensil et ingredient*/
  constructor(recipes, name) {

    this.name = name;
    this.recipeList = recipes;
    this.array = []; /* les filtres non-choisis restants*/
    this.chosenFilterArray = []; /* les filtres selectionnés par l'utilisateur*/
    this.filterContainer = document.querySelector(`.${name}-filter-container`);
    this.input = ""; /*mot recherché dans l'input du boutton filtre*/

  }

  /*affiche le filtre sur la page*/
  displayArrayFilter() {

    let divListFilter = this.filterContainer.querySelector(".filter-list");

    divListFilter.style.display = "flex";
    divListFilter.style.flexDirection = "column";
    divListFilter.style.paddingBottom = "30px";
    divListFilter.textContent = "";
    this.input.value = "";

    this.array.forEach((elt) => {

      let filterSearchButton = document.createElement("a");

      filterSearchButton.className += "filter-item-anchor";
      filterSearchButton.setAttribute("href", "#");
      filterSearchButton.setAttribute("id", elt);
      filterSearchButton.textContent = elt;

      divListFilter.appendChild(filterSearchButton);

    });
    this.listenFilterSelection();
  }

  /*gère l'affichage de la fermeture du menu filtre*/
  closeFilterButton() {

    this.filterContainer.querySelector(".normal").style.display ="inline-block";
    this.filterContainer.querySelector(".search").style.display = "none";
    this.filterContainer.querySelector(".filter-list").style.display = "none";

  }

  /* écoute les intéractions avec le bouton filtre*/
  listenFilterButton() {

    this.filterContainer.querySelector(".normal").addEventListener("click", () => {
        this.filterContainer.querySelector(".normal").style.display = "none";
        this.filterContainer.querySelector(".search").style.display = "flex";
        this.displayArrayFilter();
        this.searchInFilters();

      });

    this.filterContainer.querySelector(".fa-chevron-up").addEventListener("click", () => {
        this.closeFilterButton();

    });
  }

  /*gere l'affichage dans le filtre lors d'un recherche*/
  searchInFilters() {

    let list = document.querySelectorAll(".filter-item-anchor");
    this.input.addEventListener("keyup", () => {

      list.forEach((elt) => {
        if (elt.textContent.toLowerCase().indexOf(this.input.value.toLowerCase()) > -1){
          elt.style.display = "";
        }
        else { 
          elt.style.display = "none";
        }
      });
    });
  }

  /*affiche les éléments du filtre selectionnés sur la page*/
  displayChosenFilter() {

    let chosenFilterContainer = document.querySelector(".tag-container");

    this.chosenFilterArray.forEach((elt) => {

      let chosenFilterButton = document.createElement("button");
      chosenFilterButton.className += `chosen-tag-btn chosen-${this.name}`;
      chosenFilterButton.setAttribute("value", elt);

      let chosenButtonTxt = document.createElement("div");
      chosenButtonTxt.textContent = elt;

      let chosenButtonIcon = document.createElement("i");
      chosenButtonIcon.className += "far fa-times-circle";

        chosenFilterButton.appendChild(chosenButtonTxt);
        chosenFilterButton.appendChild(chosenButtonIcon);
        chosenFilterContainer.appendChild(chosenFilterButton);
    });
    this.listenFilterRemoval();
  }

  /* écoute les intéractions avec les filtres, applique le filtre, affiche celui selectionné et ferme le boutton après séléction*/
  listenFilterSelection() {

    let listDiv = this.filterContainer.querySelector(".filter-list");
    let listAnchor = listDiv.querySelectorAll(".filter-item-anchor");

    listAnchor.forEach((itemAnchor) => {

      itemAnchor.addEventListener("click", () => {

        this.chosenFilterArray.push(itemAnchor.id);
        let chosenFilterContainer = document.querySelector(".tag-container");
        chosenFilterContainer.textContent = "";

        this.recipeList.filterList.forEach((filter) =>filter.displayChosenFilter());
        this.recipeList.applyRecipesFilter();
        this.displayArrayFilter();
        this.recipeList.closeAllFilters();
      });
    });
  }

  /* écoute si des filtre selectionné pour éffacement, réapplique le tri, enlève l'élement selectionné et ferme les menus des filtres*/
  listenFilterRemoval() {

    let chosenFilterContainer = document.querySelector(".tag-container");
    let chosenFilterButtonList = chosenFilterContainer.querySelectorAll(`.chosen-${this.name}`);

    chosenFilterButtonList.forEach((elt) => {

      elt.addEventListener("click", () => {

        this.chosenFilterArray = this.chosenFilterArray.filter((e) => e !== elt.value);

        if (this.recipeList.searchedInput.length === 0) {
          this.recipeList.applyRecipesFilter(true);
        }

        else { 
          this.recipeList.searchWithInput(this.recipeList.searchedInput)
        }
        
        let chosenFilterContainer = document.querySelector(".tag-container");
          chosenFilterContainer.textContent = "";
        
        this.recipeList.filterList.forEach((filter) => filter.displayChosenFilter());
        this.open = false;
        this.recipeList.closeAllFilters();
      });
    });
  }
}
