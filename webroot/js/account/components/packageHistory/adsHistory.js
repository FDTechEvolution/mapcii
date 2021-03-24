import {packageLineModal} from '../modal/packageLineModal.js'
import {renewAssetModal} from '../modal/renewAssetModal.js'
import {progressBar} from '../../../components/progressBar.js'

export const adsHistory = {
    components: {
        'package-line-modal' : packageLineModal,
        'renew-asset-modal' : renewAssetModal,
        'progress-bar' : progressBar
    },
    props: [],
    data() {
        return {
            modalPackage: false,
            assetName: '',
            packageCode: '',
            assetId: '',
            reNew: {
                assetId: '',
                assetName: '',
                assetCode: '',
                assetDuration: '',
                packageCode: '',
                packageCredit: null,
                packageUsed: null
            },
            rowsCXindex: 0
        }
    },
    methods: {
        thaiDateFormat: function (d) {
            let cutT = d.split("T")
            let setDate = cutT[0].split("-")

            return setDate[2] + "/" + setDate[1] + "/" + setDate[0]
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
        announceReNew(id, code, duration, p_code, p_credit, p_used, name) {
            this.reNew.assetId = id
            this.reNew.assetName = name
            this.reNew.assetCode = code
            this.reNew.assetDuration = duration
            this.reNew.packageCode = p_code
            this.reNew.packageCredit = p_credit
            this.reNew.packageUsed = p_used
            this.$store.dispatch('renewAssetModal', true)
        },
        showModalPackage(userPackageId, assetName, packageCode) {
            this.$store.dispatch('getBalanceLines', userPackageId)
            this.assetName = assetName
            this.packageCode = packageCode
            this.modalPackage = true
        },
        assetPrice(inPrice) {
            if(inPrice.announce === "ขาย") return this.formatNumber(inPrice.price - inPrice.rental) + "฿"
            if(inPrice.announce === "ให้เช่า") return this.formatNumber(inPrice.rental) + "฿/เดือน"
            if(inPrice.announce === "ขายและให้เช่า") return this.formatNumber(inPrice.price - inPrice.rental) + "฿ , " + this.formatNumber(inPrice.rental) + "/เดือน"
        },
        assetHistoryStatus(status) {
            return (status === 'CX' || status === 'EX') ? true : false
        }
    },
    template: `<div class="table-responsive tableresponsive">
                    <div class="col-md-12 pt-2 pl-0">
                        <h3 class="mb-0">ประวัติประกาศโฆษณา</h3>
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
                            </tr>
                        </thead>
                        <tbody>
                            <slot v-if="$store.getters.loading">
                                <tr>
                                    <td colspan="8" class="text-center">
                                        <div class="loadingio-spinner-spinner-pc6b8g2r9j">
                                            <div class="ldio-8gc4kjnx9fm">
                                                <div></div><div></div><div></div><div></div><div></div><div></div>
                                                <div></div><div></div><div></div><div></div><div></div><div></div>
                                                <div></div><div></div><div></div><div></div><div></div><div></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </slot>
                            <slot v-else>
                                <slot v-for="(asset, index) in $store.getters.asset">
                                    <tr v-if="assetHistoryStatus(asset.status)">
                                        <td data-title="หมายเลข" class="text-center">{{asset.code}}</td>
                                        <td data-title="ประเภท" class="text-center">{{$store.getters.package[index].user_package_lines[0].package_name}}</td>
                                        <td data-title="รูป" class="text-center"><img :src="$store.getters.images[index].Images.url" class="g-width-75 bg-white rounded"></td>
                                        <td data-title="รายละเอียด">
                                            <strong class="text-primary">[{{asset.announce}}] : </strong> <span>{{asset.name}}</span><br/>
                                            <small><strong>รายการ : </strong>อสังหาฯ{{asset.type}}</strong> | <strong>ราคา :</strong> {{assetPrice({announce:asset.announce, price:asset.price, discount:asset.discount, rental:asset.rental})}} | <strong>แพ็คเกจ : </strong><button class="btn btn-link btn-sm p-0" style="margin-top: -4px;" @click="showModalPackage($store.getters.package[index].id, asset.name, $store.getters.package[index].order_code)"><small>{{ $store.getters.package[index].order_code }}</small></button></small>
                                        </td>
                                        <td data-title="วันที่ลงประกาศ" class="text-center">{{thaiDateFormat(asset.startdate)}}</td>
                                        <td data-title="วันที่ปิด" class="text-center"><span v-if="asset.enddate != null">{{thaiDateFormat(asset.enddate)}}</span><span v-else>-</span></td>
                                    </tr>
                                </slot>
                                <tr v-if="$store.getters.cxADS === 0">
                                    <td colspan="8" class="text-center">ไม่มีประวัติประกาศโฆษณา....</td>
                                </tr>
                            </slot>
                        </tbody>
                    </table>

                    <renew-asset-modal v-if="$store.getters.renewAssetModal"
                        :assetId = reNew.assetId
                        :assetName = reNew.assetName
                        :assetCode = reNew.assetCode
                        :assetDuration = reNew.assetDuration
                        :packageCode = reNew.packageCode
                        :packageCredit = reNew.packageCredit
                        :packageUsed = reNew.packageUsed
                    ></renew-asset-modal>

                    <package-line-modal v-if="modalPackage"
                        :packageCode = packageCode
                        :assetName = assetName
                    ></package-line-modal>
                </div>`
}