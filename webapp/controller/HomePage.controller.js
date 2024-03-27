sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel) {
        "use strict";

        return Controller.extend("com.sap.project1.controller.HomePage", {
            onInit: function () {
                let jsonData={
                    title: "iPhone 9",
                    id: "1"
                };
            
                let oModel = new JSONModel(jsonData);
                this.getView().setModel(oModel,"products");
            },
            onButtonClicked: function () {
                MessageBox.information("Button Clicked");
            }
        });
    });
