require('@babel/polyfill');
import Search from './model/Search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView'; // bugdiig n geheeree * tavidag bga
import Recipe from './model/Recipe';
import List from './model/list';
import Like from './model/Like';
import * as likesView from './view/likesView';
import * as listView from './view/listView';
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe,
} from './view/recipeView';

// class deer object uusgehdee
// let search = new Search('pasta');
// search.doSearch().then((r) => console.log(r));

/* edgeeriig bagtaassan state iig hiij ugnu ingesneer uur uur conrtolleruud ene state iig shuud ashiglaj bolno. edgeer medeelluudiig state gesen object dorot hadgalna.

 *- hailtiin query , ur dun
 *- Tuhain uzuulj bgaa jor 
 *- Like hiisen joruud 
 *- Zahialj bga joriin nairlaguud
 *
 * * */

const state = {};
/*8
 *MVC = model view controller
 * hailtiin controller = Model bolon view 2 iig holbolj ajildagiig n  ugdugiig controller gene
 * Model ==> Controller <== View
 */
const controlSearch = async () => {
  // 1) web ees hailtiin tulhuur ugiig gargaj avna
  const query = searchView.getInput();

  if (query) {
    // 2) shineer hailtiin object iig usgej ugnu

    state.search = new Search(query);
    //3) hailt hiihed zoriulj delgetsiin UI iig beltgene

    searchView.clearSearchQuery();
    searchView.clearSearchResult();

    renderLoader(elements.searchResultDiv);

    // 4) hailtiig guitsetgene
    await state.search.doSearch();
    // 5) hailtiin ur dung delgetsend uzuulne

    clearLoader();

    if (state.search.result === undefined) alert(' hailtaar ilersengui .... ');
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

//closest n target dotor bga elementiin hamgiin oirhon dr n daradsaniig gargaj irne
elements.pageButtons.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');

  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

/*
 *Joriin Conroller
 */

//# uurchlugddug event
const controlRecipe = async () => {
  // 1 ) URL -aas ID -iig calgaj
  const id = window.location.hash.replace('#', '');

  // URL dr id bga esehiig shalgana
  if (id) {
    //2) Joriin modeliig uusgej ugnu state ruugaa hiij ugnu
    state.recipe = new Recipe(id);

    //3) UI delegtsiig beltgene. unmu uzuulj sn joriig tseverlene
    clearRecipe();
    renderLoader(elements.recipeDiv);

    highlightSelectedRecipe(id);

    //4) Joroo tataj abchirna
    await state.recipe.getRecipe();

    //5) Joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    //6) Joroo delgetsend gargana
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

//shineer  like modeliig app dunguj achaallahad uusgene
window.addEventListener('load', (e) => {
  if (!state.likes) state.likes = new Like();

  // like tsesiig gargah esehiig shiideh (haah zurhiig alga bolgoh)
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());

  // like uud baival tedgeeriig tsesend nemj haruulna
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

/**
 * Nairlagnii Controller
 *
 */

const controlList = () => {
  // Nairlagnii modeliig uusgene

  state.list = new List();

  // umnuh haragdaj bsn nairlaguudiig delgetsnees ustgana
  listView.clearItems();

  // ug odelruu odoo haragdaj bga joriin buh nairlagiig avch hiine

  state.recipe.ingredients.forEach((n) => {
    // tuhain nairlagiig model ruu hine

    const item = state.list.addItem(n);
    //tuhain nairlagiig delgetsend gargane
    listView.renderItem(item);
  });
  // state.recipe.ingredients
};

/**
 * Like controller end bn
 */

const controlLike = () => {
  // Daragdsan joriig avch model ruu hiine
  // 1 ) like iin modliig uusgene
  if (!state.likes) state.likes = new Like();
  //2)odoo haragdaj bgaa joriin id iig olj abah
  const currentRecipeId = state.recipe.id;
  //3)  ene joriig like hiisen esehiig shalgah

  if (state.likes.isLiked(currentRecipeId)) {
    //4) like darsan bol like iig n boliulna
    state.likes.deleteLike(currentRecipeId);
    // haragdaj bga like iin tsesnees ustgana
    likesView.deleteLike(currentRecipeId);

    // like tovchnii like hiisen baidliig boliulah tovch
    likesView.toggleLikeBtn(false);
  } else {
    //5) like daraagui bol like daruulna
    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    // like tsesnd ene like iig oruulah
    likesView.renderLike(newLike);

    // like tovchnii like iig like darsan bolgono
    likesView.toggleLikeBtn(true);
  }
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

elements.recipeDiv.addEventListener('click', (e) => {
  if (e.target.matches('.recipe__btn, .recipe__btn *')) {
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});

elements.shoppingList.addEventListener('click', (e) => {
  // click hiisen li elementiin data-itemid atribute iig  shuuj gargaj abach bn
  const id = e.target.closest('.shopping__item').dataset.itemid;

  //oldson id tei ortsiig model oos ustgana
  state.list.deleteItem(id);

  // delgetsees iim id tei ortsiig olj bas ustgana

  listView.deleteItem(id);
});
