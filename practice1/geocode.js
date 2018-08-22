const request = require('request');

var geocodeAddress = (address,callback) => {
  encodedaddress = encodeURIComponent(address);

  request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodedaddress+'&kEY=AIzaSyDEShOxBcbTDfWXcc5a1YQrRjl3vzsZRVQ',
    json: true
  },(error,response,body) => {
    if(error){
      callback(e);
    }else if((response.statusCode == 200)&&(body.status!='ZERO_RESULTS')&&(body.status='OK')){
      callback(undefined,{
        address: body.results[0].formatted_address,
        lng: body.results[0].geometry.location.lng,
        lat: body.results[0].geometry.location.lat
      });
    }else{
      callback('unknown error ocured');
    }
  })
}

module.exports = {
  geocodeAddress
}
