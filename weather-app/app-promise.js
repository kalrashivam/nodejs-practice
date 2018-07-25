axios = require('axios');
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
)
.help()
.argv;

console.log(input.a);
  var encodedarg = encodeURIComponent(input.a);

  locationurl = 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodedarg+'&kEY=AIzaSyDEShOxBcbTDfWXcc5a1YQrRjl3vzsZRVQ';

axios.get(locationurl).then(function(response){
  console.log(JSON.stringify(response.data,undefined,2));
  lat=response.data.results[0].geometry.location.lat;
  lng=response.data.results[0].geometry.location.lng;
  weatherurl='https://api.darksky.net/forecast/868b598656755a82c08654fbe716a598/'+lat+','+lng;
  axios.get(weatherurl).then(function(response2){
    console.log(response2.data.currently);
  }).catch(function(e2){
    if(e2.response.status == '400'){
      console.log('can"t access weather');
    };
  });

}).catch(function(e){
  if(e.code='ENOTFOUND'){
    console.log('error occured while fetching lat long');
  }
});
