export const SelectBannerA = {
    data() {
        return {
            adsOperate: '',
            adsPackageName: '',
            adsPackageId: '',
            adsDurationId: '',
            adsPrice: '',
            isPrice: '',
            isDuration: ''
        }
    },
    computed: {
        setAdsPrice() {
            this.adsPackageName = this.$store.getters.package_banner_a_name
            this.$store.getters.package_banner_a.forEach(isPack => {
                if(isPack.package_duration_id === this.adsDurationId) {
                    this.adsPackageId = isPack.id
                    this.isDuration = isPack.package_duration.duration_exp
                    this.isPrice = (isPack.proprice !== '') ? isPack.proprice : isPack.isprice
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
                let payload = {uid: user_id, ads_operate: this.adsOperate, ads_package: this.adsPackageId, ads_duration: this.isDuration, price: this.isPrice}
                this.$store.dispatch('saveUserTakePackage', payload)
            }
        }
    },
    template: `<div class="row">
                    <div class="col-md-12"><h4>เลือกแพ็คเกจ</h4></div>
                    <div class="col-md-3 mb-3">
                        1.ดำเนินการ
                        <select v-model="adsOperate" class="form-control">
                            <option value="" disabled selected>เลือก...</option>
                            <option value="buy">ลงโฆษณา</option>
                            <option value="renew">ต่ออายุ</option>
                        </select>
                    </div>
                    <div class="col-md-3 mb-3">
                        2.แพ็คเกจโฆษณา
                        <input v-model="adsPackageName" type="text" class="form-control" name="package" readonly>
                    </div>
                    <div class="col-md-3 mb-3">
                        3.อายุแพ็คเกจ
                        <select v-model="adsDurationId" class="form-control">
                            <option value="" selected>เลือก...</option>
                            <slot v-if="adsOperate !== ''">
                                <option v-for="duration in $store.getters.package_duration" :value="duration.id">{{ duration.duration_name }}</option>
                            </slot>
                        </select>
                    </div>
                    <div class="col-md-3 mb-3">
                        4.จำนวนเงินที่ต้องชำระ
                        <input v-model="setAdsPrice" type="text" class="form-control" name="price" readonly>
                    </div>
                    <div class="col-md-2 offset-10 mt-4">
                        <div v-if="!$store.getters.package_saved">
                            <button :disabled="isPrice === ''" class="btn btn-success btn-block" @click="sentAds">ส่ง</button>
                        </div>
                        <div v-else>
                            <button class="btn btn-success btn-block" disabled>กำลังบันทึก</button>
                        </div>
                    </div>
                </div>`
}