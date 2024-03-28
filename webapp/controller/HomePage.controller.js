sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel,Filter) {
        "use strict";

        return Controller.extend("com.sap.project1.controller.HomePage", {
            onInit: async function () {

                let oModel = new JSONModel();

                await oModel.loadData("https://dummyjson.com/products")

                console.log(oModel.getData())

                this.getView().setModel(oModel);
            },
            onButtonClicked: function () {
                MessageBox.information("Button Clicked");
            },
            onSearchFieldLiveChange:function(oEvent){
               let sVal = oEvent.getParameters().newValue; 
              
               let aFilters = [];

               if(sVal){
                //creating filter
                let titleFilter = new Filter("title","Contains", sVal) //property, condition, current val

                aFilters.push(titleFilter)
               }

               //apply filter to list on items 
               let oList = this.byId('idProductsList');
               let oBinding = oList.getBinding('items');

               oBinding.filter(aFilters)

            }
        });
    });
