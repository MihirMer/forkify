import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // loader
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultPage());
    bookmarkView.update(model.state.bookmarks);

    // load recipe from api
    await model.loadRecipe(id);

    // console.log(model.state.recipe);
    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    resultsView.renderSpinner();

    // get search query
    const query = searchView.getQuery();

    // skipping empry search
    if (!query) return;

    // loading search results
    await model.loadSearchResult(query);

    //render
    // console.log(model.state.search.results);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultPage());

    // render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // console.log(goToPage);
  //render new result
  resultsView.render(model.getSearchResultPage(goToPage));
  //render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe serving (in state)
  model.updateServings(newServings);

  // update recipe view
  recipeView.update(model.state.recipe);
  // recipeView.render(model.state.recipe);
};

const controlToggleBookmark = function () {
  // add or remove bookmark
  !model.state.recipe.bookmarked // if not bookmarked
    ? model.addBookmark(model.state.recipe) // bookmark it!
    : model.removeBookmark(model.state.recipe.id); // else unbookmark it

  // update recipe view
  recipeView.update(model.state.recipe);

  // render bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};
const init = function () {
  bookmarkView.addHandleRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerAddBookmark(controlToggleBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};
init();
