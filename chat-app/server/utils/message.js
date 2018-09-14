var generateMessage = (from,text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var generateLocation = (from,latitude,longitude) => {
  url = "https://www.google.com/maps?q=" +longitude + "," +latitude;
  return {
    from,
    url: url,
    createdAt: new Date().getTime()
  }
}


module.exports = {
  generateMessage,
  generateLocation
}
