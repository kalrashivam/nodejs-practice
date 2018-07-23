
yargs = require('yargs');

address = require('./geocode/geocode');

var input = yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
}
)
.help()
.argv;

console.log(input.a);

address.geocodeAddress(input.a,function(error, results){
  if(error){
    console.log(error);
  }else {
    console.log(JSON.stringify(results,undefined,2));
    address.weather(results.latitude,results.longitude,function(error, results){
      if(error){
        console.log(error);
      }else {
        console.log(JSON.stringify(results, undefined, 4));
      }
    });
  }
});
