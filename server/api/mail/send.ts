import SibApiV3Sdk from 'sib-api-v3-sdk';
import fs,{unlinkSync} from 'node:fs';
import { resolve } from 'node:path'
import { PaperFormat, PDFMargin } from 'puppeteer'
import os from 'node:os'
import archiver from 'archiver'
import zip_encryptable from 'archiver-zip-encryptable'

export default defineEventHandler(async (event) => {
    // archiver.registerFormat('zip-encryptable', zip_encryptable);
    const config = useRuntimeConfig()
    const body = await readBody(event)
    // console.log(body)
    // console.log(body.person)
    // console.log(body.structur)
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
    let url = config.appUrl+"/slip/"+body.id+"/"+body.nip+"/"+body.period
    // console.log(url)
    let papersize : PaperFormat = 'A4'
    let is_landscape : boolean = false
    let margin : PDFMargin = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };
    let $pdf = await $puppeteer().printPDF(url,papersize,is_landscape,margin);
    // const filepath = resolve('./assets/pdf/slip_'+body.nip+'_'+body.period+'.pdf')
    // const outfilepath = resolve('./assets/pdf/protected-slip_'+body.nip+'_'+body.period+'.pdf')
    // fs.writeFileSync(filepath, $pdf);
    // const outfilepath = resolve('./assets/pdf/slip_'+body.nip+'_'+body.period+'.zip')
    // if (fs.existsSync(outfilepath)) {
    //     console.log('file exists');
    //     unlinkSync(outfilepath);
    // } else {
    //     console.log('file not found!');
    // }
    // const outputFile = fs.createWriteStream(outfilepath,{encoding:'utf-8'});
    // let archive = archiver('zip-encryptable', {
    //     zlib: { level: 9 },
    //     forceLocalTime: true,
    //     password: 'TMA1234'
    // });
    // archive.pipe(outputFile);
    // archive.append($pdf, { name: 'slip_'+body.nip+'_'+body.period+'.pdf' });
    // await archive.finalize();
    // outputFile.end()

    // console.log($pdf);
    // const attachment = fs.readFileSync(outfilepath, {encoding: 'base64'});
    const attachment = $pdf.toString('base64');
    // console.log(attachment);
    let dt = new Date();
    dt.setFullYear(1900);
    dt.setMonth(0);
    dt.setDate(1);
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    // console.log(body.structur);
    let tmp = body.person[body.structur.pyr_field] - 1;
    // console.log(tmp);
    dt.setTime(dt.getTime() + (tmp * (3600 * 24) * 1000));
    const myear = dt.toLocaleString('id-ID', { month: 'long', }) + " " + dt.getFullYear();
    // console.log(myear);
    let apiParam = {
        "sender": { "email": "no-reply@techmayantara.com", "name": "no-reply TMA" },
        "subject": "Slip Gaji Fikri Rohim Bulan "+myear,
        "htmlContent": `<!DOCTYPE html><html><body><p>Salam,<br>
        Hallo <b>${body.person[body.structur.name_field]}</b> (NIP:<b>${body.nip}</b>), terlampir disampaikan slip gaji untuk bulan <b>${myear}</b>.<br>
        Apabila memerlukan klarifikasi atau informasi lebih lanjut, bisa menghubungi <b>Ibu Irene</b>.<br><br>
        Terima kasih.</p></body></html>`,
        // "params": {
        //     "greeting": "This is the default greeting",
        //     "headline": "This is the default headline"
        // },
        "attachment":[
            {
                content:attachment,
                // name:'slip_'+body.nip+'_'+body.period+'.zip'
                name:'slip_'+body.nip+'_'+body.period+'.pdf'
            }
        ],
        "messageVersions": [
            // Definition for Message Version 2
            {
                "to": [
                    {
                        "email": body.person[body.structur.email_field],
                        "name": body.person[body.structur.name_field]
                    },
                    // {
                    //     "email": "mark@example.com",
                    //     "name": "Mark Payton"
                    // },
                    // {
                    //     "email": "andrea@example.com",
                    //     "name": "Andrea Wallace"
                    // }
                ],
                "cc": [
                    // {
                    //     "email": "tmainfo2010@gmail.com",
                    //     "name": "TMA Info"
                    // },
                    {
                        "email": "irene.husni2@gmail.com",
                        "name": "Irene Husni"
                    },
                    // {
                    //     "email": "andrea@example.com",
                    //     "name": "Andrea Wallace"
                    // }
                ]
            }
        ]

    };
    // # Make the call to the client
    // let ret = true;
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