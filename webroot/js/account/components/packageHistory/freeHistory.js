import {renewAssetFreeModal} from '../modal/renewAssetFreeModal.js'
import {progressBar} from '../../../components/progressBar.js'

export const freeHistory = {
    components: {
        'renew-asset-modal' : renewAssetFreeModal,
        'progress-bar' : progressBar
    },
    data () {
        return {
            assetId: '',
            assetName: '',
            assetCode: '',
            assetDuration: '',
            reNew: {
                assetId: '',
                assetName: '',
                assetCode: ''
            }
        }
    },
    methods: {
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        thaiDateFormat: function (d) {
            if(d) {
                let cutT = d.split("T")
                let setDate = cutT[0].split("-")

                return setDate[2] + "/" + setDate[1] + "/" + setDate[0]
            }
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
        assetPrice(inPrice) {
            if(inPrice.announce === "ขาย") return this.formatNumber(inPrice.price - inPrice.rental) + "฿"
            if(inPrice.announce === "ให้เช่า") return this.formatNumber(inPrice.rental) + "฿/เดือน"
            if(inPrice.announce === "ขายและให้เช่า") return this.formatNumber(inPrice.price - inPrice.rental) + "฿ | " + this.formatNumber(inPrice.rental) + "/เดือน"
        },
        announceReNew(id, code, name) {
            this.reNew.assetId = id
            this.reNew.assetCode = code
            this.reNew.assetName = name
            this.$store.dispatch('renewAssetFreeModal', true)
        },
        assetHistoryStatus(status) {
            return (status === 'CX' || status === 'EX') ? true : false
        }
    },
    template: `<div class="table-responsive tableresponsive">
                    <div class="col-md-12 pt-2 pl-0">
                        <h3 class="mb-0">ประวัติประกาศฟรี</h3>
                    </div>
                    <progress-bar v-if="$store.getters.progressBar"></progress-bar>
                    <table class="table table-hover" id="tb_list_asset">
                        <thead>
                            <tr>
                                <th class="text-center">หมายเลข</th>
                                <th class="text-center">ประเภท</th>
                                <th class="text-center">รูป</th>
                                <th>รายละเอียด</th>
                                <th class="text-center">วันที่ลงประกาศ</th>
                                <th class="text-center">วันที่ปิดประกาศ</th>
                                <th class="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="$store.getters.loadingFree">
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
                            <slot v-else v-for="(asset, index) in $store.getters.assetFree">
                                <tr v-if="assetHistoryStatus(asset.status)">
                                    <td data-title="หมายเลข" class="text-center">{{asset.code}}</td>
                                    <td data-title="ประเภท" class="text-center">ประกาศฟรี</td>
                                    <td data-title="รูป" class="text-center"><img :src="$store.getters.imageFree[index].Images.url" class="g-width-75 bg-white rounded"></td>
                                    <td data-title="รายละเอียด">
                                        <strong class="text-primary">[{{asset.announce}}] : </strong> {{asset.name}}<br/>
                                        <small><strong>รายการ : </strong>อสังหาฯ{{asset.type}}</strong> | <strong>ราคา :</strong> {{assetPrice({announce:asset.announce, price:asset.price, discount:asset.discount, rental:asset.rental})}}</small></td>
                                    <td data-title="วันที่ลงประกาศ" class="text-center">{{thaiDateFormat(asset.startdate)}}</td>
                                    <td data-title="วันที่ปิด" class="text-center">{{thaiDateFormat(asset.enddate)}}</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-danger" title="ลงซ้ำอีกครั้ง" :disabled="$store.getters.progressBar" @click="announceReNew(asset.id, asset.code, asset.name)"><i class="fas fa-retweet"></i> ลงซ้ำอีกครั้ง</button>
                                    </td>
                                </tr>
                            </slot>
                            <tr v-if="$store.getters.cxFree === 0">
                                <td colspan="8" class="text-center">ไม่มีประวัติประกาศฟรี....</td>
                            </tr>
                        </tbody>
                    </table>

                    <renew-asset-modal v-if="$store.getters.renewAssetFreeModal"
                        :assetId = reNew.assetId
                        :assetName = reNew.assetName
                        :assetCode = reNew.assetCode
                    ></renew-asset-modal>
                </div>`
}