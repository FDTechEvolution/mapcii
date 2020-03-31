Vue.component('package-payment', {
    props: ['newProject','sales','rent','assetName','assetId'],
    data: () => {
        return {
            packages: [],
            financials: [],
            form: {
                email: null,
                time: '',
                package: '',
                package_id: null,
                amount: null,
                detail: null,
                memberID: null,
                tel: null,
                financial: '',
                financialtype: null,
                slip: null
            },
            notice: null
        }
    },
    mounted () {
        this.loadPackages()
        this.loadUser()
        this.loadfinancials()
    },
    methods: {
        loadUser: function () {
            if (localStorage.getItem('MAPCII_USER')) {
                axios.get(apiurl + 'api-users/user?id=' + localStorage.getItem('MAPCII_USER'))
                .then((response) => {
                    let user = response.data.data
                    this.form.email = user.email
                    this.form.memberID = user.usercode
                    this.form.tel = user.phone
                })
            }
        },
        loadPackages: function () {
            axios.get(apiurl + 'api-packages/listpackages?type=Ads&newproject=' + this.newProject + '&sales=' + this.sales + '&rent=' + this.rent)
            .then((response) => {
                this.packages = response.data.packagelist
            })
            .catch(e => {
                console.log(e)
            })
        },
        loadfinancials: function () {
            axios.get(apiurl + 'api-financial/listfinancials')
            .then((response) => {
                this.financials = response.data.financiallist
            })
        },
        fincancialSelected: function () {
            if (this.form.financial) {
                this.financials.forEach(fc => {
                    if (this.form.financial == fc.id) {
                        this.form.financialtype = fc.type
                    }
                })
            }
        },
        checkfrm: function () {
            if(this.form.email && this.form.time && this.form.package && this.form.detail && this.form.memberID && this.form.tel && this.form.slip) {
                this.savepayment()
            }

            if(!this.form.slip) {
                this.notice = 'กรุณาแนบหลักฐานการโอนเงิน'
            }
            
            if(!this.form.tel) {
                this.notice = 'กรุณาระบุหมายเลขโทรศัพท์'
            }

            if(!this.form.memberID) {
                this.notice = 'กรุณาระบุรหัสสมาชิก'
            }

            if(!this.form.detail) {
                this.notice = 'กรุณาระบุรายละเอียด'
            }

            if(!this.form.package) {
                this.notice = 'กรุณาเลือกแพ็คเกจ'
            }

            if(!this.form.time) {
                this.notice = 'กรุณาเลือกระยะเวลาลงประกาศ'
            }

            if(!this.form.email) {
                this.notice = 'กรุณากรอกที่อยู่อีเมล์ของคุณ'
            }
        },
        checkpackage: function () {
            if(this.form.time == '1 เดือน') {
                if(this.form.package) {
                    this.packages.forEach(pk => {
                        if(this.form.package == pk.name){
                            this.form.package_id = pk.id
                            this.form.amount = pk.monthly_price
                        }
                    })
                }
            } else if(this.form.time == '1 ปี') {
                if(this.form.package) {
                    this.packages.forEach(pk => {
                        if(this.form.package == pk.name){
                            this.form.package_id = pk.id
                            this.form.amount = pk.annual_price
                        }
                    })
                }
            }
        },
        savepayment: function () {
            let formData = new FormData()
            formData.append('user_id', localStorage.getItem('MAPCII_USER'))
            formData.append('payment_method', this.form.financialtype)
            formData.append('amount', this.form.amount)
            formData.append('package_id', this.form.package_id)
            formData.append('package_duration', this.form.time)
            formData.append('financial_account_id', this.form.financial)
            formData.append('image_id', this.form.slip)
            formData.append('description', this.form.detail)
            formData.append('package_name', this.form.package)
            
            axios.post(apiurl + 'api-payments/create', formData , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                this.setAssetAds(response.data.payment,response.data.position)
                this.form.email = null
                this.form.time = ''
                this.form.package = ''
                this.form.package_id = null
                this.form.amount = null
                this.form.detail = null
                this.form.memberID = null
                this.form.tel = null
                this.form.financial = ''
                this.form.financialtype = null
                this.form.slip = null
                this.notice = null
            })
            .catch(e => {
                console.log(e)
            })
        },
        uploadPaymentSlip: function () {
            let formData = new FormData()
            formData.append('image_id', this.form.slip)

            axios.post(apiurl + 'api-payments/uploadpaymentslip' , formData ,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .catch(e => {
                console.log(e)
            })
        },
        onChangeFileUpload: function (){
            this.form.slip = this.$refs.slip.files[0];
        },
        setAssetAds: function (payment,position) {
            axios.post(apiurl + 'api-assets/setassetads', {
                asset_id: this.assetId,
                payment_id: payment,
                position_id: position
            })
            .then(() => {
                alert('ข้อมูลรายละเอียดถูกส่งเรียบร้อยแล้ว ทีมงานของเราจะตรวจสอบและตอบกลับโดยเร็วที่สุด')
                this.$parent.assetAdsSet()
            })
            .catch(e => {
                console.log(e)
            })
        }
    },
    template: `<div class="row justify-content-md-center">
                    <div class="col-md-10">
                        <h4>แจ้งชำระเงิน : </h4>
                        <h5 style="text-indent: 40px;">{{assetName}}</h5>
                    </div>
                    <div class="col-md-5">
                        <label>ที่อยู่อีเมล์ของคุณ <span class="g-color-red">*</span></label>
                        <div class="form-group">
                            <input v-model="form.email" class="form-control" type="email" name="email" id="email" readonly required>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <label>เลือกระยะเวลาลงประกาศ <span class="g-color-red">*</span></label>
                        <div class="form-group">
                            <select v-model="form.time" @change="checkpackage()" class="form-control" name="time" id="time" required>
                                <option disabled value="">เลือกระยะเวลา</option>
                                <option value="1 เดือน">1 เดือน</option>
                                <option value="1 ปี">1 ปี</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <label>เลือกแพ็คเกจ <span class="g-color-red">*</span></label>
                        <div class="form-group">
                            <select v-model="form.package" @change="checkpackage()" class="form-control" name="package" id="package" required>
                                <option disabled value="">เลือกแพ็คเกจ</option>
                                <option v-for="(package, index) in packages">{{package.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <label class="g-font-size-13">โปรดตรวจสอบจำนวนเงินที่โอนให้ ตรงกับโฆษณาที่เลือก</label>
                        <div class="form-group g-mt-2">
                            <input v-model="form.amount" class="form-control" type="text" value="" placeholder="กรุณาเลือกระยะเวลาลงประกาศ และ แพ็คเกจ" name="amount" id="amount" readonly>
                        </div>
                    </div>
                    <div class="col-md-10">
                        <label>รายละเอียด <span class="g-color-red">*</span></label>
                        <div class="form-group g-mb-0">
                            <textarea v-model="form.detail" class="form-control" cols="10" rows="4" name="detail" id="detail" required></textarea>
                        </div>
                        <p class="g-font-size-13">โปรดกรอกข้อมูลโดยละเอียด ทีมงานของเราจะตรวจสอบและตอบกลับโดยเร็วที่สุด</p>
                    </div>
                    <div class="col-md-10">
                        <label>หมายเลขสมาชิก <span class="g-color-red">*</span></label>
                        <div class="form-group">
                            <input v-model="form.memberID" class="form-control" type="text" name="memberID" id="memberID" placeholder="เข้าสู่ระบบเพื่อเพิ่มหมายเลขสมาชิกอัติโนมัติ" readonly required>
                        </div>
                    </div>
                    <div class="col-md-10">
                        <label>หมายเลขโทรศัพท์ของคุณ <span class="g-color-red">*</span></label>
                        <div class="form-group">
                            <input v-model="form.tel" class="form-control" type="text" name="tel" id="tel" readonly required>
                        </div>
                    </div>
                    <div class="col-md-10">
                        <label>เลือกวิธีการชำระเงิน <span class="g-color-red">*</span></label>
                        <div class="form-group">
                            <select v-model="form.financial" @change="fincancialSelected()" class="form-control" name="financial" id="financial" required>
                                <option disabled value="">เลือกวิธีการชำระเงิน</option>
                                <option 
                                    v-for="(financial, index) in financials"
                                    v-bind:value="financial.id">{{financial.name}} - {{financial.accountno}}</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="form.financial != ''" class="col-md-10">
                        <label>ไฟล์แนบ (หลักฐานการโอนเงิน) <span class="g-color-red">*</span></label>
                        <div class="form-group">
                            <input class="form-control" type="file" name="slip" id="slip" ref="slip" @change="onChangeFileUpload()" required>
                        </div>
                    </div>
                    <div class="col-md-10 g-color-red">{{notice}}</div>
                    <div class="col-md-10 g-mt-20">
                        <button class="btn u-btn-primary g-color-white rounded-5 g-px-40 g-py-10" @click="checkfrm()" type="button" id="bt_submit">ส่ง</button>
                    </div>
                </div>`
})