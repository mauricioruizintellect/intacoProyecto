public with sharing class ProductAPI {


    @AuraEnabled
    public static void sendProductToAPI(String productName, Decimal price, String description){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://dummyjson.com/products/add');
        request.setMethod('POST');
        request.setHeader('Content-Type','application/json');
        map<string,Object> bodyMap = new map<string,Object>();
        bodyMap.put('title',productName);
        bodyMap.put('price',price);
        bodyMap.put('description',description);
        String stringJSON = JSON.serialize(bodyMap);
        System.debug(stringJSON);
        request.setBody(stringJSON);
        HttpResponse response = http.send(request);
        Integer statusCode = response.getStatusCode();
        System.debug(response);
        System.debug(statusCode);
    }

}