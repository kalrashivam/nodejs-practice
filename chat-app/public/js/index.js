var socket = io();

socket.on('connect', () => {
  console.log('connected user');
});

socket.on('disconnect', () => {
  console.log('disconnected user');
})

// socket.emit('createMessage',{
//   text:"this is a trial message",
//   from:"jacob"
// });

socket.on('getMessage', (message) => {
  console.log(message);
  var li = jQuery('<li> </li>');
  msg = message.from + '  ' + message.text;
  li.text(msg);
  jQuery('#messages').append(li);
});

socket.on('getLocation', (message) => {
  console.log(message);
  var li = jQuery('<li> </li>');
  var a = jQuery('<a target="_blank">My current Location</a>');
  li.text(message.from);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});


socket.on('adminmessage', (message) => {
  console.log('admin message \n', message);
  var li = jQuery('<li> </li>');
  msg = message.from + '  ' + message.text;
  li.text(msg);
  jQuery('#messages').append(li);
});

jQuery('#form-element').on('submit', function(e){
  console.log('trying');
  e.preventDefault();

  socket.emit('createMessage', {
    from: "user",
    text: jQuery('[name=message]').val()
  });
})

var locationbutton = jQuery('#location');
locationbutton.on('click', function(e){
  if(!navigator.geolocation){
    return alert("turn share location on");
  }

  navigator.geolocation.getCurrentPosition(function(Position){
    socket.emit('sharelocation',{
      from: "user",
      latitude:Position.coords.latitude,
      longitude:Position.coords.longitude
    });
  }, function(){
    alert('unable to fetch location');
  })
})
