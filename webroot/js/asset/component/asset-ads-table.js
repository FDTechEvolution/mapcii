export const AdsLists =  {
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
        },
        thaiDateFormat: function (d) {
            let cutT = d.split("T")
            let setDate = cutT[0].split("-")

            return setDate[2] + "-" + setDate[1] + "-" + setDate[0]
        },
        duedateTime: function (startdate, publishday) {
            let result = new Date(startdate);
            result.setDate(result.getDate() + publishday);
            let setDateFormat = result.getDate() + '-' + (result.getMonth() + 1) + '-' + result.getFullYear()
            return setDateFormat;
        },
        driffday: function (d) {
            let setDate = d.split("-")
            let in_date = setDate[2] + "-" + setDate[1] + "-" + setDate[0]
            let aday = new Date(in_date)
            let fgg = (aday.getTime() - Date.now()) / (1000 * 3600 * 24)

            if (fgg < 0) {
                return fgg = 0
            } else {
                return fgg.toFixed(0)
            }
        }
    },
    template: `<tr class="cursor-pointer">
                    <td class="text-center" @click="editMyAsset(assetAds.asset.id)">{{index + 1}}</td>
                    <td @click="editMyAsset(assetAds.asset.id)">{{assetAds.asset.name}}</td>
                    <td class="text-center" @click="editMyAsset(assetAds.asset.id)">{{thaiDateFormat(assetAds.asset.startdate)}}</td>
                    <td class="text-center" @click="editMyAsset(asset.id)">{{duedateTime(assetAds.asset.startdate,assetAds.asset.total_publish_day)}} ({{driffday(duedateTime(assetAds.asset.startdate,assetAds.asset.total_publish_day))}} วัน)</td>
                    <td class="text-center" @click="editMyAsset(assetAds.asset.id)">
                        <span v-if="assetAds.asset.status == 'CO' || assetAds.asset.status == 'EX'" class="u-label u-label-success g-color-white">โฆษณา</span>
                        <span v-else class="u-label u-label-warning g-color-white">ฉบับร่าง</span>
                    </td>
                    <td class="text-center">
                        <span v-if="assetAds.payment.status == 'DR'" class="u-label u-label-secondary g-color-white">รอตรวจสอบ</span>
                        <span v-else-if="assetAds.payment.status == 'CO'" class="u-label u-label-success g-color-white">กำลังใช้งาน</span>
                    </td>
                </tr>`
}