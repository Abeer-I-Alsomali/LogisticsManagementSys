sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict";
   return Controller.extend("logisticsmanagementsystem.controller.Login", {
	   onInit : function(){
		   
	   },
	   
      onLoader : function () {
         // show a native JavaScript alert
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo("Loader")
		  alert("Hello World");

      }
   });
});