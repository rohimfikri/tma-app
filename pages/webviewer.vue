<template>
    <div >
        <WebViewer :path="`http://localhost:3000/webviewer`"
            url="https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf" />
    </div>
</template>

<script setup>
</script>

<style scoped>
html,
body {
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0 auto;
    height: 100vh;
}

#webviewer {
    height: 100vh;
}
</style>