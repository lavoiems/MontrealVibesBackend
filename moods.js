const moodsData = require('./data/moods.json');
const events = require('./events');
const _ = require('lodash');

module.exports = {
    get
};

function ranking(possibleMoods, periode) {
    const d = [];
    _.forEach(possibleMoods, mood => {
        const count = events.count(mood['name'], periode);
        d.push(Array(count).fill(mood));
    });
    return _.flatten(d);
}

function selectRandomMoods(ranks, n) {
    if (n === 0 || ranks.length === 0) return;
    const sample = _.sample(ranks);
    _.remove(ranks, r => r['name']===sample['name']);
    return _.concat(sample, selectRandomMoods(ranks, n-1));
}

function getPossibleMoods(periode) {
    return _.chain(moodsData['moods'])
        .filter((data) => {
        const x = _.map(data['info'], d => d['moment']);
        return x.indexOf(parseInt(periode)) >= 0;
    })
    .map(data => {
        const moment = _.find(data['info'], d => d['moment'] === parseInt(periode));
        return {name: data['name'], tagline: moment['tagline']};
    }).value();
}

function get(periode) {
    const moods = getPossibleMoods(periode);
    return selectRandomMoods(ranking(moods, periode), 6);

}