soulFood.factory('eventFactory', function($http)
{
	var factory = {};

	factory.addEvent = function(data, callback){
		console.log(data, "IN EVENT FACTORY")
		$http.post('/addEvent', data).success(function(output){
		callback(output); });
	}

	factory.getEvents = function(callback){
		$http.get('/getEvents').success(function(output){ callback(output); });
	}
  factory.getEventById = function (id, callback){
  		$http.get('/getEventById/' + id).success(function(output){ callback(output); });
  	}

	factory.destroyEvent = function (id,callback){
		$http.delete('/destroyEvent/'+id).success(function(output){callback(output);});
	}

	factory.attendEvent = function (event, currentUser){
		$http.post('/attendEvent/'+ event._id, currentUser).success(function(){ });
		// console.log(event, currentUser, 'in event factory');
	}
	return factory;
});
