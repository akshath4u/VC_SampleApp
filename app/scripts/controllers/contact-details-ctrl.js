'use strict';

/********************************************************************************
**  Added CURD functionality 
**  Added Search contact missing some filter
**  Added sort functionality by clicking heading tag eg: Name,Email and Location
*******************************************************************************/

angular.module('voterCircleApp')
  .controller('ContactdetailsCtrl',['$scope','$modal','toaster', function ($scope,$modal,toaster) {
    
  	$scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.user={};

    $scope.sortType     = 'name'; // set the default sort type
  	$scope.sortReverse  = false;  // set the default sort order
  	$scope.searchUser   = '';     // set the default search/filter term
    $scope.undoContact={};

    $scope.numberOfPages=function(){
        return Math.ceil($scope.contacts.length/$scope.pageSize);                
    }
    
    //inserts the dummy data using a random array
    $scope.initializeDummyData=function(){
      var locations=['mubai','cochin','bangalore','delhi','chennai','hydherabad'];
      for (var i=0; i<100; i++) {
      var randomNumber = Math.floor(Math.random()*locations.length);
        $scope.contacts.push({name: "user"+i,email: "user"+i+'@votercircle.com',location:locations[randomNumber]});
      }
    };

    //condition to check contact list undefined
    if(angular.equals($scope.contacts, undefined)){
      $scope.contacts = [];
      $scope.initializeDummyData();
    }

    $scope.contact={};

    //modal instance open here
    $scope.open=function(){

      $scope.modalInstance=$modal.open({
      templateUrl: '../../views/register-contact-modal.html',
      scope: $scope,
        controller: 'ContactdetailsCtrl',
        size: 'sm',
        backdrop: 'static',
        resolve: {
          contact: function () {
            return $scope.contact;
          }
        }
      });
    }

    //for closing the modal instance
    $scope.cancel = function() {
      $scope.modalInstance.dismiss('cancel');
      $scope.contact={};
    };

    //function to add new contact
    $scope.add=function(contact){
      $scope.contacts.push($scope.contact);
      toaster.pop('success', 'Success', 'Succesfully Added!');
      $scope.cancel();
    };

    $scope.SelectAll=function(){
      $scope.user.name=true;
      $scope.user.email=true;
      $scope.user.group=true;
      $scope.user.location=true;
    }

    $scope.ClearAll=function(){
      $scope.user.name=false;
      $scope.user.email=false;
      $scope.user.group=false;
      $scope.user.location=false;
    }

    $scope.edit=function(index){
      $scope.type='edit';
      $scope.undoContact=angular.copy($scope.contacts[index]);
      $scope.contacts[index].edit=true;
    }

    $scope.save=function(index){
      delete $scope.contacts[index].edit;
      toaster.pop('success', 'Updated', 'Succesfully Updated!');
    }

    $scope.delete=function(index){
      $scope.contacts.splice(index,1);
      toaster.pop('success', 'Deleted', 'Succesfully Deleted!');
    }

    $scope.cancelEdit=function(index){
      delete $scope.contacts[index].edit;
      $scope.contacts[index]=$scope.undoContact;
      toaster.pop('success', 'Cancelled', 'Updation Cancelled!');
    }

  }]);
