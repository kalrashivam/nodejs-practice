request = require('request');
yargs = require('yargs');

var input = yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
}
).help
.argv;

console.log(process.argv);

// var encodedarg = encodeUriComponent(input.address);
// console.log(encodedarg)
request({
  url: 'http://maps.googleapis.com/maps/api/geocode/json?address=1680%20outram%20lines%20delhi-110009',
  json: true
}, function(error,response,body){
  // console.log(JSON.stringify(body, undefined,4));
  console.log('latitude :'+ body.results[0].geometry.location.lat);
  console.log('latitude :'+ body.results[0].geometry.location.lng);

});
