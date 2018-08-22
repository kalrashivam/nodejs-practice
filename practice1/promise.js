request = require('request');
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

var geocodeAddress = (address) => {
  encodedaddress = encodeURIComponent(address);
  return new Promise((resolve,reject) => {
    request({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodedaddress+'&kEY=AIzaSyDEShOxBcbTDfWXcc5a1YQrRjl3vzsZRVQ',
      json: true
    },(error,response,body) => {
      if(error){
        reject(e);
      }else if((response.statusCode == 200)&&(body.status!='ZERO_RESULTS')&&(body.status='OK')){
        resolve({
          address: body.results[0].formatted_address,
          lng: body.results[0].geometry.location.lng,
          lat: body.results[0].geometry.location.lat
        });
      }else{
        reject('unknown error ocured');
      }
    })
  })

}

geocodeAddress(address).then((message) => {
  console.log(message);
},(error) => {
  console.log(error);
});
