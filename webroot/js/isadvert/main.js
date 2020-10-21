import {store} from '../store/index.js'
import {router} from './router/index.js'
import {IndexPackageAd} from './components/package_ad/indexPackageAd.js'
import {IndexPackageBannerA} from './components/banner_a/indexPackageBannerA.js'
import {IndexPackageBannerB} from './components/banner_b/indexPackageBannerB.js'


new Vue ({
    el: '#isadvert',
    store,
    router,
    components: {
        'index-package-ad' : IndexPackageAd,
        'index-package-banner-a' : IndexPackageBannerA,
        'index-package-banner-b' : IndexPackageBannerB
    },
    data() {
        return {

        }
    },
    mounted() {
        this.$store.dispatch('getPackageDuration')
    },
    methods: {
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    }
})