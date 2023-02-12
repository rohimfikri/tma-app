import { PaperFormat, PDFMargin } from 'puppeteer'
import { $puppeteer } from '~~/server/utils/puppeteer'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    // console.log(this)
    // console.log(event)
    // console.log($puppeteer())
    // const nuxtApp = useNuxtApp()
    // console.log(config)
    // let url = 'https://google.com'
    let url = config.appUrl+"/slip"
    console.log(url)
    let papersize : PaperFormat = 'A4'
    let is_landscape : boolean = false
    let margin : PDFMargin = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };
    let $pdf = await $puppeteer().printPDF(url,papersize,is_landscape,margin);
    // console.log($pdf)
    // $puppeteer().printPDF().then(pdf => {
    //     event.node.res.setHeader('Content-Type', 'application/pdf')
    //     event.node.res.setHeader('Content-Length', pdf.length)
    //     return event.node.res.end(pdf)
    // })
    event.node.res.setHeader('Content-Type', 'application/pdf')
    event.node.res.setHeader('Content-Length', $pdf.length)
    return event.node.res.end($pdf)
    // return 'sss';
})