import {progressBar} from '../../../components/progressBar.js'
import {showBannerImageModal} from '../modal/showBannerImageModal.js'
import {packageLineModal} from '../modal/packageLineModal.js'
import {editBannerImageModal} from '../modal/editBannerImageModal.js'
import {closeBannerImageModal} from '../modal/closeBannerImageModal.js'

export const packageAdBanner = {
    components: {
        'banner-image-modal' : showBannerImageModal,
        'banner-image-edit-modal' : editBannerImageModal,
        'banner-image-close-modal' : closeBannerImageModal,
        'package-line-modal' : packageLineModal,
        'progress-bar' : progressBar
    },
    data() {
        return {
            bannerImageModal: false,
            bannerImageEditModal: false,
            modalPackage: false,
            isBannerImage: {
                topic: '',
                url: ''
            },
            isBannerPackageLine: {
                topic: '',
                code: ''
            },
            isBannerImageEdit: {
                id: '',
                topic: '',
                description: '',
                url: '',
                type: ''
            },
            isBannerImageClose: {
                id: '',
                topic: '',
                user_package: '',
                url: ''
            }
        }
    },
    methods: {
        addNewBanner() {
            window.location.href = siteurl + 'mybanners/add'
        },
        editMyBanner(id, topic, description, url, type) {
            this.isBannerImageEdit.id = id
            this.isBannerImageEdit.topic = topic
            this.isBannerImageEdit.description = description
            this.isBannerImageEdit.url = url
            this.isBannerImageEdit.type = type
            this.$store.dispatch('showEditBannerModal', true)
        },
        showDeleteBannerImageModal(id, u_package, topic, url) {
            this.isBannerImageClose.id = id
            this.isBannerImageClose.topic = topic
            this.isBannerImageClose.user_package = u_package
            this.isBannerImageClose.url = url
            this.$store.dispatch('showDeleteBannerModal', true)
        },
        showBannerImageModal(topic, url) {
            this.isBannerImage.topic = topic
            this.isBannerImage.url = url
            this.bannerImageModal = true
        },
        showBannerPackageLines(package_id, topic, code) {
            this.$store.dispatch('getBalanceLines', package_id)
            this.isBannerPackageLine.topic = topic
            this.isBannerPackageLine.code = code
            this.modalPackage = true
        },
        thaiDateFormat: function (d) {
            let cutT = d.split("T")
            let setDate = cutT[0].split("-")

            return setDate[2] + "/" + setDate[1] + "/" + setDate[0]
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        diffDate(toDiffDate) {
            let result = new Date(toDiffDate.paidDate);
            result.setDate(result.getDate() + toDiffDate.duration);
            let setDateFormat = result.getDate() + '-' + (result.getMonth() + 1) + '-' + result.getFullYear()
    
            let setDate = setDateFormat.split("-")
            let in_date = setDate[2] + "-" + setDate[1] + "-" + setDate[0]
            let aday = new Date(in_date)
            let fgg = (aday.getTime() - Date.now()) / (1000 * 3600 * 24)
            return this.dateIsZero(Math.ceil(fgg))
        },
        dateIsZero(duration) {
            return (duration > 0) ? duration : 0
        }
    },
    template:`<div class="table-responsive tableresponsive">
                    <div class="col-md-12 pt-2 pl-0">
                        <h3>รายการแบนเนอร์โฆษณา</h3>
                    </div>
                    <div class="col-md-12 pl-0 align-text-bottom">
                        <button class="btn btn-sm btn-outline-primary mb-2 float-left" @click="addNewBanner"><i class="far fa-plus-square"></i> เพิ่มแบนเนอร์</button>
                        <small class="float-right">
                            <i class="fas fa-edit text-success"></i> = แก้ไขแบนเนอร์ , <i class="fas fa-times text-danger"></i> = ปิดแบนเนอร์ (ได้เครดิตคืน)
                        </small>
                    </div>
                    <div class="table-responsive tableresponsive">
                        <progress-bar v-if="$store.getters.bannerProgressBar"></progress-bar>
                        <table class="table table-hover" id="tb_list_asset">
                            <thead>
                                <tr>
                                    <th class="text-center">รูปแบนเนอร์</th>
                                    <th class="text-center">ประเภท</th>
                                    <th>รายละเอียด</th>
                                    <th class="text-center">วันที่ลงประกาศ</th>
                                    <th class="text-center">เหลืออายุ</th>
                                    <th class="text-center">สถานะ</th>
                                    <th class="text-center" style="width: 15%;"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <slot v-if="$store.getters.banner_list_loading">
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
                                    <tr v-for="banner in $store.getters.my_banners">
                                        <td data-title="รูป" class="text-center"><img :src="banner.src" class="g-width-75 bg-white rounded" style="cursor: pointer;" @click="showBannerImageModal(banner.topic, banner.src)"></td>
                                        <td data-title="ประเภท" class="text-center">{{banner.type}}</td>
                                        <td data-title="รายละเอียด" style="line-height: 16px;">
                                            <strong class="text-dark">{{banner.topic}}</strong><br/>
                                            <slot v-if="banner.description !== ''"><small>{{banner.description}}</small></br></slot>
                                            <small class="mt-1"><strong>แพ็คเกจ : </strong><button class="btn btn-link btn-sm p-0" style="margin-top: -4px;" @click="showBannerPackageLines(banner.package_id, banner.topic, banner.package)"><small>{{banner.package}}</small></button></small>
                                        </td>
                                        <td data-title="วันที่ลงแบนเนอร์" class="text-center">{{thaiDateFormat(banner.created)}}</td>
                                        <td data-title="เหลืออายุ" class="text-center"><strong :class="[(diffDate({paidDate:banner.paid_date, duration:banner.duration}) > 10) ? 'text-success' : 'text-danger']">{{diffDate({paidDate:banner.paid_date, duration:banner.duration})}}</strong> <small>วัน</small></td>
                                        <td data-title="สถานะ" v-if="banner.status == 'CO'" class="text-center"><span class="u-label u-label-success g-color-white">เผยแพร่แล้ว</span></td>
                                        <td data-title="สถานะ" v-else-if="banner.status == 'EX'" class="text-center"><span class="u-label u-label-danger g-color-white">หมดอายุ</span></td>
                                        <td data-title="สถานะ" v-else-if="banner.status == 'DR'" class="text-center"><span class="u-label u-label-warning g-color-white">ฉบับร่าง</span></td>
                                        <td class="text-center">
                                            <button class="btn btn-sm btn-success" :disabled="$store.getters.progressBar" @click="editMyBanner(banner.id, banner.topic, banner.description, banner.src, banner.type)" title="แก้ไข"><i class="fas fa-edit"></i></button> 
                                            <button v-if="banner.status == 'EX'" class="btn btn-sm btn-info" title="ต่ออายุ" :disabled="$store.getters.progressBar"><i class="fas fa-redo-alt"></i></button> 
                                            <button class="btn btn-sm btn-danger" title="ปิดประกาศ" :disabled="$store.getters.progressBar" @click="showDeleteBannerImageModal(banner.id, banner.package, banner.topic, banner.src)"><i class="fas fa-times"></i></button>
                                        </td>
                                    </tr>
                                </slot>
                            </tbody>
                        </table>
                    </div>

                    <banner-image-modal v-if="bannerImageModal"
                        :topic = isBannerImage.topic
                        :url = isBannerImage.url
                    ></banner-image-modal>

                    <package-line-modal v-if="modalPackage"
                        :packageCode = isBannerPackageLine.code
                        :assetName = isBannerPackageLine.topic
                    ></package-line-modal>

                    <banner-image-edit-modal v-if="$store.getters.bannerImageEditModal"
                        :id = isBannerImageEdit.id
                        :topic = isBannerImageEdit.topic
                        :description = isBannerImageEdit.description
                        :url = isBannerImageEdit.url
                        :type = isBannerImageEdit.type
                    ></banner-image-edit-modal>

                    <banner-image-close-modal v-if="$store.getters.bannerImageDeleteModal"
                        :packageCode = isBannerImageClose.user_package
                        :topic = isBannerImageClose.topic
                        :id = isBannerImageClose.id
                        :url = isBannerImageClose.url
                    ></banner-image-close-modal>

                </div>`
}