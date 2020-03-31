let AdsLists =  {
    props: ['assetAds', 'index'],
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
        }
    },
    template: `<tr class="cursor-pointer">
                    <td class="text-center" @click="editMyAsset(assetAds.asset.id)">{{index + 1}}</td>
                    <td @click="editMyAsset(assetAds.asset.id)">{{assetAds.asset.name}}</td>
                    <td class="text-center" @click="editMyAsset(assetAds.asset.id)">{{assetAds.asset.created}}</td>
                    <td class="text-center" @click="editMyAsset(assetAds.asset.id)">
                        <span v-if="assetAds.asset.status == 'CO'" class="u-label u-label-success g-color-white">เผยแพร่แล้ว</span>
                        <span v-else class="u-label u-label-warning g-color-white">ฉบับร่าง</span>
                    </td>
                    <td class="text-center">
                        <span v-if="assetAds.payment.status == 'DR'" class="u-label u-label-secondary g-color-white">รอตรวจสอบ</span>
                        <span v-else-if="assetAds.payment.status == 'CO'" class="u-label u-label-success g-color-white">ใช้งาน</span>
                    </td>
                </tr>`
}

let AssetLists = {
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
}

new Vue ({
    el: '#assets-list',
    components: {
        'asset-ads-table' : AdsLists,
        'asset-list-table' : AssetLists
    },
    data () {
        return {
            assets: [],
            assetAds: [],
            showModalAds: false,
            isNewProject: null,
            isSales: null,
            isRent: null,
            assetName: null,
            assetId: null,
            modalPackageClose: false
        }
    },
    mounted () {
        this.loadAssetList()
    },
    methods: {
        loadAssetList () {
            axios.get(apiurl + 'api-assets/getlistasset?user=' + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                this.assets = response.data.list
                this.assetAds = response.data.ads
                // console.log(this.assetAds)
            })
            .catch(e => {
                console.log(e)
            })
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