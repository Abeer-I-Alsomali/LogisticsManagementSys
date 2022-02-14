var listpath;
sap.ui.controller("LogisticMGMSystems.controller.Dispatcher", 
		
{

	onInit : function() {
		var oPlans = new sap.ui.model.json.JSONModel();
		oPlans.loadData("model/Plans.json");
		this.getView().setModel(oPlans, "Pland");

		var oPlanItems = new sap.ui.model.json.JSONModel();
		oPlanItems.loadData("model/PlanItems.json");
		this.getView().setModel(oPlanItems, "Oitems");
	},
	onNavBack : function() {
		this.getOwnerComponent().getRouter(this).navTo("Login");
	},
	onListSelect : function(oEv) {
		var that = this;
		// var PlanNo =
		// oEv.getSource().getSelectedItem().getBindingContext().getObject().PlanNo;
		
		var oListSel = this.getView().byId("oList");
        var aSelectedItems = oListSel.getSelectedItems();
        listpath = aSelectedItems[0].mAggregations.attributes[2].mProperties.text;
		
		var stat =oEv.getSource().getSelectedItem().mAggregations;
		var dat =oEv.getSource().getSelectedItem().mAggregations;
		
		var PlanNo = oEv.getSource().getSelectedItem().mProperties.title;
		this.getView().byId("idPlanNo").setText(PlanNo);
		this.getView().byId("idVesselNo").setText(oEv.getSource().getSelectedItem().mProperties.number);
		this.getView().byId("idStatus").setText(stat.attributes[2].mProperties.text);
		
		var planItems = this.getView().getModel("Oitems").getData().PlanItemData;
		var arrplanItems = [];

		for (var i = 0; i < planItems.length; i++) {
			if (PlanNo == planItems[i].PlanNo) {
				arrplanItems = planItems[i];
			}
		}

		var arrplanItemsMod = new sap.ui.model.json.JSONModel(arrplanItems);

		var idTabEmp = that.getView().byId("oTableItems");
		idTabEmp.setModel(arrplanItemsMod, "interM");

		idTabEmp.bindAggregation("items", "interM>/", new sap.m.ColumnListItem({
			cells : [
			new sap.m.Image({
				src : "{interM>/Image}",
				width : "50px",
				height : "40px"
			}), new sap.m.Text({
				text : "{interM>/PlanNo}"
			}), new sap.m.Text({
				text : "{interM>/ItemId}"
			}), new sap.m.Text({
				text : "{interM>/Quantity}"
			}), 
			new sap.m.Text({
				text : "{interM>/Status}"
			}),
			new sap.m.Text({
				text : "{interM>/Driver}"
			}),
			new sap.m.Text({
				text : "{interM>/Vehicle}"
			}) ]
		
		}));

	},
	handleAssignPress:function(){
		this._getPersonDialog().open();
	},
	_getPersonDialog : function() {
		if (!this._oDialogPerson) {
			this._oDialogPerson = sap.ui.xmlfragment(
					"LogisticMGMSystems.FragmentViews.Assign", this);
			this.getView().addDependent(this._oDialogPerson);		
		}
		return this._oDialogPerson;
	},
	handlecloseDialog : function() {
		this._getPersonDialog().close();
	},
	handleAssignBtnPress : function(oEvent) {
		var v1 = sap.ui.getCore().byId("idTipsIndicate1").getValue();
		var v2 = sap.ui.getCore().byId("idTipsIndicate2").getValue();
// 
		var oTable = this.getView().byId("oTableItems");
        var aSelectedItems = oTable.getSelectedItems();
        for(var i=aSelectedItems.length-1; i>=0; i--){ 
        	
           var oItemContextPath = aSelectedItems[i].sId;
           var aPathParts = oItemContextPath.split("-");
           var iIndex =  aPathParts[4];
             var oJSONData = this.getView().byId("oTableItems").getBinding("items").getModel().getData();
             oJSONData.Driver  = v1;
             oJSONData.Vehicle = v2;
             oJSONData.Status   = "Assigned";
             this.getView().byId("oTableItems").getBinding("items").getModel().setData(oJSONData);
             this.getView().byId("idStatus").setText("Assigned");
            
         }
       // listpath = "Completed";
        this.getView().byId("oList")._oSelectedItem.mAggregations.attributes[2].mProperties.text = 'Completed';
        //sap.ui.getCore().byId("oList").getBinding("items").refresh();
		this._getPersonDialog().close();
	},

});