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

  // ul ruugee nemne dom iin element ruu yum nemehdee insertAdjastment gej bichne
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const clearSearchQuery = () => {
  elements.searchInput.value = '';
};

export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = '';
  elements.pageButtons.innerHTML = '';
};

export const getInput = () => elements.searchInput.value;

// hailtaar garch irsen medeelluudiig delgetsend gargaj ugnu
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 10) => {
  // hailtiin ur dung huudaslaj uzuuleh
  // herev currentPage =2 bol start = 10 , end = 20 bolno
  const start = (currentPage - 1) * resPerPage; // huudsiig tootsoh

  const end = currentPage * resPerPage;

  //buh jornuudiig huleej avna medeej ene n massive irne teheer []aar davtalt hiij neg negeer n tsagaan heseg deer nemj gargana
  recipes.slice(start, end).forEach(renderRecipe);

  // huudaslaltiin tovchiig gargaj ireh
  // math ceil deesheegee buheldeh toog
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(currentPage, totalPages);
};

// type ===> 'prev' ,'next ' gesen 2 tovch bga gej uzii
const createButton = (
  page,
  type,
  direction
) => `<button class="btn-inline results__btn--${type}" data-goto=${page}>
<span>Хуудас ${page}</span>
<svg class="search__icon">
  <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
</button>`;

const renderButtons = (currentPage, totalPages) => {
  let buttonHtml;

  if (currentPage === 1 && totalPages > 1) {
    // 1 -r huudsan deer bn 2 -r huudas gesen tovchiig garga

    buttonHtml = createButton(2, 'next', 'right');
  } else if (currentPage < totalPages) {
    // umnuh bolon daraagiin huudas ruu shiljih tovchiig uzuul
    buttonHtml = createButton(currentPage - 1, 'prev', 'left');
    buttonHtml += createButton(currentPage + 1, 'next', 'right');
  } else if (currentPage === totalPages) {
    // hamgiin suuliin huudas bn . umnuh ruu shiljih tovchiig uzuulne
    buttonHtml = createButton(currentPage - 1, 'prev', ' left');
  }

  elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHtml);
};
