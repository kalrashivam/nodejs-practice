var moment = require('moment');


var generateMessage = (from,text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocation = (from,latitude,longitude) => {
  url = "https://www.google.com/maps?q=" +longitude + "," +latitude;
  return {
    from,
    url: url,
    createdAt: moment().valueOf()
  }
}


module.exports = {
  generateMessage,
  generateLocation
}
