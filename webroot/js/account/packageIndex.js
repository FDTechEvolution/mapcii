import {closeAssetModal} from './components/modal/closeAssetModal.js'
import {packageLineModal} from './components/modal/packageLineModal.js'

export const packageIndex = {
    components: {
        'close-asset-modal' : closeAssetModal,
        'package-line-modal' : packageLineModal
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
        this.$store.dispatch('loadAssetList')
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

            return setDate[2] + "-" + setDate[1] + "-" + setDate[0]
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
            let targeturl = siteurl + 'myassets/update?id=' + id;
            window.location.href = targeturl;
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
        }
    },
    template: `<div class="table-responsive tableresponsive">
                    <div class="col-md-12 align-text-bottom pt-4">
                        <button class="btn btn-sm btn-outline-primary mb-2 float-left" @click="addNewAsset"><i class="far fa-plus-square"></i> เพิ่มประกาศ</button>
                        <small class="float-right">
                            <i class="fas fa-edit text-success"></i> = แก้ไขประกาศ , <i class="fas fa-redo-alt text-info"></i> = ต่ออายุประกาศ , <i class="fas fa-level-up-alt text-primary"></i> = เลื่อนประกาศขึ้นอันดับแรก , <i class="fas fa-times text-danger"></i> = ปิดประกาศ (ได้เครดิตคืน)
                        </small>
                    </div>
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
                                <tr v-for="(asset, index) in $store.getters.asset">
                                    <slot v-if="asset.status !== 'CX'">
                                        <td data-title="หมายเลข" class="text-center">{{asset.code}}</td>
                                        <td data-title="ประเภท" class="text-center">{{asset.announce}}<br/><small>อสังหาฯ{{asset.type}}</small></td>
                                        <td data-title="รูป" class="text-center"><img :src="$store.getters.images[index].Images.url" class="g-width-75 bg-white rounded"></td>
                                        <td data-title="รายละเอียด"><span>{{asset.name}}</span><br/><small><strong>แพ็คเกจ : </strong><button class="btn btn-link btn-sm p-0" style="margin-top: -4px;" @click="showModalPackage($store.getters.package[index].id, asset.name, $store.getters.package[index].order_code)"><small>{{ $store.getters.package[index].order_code }}</small></button></small></td>
                                        <td data-title="วันที่ลงประกาศ" class="text-center">{{thaiDateFormat(asset.startdate)}}</td>
                                        <td data-title="เหลืออายุ" class="text-center">{{ $store.getters.duration[index].duration }} วัน</td>
                                        <td data-title="สถานะ" v-if="asset.status == 'CO'" class="text-center"><span class="u-label u-label-success g-color-white">เผยแพร่แล้ว</span></td>
                                        <td data-title="สถานะ" v-else-if="asset.status == 'EX'" class="text-center"><span class="u-label u-label-danger g-color-white">หมดอายุ</span></td>
                                        <td data-title="สถานะ" v-else-if="asset.status == 'DR'" class="text-center"><span class="u-label u-label-warning g-color-white">ฉบับร่าง</span></td>
                                        <td class="text-center">
                                            <button class="btn btn-sm btn-success" @click="editMyAsset(asset.id)" title="แก้ไข"><i class="fas fa-edit"></i></button> 
                                            <button v-if="asset.status == 'EX'" class="btn btn-sm btn-info" title="ต่ออายุ"><i class="fas fa-redo-alt"></i></button> 
                                            <slot v-if="checkAssetUpToTop(asset.up_to_top)">
                                                <button class="btn btn-sm btn-primary" title="เลื่อนประกาศ" @click="upAssetToTop(asset.id)"><i class="fas fa-level-up-alt"></i></button> 
                                            </slot>
                                            <slot v-else>
                                                <button class="btn btn-sm btn-secondary" title="เลื่อนประกาศของวันนี้แล้ว" disabled><i class="fas fa-level-up-alt"></i></button> 
                                            </slot>
                                            <button class="btn btn-sm btn-danger" title="ปิดประกาศ" @click="closeAsset(asset.id, $store.getters.package[index].order_code, asset.name)"><i class="fas fa-times"></i></button>
                                        </td>
                                    </slot>
                                </tr>
                            </slot>
                        </tbody>
                    </table>

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