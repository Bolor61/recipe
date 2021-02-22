// hailtiin query g hadgalna mun tuhain query geer oldson ur dung dotoroo hadgalna class aar bichne
require('@babel/polyfill');
import axios from 'axios'; // import iig hamgiin deer n tavidag

export default class Search {
  constructor(query) {
    this.query = query;
  }

  // hailt hiih code

  async doSearch() {
    try {
      let result = await axios(
        'https://forkify-api.herokuapp.com/api/search?q=' + this.query
      );

      this.result = result.data.recipes;

      return this.result;
    } catch (error) {
      alert('Asuudal garlaa' + error);
    }
  }
}
