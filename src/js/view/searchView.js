// delgetsnii hailttai holbootoi buh code uudiig end bairshuulna
import { elements } from './base';

// image_url: "http://forkify-api.herokuapp.com/images/4364270576_302751a2a4f3c1.jpg"
// publisher: "The Pioneer Woman"
// publisher_url: "http://thepioneerwoman.com"
// recipe_id: "47161"
// social_rank: 99.99999689667648
// source_url: "http://thepioneerwoman.com/cooking/2010/02/my-favorite-pizza/"
// title: "PW’s Favorite Pizza"

// tuhain neg element iig delgetsen deer gargaj ugdug function
// private function
const renderRecipe = (recipe) => {
  console.log(recipe);
  const markup = `
   <li>
  <a class="results__link" href="#${recipe.recipe_id}">
    <figure class="results__fig">
      <img src="${recipe.image_url}" alt="Test" />
    </figure>
    <div class="results__data">
      <h4 class="results__name">${recipe.title}</h4>
      <p class="results__author">${recipe.publisher}</p>
    </div>
  </a>
</li>`;

  // ui ruugee nemne dom iin element ruu yum nemehdee insertAdjastment gej bichne
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const clearSearchQuery = () => {
  elements.searchInput.value = '';
};

export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = '';
};

export const getInput = () => elements.searchInput.value;

// hailtaar garch irsen medeelluudiig delgetsend gargaj ugnu
export const renderRecipes = (recipes) => {
  //buh jornuudiig huleej avna medeej ene n massive irne teheer []aar davtalt hiij neg negeer n tsagaan heseg deer nemj gargana
  recipes.forEach(renderRecipe);
};
