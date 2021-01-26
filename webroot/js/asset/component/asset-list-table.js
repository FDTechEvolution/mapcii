import {closeAssetModal} from './modal/closeAssetModal.js'
import {progressBar} from '../../components/progressBar.js'

export const AssetLists = {
    components: {
        'close-asset-modal' : closeAssetModal,
        'progress-bar' : progressBar
    },
    props: ['assets', 'images'],
    data () {
        return {
            assetId: '',
            assetName: '',
            assetCode: '',
            assetDuration: ''
        }
    },
    mounted() {
        
    },
    methods: {
        editMyAsset (id) {
            let targeturl = siteurl + 'myassets/update?id=' + id;
            window.location.href = targeturl;
        },
        getTypeAsset (isnewproject,issales,isrent,name,id) {
            this.$parent.typeAssetGet(isnewproject,issales,isrent,name,id)
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        thaiDateFormat: function (d) {
            let cutT = d.split("T")
            let setDate = cutT[0].split("-")

            return setDate[2] + "/" + setDate[1] + "/" + setDate[0]
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
        closeAsset(assetId, assetCode, assetName, assetDuration) {
            this.assetName = assetName
            this.assetId = assetId
            this.assetCode = assetCode
            this.assetDuration = assetDuration
            this.$store.dispatch('closeAssetFreeModal', true)
        },
        upAssetToTop(assetId) {
            this.$store.dispatch('upAssetToTopFree', assetId)
        },
        checkAssetUpToTop(inDate) {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            let inday = inDate.split("T")
            
            return (inday[0] >= today) ? false : true
        },
        assetPrice(inPrice) {
            if(inPrice.announce === "ขาย") return this.formatNumber(inPrice.price - inPrice.rental) + "฿"
            if(inPrice.announce === "ให้เช่า") return this.formatNumber(inPrice.rental) + "฿/เดือน"
            if(inPrice.announce === "ขายและให้เช่า") return this.formatNumber(inPrice.price - inPrice.rental) + "฿ | " + this.formatNumber(inPrice.rental) + "/เดือน"
        },
        alertUpToTopWarning() {
            alert('ประกาศของวันนี้ถูกเลื่อนอันดับแล้ว....')
        },
        checkAssetStatus(status) {
            return (status === 'CX' || status === 'EX') ? false : true
        }
    },
    template: `<div class="table-responsive tableresponsive">
                    <progress-bar v-if="$store.getters.extendAssetLoading"></progress-bar>
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
                                <slot v-if="checkAssetStatus(asset.status)">
                                    <td data-title="หมายเลข" class="text-center">{{asset.code}}</td>
                                    <td data-title="ประเภท" class="text-center">ประกาศฟรี</td>
                                    <td data-title="รูป" class="text-center"><img :src="images[index].Images.url" class="g-width-75 bg-white rounded"></td>
                                    <td data-title="รายละเอียด">
                                        <strong class="text-primary">{{asset.announce}} : </strong> {{asset.name}}<br/>
                                        <small><strong>รายการ : </strong>อสังหาฯ{{asset.type}}</strong> | <strong>ราคา :</strong> {{assetPrice({announce:asset.announce, price:asset.price, discount:asset.discount, rental:asset.rental})}}</small></td>
                                    <td data-title="วันที่ลงประกาศ" class="text-center">{{thaiDateFormat(asset.startdate)}}</td>
                                    <td data-title="เหลืออายุ" class="text-center"><strong :class="[(driffday(duedateTime(asset.startdate,asset.total_publish_day)) > 10) ? 'text-success' : 'text-danger']">{{driffday(duedateTime(asset.startdate,asset.total_publish_day))}}</strong> <small>วัน</small></td>
                                    <td data-title="สถานะ" v-if="asset.status == 'CO'" class="text-center"><span class="u-label u-label-success g-color-white">เผยแพร่แล้ว</span></td>
                                    <td data-title="สถานะ" v-else-if="asset.status == 'EX'" class="text-center"><span class="u-label u-label-danger g-color-white">หมดอายุ</span></td>
                                    <td data-title="สถานะ" v-else class="text-center"><span class="u-label u-label-warning g-color-white">ฉบับร่าง</span></td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-success" @click="editMyAsset(asset.id)" title="แก้ไข"><i class="fas fa-edit"></i></button> 
                                        <button v-if="driffday(duedateTime(asset.startdate,asset.total_publish_day)) < 7" class="btn btn-sm btn-info" title="ต่ออายุ" @click="$store.dispatch('extendAsset', {id:asset.id, duration:driffday(duedateTime(asset.startdate,asset.total_publish_day))})" :disabled="$store.getters.extendAssetLoading"><i class="fas fa-redo-alt"></i></button> 
                                        <slot v-if="checkAssetUpToTop(asset.up_to_top)">
                                                <button class="btn btn-sm btn-primary" title="เลื่อนประกาศขึ้นอันดับแรก" @click="upAssetToTop(asset.id)"><i class="fas fa-level-up-alt"></i></button> 
                                            </slot>
                                            <slot v-else>
                                                <button class="btn btn-sm btn-secondary" title="เลื่อนประกาศของวันนี้แล้ว" @click="alertUpToTopWarning" disabled><i class="fas fa-level-up-alt"></i></button> 
                                            </slot> 
                                        <button class="btn btn-sm btn-danger" title="ปิดประกาศ" @click="closeAsset(asset.id, asset.code, asset.name, driffday(duedateTime(asset.startdate,asset.total_publish_day)))"><i class="fas fa-times"></i></button>
                                    </td>
                                </slot>
                            </tr>
                        </tbody>
                    </table>
                    <close-asset-modal v-if="$store.getters.closeAssetFreeModal"
                        :assetCode = assetCode
                        :assetName = assetName
                        :assetDuration = assetDuration
                        :assetId = assetId
                    ></close-asset-modal>
                </div>`
}