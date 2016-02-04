soulFood.controller('mainController', function($scope){
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [
    {
      image: 'images/soul_foodbg.jpg',
      text: 'subtitle',
      id: 0
    },
    {
      image: 'images/eventsbg.jpg',
      text: 'subtitle',
      id: 1
    },{
      image: 'images/chatbg.jpg',
      text: 'subtitle',
      id: 2
    }
    ,{
      image: 'images/newevent.jpg',
      text: 'subtitle',
      id: 3
    }
  ];

});
