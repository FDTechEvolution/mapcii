Vue.component('asset-ads-table', {
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
                    <td class="text-center" @click="editMyAsset(assetAds.id)">{{index + 1}}</td>
                    <td @click="editMyAsset(assetAds.id)">{{assetAds.name}}</td>
                    <td class="text-center" @click="editMyAsset(assetAds.id)">{{assetAds.created}}</td>
                    <td v-if="assetAds.status == 'CO'" class="text-center" @click="editMyAsset(assetAds.id)"><span class="u-label u-label-success g-color-white">เผยแพร่แล้ว</span></td>
                    <td v-else class="text-center" @click="editMyAsset(assetAds.id)"><span class="u-label u-label-warning g-color-white">ฉบับร่าง</span></td>
                    <td v-if="assetAds.status == 'CO'" class="text-center">ตรวจสอบ</td>
                </tr>`
})