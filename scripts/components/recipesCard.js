export default class recipe {

    /*construction de la liste de recettes filtrés lors des recherches*/
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ingredients = data.ingredients;
        this.ustensils = data.ustensils;
    }

    /*layout de l'html des cartes de recettes*/
    render() {

        const article = document.createElement('article');
            article.setAttribute("id", this.name)
            article.setAttribute("class", 'recipe-card')

        const anchor = document.createElement('a');
            anchor.setAttribute("href", "#");
            anchor.className += "item-anchor";

        const divImg = document.createElement('div');
            divImg.className += "card-img";

        const img = document.createElement('img');
            img.setAttribute("src", `assets/images_recettes/Recette${this.id}.jpg`);
            img.setAttribute("alt", this.name);

        const divInfo = document.createElement('div');
            divInfo.className += "div-info"

        const cardHeader = document.createElement('div');
            cardHeader.className += "card-header"

        const cardTitle = document.createElement('div');
            cardTitle.textContent = this.name;
            cardTitle.className += "card-title";

        const cardTime = document.createElement('div');
            cardTime.className += "card-time-container"

        const cardTimeIcon = document.createElement('span');
            cardTimeIcon.className += "fa fa-clock-o";

        const cardTimeText = document.createElement('div');
            cardTimeText.textContent = `${this.time} min`
            cardTimeText.className += "card-time";

        const cardInfoContent = document.createElement('div');
            cardInfoContent.className += "card-infoContent"

        const ingredientTitle = document.createElement("h6")
            ingredientTitle.className += "ingredient-title"
            ingredientTitle.textContent = "Ingredients :"

        const ingredients = document.createElement('div')
            ingredients.className += "div-ingredients"

        const ingredientList = document.createElement('ul');
            ingredientList.className += "ingredient-list"

        this.ingredients.forEach(elt => {

            const li = document.createElement('li');
                li.className += "li-ingredients"

            if(!!elt.quantity){

                const name = document.createElement('p');
                    name.textContent = elt.ingredient + ": ";
                    name.className += "card-ingredient-name"
                    li.appendChild(name);
            
                const divIngredients = document.createElement ('div')
                    divIngredients.className += "div-Quantity-Ingredients"
                    li.appendChild(divIngredients)

                if (!!elt.unit) {
                    const amount = document.createElement('p');
                        amount.textContent = elt.quantity + " " + elt.unit;
                        amount.className += "quantity p-quantity"
                        divIngredients.appendChild(amount);

                }
                else{
                    const amount = document.createElement('p');
                        amount.textContent = elt.quantity ;
                        amount.className += "quantity p-quantity"
                        divIngredients.appendChild(amount);
                }
            }
            else{
                const name = document.createElement('p');
                    name.textContent = elt.ingredient;
                    name.className += "card-ingredient-name"
                    li.appendChild(name);
            
                const divIngredients = document.createElement ('div')
                    divIngredients.className += "div-Quantity-Ingredients"
                    li.appendChild(divIngredients)

                const amount = document.createElement('p');
                    amount.textContent = " ";
                    amount.className += "fake-quantity"
                    divIngredients.appendChild(amount);
            }
        
            ingredientList.appendChild(li)
        })

        const desc = document.createElement('p');
            desc.className += "description"
            desc.textContent = this.description;

        ingredients.appendChild(ingredientList);
        article.appendChild(anchor);
            anchor.appendChild(divImg);
            anchor.appendChild(divInfo);
                divImg.appendChild(img)
        divInfo.appendChild(cardHeader);
        divInfo.appendChild(cardInfoContent);
            cardHeader.appendChild(cardTitle);
            cardHeader.appendChild(cardTime);
                cardTime.appendChild(cardTimeIcon);
                cardTime.appendChild(cardTimeText);

        cardInfoContent.appendChild(ingredientTitle)
        cardInfoContent.appendChild(ingredients);
        cardInfoContent.appendChild(desc);

        return (article);
    }
}