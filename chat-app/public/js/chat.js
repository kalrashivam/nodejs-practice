var socket = io();

socket.on('connect', () => {
  
  var params = jQuery.deparam(window.location.search);

  socket.emit('join',params,function(err) {
    if(err){
      alert(err);
      window.location.href = '/';
    } else {
      console.log("no error");
    }
  });
});

socket.on('disconnect', () => {
  console.log('disconnected user');
})

// socket.emit('createMessage',{
//   text:"this is a trial message",
//   from:"jacob"
// });


function scrollToBottom() {
  var messages = jQuery('#messages');
  var newMsg = messages.children('li:last-child');

 var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight= messages.prop('scrollHeight');
  var newMessageHeight = newMsg.innerHeight();

  if((clientHeight + scrollTop + newMessageHeight +scrollHeight) >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('getMessage', (message) => {
  console.log(message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formattedTime
  });
  // var li = jQuery('<li> </li>');
  // msg = message.from + '  ' + message.text+' '+ formattedTime;
  // li.text(msg);
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('getLocation', (message) => {
  console.log(message);
  var li = jQuery('<li> </li>');
  var a = jQuery('<a target="_blank">My current Location</a>');
  li.text(message.from);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
  scrollToBottom();
});


socket.on('adminmessage', (message) => {
  console.log('admin message \n', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

jQuery('#form-element').on('submit', function(e){
  console.log('trying');
  e.preventDefault();

  socket.emit('createMessage', {
    from: "user",
    text: jQuery('[name=message]').val()
  },function(){
    jQuery('[name=message]').val(" ")
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
