'use strict';


  angular.module('voterCircleApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.bootstrap.modal',
  'flock.bootstrap.material',
  'toaster'
])
  .config(function(){
    // works with arrive js
    $.material.init();
})
  .filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
  })
  .directive('exportToCsv',function(){
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var el = element[0];
          element.bind('click', function(e){
            var table = document.getElementById('table');//e.target.nextElementSibling;
            var csvString = '';
            for(var i=0; i<table.rows.length;i++){
              var rowData = table.rows[i].cells;
              for(var j=0; j<rowData.length;j++){
                csvString = csvString + rowData[j].innerHTML + ",";
              }
              csvString = csvString.substring(0,csvString.length - 1);
              csvString = csvString + "\n";
          }
            csvString = csvString.substring(0, csvString.length - 1);
            var a = $('<a/>', {
                style:'display:none',
                href:'data:application/octet-stream;base64,'+btoa(csvString),
                download:'contacts.csv'
            }).appendTo('body')
            a[0].click()
            a.remove();
          });
      }
    }
  })
.filter('ceil', function() {
    return function(input) {
        return Math.ceil(input);
    };
})
  .config(function ($stateProvider, $urlRouterProvider) {
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/app/manageContacts');
    $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'views/main.html',
        controller:'MainCtrl'
      })
      .state('app.contacts', {
        url: '/manageContacts',
        views: {
          'detailView': {
            templateUrl: 'views/manage-contacts-view.html',
            controller:'ContactdetailsCtrl'
           }
        }
      })
  })




