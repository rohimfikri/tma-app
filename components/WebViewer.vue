<template>
    <div>sssd</div>
    <div id='webviewer' ref='viewer'></div>
</template>

<script>
/* eslint-disable */
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
                licenseKey: 'demo:1676163922537:7d2408ef0300000000e469202dddfc459157ffc2c94cd7a4860bcf5426'
            }, this.$refs.viewer).then((instance) => {
                // call apis here
            });
        })
    }
}
</script>


<style>
#webviewer {
    height: 100vh;
}
</style>