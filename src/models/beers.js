const PubSub = require('../helpers/pub_sub')
const RequestHelper = require('../helpers/request_helper')

const Beers = function(){
  this.data = null;
}

Beers.prototype.getData = function(){
  const requestHelper = new RequestHelper('https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json');
  requestHelper.get((data) =>{
    this.data = data;
    PubSub.publish('Beers::all-beer-data', this.data);
  });
}

module.exports = Beers;
