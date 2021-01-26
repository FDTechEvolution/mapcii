export const selectRenewPackage = {
    props: ['type'],
    data() {
        return {
            isDuration: '',
            buttonPassCondition : false
        }
    },
    computed: {
        calculatePrice() {
            switch (this.type) {
                case 'ประกาศ (AD)' :
                    this.$store.getters.package_full_ad.forEach(isPack => {
                        if(isPack.package_duration_id === this.$parent.adsDurationId) {
                            if(isPack.size_id === this.$parent.adsSizeId) {
                                this.$parent.adsPackageId = isPack.id
                                this.isDuration = isPack.package_duration.duration_exp
                                this.$parent.isPrice = (isPack.proprice !== null) ? isPack.proprice : isPack.isprice
                            }
                        }
                    })
                    break
                case 'Banner A' :
                    this.$store.getters.package_banner_a.forEach(isPack => {
                        if(isPack.package_duration_id === this.$parent.adsDurationId) {
                            this.$parent.adsPackageId = isPack.id
                            this.isDuration = isPack.package_duration.duration_exp
                            this.$parent.isPrice = (isPack.proprice !== '') ? isPack.proprice : isPack.isprice
                        }
                    })
                    break
                case 'Banner B' :
                    this.$store.getters.package_banner_b.forEach(isPack => {
                        if(isPack.package_duration_id === this.$parent.adsDurationId) {
                            this.$parent.adsPackageId = isPack.id
                            this.isDuration = isPack.package_duration.duration_exp
                            this.$parent.isPrice = (isPack.proprice !== '') ? isPack.proprice : isPack.isprice
                        }
                    })
                    break
            }
            return this.formatNumber(this.$parent.isPrice)
        }
    },
    methods: {
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    },
    template: `<div class="row">
                    <div :class="[(type === 'ประกาศ (AD)' ? 'col-md-3' : 'col-md-4')]">
                        <label>ดำเนินการ</label>
                        <input type="text" class="form-control" value="ต่ออายุ" readonly>
                    </div>
                    <div :class="[(type === 'ประกาศ (AD)' ? 'col-md-3' : 'col-md-4')]">
                        <label>อายุแพ็คเกจ</label>
                        <select v-model="$parent.adsDurationId" class="form-control">
                            <option value="" disabled>เลือก...</option>
                            <option v-for="duration in $store.getters.package_duration" :value="duration.id">{{ duration.duration_name }} ({{ duration.duration_exp }} วัน)</option>
                        </select>
                    </div>
                    <div :class="[(type === 'ประกาศ (AD)' ? 'col-md-3' : 'isNone')]">
                        <label>ขนาด</label>
                        <select v-model="$parent.adsSizeId" class="form-control">
                            <option value="" disabled>เลือก...</option>
                            <option v-for="size in $store.getters.package_size" :value="size.id">{{ size.name }}</option>
                        </select>
                    </div>
                    <div :class="[(type === 'ประกาศ (AD)' ? 'col-md-3' : 'col-md-4')]">
                        <label>จำนวนเงิน (บาท)</label>
                        <input v-model="calculatePrice" type="text" class="form-control" readonly>
                    </div>
                </div>`
}