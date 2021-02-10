import {AssetAnnounceImages} from './assetAnnounceImages.js'

export const AssetAnnounce = {
    components: {
        'asset-announce-images' : AssetAnnounceImages
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
                description: '',
                packageCreditSelected: '',
                packageCreditDesc: ''
            },
            isClass: {
                border_danger: 'border border-danger'
            },
            minDiscountPercent: 20,
            discountNotice: '',
            discountNoticeStatus: false
        }
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
            if(this.$store.getters.countImages < 0 || this.$store.getters.countImages === 10) checked = false
            if(!this.$store.getters.provinceSelected) checked = false
            if(this.discountNoticeStatus) checked = false

            this.$store.dispatch('checkData', checked)
        },
        saveAnnounceData() {
            let isDuration = null
            this.$store.getters.creditList.forEach(item => {
                isDuration = (item.id === this.asset.packageCreditSelected) ? item.duration : ''
            })
            let announceData = {
                    announce: this.asset.announce,
                    project: this.asset.project,
                    name: this.asset.name,
                    type: this.asset.type,
                    duration: isDuration,
                    price: this.asset.price,
                    discount: this.asset.discount,
                    rental: this.asset.rental,
                    bedroom: this.asset.bedroom,
                    bathroom: this.asset.bathroom,
                    size: this.asset.size,
                    landsize: this.asset.landsize,
                    ngan: this.asset.ngan,
                    tarangwa: this.asset.tarangwa,
                    description: this.asset.description,
                    userpackage: this.checkCreditList()
            }
            this.$store.dispatch('saveAnnounceData', announceData)
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
    mounted() {

    },
    methods: {
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
                this.asset.type = ''
            }
        },
        setMinDiscount() {
            this.asset.discount = Math.ceil((this.asset.price*this.minDiscountPercent)/100)
            this.discountNotice = ''
            this.discountNoticeStatus = false
        },
        checkCreditCondition(duration, credit) {
            return (duration > 0 && credit > 0) ? true : false
        }
    },
    template: `<div class="row">
                    {{dataCheck}} {{checkTypeProjectDiscount}}
                    <div class="col-md-12">
                        <div class="row pr-4 mb-4">
                            <div class="col-md-12 text-danger">
                                <div class="row">
                                    <div v-if="$store.getters.announceStatus.isTestAnnounce" class="col-md-10 offset-1 margin-top--40">
                                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <small><i class="fa fa-exclamation-triangle"></i> กรุณาชำระเงินตามแพ็คเกจที่คุณได้เลือกไว้...เพื่อใช้งานประกาศประเภทอื่นๆ</small>
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        </div>
                                    </div>
                                    <div v-else-if="!$store.getters.announceStatus.isDuration" class="col-md-10 offset-1 margin-top--40">
                                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                        <small><i class="fa fa-exclamation-triangle"></i> แพ็คเกจของคุณหมดอายุแล้ว...กรุณาต่ออายุแพ็คเกจ</small>
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        </div>
                                    </div>
                                    <div v-else-if="!$store.getters.announceStatus.isHasCredit" class="col-md-10 offset-1 margin-top--40">
                                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                            <small><i class="fa fa-exclamation-triangle"></i> แพ็คเกจของคุณเครดิตเต็มแล้ว...กรุณาปิดประกาศอื่นๆหรือซื้อแพ็คเกจใหม่เพื่อเพิ่มเครดิต</small>
                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="$store.getters.announceStatus.isHasCredit" class="col-md-10 offset-1 margin-top--40">
                                <div class="alert alert-info alert-dismissible fade show" role="alert">
                                <small>คุณมีเครดิตในการโฆษณาเหลืออยู่ ระบบจะหักเครดิตก็ต่อเมื่อมีการเลือกเครดิตโฆษณา</small>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="type">ประกาศ <strong class="text-danger">*</strong></label>
                                <select v-model="asset.announce" class="form-control" id="type" name="type">
                                    <option disabled value="">เลือก...</option>
                                    <option value="ขาย">ขาย</option>
                                    <option value="ให้เช่า">ให้เช่า</option>
                                    <option value="ขายและให้เช่า">ขายและให้เช่า</option>
                                </select>
                            </div>
                            <div class="col-md-5 mb3">
                                <slot v-if="$store.getters.announceStatus.isHasCredit">
                                    <div v-if="$store.getters.creditList.length > 1">
                                        <label for="type">เลือกเครดิตโฆษณา</label>
                                        <select v-model="asset.packageCreditSelected" class="form-control" id="type" name="type" @change="creditSelected">
                                            <option value="" class="text-dark">ไม่ได้เลือก...</option>
                                            <option v-if="checkCreditCondition(creditList.duration, creditList.credit)" v-for="creditList in $store.getters.creditList" :value="creditList.id">{{ creditList.code }} - [คงเหลือ {{ creditList.duration }} วัน : {{ creditList.credit }} เครดิต]</option>
                                        </select>
                                    </div>
                                    <div v-else>
                                        <label for="type">เครดิตโฆษณา</label><br/>
                                        <input type="text" class="form-control text-info" :value="asset.packageCreditDesc" readonly>
                                    </div>
                                </slot>
                            </div>
                            <div class="col-md-4 mb-3">
                                <label for="project">ประเภท <strong class="text-danger">*</strong></label>
                                <select v-model="asset.project" class="form-control" id="project" name="project" :disabled="$store.getters.announceStatus === null">
                                    <option disabled value="">เลือก...</option>
                                    <option value="มือสอง">อสังหามือสอง <span v-if="$store.getters.announceStatus !== null && asset.packageCreditSelected !== ''">(ใช้เครดิต x1)</span></option>
                                    <slot v-if="$store.getters.announceStatus !== null && asset.packageCreditSelected !== ''">
                                        <option v-if="asset.announce !== 'ให้เช่า'" value="ขายด่วน">อสังหาขายด่วน <span class="text-info">(ใช้เครดิต x1)</span></option>
                                        <option value="โครงการใหม่">โครงการใหม่ (ใช้เครดิต x1)</option>
                                    </slot>
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
                                    <label for="asset_type_id">ประเภทอสังหาฯ <strong class="text-danger">*</strong></label>
                                    <select v-model="asset.type" class="form-control" id="asset_type_id" name="asset_type_id">
                                        <option disabled value="">เลือก...</option>
                                        <option v-for="category in $store.getters.categorylist" :value="category.id">{{ category.name }}</option>
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
                                <asset-announce-images />
                            </div>
                            <div class="col-md-6">
                                <div class="form-group g-mb-25">
                                    <label for="description">รายละเอียดอื่นๆ</label>
                                    <textarea v-model="asset.description" class="form-control form-control-md" name="description" id="description" rows="5"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{ saveAnnounceData }}
                </div>`
}