require('@babel/polyfill');
import Search from './model/Search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView'; // bugdiig n geheeree * tavidag bga

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
