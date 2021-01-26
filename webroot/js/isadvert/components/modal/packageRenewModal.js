import {PackageAd} from '../package_ad/packageAd.js'
import {PackageBannerA} from '../banner_a/packageBannerA.js'
import {PackageBannerB} from '../banner_b/packageBannerB.js'
import {selectRenewPackage} from '../selectRenewPackage.js'

export const packageRenewModal = {
    components: {
        'package-ad' : PackageAd,
        'package-banner-a' : PackageBannerA,
        'package-banner-b' : PackageBannerB,
        'select-renew-package' : selectRenewPackage
    },
    props: ['id', 'packageCode', 'name', 'size'],
    data() {
        return {
            isPackage: '',
            isPrice: '',
            adsDurationId: '',
            adsSizeId: '',
            adsPackageId: ''
        }
    },
    mounted() {
        this.isPackage = this.name
        this.$store.dispatch('getPackageSize')
    },
    methods: {
        renewPackageAlert() {
            alert('เงื่อนไขไม่ถูกต้อง...')
        },
        renewPackageConfirm() {
            let payload = {user_package_id:this.id, duration_id:this.adsDurationId, size_id:this.adsSizeId, package_line_id:this.adsPackageId, isForm:'md'}
            this.$store.dispatch('saveUserRenewPackage', payload)
        }
    },
    template: `<transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container-closeasset">
                                <div class="modal-header">
                                    <h5>ต่ออายุแพ็คเกจ : [{{packageCode}}] - {{name}} <span v-if="size !== ''">{{size}}</span></h5> 
                                </div>
                                <div class="modal-body mt-0">
                                    <slot v-if="isPackage === 'ประกาศ (AD)'">
                                        <package-ad></package-ad>
                                        <select-renew-package
                                            :type = 'isPackage'
                                        ></select-renew-package>
                                    </slot>
                                    <slot v-if="isPackage === 'Banner A'">
                                        <package-banner-a></package-banner-a>
                                        <select-renew-package
                                            :type = 'isPackage'
                                        ></select-renew-package>
                                    </slot>
                                    <slot v-if="isPackage === 'Banner B'">
                                        <package-banner-b></package-banner-b>
                                        <select-renew-package
                                            :type = 'isPackage'
                                        ></select-renew-package>
                                    </slot>
                                </div>
                                <div class="modal-footer">
                                    <slot v-if="!$store.getters.renew_saving">
                                        <button v-if="isPrice === ''" type="button" class="btn btn-primary" @click="renewPackageAlert" disabled><i class="fas fa-redo-alt"></i> ต่ออายุ</button>
                                        <button v-else type="button" class="btn btn-primary" @click="renewPackageConfirm"><i class="fas fa-redo-alt"></i> ต่ออายุ</button>
                                        <button type="button" class="btn btn-danger" @click="$store.dispatch('showPackageRenewModal', false)"><i class="far fa-times-circle"></i> ปิดหน้าต่าง</button>
                                    </slot>
                                    <slot v-else>
                                        <div class="loadingio-spinner-gear-31k4689btaa mt-1 mr-2 pr-3">
                                            <div class="ldio-hi7wef2pqwc">
                                                <div><div></div><div></div><div></div>
                                                <div></div><div></div><div></div></div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-primary" disabled>กำลังดำเนินการ...</button>
                                    </slot>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>`
}