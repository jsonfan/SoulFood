var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var User = mongoose.model('User');
var Restaurant = mongoose.model('Restaurant');
module.exports = (function(){
	return {
		addEvent: function(req, res){
			var events = new Event(req.body);
			console.log(req.body, "IN ADD EVENT SERVER!!!!!!!!!!!!!!!!!")
  			events.save(function(err, record){
  				if(err){
  					res.json({status:'failed', err:err})
  				}
  				else{
  					User.update({email: req.body.email}, {$inc: { events: 1 }}, {multi: true}, function(err1, record1) {
		  				if(err){
		  					res.json({status:'failed', err:err})
		  				}
		  				else{
		  					res.json({status:'success'})
		  				}
		  			})
  				}
  			})
		},
		getEvents: function(req, res){
			Event.find({}).populate('comments').populate('comments.user').populate('user').populate('attenders').populate('restaurant').exec(function(err, events){
				    res.json(events);
      })
		},
		getEventsById: function(req, res){
			console.log(req.params.id);
      Event.find({user:req.params.id}).populate('comments').populate('comments.user').populate('user').populate('restaurant').exec(function(err, events){
				console.log('here i am',events);
				    res.json(events);
			})
		},
		getEventById: function(req, res)	{
      	Event.find({_id:req.params.id}).populate('comments').populate('comments.user').populate('user').populate('restaurant').exec(function(err, events){
            console.log(events, 'IS THIS FUNCTION RUNNING');
				    res.json(events);

      	})
    },

		destroyEvent: function(req, res)
		{
			Event.remove({_id: req.params.id}, function(err, results)
			{
				if(err)
				{
					res.json({status: 'failed', err: err});
				}
				else
				{
					res.json({status: 'success'});
				}
			})
		},

    attendEvent: function(req, res){
    	console.log(req.body, ' user in server');
    	Event.findOne({_id:req.params.id}, function(err, result){
    		result.attenders.push(req.body);
    		result.save(function(err){
	          res.json(err);
	          if(err){
	            res.json({err: err});
	          } else {
	            res.json(true);
	          }
	        })
    	})
    }
  }
})();
