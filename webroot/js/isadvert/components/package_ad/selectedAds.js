import {selectRenewFromAdvertiesments} from '../selectRenewFromAdvertiesments.js'

export const SelectAds = {
    components: {
        'select-renew-ad' : selectRenewFromAdvertiesments
    },
    data() {
        return {
            adsOperate: '',
            adsPackageName: '',
            adsPackageId: '',
            adsDurationId: '',
            adsSizeId: '',
            adsPrice: '',
            isPrice: '',
            isDuration: '',
            packageRenewSelected: false,
            isDurationSelected: false,
            user_package_id: ''
        }
    },
    mounted() {
        this.$store.dispatch('getPackageSize')
    },
    computed: {
        setAdsPrice() {
            this.adsPackageName = this.$store.getters.package_ad_name
            this.$store.getters.package_full_ad.forEach(isPack => {
                if(isPack.package_duration_id === this.adsDurationId) {
                    if(isPack.size_id === this.adsSizeId) {
                        this.adsPackageId = isPack.id
                        this.isDuration = isPack.package_duration.duration_exp
                        this.isPrice = (isPack.proprice !== null) ? isPack.proprice : isPack.isprice
                    }
                }
            })
            return this.formatNumber(this.isPrice)
        }
    },
    methods: {
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        sentAds() {
            if(user_active !== 'Y') {
                alert('Login First...')
            }else{
                if(this.adsOperate === 'buy') {
                    let payload = {uid: user_id, ads_operate: this.adsOperate, ads_package: this.adsPackageId, ads_duration: this.isDuration, size: this.adsSizeId, price: this.isPrice}
                    this.$store.dispatch('saveUserTakePackage', payload)
                }else if(this.adsOperate === 'renew') {
                    let payload = {user_package_id:this.user_package_id, duration_id:this.adsDurationId, size_id:this.adsSizeId, package_line_id:this.adsPackageId, isForm: 'pk'}
                    this.$store.dispatch('saveUserRenewPackage', payload)
                }
            }
        },
        adsOperateSelected() {
            this.packageRenewSelected = (this.adsOperate === 'buy') ? true : (this.adsOperate === 'renew') ? false : false
            this.isDurationSelected = false
            this.adsDurationId = ''
            this.adsSizeId = ''
            this.isPrice = ''
        },
        checkSaveCondition() {
            return (this.packageRenewSelected && this.isPrice !== '') ? true : false
        },
        durationSelected() {
            this.isDurationSelected = true
        }
    },
    template: `<div v-if="!$store.getters.package_payment" class="row">
                    <div class="col-md-12"><h4>เลือกแพ็คเกจ</h4></div>
                    <div class="col-md-3 mb-3">
                        1.ดำเนินการ
                        <select v-model="adsOperate" class="form-control" @change="adsOperateSelected">
                            <option value="" disabled selected>เลือก...</option>
                            <option value="buy">ลงโฆษณา</option>
                            <option value="renew">ต่ออายุ</option>
                        </select>
                    </div>
                    <div class="col-md-3 mb-3">
                        2.แพ็คเกจโฆษณา
                        <input v-model="adsPackageName" type="text" class="form-control" name="package" readonly>
                    </div>
                    <div class="col-md-2 mb-3">
                        3.อายุแพ็คเกจ
                        <select v-if="packageRenewSelected" v-model="adsDurationId" class="form-control" @change="durationSelected">
                            <option value="" selected>เลือก...</option>
                            <slot v-if="adsOperate !== ''">
                                <option v-for="duration in $store.getters.package_duration" :value="duration.id">{{ duration.duration_name }}</option>
                            </slot>
                        </select>
                        <select v-else class="form-control" disabled><option value="" selected>เลือก...</option></select>
                    </div>
                    <div class="col-md-2 mb-3">
                        4. ขนาด
                        <select v-if="isDurationSelected" v-model="adsSizeId" class="form-control">
                            <option value="" disabled>เลือก...</option>
                            <slot v-if="adsOperate !== ''">
                                <option v-for="size in $store.getters.package_size" :value="size.id">{{ size.name }}</option>
                            </slot>
                        </select>
                        <select v-else class="form-control" disabled><option value="" selected>เลือก...</option></select>
                    </div>
                    <div class="col-md-2 mb-3">
                        5.จำนวนเงิน
                        <input v-model="setAdsPrice" type="text" class="form-control" name="price" readonly>
                    </div>
                    <div v-if="adsOperate === 'renew'" class="col-md-12">
                        <select-renew-ad
                            :type = adsPackageName
                        ></select-renew-ad>
                    </div>
                    <div v-if="adsOperate === 'buy'" class="col-md-2 offset-10 mt-4">
                        <div v-if="!$store.getters.package_saved">
                            <button v-if="!checkSaveCondition()" class="btn btn-success btn-block" disabled>ส่ง</button>
                            <button v-else class="btn btn-success btn-block" @click="sentAds">ส่ง</button>
                        </div>
                        <div v-else>
                            <button class="btn btn-success btn-block" disabled>กำลังบันทึก</button>
                        </div>
                    </div>
                    <div v-else-if="adsOperate === 'renew'" class="col-md-2 offset-10 mt-4">
                        <div v-if="!$store.getters.renew_saving">
                            <button v-if="!checkSaveCondition()" class="btn btn-success btn-block" disabled>ส่ง</button>
                            <button v-else class="btn btn-success btn-block" @click="sentAds">ส่ง</button>
                        </div>
                        <div v-else>
                            <button class="btn btn-success btn-block" disabled>กำลังบันทึก</button>
                        </div>
                    </div>
                    <div v-else class="col-md-2 offset-10 mt-4">
                        <button class="btn btn-success btn-block" disabled>ส่ง</button>
                    </div>
                </div>`
}