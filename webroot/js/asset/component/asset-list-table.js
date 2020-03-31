Vue.component('asset-list-table', {
    props: ['asset', 'index'],
    data () {
        return {
            
        }
    },
    mounted () {

    },
    methods: {
        modalads () {
            this.$parent.getModalAds('Ads Clicked...')
        },
        editMyAsset (id) {
            let targeturl = siteurl + 'myassets/update?id=' + id;
            window.location.href = targeturl;
        },
        getTypeAsset (isnewproject,issales,isrent,name,id) {
            this.$parent.typeAssetGet(isnewproject,issales,isrent,name,id)
        }
    },
    template: `
                <tr v-else class="cursor-pointer">
                    <td class="text-center" @click="editMyAsset(asset.id)">{{index + 1}}</td>
                    <td @click="editMyAsset(asset.id)">{{asset.name}}</td>
                    <td class="text-center" @click="editMyAsset(asset.id)">{{asset.created}}</td>
                    <td v-if="asset.status == 'CO'" class="text-center" @click="editMyAsset(asset.id)"><span class="u-label u-label-success g-color-white">เผยแพร่แล้ว</span></td>
                    <td v-else class="text-center" @click="editMyAsset(asset.id)"><span class="u-label u-label-warning g-color-white">ฉบับร่าง</span></td>
                    <td v-if="asset.status == 'CO'" class="text-center"><button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modalPackage" @click="getTypeAsset(asset.isnewproject,asset.issales,asset.isrent,asset.name,asset.id)">Ads</button></td>
                </tr>`
})