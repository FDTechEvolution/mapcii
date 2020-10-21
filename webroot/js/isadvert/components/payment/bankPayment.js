export const BankPayment = {
    data() {
        return {
            name: '',
            member: '',
            package: '',
            isDisabled: false
        }
    },
    computed: {
        setUserData() {
            let getUser = this.$store.getters.user_data
            if(getUser !== '') {
                this.name = getUser.name
                this.member = getUser.code
                this.package = getUser.package
                this.isDisabled = false
            }else{
                this.isDisabled = true
            }
        },
        dataSaved() {
            if(this.$store.getters.payment_saved) {
                this.$parent.goBack
            }
        }
    },
    methods: {
        saveUserPayment() {
            if(this.name === '' || this.member === '' || this.package === ''){
                alert('ไม่มีข้อมูล...')
            }else{
                if(this.$refs.file.files[0] === undefined){
                    alert('กรุณาแนบหลักฐานการโอนเงิน...')
                }else{
                    if(this.$refs.file.files[0].size > 1024000) {
                        alert('ขนาดเกินกว่าที่กำหนด')
                    }else{
                        let userSavePaymentPayload = {id: this.$store.getters.user_data.id, img: this.$refs.file.files[0]}
                        this.$store.dispatch('saveUserPayment', userSavePaymentPayload)
                    }
                }
            }
        }
    },
    template: `<div class="col-md-12">
                    {{setUserData}} {{dataSaved}}
                    <div class="row">
                        <div class="col-md-12">
                            <h5 class="mb-3"><u>โอนเงินเข้าบัญชีธนาคาร</u></h5>
                        </div>
                        <div class="col-md-12">
                            <strong>1. โอนเงินค่าแพ็คเกจมาที่</strong>
                                <p class="pl-4">
                                    บัญชี นายประสิทธิ์ บูรณะโอสถ<br/>
                                    ธนาคาร กรุงไทย<br/>
                                    เลขที่บัญชี xxxxxxxxxxxxxxxxxx
                                </p>
                        </div>
                        <div class="col-md-12">
                            <strong>2. แจ้งชำระเงินโดย</strong>
                                <p class="pl-4">
                                    2.1 แจ้งผ่านไลน์ @mapcii โดยแชร์สลิปที่โอนเงิน พร้อมชื่อผู้โอน หมายเลขสมาชิก และใส่รายละเอียดแพ็คเกจที่เลือก 3 ส่วน
                                    เช่น 1.ลงโฆษณา/2.ประกาศ/3.รายปี หรือ 1.ต่ออายุ/2.Banner B/3.รายเดือน เป็นต้น<br/>
                                    2.2 แจ้งผ่านระบบนี้
                                </p>
                        </div>
                    </div>
                    <div class="row pl-4 pb-3 pt-3 border-top border-bottom">
                        <div class="col-md-4">
                            <label for="name">ชื่อ</label>
                            <input v-model="name" class="form-control" type="text" name="name" id="name" placeholder="ชื่อ" readonly>
                        </div>
                        <div class="col-md-3">
                            <label for="member">หมายเลขสมาชิก</label>
                            <input v-model="member" class="form-control" type="text" name="member" id="member" placeholder="หมายเลขสมาชิก" readonly>
                        </div>
                        <div class="col-md-5">
                            <label for="package">แพ็คเกจ</label>
                            <input v-model="package" class="form-control" type="text" name="package" id="package" placeholder="แพ็คเกจ" readonly>
                        </div>
                        <div class="col-md-8 mt-4">
                            <label>แนบหลักฐานการโอนเงิน <small class="text-danger">(ขนาดไม่เกิน 1 MB ไฟล์ JPG, PNG, GIF)</small></label>
                            <input class="form-control" type="file" id="fileUpload" ref="file">
                        </div>
                        <div class="col-md-4 mt-4 pt-3">
                            <button :disabled="isDisabled" class="btn btn-danger rouned float-left align-bottom" @click="saveUserPayment">ส่ง</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mt-3">
                            <strong>3. เมื่อได้รับแจ้งชำระเงิน ทางทีมงานจะทำการตรวจสอบ และเมื่อเงินเขาบัญชีถูกต้อง เราจะทำการให้สิทธิ์ตามแพ็คเกจที่ลูกค้าเลือกทันที</strong>
                        </div>
                        <div class="col-md-12 mt-3">
                            <strong>4. ลูกค้าสามารถตรวจสอบสิทธิ์ในการลงโฆษณาได้ที่หน้า <a href="#">ลงโฆษณา</a> หรือ <a href="#">โฆษณาของฉัน</a></strong>
                        </div>
                    </div>
                </div>`
}