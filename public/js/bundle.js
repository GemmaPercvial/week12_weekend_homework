/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Beers = __webpack_require__(/*! ./models/beers */ \"./src/models/beers.js\");\nconst BeersListView = __webpack_require__(/*! ./views/beers_list_view */ \"./src/views/beers_list_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('JavaScript Loaded');\n\n  const beersListView = new BeersListView();\n  beersListView.bindEvents();\n\n  const beers = new Beers;\n  beers.getData();\n})\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n    console.log('publish');\n  },\n\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request_helper.js":
/*!***************************************!*\
  !*** ./src/helpers/request_helper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const RequestHelper = function (url) {\n  this.url = url\n}\n\nRequestHelper.prototype.get = function (onComplete) {\n  const xhr = new XMLHttpRequest();\n  xhr.open('GET', this.url);\n  xhr.addEventListener('load', function() {\n    if(this.status !== 200){\n      return;\n    }\n    const data = JSON.parse(this.responseText);\n    onComplete(data);\n  });\n  xhr.send();\n};\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./src/helpers/request_helper.js?");

/***/ }),

/***/ "./src/models/beers.js":
/*!*****************************!*\
  !*** ./src/models/beers.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub */ \"./src/helpers/pub_sub.js\")\nconst RequestHelper = __webpack_require__(/*! ../helpers/request_helper */ \"./src/helpers/request_helper.js\")\n\nconst Beers = function(){\n  this.data = null;\n}\n\nBeers.prototype.getData = function(){\n  const requestHelper = new RequestHelper('https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json');\n  requestHelper.get((data) =>{\n    this.data = data;\n    PubSub.publish('Beers::all-beer-data', this.data);\n  });\n}\n\nmodule.exports = Beers;\n\n\n//# sourceURL=webpack:///./src/models/beers.js?");

/***/ }),

/***/ "./src/views/beer_view.js":
/*!********************************!*\
  !*** ./src/views/beer_view.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const BeerView = function(beer, container) {\n  this.beer = beer;\n  this.container = container;\n}\n\nBeerView.prototype.render = function() {\n  const beerDiv = document.createElement('div');\n\n  const beerName = document.createElement('h3');\n  beerName.textContent = this.beer.name;\n\n  beerDiv.appendChild(beerName);\n  this.container.appendChild(beerDiv);\n}\n\nBeerView.prototype.renderList = function(container){\n  const listDetails = document.createElement(\"ul\");\n\n  const tagline = document.createElement(\"li\");\n  tagline.textContent = `${this.beer.tagline}`;\n  listDetails.appendChild(tagline);\n\n  const description = document.createElement(\"li\");\n  description.textContent = `Region: ${this.beer.description}`;\n  listDetails.appendChild(description);\n\n  this.container.appendChild(listDetails);\n}\n\nBeerView.prototype.clearBeer = function () {\n  this.container.innerHTML = '';\n};\n\nmodule.exports = BeerView;\n\n\n//# sourceURL=webpack:///./src/views/beer_view.js?");

/***/ }),

/***/ "./src/views/beers_list_view.js":
/*!**************************************!*\
  !*** ./src/views/beers_list_view.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub */ \"./src/helpers/pub_sub.js\");\nconst BeerView = __webpack_require__(/*! ./beer_view */ \"./src/views/beer_view.js\");\n\nconst BeersListView = function(){\n  this.data = null;\n}\n\nBeersListView.prototype.bindEvents = function (){\n  PubSub.subscribe('Beers::all-beer-data', (event) => {\n    this.data = event.detail;\n    this.render();\n  });\n}\n\nBeersListView.prototype.render = function(){\n  const container = document.querySelector('.beerslist');\n  this.data.forEach((beer) => {\n    const beerView = new BeerView(beer, container)\n    beerView.render();\n  });\n}\n\nmodule.exports = BeersListView;\n\n\n//# sourceURL=webpack:///./src/views/beers_list_view.js?");

/***/ })

/******/ });