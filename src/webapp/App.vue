<template>
    <div id="app">
        <img src="./assets/logo.png" alt="">
        <ul>
            <li>
                <router-link to='/' exact>首页</router-link>
            </li>
            <li>
                <router-link to='/test'>测试页</router-link>
            </li>
                <li>
                <router-link to='/about'>about</router-link>
            </li>
            <li>
                <router-link to='/topic'>topic</router-link>
            </li>
        </ul>
        <router-view />
    </div>
</template>
<script>
export default {
    name: 'App'
}
</script>
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

ul {
    display: flex;
    justify-content: space-around;
}
li {
    list-style: none;
}
</style>