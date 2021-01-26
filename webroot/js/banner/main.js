import {store} from '.././store/index.js'
import {bannerAddIndex} from './components/add/bannerAddIndex.js'

new Vue ({
    el: '#banner',
    store,
    components: {
        'banner-add' : bannerAddIndex
    },
    mounted() {
        
    }
})