import {closeAssetModal} from './modal/closeAssetModal.js'

export const AssetLists = {
    components: {
        'close-asset-modal' : closeAssetModal
    },
    props: ['assets', 'images'],
    data () {
        return {
            assetId: '',
            assetName: ''
        }
    },
    mounted() {
        
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
        },
        closeAsset(assetId, assetName) {
            this.assetName = assetName
            this.assetId = assetId
            this.$store.dispatch('closeAssetFreeModal', true)
        }
    },
    template: `<div class="table-responsive tableresponsive">
                    <table class="table table-hover" id="tb_list_asset">
                        <thead>
                            <tr>
                                <th class="text-center">หมายเลข</th>
                                <th class="text-center">ประเภท</th>
                                <th class="text-center">รูป</th>
                                <th>รายละเอียด</th>
                                <th class="text-center">วันที่ลงประกาศ</th>
                                <th class="text-center">เหลืออายุ</th>
                                <th class="text-center">สถานะ</th>
                                <th class="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="$store.getters.assetListLoading">
                                <td colspan="8" class="text-center">
                                    <div class="loadingio-spinner-spinner-72aw3to60xg">
                                        <div class="ldio-cm123s8lq54">
                                            <div></div><div></div><div></div>
                                            <div></div><div></div><div></div>
                                            <div></div><div></div><div></div>
                                            <div></div><div></div><div></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-else v-for="(asset, index) in assets">
                                <slot v-if="asset.status !== 'CX'">
                                    <td data-title="หมายเลข" class="text-center">{{asset.code}}</td>
                                    <td data-title="ประเภท" class="text-center">{{asset.announce}}<br/><small>อสังหาฯ{{asset.type}}</small></td>
                                    <td data-title="รูป" class="text-center"><img :src="images[index].Images.url" class="g-width-75 bg-white rounded"></td>
                                    <td data-title="รายละเอียด">{{asset.name}}</td>
                                    <td data-title="วันที่ลงประกาศ" class="text-center">{{thaiDateFormat(asset.startdate)}}</td>
                                    <td data-title="เหลืออายุ" class="text-center">{{driffday(duedateTime(asset.startdate,asset.total_publish_day))}} วัน</td>
                                    <td data-title="สถานะ" v-if="asset.status == 'CO'" class="text-center"><span class="u-label u-label-success g-color-white">เผยแพร่แล้ว</span></td>
                                    <td data-title="สถานะ" v-else-if="asset.status == 'EX'" class="text-center"><span class="u-label u-label-danger g-color-white">หมดอายุ</span></td>
                                    <td data-title="สถานะ" v-else class="text-center"><span class="u-label u-label-warning g-color-white">ฉบับร่าง</span></td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-success" @click="editMyAsset(asset.id)" title="แก้ไข"><i class="fas fa-edit"></i></button> 
                                        <button v-if="asset.status == 'EX'" class="btn btn-sm btn-info" title="ต่ออายุ"><i class="fas fa-redo-alt"></i></button> 
                                        <button class="btn btn-sm btn-primary" title="เลื่อนประกาศ"><i class="fas fa-level-up-alt"></i></button> 
                                        <button class="btn btn-sm btn-danger" title="ปิดประกาศ" @click="closeAsset(asset.id, asset.name)"><i class="fas fa-times"></i></button>
                                    </td>
                                </slot>
                            </tr>
                        </tbody>
                    </table>
                    <close-asset-modal v-if="$store.getters.closeAssetFreeModal"
                        :assetName = assetName
                        :assetId = assetId
                    ></close-asset-modal>
                </div>`
}