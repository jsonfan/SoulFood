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
      image: 'images/parallax2.jpg',
      text: 'subtitle',
      id: 1
    },{
      image: 'images/parallax4.jpg',
      text: 'subtitle',
      id: 2
    }
    ,{
      image: 'images/parallax1.jpg',
      text: 'subtitle',
      id: 3
    }
  ];

});
