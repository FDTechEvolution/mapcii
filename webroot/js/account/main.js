import {store} from '../store/index.js'
import {router} from './router/index.js'
import {packageIndex} from './packageIndex.js'
import {leftMenuAccount} from './leftMenuAccount.js'

new Vue ({
    el: '#account',
    store,
    router,
    components: {
        'package-index' : packageIndex,
        'menu-account' : leftMenuAccount
    },
    data () {
        return {

        }
    },
    mounted() {
        this.$store.dispatch('loadAssetList', true)
        this.$store.dispatch('loadFreeAssetList', true)
        this.$store.dispatch('loadBannerListToMyAccount', true)
        this.$store.dispatch('getUserProfiles')
        this.$store.dispatch('loadAssetFavorite', false)
    },
    methods: {
        
    }
})