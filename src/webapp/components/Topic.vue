<template>
    <div class="topic">
        <h2>topic</h2>
        <div v-for='(topic,i) in topics' :key='i'>
            <p>{{topic.title}}</p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
// const fetchInitialData = ({store,route:{params:{id}}}) => {
const fetchInitialData = ({ store }) => {
    // 触发 action 后，会返回 Promise
    return store.dispatch('getTopics')
}
export default {
    name: 'topic',
    components: {},
    asyncData: fetchInitialData,
    data() {
        return {

        }
    },
    mounted() {
        fetchInitialData({ store: this.$store, route: this.$route })
    },
    methods: {

    },
    watch: {

    },
    computed: {
        ...mapGetters({
            topics: 'getTopics'
        })
    }
}
</script>
<style scoped>
</style>