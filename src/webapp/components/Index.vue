<template>
    <div class="index">
        <div>{{msg}}</div>
        <div class="index-bem">
            <button class="index-bem__btn index-bem--init" @click='increment'>
                +1
            </button>
            <button class="index-bem__btn"  @click='decrement'>
                -1
            </button>
            <h3>{{count}}</h3>

        </div>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
    // 生命周期只有mounted 和beforeMounted生效
    beforeMounted() {
    },
    mounted() {
        // fetchInitialData({store:this.$store,route:this.$route})
    },
    // 在 entry-server.js 中，我们可以通过路由获得与 router.getMatchedComponents() 相匹配的组件，如果组件暴露出 asyncData，我们就调用这个方法。然后我们需要将解析完成的状态，附加到渲染上下文(render context)中。
    // 留一个站位的过程 异步请求 告知后台SSR先去站位
    // asyncData: fetchInitialData,
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            num: 0
        }
    },
    methods: {
        ...mapActions([
            'increment',
            'decrement'
        ]),
    },
    computed: {
            ...mapGetters({
                count: 'getCount'
            })
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root{
    --mainColor: yellowgreen;
};
.index-bem--init {
    background: #193;
}
.index-bem__btn {
    width: 50px;
    border: 1px solid var(--mainColor);
    border-radius: 30px;
    outline: none;
}

</style>
