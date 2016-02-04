var mongoose = require('mongoose');
var Yelp = require('yelp');
var yelp = new Yelp({
  consumer_key: "1pDdwYrTx--Gp0lHnVVuSw",
  consumer_secret: "qbIU6lyygVC_adOrtbSUHU6W9I8",
  token: "cKlvZGvUjcsnCQYjT_KEz-3bWVbJWm-p",
  token_secret: "JeoIWIF2Okwwuxjv5YDvhfjQ9j4"
});
var Restaurant = mongoose.model('Restaurant');
var User = mongoose.model('User');
module.exports = (function(){
  return{
    addRestaurant: function(req, res){
      User.findOne({_id: req.body.currentUser._id}, function(err, user){
        var newRestaurant = new Restaurant({
          categories: req.body.categories,
          display_phone: req.body.display_phone,
          image_url: req.body.image_url,
          location: req.body.location,
          name: req.body.name,
          rating: req.body.rating,
          rating_img_url: req.body.rating_img_url,
          url: req.body.url,
          id: req.body.id
        });
        user.favorite_restaurants.push(newRestaurant)
        user.save(function(err){
          if(err){
            res.json({err: err});
          } else {
            res.json(true);
          }
        });
        var restaurant = new Restaurant(newRestaurant);
         restaurant.save(function(err){
            if(err){
              console.log('error trying to create!');
              res.json({err: err});
            } else {
              res.json(true);
              }
          })
      })
    },
    // getAllRestaurants: function(req, res){
    //   Restaurant.find({}, function(err, restaurants){
    //     if(err){
    //       res.json({err: err});
    //     } else {
    //       res.json(restaurants);
    //     }
    //   })
    // },
  //   getRestaurant: function(req, res){
  //     Restaurant.findOne({_id: req.params.id}, function(err, results){
		// 		if(err) {
		// 			res.json({status:'failed', err:err})
		// 		} else {
		// 			res.json(results);
		// 		}
  //     })
		// },
    removeRestaurant: function(req, res){
      console.log(req.params.id, 'current user id')
      console.log(req.body._id, 'current restaurant id')
      User.findOne({'_id' : req.params.id}, function(err, user){
        for(var i=0; i < user.favorite_restaurants.length; i++){
          if(user.favorite_restaurants[i]._id == req.body._id){
            user.favorite_restaurants.splice(i, 1);
            break;
          }
        }
        user.save(function(err){
          if(err){
            res.json({err: err});
          } else {
            res.json(true);
          }
        })
      })
    },
    searchRestaurants: function(req,res){
      console.log('searching with this', req.body);
      //https://www.yelp.com/developers/documentation/v2/search_api
      yelp.search({ term: req.body.find, location: req.body.location })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
      });
    }
  }
})();
