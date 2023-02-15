<template>
    <div id='webviewer' ref='viewer'></div>
</template>

<script>
/* eslint-disable */
let instanceViewer = null;
export default {
    name: 'WebViewer',
    props: {
        path: String,
        url: String
    },
    mounted: function () {
        import('@pdftron/webviewer').then(() => {
            WebViewer({
                path: '../webviewer',
                initialDoc: this.url, // replace with your own PDF file
                // licenseKey: 'demo:1676163922537:7d2408ef0300000000e469202dddfc459157ffc2c94cd7a4860bcf5426'
            }, this.$refs.viewer).then((instance) => {
                // call apis here
                instanceViewer = instance;
            });
        })
    },
    watch: { // It listens to the change in prop name
        url: function () {
            // console.log("name change"); // print out when the name changes
            // console.log(this.url)
            instanceViewer.UI.loadDocument(this.url, {});
        },
    },
}
</script>


<style>
#webviewer {
    height: 100vh;
}
</style>