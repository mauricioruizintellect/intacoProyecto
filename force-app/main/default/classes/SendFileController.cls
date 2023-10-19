public with sharing class SendFileController {

    @AuraEnabled
    public static void sendEmail(String email,String accountId){
        Messaging.SingleEmailMessage emailToSend = new Messaging.SingleEmailMessage();
        Messaging.EmailFileAttachment file = new Messaging.EmailFileAttachment();
        PageReference pref = page.pdfAccount;
        pref.getParameters().put('id',accountId);
        pref.setRedirect(true);
        Blob pageBody;
        if(Test.isRunningTest()){
            pageBody = blob.valueOf('pdf para el test');
        }else{
            pageBody = pref.getContent();
        }
        file.setFileName('Actualización Cliente.pdf');
        file.setBody(pageBody);
        emailToSend.setSubject('Notificación cliente actualizado!');
        emailToSend.setToAddresses(new List<String>{email});
        emailToSend.setPlainTextBody('Se adjunta archivo pdf con los detalles del cliente actualizado.');
        emailToSend.setFileAttachments(new Messaging.EmailFileAttachment[]{file});
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{emailToSend});
    }
}