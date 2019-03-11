<style src='./index.css'></style>
<template>
    <div class="test">
        text
    </div>
</template>

<script>
    export default {
        mounted() {
            import('./index.js').then(res=>{
                res.default()
            })
        }
    }
</script>
