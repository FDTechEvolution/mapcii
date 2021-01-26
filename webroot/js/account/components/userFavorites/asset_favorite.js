import {progressBar} from '../../../components/progressBar.js'
import {deleteAssetFavoriteModal} from '../modal/deleteAssetFavoriteModal.js'

export const assetFavorite = {
    components: {
        'progress-bar' : progressBar,
        'delete-asset-favorite-modal' : deleteAssetFavoriteModal
    },
    data() {
        return {
            assetId : '',
            assetName : '',
            isSiteUrl : siteurl
        }
    },
    methods: {
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        thaiDateFormat: function (d) {
            let cutT = d.split("T")
            let setDate = cutT[0].split("-")

            return setDate[2] + "/" + setDate[1] + "/" + setDate[0]
        },
        calculateDiscount(price, discount) {
            if(discount === null || discount === '' || discount === undefined || discount === 0) {
                return price
            }else{
                this.isDiscount = price - discount
                return price - discount
            }
        },
        showDiscount(discount) {
            return (discount !== 0) ? true : false
        },
        confirmDeleteFavorite(assetId, assetName) {
            this.assetId = assetId
            this.assetName = assetName
            this.$store.dispatch('confirmDeleteAssetFavoriteModal', true)
        },
        checkTypeFavorite(assetId) {
            return (this.$store.getters.forFavorite.includes(assetId)) ? 'ประกาศ (AD)' : 'ประกาศฟรี'
        }
    },
    template: `<div>
                    <div class="col-md-12 pl-0 pt-2">
                        <h3>รายการสินทรัพย์ที่สนใจ</h3>
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
                                    <th class="text-center">ราคา</th>
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
                                    <slot v-for="(fav, index) in $store.getters.assetFavorite">
                                        <tr>
                                            <td data-title="หมายเลข" class="text-center">{{fav.asset.code}}</td>
                                            <td data-title="ประเภท" class="text-center">{{checkTypeFavorite(fav.asset.id)}}</td>
                                            <td data-title="รูป" class="text-center">
                                                <slot v-for="img_isdefault in fav.asset.asset_images">
                                                    <img v-if="img_isdefault.isdefault === 'Y'" :src="img_isdefault.image.url" class="g-width-75 bg-white rounded">
                                                </slot>
                                            </td>
                                            <td data-title="รายละเอียด">
                                                <slot v-if="fav.asset.status === 'CO'">
                                                    <a :href="isSiteUrl + 'property/view?id=' + fav.asset.id" class="text-dark" target="_blank"><strong class="text-primary">[{{fav.asset.announce}}] :</strong> {{fav.asset.name}}</a>
                                                </slot>
                                                <slot v-else>
                                                    <strong class="text-info">[{{fav.asset.announce}}] :</strong> {{fav.asset.name}}
                                                </slot>
                                                <br/>
                                                <small><strong>รายการ :</strong> อสังหาฯ{{fav.asset.type}} | <strong>ปรับปรุงเมื่อ :</strong> {{thaiDateFormat(fav.asset.modified)}}</small>
                                            </td>
                                            <td data-title="วันที่ลงประกาศ" class="text-center">{{thaiDateFormat(fav.asset.startdate)}}</td>
                                            <td data-title="ราคา" class="text-center">
                                                <span v-if="fav.asset.issales === 'Y'">
                                                    <slot v-if="showDiscount(fav.asset.discount)">
                                                        <small><s class="text-danger">{{formatNumber(fav.asset.price)}} ฿</s></small><br/>
                                                        <strong class="text-success">{{formatNumber(calculateDiscount(fav.asset.price, fav.asset.discount))}}</strong> ฿
                                                    </slot>
                                                    <slot v-else>
                                                        <strong class="text-success">{{formatNumber(fav.asset.price)}}</strong> ฿
                                                    </slot>
                                                    <slot v-if="fav.asset.isrent === 'Y'">
                                                        <hr class="my-0"/><strong class="text-info">{{formatNumber(fav.asset.rental)}}</strong> ฿<small>/เดือน</small>
                                                    </slot>
                                                </span>
                                                <span v-else>
                                                    <strong class="text-info">{{formatNumber(fav.asset.rental)}}</strong> ฿<small>/เดือน</small>
                                                </span>
                                            </td>
                                            <td data-title="สถานะ" class="text-center">
                                                <span v-if="fav.asset.status === 'CO'" class="u-label u-label-success g-color-white">กำลังประกาศ</span>
                                                <span v-else class="u-label u-label-danger g-color-white">ปิดประกาศ</span>
                                            </td>
                                            <td class="text-center">
                                                <a style="cursor: pointer;" @click="confirmDeleteFavorite(fav.asset.id, fav.asset.name)"><i class="far fa-times-circle text-danger"></i></a>
                                            </td>
                                        </tr>
                                    </slot>
                                </slot>
                            </tbody>
                        </table>
                    </div>

                    <delete-asset-favorite-modal v-if="$store.getters.confirmDeleteAssetFavoriteModal"
                        :assetId = assetId
                        :assetName = assetName
                    ></delete-asset-favorite-modal>
                </div>`
}