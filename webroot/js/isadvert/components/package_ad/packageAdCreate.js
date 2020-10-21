import {AssetAnnounce} from '../../../asset/component/add/assetAnnounce.js'
import {AssetAnnouncePosition} from '../../../asset/component/add/assetAnnouncePosition.js'

export const PackageAdCreate = {
    components: {
        'asset-announce' : AssetAnnounce,
        'asset-position' : AssetAnnouncePosition
    },
    template: `<div class="row">
                    <div class="col-md-12 text-left mb-3">
                        <button class="btn btn-secondary" @click="$parent.goBack">< กลับ</button>
                    </div>
                    <div class="col-md-12">
                        <asset-announce></asset-announce>
                        <hr/>
                        <asset-position></asset-position>
                    </div>
                </div>`
}