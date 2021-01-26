import {bannerAddData} from './bannerAddData.js'
import {bannerAddDescription} from './banner_a/bannerAddDescription.js'
import {bannerAddImage} from './banner_a/bannerAddImage.js'

import {bannerAddDescriptionB} from './banner_b/bannerAddDescription.js'
import {bannerAddImageB} from './banner_b/bannerAddImage.js'

export const bannerAddIndex = {
    components: {
        'banner-data' : bannerAddData,
        'banner-description' : bannerAddDescription,
        'banner-image' : bannerAddImage,
        'banner-description-b' : bannerAddDescriptionB,
        'banner-image-b' : bannerAddImageB
    },
    data() {
        return {
            bannerNotice: '',
            isBannerPackage: [],
            isBannerPackageName: ''
        }
    },
    mounted() {
        this.$store.dispatch('checkCreditBanner')
    },
    computed: {
        checkBannerSubmit() {
            return (this.$store.getters.banner_topic === '' || this.$store.getters.banner.image === '' || this.bannerNotice !== '') ? false : true
        },
        setCreditBanner() {
            this.$store.dispatch('packageAdCheck', this.$store.getters.is_banner)
        }
    },
    methods: {
        confirmSaveBanner() {
            this.$store.dispatch('bannerSaved')
        },
        saveBannerAlert() {
            alert('การกระทำของคุณไม่ถูกต้อง...กรุณาทำตามเงื่อนไขที่กำหนด')
        },
        isAvaliableCredit() {
            return (this.$store.getters.announceStatus.isDuration && this.$store.getters.announceStatus.isHasCredit) ? true : false
        }
    },
    template: `<div class="row pr-5 pl-5">{{setCreditBanner}}
                    <div v-if="!$store.getters.announceStatusLoaded" class="col-md-12">
                        <banner-data></banner-data>
                        <div v-if="isBannerPackageName === 'Banner A'" class="row pr-4">
                            <banner-image></banner-image>
                            <banner-description></banner-description>
                        </div>
                        <div v-if="isBannerPackageName === 'Banner B'" class="row pr-4">
                            <banner-image-b></banner-image-b>
                            <banner-description-b></banner-description-b>
                        </div>
                        <div class="row border-top mt-3">
                            <div class="col-md-12 text-right pt-3">
                                <slot v-if="!checkBannerSubmit">
                                    <button class="btn btn-primary" disabled @click="saveBannerAlert">บันทึกแบนเนอร์</button>
                                </slot>
                                <slot v-else>
                                    <slot v-if="!$store.getters.banner_saving">
                                        <button class="btn btn-primary" @click="confirmSaveBanner">บันทึกแบนเนอร์</button>
                                    </slot>
                                    <slot v-else>
                                        <div class="loadingio-spinner-gear-3cymlqns1bn text-center">
                                            <div class="ldio-mlvdh911kas">
                                                <div><div></div><div></div><div></div>
                                                <div></div><div></div><div></div></div>
                                            </div>
                                        </div>
                                        <button class="btn btn-primary" style="margin-top: -20px;" disabled>กำลังบันทึก</button>
                                    </slot>
                                </slot>
                            </div>
                        </div>
                    </div>
                    <div v-else class="col-md-12 text-center">
                        <div class="loadingio-spinner-spinner-72aw3to60xg">
                            <div class="ldio-cm123s8lq54">
                                <div></div><div></div><div></div>
                                <div></div><div></div><div></div>
                                <div></div><div></div><div></div>
                                <div></div><div></div><div></div>
                            </div>
                        </div>
                    </div>
                </div>`
}