request = require('request');

geocodeAddress = function(address, callback){
  var encodedarg = encodeURIComponent(address);
  // console.log(encodedarg);
  request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodedarg+'&kEY=AIzaSyDEShOxBcbTDfWXcc5a1YQrRjl3vzsZRVQ',
    json: true
  }, function(error,response,body){

     if(error){
       callback('shivam check this out:  '+ error);
       // console.log('shivam check this out:  '+ error);

     }else if (body.status != 'OK') {
       callback('no such value can be accepted');
       // console.log('no such value can be accepted');
     }else {
       callback(undefined, {
         address: body.results[0].formatted_address,
         longitude:body.results[0].geometry.location.lng,
          latitude:body.results[0].geometry.location.lat
       });
       // console.log(JSON.stringify(body, undefined,4));
      }
  });
}

weather = function(){
  request({
    url:'https://api.darksky.net/forecast/868b598656755a82c08654fbe716a598/42.3601,-71.0589',
    json: true
  },function(error,response,body){
    if(error){
      console.log('check eror'+ error);
    }else if (response.statusCode == '400') {
      console.log('unable to connect to the api');
    }else if (response.statusCode == '200'){
      console.log(body.currently);
    }
  });

}



module.exports ={
  geocodeAddress,
  weather
}
