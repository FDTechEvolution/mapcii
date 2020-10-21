import {AssetUpdate} from './assetUpdate.js'
import {AssetUpdatePosition} from './assetUpdatePosition.js'

export const AssetUpdateIndex = {
    components: {
        'asset-update' : AssetUpdate,
        'asset-update-position' : AssetUpdatePosition
    },
    mounted() {
        this.getAssetId()
        this.loadStoreAddress()
    },
    methods: {
        getAssetId() {
            let queryString = window.location.search
            let urlParams = new URLSearchParams(queryString)
            let id = urlParams.get('id')
            this.$store.dispatch('loadAssetData', id)
        },
        loadStoreAddress() {
            this.$store.dispatch('loadAddress')
        }
    },
    template: `<div class="row">
                    <div v-if="!$store.getters.updateLoaded" class="col-md-12">
                        <div class="row px-5">
                            <div class="col-md-8">  
                                <asset-update></asset-update>
                            </div>
                            <div class="col-md-4">
                                <asset-update-position
                                    :isposition = '$store.getters.updateAsset.address'
                                ></asset-update-position>
                            </div>
                        </div>
                    </div>
                    <div v-else class="col-md-12 text-center">
                        <div class="loadingio-spinner-spinner-72aw3to60xg">
                            <div class="ldio-cm123s8lq54">
                                <div></div><div></div><div></div>
                                <div></div><div></div><div></div>
                                <div></div><div></div><div></div>
                                <div></div><div></div><div></div>
                            </div>
                        </div>
                    </div>
                </div>`
}