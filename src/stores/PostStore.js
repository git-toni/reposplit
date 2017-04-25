import {observable,  computed} from 'mobx';

class PostStore{
  @observable displayPosts = []
  @observable displayFilters = {
    query: '',
    categories: [],
    per_page: 10,
    page: 1,
    sort_column: '',
    sort_direction: 'ASC',

  }
  get asJS(){
    return { 
      displayFilters: this.displayFilters, 
    }
  }

}
const post = new PostStore()

export default post
