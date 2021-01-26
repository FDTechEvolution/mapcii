import {bannerAddCredit} from './bannerAddCredit.js'

export const bannerAddData = {
    components: {
        'banner-credit' : bannerAddCredit
    },
    data() {
        return {
            package_id: '',
            topic: '',
            banner: {
                credit: '',
                name: '',
            },
            isSelected: ''
        }
    },
    mounted() {

    },
    computed: {

    },
    methods: {
        bannerCreditCheck(creditList) {
            if(creditList) {
                this.$parent.isBannerPackageName = creditList.name
                this.$store.dispatch('setPackageFromBanner', {id:creditList.id, name:creditList.name, credit:creditList.credit})
                return creditList.code + ' - [' + creditList.name + ' : คงเหลือ ' + this.dateIsZero(creditList.duration) + ' วัน : ' + creditList.credit + ' เครดิต]'
            }
        },
        creditSelected() {
            this.$parent.isBannerPackageName = this.isSelected.name
            this.$store.dispatch('setPackageFromBanner', {id:this.isSelected.id, name:this.isSelected.name, credit:this.isSelected.credit})
        },
        setTopicToStore() {
            this.$store.dispatch('setTopicFromBanner', this.topic)
        },
        dateIsZero(duration) {
            return (duration > 0) ? duration : 0
        }
    },
    template: `<div class="row pr-4 mb-3">
                    <banner-credit></banner-credit>
                    <div class="col-md-5 mb3 text-left">
                        <div v-if="$store.getters.creditList.length > 1">
                            <label for="type">เลือกเครดิตแบนเนอร์</label>
                            <select v-model="isSelected" class="form-control" id="type" name="type" @change="creditSelected">
                                <option value="" class="text-dark" disabled>ไม่ได้เลือก...</option>
                                <option v-for="creditList in $store.getters.creditList" :value="creditList">{{ creditList.code }} - [{{creditList.name}} : คงเหลือ {{ creditList.duration }} วัน : {{ creditList.credit }} เครดิต]</option>
                            </select>
                        </div>
                        <div v-else>
                            <label for="type">เครดิตแบนเนอร์</label><br/>
                            <input type="text" class="form-control text-info" :value="bannerCreditCheck($store.getters.creditList[0])" readonly>
                        </div>
                    </div>
                    <div class="col-md-7 text-left">
                        <div class="form-group g-mb-20">
                            <label for="name">หัวข้อแบนเนอร์ <strong class="text-danger">*</strong></label>
                            <input v-model="topic" :disabled="!$parent.isAvaliableCredit()" type="text" name="name" id="name" class="form-control" size="255" @change="setTopicToStore"/>
                        </div>
                    </div>
                </div>`
}