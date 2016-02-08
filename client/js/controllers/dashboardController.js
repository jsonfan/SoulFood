soulFood.controller('dashboardController', function($scope, $routeParams, $location, userFactory, eventFactory, profileFactory, restaurantFactory){
  $scope.user = {};

  userFactory.checkLogin(function(response){
    // console.log('check login', response);
    if(!response.data){
      $location.url('login');
    }
    $scope.user = response.data;
    console.log($scope.user);
  });

  userFactory.getUser(function(data){
    console.log(data);
    $scope.userid = data;
  })
  console.log($scope.userid);
  refreshUser();
  function refreshUser(){
    userFactory.checkLogin(function(response){
      $scope.user = response.data;
      console.log(response.data, 'in user dashboard!!!!!!!')
    })
  }

  getAllUsers();
  function getAllUsers(){
    userFactory.getAllUsers(function(data){
      // console.log(data, 'all user data');
      console.log($scope.user, 'current user data');
      console.log($scope.user._id, 'current id from oauth');
      getEventListById($scope.user._id);
      ///remove current user from available friend list
      var currentUser = $scope.user;
      for(var i = 0; i<data.length; i++){
        if(data[i]._id === currentUser._id){
          data.splice(i, 1);
        }
      }
      //this loop will run when current users length bigger than user's friends length
      if(data.length >= currentUser.friends.length){
         for(var j =0; j < data.length; j++){
          for(var k = 0; k < currentUser.friends.length; k++){
            if(data[j]._id === currentUser.friends[k]._id){
              data.splice(j, 1);
            }
          }

        }
        console.log(k);
        console.log(j);
      }
      // this loop will run when user's friends length is longer than users length
      else {
         for(var k =0; k < data.length; k++){
          for(var j = 0; j < currentUser.friends.length; j++){
            if(data[j]._id === currentUser.friends[j]._id){
              data.splice(k, 1);
            }
          }
        }
      }
      $scope.persons = data;
    })
  }

  $scope.addFriend = function(friend, user){
    console.log('HEY IM TRYING TO ADD A FRIEND!!!!');
    for(var i = 0; i<user.friends.length; i++){
        if(user.friends[i]._id === friend._id){
          // alert('You already friend with ' + friend.name);
          return;
        }
    }
    userFactory.addFriend(friend, user, function(response){
      // alert(friend.name + ' has been added to your friend list');
      // console.log(response);
      console.log('just added a friend!');
      getAllUsers();
      refreshUser();
    });
    // console.log('YO IM GONNA ADD A FRIEND!!!');

  }

  $scope.removeFriend = function(friend, user){
    var friendId = friend._id;
      for(var i = 0; i<user.friends.length; i++){
        if(friendId === user.friends[i]._id){
          var friend_index = i;
        }
      }
    userFactory.removeFriend(friendId, user._id, friend_index, function(response){
      // console.log(response);
      getAllUsers();
      refreshUser();
    })
    // $location.url('dashboard');
  }

  $scope.logout = function(){
    userFactory.logoutUser();
    $location.url('/');
  }

  $scope.events =[];

  var id= $scope.userid._id;
    var getEventListById = function(id)
   {
    profileFactory.getEventsById(id,function(data)
    {
       $scope.events = data;
        console.log(data, 'DATA BACK FROM CURRENT USERS');
        console.log($scope.events);
      })
    }

  function getEventListById(currentUserId)
  {
    console.log(currentUserId, 'current users id')
    profileFactory.getEventsById(currentUserId,function(data)
    {
   
      $scope.events = data;
      // console.log($scope.events, 'event got back from');
    })
  }

  $scope.addEvent = function(){
    $scope.newEvent.user = $scope.user;
    $scope.newEvent.date = $scope.newEvent.date.toDateString()
    $scope.newEvent.time = $scope.newEvent.time.toLocaleTimeString();
 		// $scope.newEvent.events = 0;
    console.log($scope.newEvent, 'IN CONTROLLER')
 		eventFactory.addEvent($scope.newEvent, function(){
 			getEventListById(id);
 		});
     $scope.newEvent = {};
  	}

  $scope.destroyEvent = function(event_id) {
    console.log(event_id);
    eventFactory.destroyEvent(event_id, function(result){
      if(result.status == 'result') {
        console.log('error');
      }
      getEventListById(id);
    })
  }
  $scope.nevigateToEvent = function(){
    $location.url('events');
  }
});
