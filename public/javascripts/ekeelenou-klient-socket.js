/**
 * Avab sokli serveri juurde
 */
var socket = io.connect('/');

/**
 * Serverilt sõnumite vastuvõtmine ja edasisuunamine
 */
socket.on('message', function(data) {
    data = JSON.parse(data);

    if (data['type'] === 'requestData') {
	// päringu vastuse puhul saadetakse andmed vaatele
	myViews[data['viewNawe']](data);
    } /* else if () {
	// muu vastuse puhul ...
    } */
});

/**
 * 'Otsi' nupp saadab sõnumi serverile
 */
$(document).ready(function() {
    $('#otsi').click(function() { // @todo: muuda userObject funktsiooniks
	var data = {};
	data['message'] = $('#Q').val();
	data['type'] = 'query';
	socket.send(JSON.stringify(data));
    });
});

