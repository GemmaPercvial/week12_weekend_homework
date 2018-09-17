const Beers = require('./models/beers');
const BeersListView = require('./views/beers_list_view');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const beersListView = new BeersListView();
  beersListView.bindEvents();

  const beers = new Beers;
  beers.getData();
})
