import SibApiV3Sdk from 'sib-api-v3-sdk';
import fs from 'node:fs';
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    // const body = await readBody(event)
    // console.log(body)
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    // Configure API key authorization: api-key
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = "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"
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //apiKey.apiKeyPrefix['api-key'] = "Token"

    // Configure API key authorization: partner-key
    let partnerKey = defaultClient.authentications['partner-key'];
    partnerKey.apiKey = "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"
    // Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
    //partnerKey.apiKeyPrefix['partner-key'] = "Token"
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    // let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    // const attachment = await Fs.content(resolve('./assets/pdf/FORM REQUEST ACCOUNT EMAIL NON USER v1.pdf'));
    const attachment = fs.readFileSync(resolve('./assets/pdf/FORM REQUEST ACCOUNT EMAIL NON USER v1.pdf'), {encoding: 'base64'});
    // console.log(attachment);
    let apiParam = {

        "sender": { "email": "sendinblue@sendinblue.com", "name": "Sendinblue" },
        "subject": "This is my default subject line",
        "htmlContent": "<!DOCTYPE html><html><body><h1>My First Heading</h1><p>My first paragraph.</p></body></html>",
        // "params": {
        //     "greeting": "This is the default greeting",
        //     "headline": "This is the default headline"
        // },
        "attachment":[
            {
                content:attachment,
                name:'FILE ATTACH.pdf'
            }
        ],
        "messageVersions": [
            // Definition for Message Version 2
            {
                "to": [
                    {
                        "email": "rohimfikri@gmail.com",
                        "name": "Fikri Rohim"
                    },
                    // {
                    //     "email": "mark@example.com",
                    //     "name": "Mark Payton"
                    // },
                    // {
                    //     "email": "andrea@example.com",
                    //     "name": "Andrea Wallace"
                    // }
                ]
            }
        ]

    };
    // # Make the call to the client
    let ret = await apiInstance.sendTransacEmail(apiParam).then(function (data) {
        console.log('API called successfully. Returned data: ');
        console.log(data);
        return {
            status: true,
            response: 'success'
        };
    }, function (error) {
        // createError(error);
        return {
            status: false,
            response: error
        };
    });

    return ret;
    // if(ret.status){
    //     return ret;
    // }else{
    //     createError(ret.response);
    // }
})