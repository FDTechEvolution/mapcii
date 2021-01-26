import {closeAssetModal} from '../modal/closeAssetModal.js'
import {packageLineModal} from '../modal/packageLineModal.js'
import {progressBar} from '../../../components/progressBar.js'

export const packageAdAnnounce = {
    components: {
        'close-asset-modal' : closeAssetModal,
        'package-line-modal' : packageLineModal,
        'progress-bar' : progressBar
    },
    props: [],
    data() {
        return {
            modalPackage: false,
            assetName: '',
            packageCode: '',
            assetId: ''
        }
    },
    mounted() {
        
    },
    computed: {
        
    },
    methods: {
        getTypeAsset (isnewproject,issales,isrent,name,id) {
            this.$parent.typeAssetGet(isnewproject,issales,isrent,name,id)
        },
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
        editMyAsset(id) {
            window.location.href = siteurl + 'myassets/update?id=' + id;
            // let targeturl = siteurl + 'myassets/update?id=' + id;
            // this.$router.push('/update/' + id)
        },
        addNewAsset() {
            window.location.href = siteurl + 'myassets/add'
        },
        showModalPackage(userPackageId, assetName, packageCode) {
            this.$store.dispatch('getBalanceLines', userPackageId)
            this.assetName = assetName
            this.packageCode = packageCode
            this.modalPackage = true
        },
        upAssetToTop(assetId) {
            this.$store.dispatch('upAssetToTop', assetId)
        },
        closeAsset(assetId, packageCode, assetName) {
            this.packageCode = packageCode
            this.assetName = assetName
            this.assetId = assetId
            this.$store.dispatch('closeAssetModal', true)
        },
        checkAssetUpToTop(inDate) {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            let inday = inDate.split("T")
            
            return (inday[0] === today) ? false : true
        },
        assetPrice(inPrice) {
            if(inPrice.announce === "ขาย") return this.formatNumber(inPrice.price - inPrice.rental) + "฿"
            if(inPrice.announce === "ให้เช่า") return this.formatNumber(inPrice.rental) + "฿/เดือน"
            if(inPrice.announce === "ขายและให้เช่า") return this.formatNumber(inPrice.price - inPrice.rental) + "฿ , " + this.formatNumber(inPrice.rental) + "/เดือน"
        },
        dateIsZero(duration) {
            return (duration > 0) ? duration : 0
        }
    },
    template: `<div>
                    <div class="col-md-12 pl-0 pt-2">
                        <h3>รายการลงประกาศโฆษณา</h3>
                    </div>
                    <div class="col-md-12 pl-0 align-text-bottom">
                        <button class="btn btn-sm btn-outline-primary mb-2 float-left" @click="addNewAsset"><i class="far fa-plus-square"></i> เพิ่มประกาศ</button>
                        <small class="float-right">
                            <i class="fas fa-edit text-success"></i> = แก้ไขประกาศ , <i class="fas fa-redo-alt text-info"></i> = ต่ออายุประกาศ , <i class="fas fa-level-up-alt text-primary"></i> = เลื่อนประกาศขึ้นอันดับแรก(วันละ 1 ครั้ง) , <i class="fas fa-times text-danger"></i> = ปิดประกาศ (ได้เครดิตคืน)
                        </small>
                    </div>
                    <div class="table-responsive tableresponsive">
                        <progress-bar v-if="$store.getters.progressBar"></progress-bar>
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
                                    <th class="text-center" style="width: 15%;"></th>
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
                                        <tr v-if="asset.status !== 'CX'">
                                            <td data-title="หมายเลข" class="text-center">{{asset.code}}</td>
                                            <td data-title="ประเภท" class="text-center">{{$store.getters.package[index].user_package_lines[0].package_name}}</td>
                                            <td data-title="รูป" class="text-center"><img :src="$store.getters.images[index].Images.url" class="g-width-75 bg-white rounded"></td>
                                            <td data-title="รายละเอียด">
                                                <strong class="text-primary">{{asset.announce}} : </strong> <span>{{asset.name}}</span><br/>
                                                <small><strong>รายการ : </strong>อสังหาฯ{{asset.type}}</strong> | <strong>ราคา :</strong> {{assetPrice({announce:asset.announce, price:asset.price, discount:asset.discount, rental:asset.rental})}} | <strong>แพ็คเกจ : </strong><button class="btn btn-link btn-sm p-0" style="margin-top: -4px;" @click="showModalPackage($store.getters.package[index].id, asset.name, $store.getters.package[index].order_code)"><small>{{ $store.getters.package[index].order_code }}</small></button></small></td>
                                            <td data-title="วันที่ลงประกาศ" class="text-center">{{thaiDateFormat(asset.startdate)}}</td>
                                            <td data-title="เหลืออายุ" class="text-center"><strong :class="[($store.getters.duration[index].duration > 10) ? 'text-success' : 'text-danger']">{{ dateIsZero($store.getters.duration[index].duration) }}</strong> <small>วัน</small></td>
                                            <td data-title="สถานะ" v-if="asset.status == 'CO'" class="text-center"><span class="u-label u-label-success g-color-white">เผยแพร่แล้ว</span></td>
                                            <td data-title="สถานะ" v-else-if="asset.status == 'EX'" class="text-center"><span class="u-label u-label-danger g-color-white">หมดอายุ</span></td>
                                            <td data-title="สถานะ" v-else-if="asset.status == 'DR'" class="text-center"><span class="u-label u-label-warning g-color-white">ฉบับร่าง</span></td>
                                            <td class="text-center">
                                                <button class="btn btn-sm btn-success" :disabled="$store.getters.progressBar" @click="editMyAsset(asset.id)" title="แก้ไข"><i class="fas fa-edit"></i></button> 
                                                <button v-if="asset.status === 'EX'" class="btn btn-sm btn-info" title="ต่ออายุ" :disabled="$store.getters.progressBar"><i class="fas fa-redo-alt"></i></button> 
                                                <slot v-if="checkAssetUpToTop(asset.up_to_top)">
                                                    <button class="btn btn-sm btn-primary" title="เลื่อนประกาศ" :disabled="$store.getters.progressBar" @click="upAssetToTop(asset.id)"><i class="fas fa-level-up-alt"></i></button> 
                                                </slot>
                                                <slot v-else>
                                                    <button class="btn btn-sm btn-secondary" title="เลื่อนประกาศของวันนี้แล้ว" disabled><i class="fas fa-level-up-alt"></i></button> 
                                                </slot>
                                                <button class="btn btn-sm btn-danger" title="ปิดประกาศ" :disabled="$store.getters.progressBar" @click="closeAsset(asset.id, $store.getters.package[index].order_code, asset.name, index)"><i class="fas fa-times"></i></button>
                                            </td>
                                        </tr>
                                    </slot>
                                </slot>
                            </tbody>
                        </table>
                    </div>

                    <close-asset-modal v-if="$store.getters.closeAssetModal"
                        :packageCode = packageCode
                        :assetName = assetName
                        :assetId = assetId
                    ></close-asset-modal>

                    <package-line-modal v-if="modalPackage"
                        :packageCode = packageCode
                        :assetName = assetName
                    ></package-line-modal>
                </div>`
}