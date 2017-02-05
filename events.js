const moodsData = require('./data/moods.json');
const promise = require('bluebird');
const googlePlaces = require('googleplaces');
const places = promise.promisify(new googlePlaces(process.env.GOOGLE_PLACES_API_KEY, process.env.GOOGLE_PLACES_OUTPUT_FORMAT).placeSearch);
const _ = require('lodash');
const expertData = require('./data/expert.json');

module.exports = {
    get
}

function find(field, tag) {
    return a = _.values(field).indexOf(tag) >= 0;
}

function getExperts(mood, day, moment) {
    return _.filter(expertData, data => find(data['mood'], mood) && find(data['opened'][parseInt(day)], moment));
}

function get(mood, day, moment) {
    const activities = getExperts(mood, day, moment);
    return activities;
}

function getTags(mood) {
    return _.chain(moodsData['moods'])
        .filter(data => data['name'].indexOf(mood) >= 0)
        .map(data => data['tags'])
        .value();
}
