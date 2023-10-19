@isTest
public with sharing class SendFileControllerTest {
    @isTest static void testEmail(){
        Account newAcc = new Account();
        newAcc.Name = 'Cliente Nuevo';
        newAcc.Description = 'Description';
        newAcc.AccountNumber = '1232';
        newAcc.Active__c = 'Yes';
        newAcc.AnnualRevenue = 3000;
        newAcc.int_numeroIdent__c = '12345';
        newAcc.int_TipoIdent__c = 'RUT';
        insert newAcc;
        SendFileController.sendEmail('mauricioruiz506@gmail.com', newAcc.Id);
    }
}