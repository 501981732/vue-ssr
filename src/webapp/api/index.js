import ax from './axiosConfig.js'

export default {
    getTopics: data => ax.get('user/getdata',{ params: {} || data  })
}