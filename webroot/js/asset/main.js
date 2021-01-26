import {store} from '.././store/index.js'
import {AssetLists} from './component/asset-list-table.js'
import {AdsLists} from './component/asset-ads-table.js'
import {AssetUpdate} from './component/update/assetUpdate.js'
import {AssetIndex} from './component/add/assetIndex.js'
import {AssetUpdatePosition} from './component/update/assetUpdatePosition.js'
import {AssetUpdateIndex} from './component/update/assetUpdateIndex.js'
import {AssetUpdateAlert} from './component/update/assetUpdateAlert.js'

new Vue ({
    el: '#assets-list',
    store,
    components: {
        'asset-ads-table' : AdsLists,
        'asset-list-table' : AssetLists,
        'asset-update' : AssetUpdate,
        'asset-index' : AssetIndex,
        'asset-update-position' : AssetUpdatePosition,
        'asset-update-index' : AssetUpdateIndex,
        'asset-alert' : AssetUpdateAlert
    },
    data () {
        return {
            assets: [],
            images: [],
            assetAds: [],
            showModalAds: false,
            isNewProject: null,
            isSales: null,
            isRent: null,
            assetName: null,
            assetId: null,
            modalPackageClose: false,
            loading: true
        }
    },
    mounted () {
        // this.loadAssetList()
        this.$store.dispatch('loadAssetList', true)
    },
    methods: {
        loadAssetList () {
            try{
                axios.get(apiurl + 'api-assets/getlistasset?user=' + localStorage.getItem('MAPCII_USER'))
                .then((response) => {
                    this.assets = response.data.list
                    this.images = response.data.list_image
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => this.loading = false)
            }catch(e){
                console.log(e)
            }
        },
        getModalAds (content) {
            this.showModalAds = true
            console.log(content)
        },
        typeAssetGet (isnewproject,issales,isrent,name,id) {
            this.isNewProject = isnewproject
            this.isSales = issales
            this.isRent = isrent
            this.assetName = name
            this.assetId = id
        },
        assetAdsSet () {
            window.location.href = siteurl + "myassets"
        }
    }
})

// new Vue ({
//     el: '#asset-add',
//     store,
//     components: {
//         'asset-index' : AssetIndex
//     }
// })

// new Vue ({
//     el: '#asset-update',
//     store,
//     components: {
//         'asset-update' : AssetUpdate,
//         'asset-update-position' : AssetUpdatePosition,
//         'asset-alert' : AssetUpdateAlert
//     }
// })