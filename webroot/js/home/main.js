import {showAssetInHome} from './components/showAssetInHome.js'

new Vue ({
    el: '#ishome',
    components: {
        'get-assets' : showAssetInHome
    },
    data() {
        return {
            assetLoading: true
        }
    },
    mounted() {
        this.visitorCounter()
    },
    methods: {
        visitorCounter() {
            let formData = new FormData()
            formData.append('type', 'web')
            axios.post(apiurl + 'api-visitor-counters/web-counter', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }
    }
})