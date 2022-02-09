sap.ui.define([
   "sap/ui/core/mvc/Controller"
], function (Controller) {
   "use strict";
   return Controller.extend("logisticsmanagementsystem.controller.Loader", {
	   onInit : function(){
		   
	   },
	   
      onPlanSelects : function (oEvent) {
         // show a native JavaScript alert
    	    var oObject = oEvent.getSource().getBindingContext("plan").getObject();

    	   var ItemArray = oObject.PlanToItems.results;
    	   var oItem = new sap.ui.model.json.JSONModel(ItemArray);
    	   this.getView().setModel(oItem, "LPConfitems");
    	   
    	   alert(ItemArray[0].ZuphrDescrip);
      },
      
      onTest: function(){
    	  
      }
   });
});