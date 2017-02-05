const moodsData = require('./data/moods.json');
const _ = require('lodash');

module.exports = {
    get
};

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
    return _.take(_.shuffle(getPossibleMoods(periode)), 6);
}