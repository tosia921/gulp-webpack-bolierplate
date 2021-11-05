//imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // pulling id from hash
    const id = window.location.hash.slice(1);
    // checking is hash/id exists
    if (!id) return;
    // spinner
    recipeView.renderSipnner();
    // Loading recipe
    await model.loadRecipe(id);
    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
//listenes to hashchanges to display recipes
['hashchange', 'load'].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);
