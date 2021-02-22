require('@babel/polyfill');
import Search from './model/Search';

// class deer object uusgehdee
let search = new Search('pasta');
search.doSearch().then((r) => console.log(r));
