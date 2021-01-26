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

    },
    methods: {
        
    }
})