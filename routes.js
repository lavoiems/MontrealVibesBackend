const routesData = require('./data/route.json')['route'];
const expertData = require('./data/expert.json');
const _ = require('lodash');

module.exports = {
    get
}

function getPlaces(place) {
    return _.find(expertData, data => data['url'] === place);
}

function get(name) {
    const routes = _.find(routesData, data => data['name'] === name);
    return _.map(routes['places'], getPlaces);
}