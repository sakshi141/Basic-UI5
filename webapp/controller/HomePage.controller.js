sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel,Filter, Fragment) {
        "use strict";

        return Controller.extend("com.sap.project1.controller.HomePage", {
            onInit: async function () {

                let oModel = new JSONModel();

                await oModel.loadData("https://dummyjson.com/products")

                console.log(oModel.getData())

                this.getView().setModel(oModel);

                this.loadFragment();
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

            },

            onPress: function (oEvent) {

                const sPath = oEvent.getSource().getBindingContext().sPath,
                    oModel = this.getView().getModel();

                const oSelectedDetail = oModel.getProperty(sPath);

                const aImages = oSelectedDetail.images.map(url => ({ url }));

                oModel.setProperty("/oSelectedItem", aImages);

                this.oDetailsFragment.open();

            },

            loadFragment: function () {

                if (!this.oDetailsFragment) {
                    Fragment.load({
                        name: "com.sap.project1.view.fragment.Details",
                        controller: this
                    }).then((oDialog) => {


                        this.oDetailsFragment = oDialog;

                        this.getView().addDependent(this.oDetailsFragment);


                    }).catch((oErr) => {
                        console.log(oErr);
                    })
                }
            },

            onClose: function() {
                this.oDetailsFragment.close();
            }


        });
    });
