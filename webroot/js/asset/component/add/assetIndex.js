import {AssetAnnounce} from './assetAnnounce.js'
import {AssetAnnouncePosition} from './assetAnnouncePosition.js'

export const AssetIndex = {
    components: {
        'asset-announce' : AssetAnnounce,
        'asset-position' : AssetAnnouncePosition
    },
    mounted() {
        this.$store.dispatch('packageAdCheck', 'AD')
    },
    template: `<div class="row">
                    <div v-if="!$store.getters.announceStatusLoaded" class="col-md-12">
                        <div class="row px-5">
                            <div class="col-md-8">  
                                <asset-announce></asset-announce>
                            </div>
                            <div class="col-md-4">
                                <asset-position></asset-position>
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