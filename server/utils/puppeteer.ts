import puppeteer, { PaperFormat, PDFMargin } from 'puppeteer'

export function $puppeteer(){
    return {
        printPDF: async (url:string,format:PaperFormat = 'A4', landscape:boolean = false, margin:PDFMargin|undefined) => {
            const browser = await puppeteer.launch({ 
                headless: true, 
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                ignoreDefaultArgs: ['--disable-extensions']
            });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle0' });
            const myElement = await page.$('#slip-page');
            // await page.evaluate(el => {
            //     el = el.cloneNode(true);
            //     document.body.innerHTML = `
            //         ${el.outerHTML}
            //     `;
            // }, myElement);
            const pdf = await page.pdf({ 
                format ,
                landscape,
                margin
                // headerTemplate: '<h1 style="50pt">HEADER</h1>',
                // headerTemplate: `<div style="width:100vw;height:50vh;font-size:20rem;color:red;display:block">
                //     <div style="background-color:blue;display:block">
                //         <span class="pageNumber"></span>
                //         <span>XXX</span>
                //     </div>
                // </div>`,
                // displayHeaderFooter: true
            });

            await browser.close();
            // console.log(pdf);
            return pdf
        }
    }
}