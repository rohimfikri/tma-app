import { resolve } from 'node:path'

const main = async() => {
    // console.log(PDFNet);
    const doc = await $pdfnet().PDFDoc.create();
    const page = await doc.pageCreate();
    doc.lock();
    doc.pagePushBack(page);
    doc.save(resolve('./assets/pdf/blank.pdf'), $pdfnet().SDFDoc.SaveOptions.e_linearized);
    doc.unlock();
};

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    // import {PDFNet} from pdfnet;
    const PDFNet = await $pdfnet.default.PDFNet;
    console.log("==================");
    console.log("==================");
    console.log("==================");
    console.log(PDFNet);
    PDFNet.initialize('demo:1676163922537:7d2408ef0300000000e469202dddfc459157ffc2c94cd7a4860bcf5426');
    // const {runWithCleanup, shutdown} = PDFNet;
    // const doc = await PDFNet.PDFDoc.create();
    // const page = await doc.pageCreate();
    // doc.pagePushBack(page);
    // doc.save(resolve('./assets/pdf/blank.pdf'), PDFNet.SDFDoc.SaveOptions.e_linearized);
    // console.log(doc);
    // const PDFNet = pdfnet.PDFNet;
    // console.log(PDFNet); 
    // $pdfnet().runWithCleanup(main, 'demo:1676163922537:7d2408ef0300000000e469202dddfc459157ffc2c94cd7a4860bcf5426').catch(function(error) {
    //     console.log('Error: ' + JSON.stringify(error));
    // }).then(function(){ $pdfnet().shutdown(); });
    // // PDFNet.runWithCleanup(main);
    // $pdfnet().shutdown();
    PDFNet.shutdown();
    return {
        ret:true,
        msg:"PDF GENERATED"
    }
});