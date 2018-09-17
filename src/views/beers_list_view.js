const PubSub = require('../helpers/pub_sub');
const BeerView = require('./beer_view');

const BeersListView = function(){
  this.data = null;
}

BeersListView.prototype.bindEvents = function (){
  PubSub.subscribe('Beers::all-beer-data', (event) => {
    this.data = event.detail;
    this.render();
  });
}

BeersListView.prototype.render = function(){
  const container = document.querySelector('.beerslist');
  this.data.forEach((beer) => {
    const beerView = new BeerView(beer, container)
    beerView.render();
  });
}

module.exports = BeersListView;
