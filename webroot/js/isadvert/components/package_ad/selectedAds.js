export const SelectAds = {
    data() {
        return {
            adsOperate: '',
            adsPackageName: '',
            adsPackageId: '',
            adsDurationId: '',
            adsSizeId: '',
            adsPrice: '',
            isPrice: '',
            isDuration: ''
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
                let payload = {uid: user_id, ads_operate: this.adsOperate, ads_package: this.adsPackageId, ads_duration: this.isDuration, size: this.adsSizeId, price: this.isPrice}
                // console.log(payload)
                this.$store.dispatch('saveUserTakePackage', payload)
            }
        }
    },
    template: `<div v-if="!$store.getters.package_payment" class="row">
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
                    <div class="col-md-2 mb-3">
                        3.อายุแพ็คเกจ
                        <select v-model="adsDurationId" class="form-control">
                            <option value="" disabled>เลือก...</option>
                            <slot v-if="adsOperate !== ''">
                                <option v-for="duration in $store.getters.package_duration" :value="duration.id">{{ duration.duration_name }} ({{ duration.duration_exp }} วัน)</option>
                            </slot>
                        </select>
                    </div>
                    <div class="col-md-2 mb-3">
                        4. ขนาด
                        <select v-model="adsSizeId" class="form-control">
                            <option value="" disabled>เลือก...</option>
                            <slot v-if="adsOperate !== ''">
                                <option v-for="size in $store.getters.package_size" :value="size.id">{{ size.name }}</option>
                            </slot>
                        </select>
                    </div>
                    <div class="col-md-2 mb-3">
                        5.จำนวนเงิน
                        <input v-model="setAdsPrice" type="text" class="form-control" name="price" readonly>
                    </div>
                    <div class="col-md-2 mt-4 offset-10">
                        <div v-if="!$store.getters.package_saved">
                            <button v-if="isPrice === ''" class="btn btn-success btn-block" disabled>ส่ง</button>
                            <button v-else class="btn btn-success btn-block" @click="sentAds">ส่ง</button>
                        </div>
                        <div v-else>
                            <button class="btn btn-success btn-block" disabled>กำลังบันทึก</button>
                        </div>
                    </div>
                </div>`
}