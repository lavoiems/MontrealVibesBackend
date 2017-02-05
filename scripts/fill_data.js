const promise = require('bluebird');
const googlePlaces = require('googleplaces');
const places = promise.promisify(new googlePlaces(process.env.GOOGLE_PLACES_API_KEY, process.env.GOOGLE_PLACES_OUTPUT_FORMAT).textSearch);
const details = promise.promisify(new googlePlaces(process.env.GOOGLE_PLACES_API_KEY, process.env.GOOGLE_PLACES_OUTPUT_FORMAT).placeDetailsRequest);
const _ = require('lodash');
const fs = require('fs');
const sleep = require('sleep');

function getData(name) {
    parameters = {
        query: name,
        location: [45.516136, -73.656830],
        radius: 50000
    };
    return places(parameters)
        .then(res => {
            //    console.log(res);
            sleep.msleep(700);
            return details({reference: res.results[0].reference});
        });
}

function getDayInfo(day) {
    if (!day['close'] || !day['open']) return ['0','1','2','3'];
    const open = parseInt(day['open']['time']);
    const close = parseInt(day['close']['time']);
    let moments = [];
    if (open <= 1000 && close >= 1000) {
        moments.push('0');
    }
    if (open <= 1300 && close >= 1300) {
        moments.push('1');
    }
    if (open <= 1800 && close >= 1800) {
        moments.push('2');
    }
    if (open <= 2359 && close <= 600) {
        moments.push('3');
    }
    console.log(moments);
    return moments;
}

function getOpened(openingHours) {
    return _.mapValues(openingHours['periods'], getDayInfo);
}

function format_data(res) {
    const place = res.result;
    const opened = getOpened(place['opening_hours']);
    console.log(opened);
    const data = {
        images: place['photos'],
        url: place['url'],
        name: place['name'],
        rating: place['rating'],
        lat: place['geometry']['location']['lat'],
        long: place['geometry']['location']['lng'],
        formatted_address:place['address_components']['formatted_address'],
        opened: opened,
    };
    console.log(data);
    return data;

}

function formatPlace(place) {
    return getData(place['name'])
        .then(format_data)
        .then(data => _.assign(place, data));
}

function format(places, formattedArr, idx) {
    console.log(idx);
    formatPlace(places['places'][idx])
        .then(formatted => {
            formattedArr.push(formatted);
            fs.writeFile('data6.json', JSON.stringify(formattedArr), err => {
                sleep.msleep(2000);
                //if (idx === 37 || idx === 52) idx += 1;
                format(places, formattedArr, idx + 1);
            });
        });
}
const data = require('./events.json');

format(data, [], 80);
//getData('Beaver Lake').then(d => console.log(JSON.stringify(d)));
