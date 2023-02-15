<template>
    <div >
        <WebViewer :path="`http://localhost:3000/webviewer`"
            url="http://localhost:3000/api/payroll/generate" />
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