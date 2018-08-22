request = require('./geocode.js');
yargs = require('yargs');


const argv = yargs.options({
  a: {
    describe: 'Address to be fetched',
    alias: 'address',
    string: true,
    demand: true
  }
}).help()
.alias('help','h')
.argv;

address = argv.a;
console.log(address);

request.geocodeAddress(address,(error,results) => {
  if(error){
    console.log(error);
  }else{
    console.log(results);
  }
});
