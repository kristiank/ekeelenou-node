// avame sokli serveri juurde
var socket = io.connect('/');

// seome soklisündmustele funktsioonid
socket.on('queryData', function (data) {
  data = JSON.parse(data);
  $('#results').append('<div>' + data + '</div>');
});

$(document).ready(function(){
  // seome nupudele funktsioonid
  $('#queryButton').click(function(){
    var data = {
      queryString: $('#queryString').val(),
      selectedSources: $('#mySources').val()
    };
    socket.emit('query', JSON.stringify(data));
  });
  $('.addSource').click(function(){
    var data = {
      id: $(this).data('id')
    };
    socket.emit('addSource', JSON.stringify(data));
  });
  $('.removeSource').click(function(){
    var data = {
      id: $(this).data('id')
    };
    socket.emit('removeSource', JSON.stringify(data));
  });
});
