sap.ui.controller("LogisticMGMSystems.controller.Home", {

	
	
	onLoader : function() {
		this.getOwnerComponent().getRouter(this).navTo("Loader");
	},
	
	
	onDispatcher : function() {
		this.getOwnerComponent().getRouter(this).navTo("Dispatcher");
	}
	
	
	

}
);