import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendEmail from '@salesforce/apex/SendFileController.sendEmail'

export default class EditAccount extends LightningElement {
    // Flexipage provides recordId and objectApiName
    @api recordId;
    email;
    handleSuccess(event) {
        this.showToast('Cliente actualizado','success','Cliente actualizado exitosamente.');
        window.open("/apex/pdfAccount?id="+this.recordId);
    }
    handleClick(event){
        if(this.email !== undefined){
            this.sendEmailMethod();
        }
        else{
            this.showToast('Enviar Correo','warning','Por favor especificar un email.');
        }
    }
    captureEmail(event){
        this.email = event.target.value;
    }

    showToast(title,variant,message) {
        const event = new ShowToastEvent({
            title: title,
            variant: variant,
            message:message
        });
        this.dispatchEvent(event);
    }

    sendEmailMethod(){
        sendEmail({
            email:this.email,
            accountId:this.recordId
        })
        .then( result => {
            console.log(result);
            this.showToast('Enviar Correo','success','Correo enviado.');
        })
        .catch( error => {
            console.log(error);
            this.showToast('Enviar Correo','warning','Ocurrió un error.');
        });
    }
}