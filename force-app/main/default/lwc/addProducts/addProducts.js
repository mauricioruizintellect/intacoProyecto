import { LightningElement } from 'lwc';
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import PRODUCT_OBJECT from "@salesforce/schema/Product2";
import NAME_FIELD from "@salesforce/schema/Product2.Name";
import PRICE_FIELD from "@salesforce/schema/Product2.Price__c";
import DESCRIPTION_FIELD from "@salesforce/schema/Product2.Description";
import sendProductAPI from '@salesforce/apex/ProductAPI.sendProductToAPI';


export default class AddProducts extends LightningElement {
    description;
    isLoading = false;
    handleClick(evt) {
        console.log('Current value of the input: ' + evt.target.value);
        const allValid = [
            ...this.template.querySelectorAll('lightning-input,lightning-textarea'),
        ].reduce((validSoFar, inputCmp) => {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);
        if (allValid) {
            this.isLoading = true;
            const productName = this.template.querySelector('[data-element="productName"]');
            const productPrice = this.template.querySelector('.productPrice');
            this.runAPIProduct(productName.value,productPrice.value);
        } else {
            alert('Please update the invalid form entries and try again.');
        }
    }
    captureDescription(event){
        if(event.target.name == 'descProd'){
            this.description = event.target.value;
            console.log(this.description);
        }
    }

    runAPIProduct(productName,price){
        sendProductAPI({
            productName,
            price,
            description : this.description
        })
        .then(result => {
            this.createProduct(productName,price);
            console.log('producto enviado a la api');
        })
        .catch(error => {
            console.log(error);
            this.isLoading = false;
        });
    }

    createProduct(productName,price) {
        const fields = {};
        console.log(NAME_FIELD.fieldApiName);
        fields[NAME_FIELD.fieldApiName] = productName;
        fields[PRICE_FIELD.fieldApiName] = price;
        fields[DESCRIPTION_FIELD.fieldApiName] = this.description;
        fields["IsActive"] = true;
        const recordInput = { apiName: PRODUCT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
          .then((product) => {
            this.isLoading = false;
            this.resetInput();
            this.fireToast('Producto Creado','Producto creado','Success');
          })
          .catch((error) => {
            this.isLoading = false;
            this.fireToast('Error creando el registro',error.body.message,'error');
          });
      }

      fireToast(title,message,variant){
        this.dispatchEvent(
            new ShowToastEvent({
              title,
              message,
              variant
            })
          );
      }

      resetInput(){
        this.template.querySelectorAll('lightning-input,lightning-textarea').forEach(element => {
            element.value = null;
        });
      }
}