export default class Likes {
  constructor() {
    this.readDataFromLocalStorage();
    if (!this.likes) this.likes = [];
  }

  addLike(id, title, publisher, img) {
    const like = { id, title, publisher, img };
    this.likes.push(like);

    // storage ruu hadgalna
    this.saveDataToLocalStorage();

    return like;
  }

  deleteLike(id) {
    //id gedeg ID tei Like iig index iig massive aas haij olno.
    const index = this.likes.findIndex((el) => el.id === id);

    // ug index deerh elementiig massive aas ustgana

    this.likes.splice(index, 1);

    // storage ruu hadgalna
    this.saveDataToLocalStorage();
  }

  isLiked(id) {
    // if (this.likes.findIndex((el) => el.id === id) === -1) return false;
    // else return true;
    // deerhiig tovchilj bichsen bn

    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumberOfLikes() {
    return this.likes.length;
  }

  // local storage deer hadgaldag function
  saveDataToLocalStorage() {
    //[] iig local storage ruu hj bolohgui bolhoor temdegt murluu hurvuuleed hiine uuniig json guitsetgene string ruu hurvuuldeg json
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readDataFromLocalStorage() {
    // json parse n stringt iig object bolgodog
    this.likes = JSON.parse(localStorage.getItem('likes'));
  }
}
