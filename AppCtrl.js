//putting the controller declaration in IIFE to keep the gloabl scope clean
(function(){
    "use strict";

//Define App Controller
angular
	.module("contextMenuApp")
	.controller('ContextMenuAppController', ["$scope",function ($scope) {
        
       
	        //Context Menu1 array
	        $scope.menuOptions1 = [
	                                ['Edit', function() {
	                                    console.log("Edit Clicked");
	                                }],
	                                
	                                ['Link', function () {
	                                    console.log("Link Clicked");
	                                }],
	                                ['Delete', function () {
	                                    console.log("Delete Clicked");
	                                }],
	                                null,
	                                ['Properties', function () {
	                                    console.log("Properties Clicked");
	                                }]
	            
	        ]//end of menu1 array
	        
	        //Context Menu2 array
	        $scope.menuOptions2 = [
	                                ['Edit', function () {
	                                    console.log("Edit Clicked");
	                                }],
	                                null,
	                                ['Properties', function () {
	                                     console.log("Properties Clicked");
	                                }]
	        ];//end of menu2 array
	    }//end of controller function
	]);//end of controller declaration

}()); //end of IIFE 