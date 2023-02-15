<template>
<div id="adobe-dc-view" class="w-full h-full"></div>
</template>

<script>
let adobeDCView = null;
export default {
    name: 'PdfViewer',
    // head: {
    //   script: [
    //     { type: 'text/javascript', src: 'https://documentservices.adobe.com/view-sdk/viewer.js', async: true, body: true}, // Insert in body
    //   ],
    // },
    props: {
        name: String,
        url: String
    },
    created: function(){
        console.log(process.client)
        if (process.client) {
            console.log("CLIENT")
            document.addEventListener("DOMContentLoaded", function(){ 
            //     console.log("ADOBE READY")
                adobeDCView = new AdobeDC.View({clientId: "02ff5e9a208a4348bc1738b1ee189b5b", divId: "adobe-dc-view"});
                // adobeDCView.previewFile({
                //     content:{location: {url: this.url}},
                //     metaData:{fileName: this.name}
                // }, {embedMode: "SIZED_CONTAINER"});
            });
        }
    },
    watch: { // It listens to the change in prop name
        url: function () {
            if (process.client) {
                adobeDCView = new AdobeDC.View({clientId: "02ff5e9a208a4348bc1738b1ee189b5b", divId: "adobe-dc-view"});
                // console.log("url")
                adobeDCView.previewFile({
                    content:{location: {url: this.url}},
                    metaData:{fileName: this.name}
                }, {embedMode: "SIZED_CONTAINER"});
            }
        },
    },
    created: function () {
        // console.log(process.client)
        // if (process.client) {
        //     document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
        //         var adobeDCView = new AdobeDC.View({clientId: "02ff5e9a208a4348bc1738b1ee189b5b", divId: "adobe-dc-view"});
        //         adobeDCView.previewFile({
        //             content:{location: {url: "https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea Brochure.pdf"}},
        //             metaData:{fileName: "Bodea Brochure.pdf"}
        //         }, {embedMode: "SIZED_CONTAINER"});
        //     });
        // }
    }
}
</script>