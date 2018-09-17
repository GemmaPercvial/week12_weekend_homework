const BeerView = function(beer, container) {
  this.beer = beer;
  this.container = container;
}

BeerView.prototype.render = function() {
  const beerDiv = document.createElement('div');

  const beerName = document.createElement('h3');
  beerName.textContent = this.beer.name;

  beerDiv.appendChild(beerName);
  this.container.appendChild(beerDiv);
}

BeerView.prototype.renderList = function(container){
  const listDetails = document.createElement("ul");

  const tagline = document.createElement("li");
  tagline.textContent = `${this.beer.tagline}`;
  listDetails.appendChild(tagline);

  const description = document.createElement("li");
  description.textContent = `Region: ${this.beer.description}`;
  listDetails.appendChild(description);

  this.container.appendChild(listDetails);
}

BeerView.prototype.clearBeer = function () {
  this.container.innerHTML = '';
};

module.exports = BeerView;
