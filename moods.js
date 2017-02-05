const moodsData = require('./data/moods.json');
const _ = require('lodash');

module.exports = {
    get
};

function get(periode) {
    return _.chain(moodsData['moods'])
    .filter((data) => {
            const x = _.map(data['info'], d => d['moment']);
            return x.indexOf(parseInt(periode)) >= 0;
        })
    .map(data => {
        return {name: data['name'], tagline: data['tagline']};
    })
    .value();
}