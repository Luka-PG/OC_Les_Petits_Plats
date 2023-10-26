// récupération des recettes
 export async function getRecipes() {
	try {
		const response = await fetch('data/recipesData.js')
		const recipes = await response.json()
		return recipes
	} catch (err) {
		console.error(err)
	}
}
