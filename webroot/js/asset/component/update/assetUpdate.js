import {AssetUpdateImages} from './assetUpdateImages.js'

export const AssetUpdate = {
    components: {
        'asset-update-images' : AssetUpdateImages
    },
    data () {
        return {
            asset: {
                announce: '',
                project: '',
                name: '',
                type: '',
                price: '',
                discount: '',
                rental: '',
                bedroom: 0,
                bathroom: 0,
                size: 0,
                landsize: 0,
                ngan: 0,
                tarangwa: 0,
                description: ''
            },
            isClass: {
                border_danger: 'border border-danger'
            },
            minDiscountPercent: 20,
            discountNotice: '',
            discountNoticeStatus: false
        }
    },
    mounted () {
        this.getAssetId()
    },
    computed: {
        checkAnnounceSale(){
            return this.asset.announce === 'ขาย' || this.asset.announce === '' ? true : false
        },
        checkAnnounceRent(){
            return this.asset.announce === 'ให้เช่า' || this.asset.announce === '' ? true : false
        },
        calculatePrice(){
            return (this.asset.price - this.asset.discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        dataCheck(){
            let checked = true
            if(this.asset.announce === '') checked = false
            if(this.asset.announce === 'ขาย' && this.asset.price <= 0) checked = false
            if(this.asset.announce === 'ให้เช่า' && this.asset.rental <= 0) checked = false
            if(this.asset.announce === 'ขายและให้เช่า' && this.asset.price <= 0 || this.asset.announce === 'ขายและให้เช่า' && this.asset.rental <= 0) checked = false 
            if(this.asset.name === '') checked = false
            if(this.asset.type === '') checked = false
            if(this.$store.getters.countImages < 0) checked = false
            if(!this.$store.getters.provinceSelected) checked = false
            if(this.discountNoticeStatus) checked = false

            this.$store.dispatch('checkData', checked)
        },
        saveAnnounceData() {
            let announceData = {
                    announce: this.asset.announce,
                    project: this.asset.project,
                    name: this.asset.name,
                    type: this.asset.type,
                    price: this.asset.price,
                    discount: this.asset.discount,
                    rental: this.asset.rental,
                    bedroom: this.asset.bedroom,
                    bathroom: this.asset.bathroom,
                    size: this.asset.size,
                    landsize: this.asset.landsize,
                    ngan: this.asset.ngan,
                    tarangwa: this.asset.tarangwa,
                    description: this.asset.description
            }
            this.$store.dispatch('saveAnnounceData', announceData)
        },
        setUpdateAsset() {
            let upAsset = this.$store.getters.updateAsset
            this.asset.announce = upAsset.announce
            this.asset.project = upAsset.type
            this.asset.name = upAsset.name
            this.asset.type = upAsset.asset_type_id
            this.asset.price = upAsset.price
            this.asset.discount = upAsset.discount
            this.asset.bedroom = upAsset.bedroom
            this.asset.bathroom = upAsset.bathroom
            this.asset.rental = upAsset.rental
            this.asset.size = upAsset.usefulspace
            this.asset.landsize = upAsset.landsize_1
            this.asset.ngan = upAsset.landsize_2
            this.asset.tarangwa = upAsset.landsize_3
            this.asset.description = upAsset.description
        },
        checkTypeProjectDiscount() {
            if(this.asset.project === 'ขายด่วน') {
                this.asset.discount = Math.ceil((this.asset.price*this.minDiscountPercent)/100)
            }
        },
        checkDiscountUserInput(){
            let isDiscount = null

            isDiscount = Math.ceil((this.asset.price*this.minDiscountPercent)/100)
            if(this.asset.project === 'ขายด่วน') {
                this.discountNotice = (isDiscount > this.asset.discount) ? 'ส่วนลดน้อยเกินกว่าที่กำหนด' : ''
                this.discountNoticeStatus = (isDiscount > this.asset.discount) ? true : false
            }
        }
    },
    methods: {
        getAssetId() {
            let queryString = window.location.search
            let urlParams = new URLSearchParams(queryString)
            let id = urlParams.get('id')
            this.$store.dispatch('loadAssetData', id)
        },
        checkCreditList() {
            let isCreditList = null
            if(this.$store.getters.creditList.length > 1) {
                isCreditList = this.asset.packageCreditSelected
            }else if(this.$store.getters.creditList.length === 1) {
                isCreditList = this.$store.getters.creditList[0].id
                this.asset.packageCreditSelected = this.$store.getters.creditList[0].id
                this.asset.packageCreditDesc = this.$store.getters.creditList[0].code + ' - [' + this.$store.getters.creditList[0].duration + ' วัน : ' + this.$store.getters.creditList[0].credit + ' เครดิต]'
            }
            return isCreditList
        },
        creditSelected() {
            if(this.asset.packageCreditSelected === '') {
                // this.asset.type = ''
            }
        },
        setMinDiscount() {
            this.asset.discount = Math.ceil((this.asset.price*this.minDiscountPercent)/100)
            this.discountNotice = ''
            this.discountNoticeStatus = false
        }
    },
    template: `<div class="row">
                    {{dataCheck}} {{setUpdateAsset}} {{checkTypeProjectDiscount}}
                    <div v-if="!$store.getters.updateLoaded" class="col-md-12">
                        <div class="row pr-4 mb-4">
                            <div class="col-md-3 mb-3">
                                <label for="type">ประกาศ <strong class="text-danger">*</strong></label>
                                <select class="form-control" id="type" name="type" disabled>
                                    <option disabled value="">เลือก...</option>
                                    <option v-if="asset.announce === 'ขาย'" value="ขาย">ขาย</option>
                                    <option v-if="asset.announce === 'ให้เช่า'" value="ให้เช่า">ให้เช่า</option>
                                    <option v-if="asset.announce === 'ขายและให้เช่า'" value="ขายและให้เช่า">ขายและให้เช่า</option>
                                </select>
                            </div>
                            <div class="col-md-5 mb-3">
                                <label>แพ็คเกจ</label>
                                <input type="text" :value="$store.getters.creditDescription" class="form-control" disabled>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="project">ประเภท</label>
                                <select class="form-control" id="project" name="project" disabled>
                                    <option v-if="asset.project === 'ขายด่วน'" value="ขายด่วน">อสังหาขายด่วน</option>
                                    <option v-if="asset.project === 'มือสอง'" value="มือสอง">อสังหามือสอง</option>
                                    <option v-if="asset.project === 'โครงการใหม่'" value="โครงการใหม่">โครงการใหม่</option>
                                </select>
                            </div>
                            <div class="col-md-8">
                                <div class="form-group g-mb-20">
                                    <label for="name">หัวข้อประกาศ <strong class="text-danger">*</strong></label>
                                    <input v-model="asset.name" type="text" name="name" id="name" class="form-control" size="255"/>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group g-mb-20">
                                    <label for="asset_type">ประเภทอสังหาฯ <strong class="text-danger">*</strong></label>
                                    <select class="form-control" id="asset_type" name="asset_type" disabled>
                                        <option disabled value="">เลือก...</option>
                                        <option v-for="category in $store.getters.categorylist" v-if="category.id === asset.type">{{ category.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="price">ราคาตลาด(บาท) <strong v-if="!checkAnnounceRent" class="text-danger">*</strong></label>
                                    <input v-model="asset.price" :disabled="checkAnnounceRent" type="number" name="price" id="price" class="form-control" placeholder="0"/>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    {{checkDiscountUserInput}}
                                    <label for="discount">ส่วนลด(บาท) <small v-if="asset.project === 'ขายด่วน'" class="text-info" style="cursor: pointer;" @click="setMinDiscount"><u>ขั้นต่ำ 20%</u> <i v-if="discountNotice !== ''" class="fas fa-caret-left in-animate text-danger"></i></small></label>
                                    <input v-model="asset.discount" :disabled="checkAnnounceRent" type="number" name="discount" id="discount" class="form-control" :class="[discountNoticeStatus ? isClass.border_danger : '']" placeholder="0"/>
                                    <small v-if="discountNotice !== ''" class="text-danger">{{ discountNotice }}</small>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="discount">ราคาขาย(บาท)</label>
                                    <input v-model="calculatePrice" type="text" name="price" id="price" class="form-control" readonly/>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="discount">ค่าเช่า(บาท/เดือน) <strong v-if="!checkAnnounceSale" class="text-danger">*</strong></label>
                                    <input v-model="asset.rental" :disabled="checkAnnounceSale" type="number" name="rental" id="rental" class="form-control" placeholder="0"/>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="bedroom">จำนวนห้องนอน</label>
                                    <input v-model="asset.bedroom" type="number" name="bedroom" id="bedroom" class="form-control" placeholder="0"/>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="bathroom">จำนวนห้องน้ำ</label>
                                    <input v-model="asset.bathroom" type="number" name="bathroom" id="bathroom" class="form-control" placeholder="0"/>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="usefulspace">พื้นที่ใช้สอย(ตรม)</label>
                                    <input v-model="asset.size" type="number" name="usefulspace" id="usefulspace" class="form-control" placeholder="0"/>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="landsize">ขนาดที่ดิน(ไร่)</label>
                                    <input v-model="asset.landsize" type="number" name="landsize1" id="landsize1" class="form-control" placeholder="0"/>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="landsize" class="text-center">(งาน)</label>
                                    <input v-model="asset.ngan" type="number" name="landsize2" id="landsize2" class="form-control" placeholder="0"/>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label for="landsize" class="text-center">(ตารางวา)</label>
                                    <input v-model="asset.tarangwa" type="number" name="landsize3" id="landsize3" class="form-control" placeholder="0"/>
                                </div>
                            </div>
                        </div>

                        <div class="row pr-4">
                            <div class="col-md-6">
                                <asset-update-images />
                            </div>
                            <div class="col-md-6">
                                <div class="form-group g-mb-25">
                                    <label for="description">รายละเอียดอื่นๆ</label>
                                    <textarea v-model="asset.description" class="form-control form-control-md" name="description" id="description" rows="10"></textarea>
                                </div>
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
                    {{ saveAnnounceData }}
                </div>`
}