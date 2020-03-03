<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="container-fluid g-py-50">
            <h1 class="h2 mb-0 prompt-600">บัญชีของฉัน</h1>
            <p>รายการ Package</p>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div id="package-payment-list" class="row">
        <div class="col-lg-9 order-lg-2 g-mb-70">
            <add-banner-ads></add-banner-ads>
            <table class="table g-mb-20" style="border-bottom: 1px solid #ddd;">
                <thead>
                    <tr class="g-bg-primary g-color-white">
                        <th class="text-center" style="width: 5%;">#</th>
                        <th style="width: 30%;">Package</th>
                        <th class="text-center" style="width: 15%;">รายละเอียด</th>
                        <th class="text-center" style="width: 20%;">สถานะ</th>
                        <th class="text-center" style="width: 20%;"></th>
                    </tr>
                </thead>
                <tbody class="g-font-size-14">
                    <tr v-for="(payment, index) in payments">
                        <td class="text-center">{{index + 1}}.</td>
                        <td>
                            {{payment.package.name}} - {{payment.package_duration}} : {{payment.package_amount}} บาท<br>
                            <span class="g-font-size-11">ขนาด : {{payment.package.size.width}} x {{payment.package.size.height}} px</span>
                        </td>
                        <td class="text-center"><button class="g-px-10 round-3 g-py-0" type="button" data-toggle="modal" data-target="#modalPaymentlines" @click="loadpaymentline(payment.id)"><i class="fa fa-ellipsis-h g-font-size-20"></i></button></td>
                        <td class="text-center g-font-size-10">
                            <div v-if="payment.status == 'DR'"><span class="badge badge-dr g-font-size-12 g-px-10">รอตรวจสอบ</span></div>
                            <div v-if="payment.status == 'CO'"><span class="badge badge-co g-mb-5 g-font-size-12 g-px-10">เปิดใช้งาน</span><br>ถึงวันที่ <span class="g-color-red">{{thaiDateFormat(payment.duration)}}</span> ( <span class="g-color-red">{{driffday(payment.duration,payment.id,payment.status)}}</span> วัน )</div>
                            <div v-if="payment.status == 'EX'"><span class="badge badge-ex g-mb-5 g-font-size-12 g-px-10">หมดอายุ</span><br>ตั้งแต่วันที่ <span class="g-color-red">{{thaiDateFormat(payment.duration)}}</span></div>
                        </td>
                        <td class="text-center">
                            <div v-if="payment.status == 'CO'">
                                <a href="#" class="on-default edit-row g-font-size-16 g-color-black" data-toggle="modal" data-target="#modalBanner" title="จัดการแบนเนอร์" @click="loadbanner(payment.id,payment.package.size.width,payment.package.size.height)"><i class="fa fa-pencil"></i></a><span class="g-px-5">|</span>
                                <a href="#" class="on-default edit-row g-font-size-16 g-color-black" data-toggle="modal" data-target="#modalBanner" title="กำลังเปิดแสดง" @click="disblebanner(payment.id)"><i class="fa fa-eye"></i></a>
                            </div>
                            <div v-if="payment.status == 'EX'">
                                <button class="btn btn-primary btn-sm" type="button" data-toggle="modal" data-target="#modalRenew" @click="renewmodal(payment.id, payment.package_name)"><i class="fa fa-plus"></i> ต่ออายุ</button>
                                <button class="btn btn-danger btn-sm" type="button" @click=""><i class="fa fa-trash-o"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-md-5 col-lg-3 order-lg-1 g-mb-70">
            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <ul class="list-unstyled g-font-weight-500 mb-0">
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> แก้ไขข้อมูลส่วนตัว', ['action'=>'update'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> เปลี่ยนรหัสผ่าน', ['action'=>'change-password'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> รายการลงโฆษณา', ['action'=>'package'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> รายการลงประกาศฟรี', ['controller' => 'myassets'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> รายการสินทรัพย์ที่ชอบ', ['action'=>'asset-fav'], ['escape' => false,'class'=>'g-color-primary--active']) ?>                     
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalPaymentlines" role="dialog">
            <div class="modal-dialog" style="max-width: 80%;">
            
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-window-close g-font-size-20 g-color-red"></i></button>
                </div>
                <div class="modal-body">
                    <table class="table g-mb-20" style="border-bottom: 1px solid #ddd;">
                        <thead>
                            <tr class="g-bg-primary g-color-white">
                                <th style="width: 15%;">เลขเอกสาร</th>
                                <th style="width: 20%;">Package</th>
                                <th class="text-center" style="width: 20%;">การชำระ</th>
                                <th class="text-center" style="width: 10%;">วันที่</th>
                                <th class="text-center" style="width: 5%;">สลิป</th>
                                <th style="width: 20%;">รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody v-if="loading.paymentline" class="modal-body">
                            <tr><td class="text-center" colspan="6"><img src="../img/loading_v2.gif"></td></tr>
                        </tbody>
                        <tbody v-else class="g-font-size-14">
                            <tr v-for="(paymentline, index) in paymentlines">
                                <td>{{paymentline.documentno}}</td>
                                <td>{{paymentline.package_name}} - {{paymentline.package_duration}} : {{paymentline.amount}} บาท</td>
                                <td class="text-center">[{{paymentline.payment_method}}] - {{paymentline.financial_account.name}} : {{paymentline.financial_account.accountno}}</td>
                                <td class="text-center">{{thaiDateFormat(paymentline.payment_date)}}</td>
                                <td class="text-center"><button class="g-px-0 g-pt-0 g-pb-3" type="button" data-toggle="modal" data-target="#modalSlip" @click="showSlipImage(paymentline.image.url)"><i class="fa fa-image g-font-size-20"></i></button></td>
                                <td>{{paymentline.description}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            </div>
        </div>

        <div class="modal fade" id="modalSlip" role="dialog">
            <div class="modal-dialog">
            
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-window-close g-font-size-20 g-color-red"></i></button>
                </div>
                <div class="modal-body">
                    <img class="img-fluid" v-bind:src="imageUrl">
                </div>
            </div>
            
            </div>
        </div>

        <div class="modal fade" id="modalRenew" role="dialog">
            <div class="modal-dialog" style="max-width: 70%;">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><i class="fa fa-window-close g-font-size-20 g-color-red"></i></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label>เแพ็คเกจ</label>
                                        <p style="text-indent: 30px;"><strong>{{renew.package}}</strong></p>
                                    </div>
                                    <div class="col-md-8">
                                        <label>เลือกระยะเวลาลงประกาศ <span class="g-color-red">*</span></label>
                                        <select v-model="renew.time" @change="checkpackage()" class="form-control" name="time" id="time" required>
                                            <option disabled value="">เลือกระยะเวลา</option>
                                            <option value="1 เดือน">1 เดือน</option>
                                            <option value="1 ปี">1 ปี</option>
                                        </select>
                                    </div>
                                    <div class="col-md-5 g-mt-20">
                                        <label>ราคา</label>
                                        <input v-model="renew.amount" class="form-control" type="text" value="" placeholder="เลือกแพ็คเกจ และ เวลาลงประกาศ" name="amount" id="amount" readonly>
                                    </div>
                                    <div class="col-md-7 g-mt-20">
                                        <label>เลือกวิธีการชำระเงิน <span class="g-color-red">*</span></label>
                                        <select v-model="renew.financial" @change="fincancialSelected()" class="form-control" name="financial" id="financial" required>
                                            <option disabled value="">เลือกวิธีการชำระเงิน</option>
                                            <option 
                                                v-for="(financial, index) in financials"
                                                v-bind:value="financial.id">{{financial.name}} - {{financial.accountno}}</option>
                                        </select>
                                    </div>
                                    <div v-if="renew.financial != ''" class="col-md-12 g-mt-20">
                                        <label>ไฟล์แนบ (หลักฐานการโอนเงิน) <span class="g-color-red">*</span></label>
                                        <input class="form-control" type="file" name="slip" id="slip" ref="slip" @change="onChangeSlipUpload()" required>
                                    </div>
                                    <div class="col-md-12 g-mt-20">
                                        <label>รายละเอียด <span class="g-color-red">*</span></label>
                                        <textarea v-model="renew.detail" class="form-control" cols="10" rows="4" name="detail" id="detail" required></textarea>
                                        <p class="g-font-size-12">โปรดกรอกข้อมูลโดยละเอียด ทีมงานของเราจะตรวจสอบและตอบกลับโดยเร็วที่สุด</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="g-color-red">{{notice}}</div>
                        <button class="btn btn-success" type="button" @click="checkfrm()" data-dismiss="modal">ต่ออายุ</button>
                        <button class="btn btn-danger" class="close" data-dismiss="modal">ยกเลิก</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalBanner" role="dialog">
            <div class="modal-dialog modal-banner">
            
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><i class="fa fa-window-close g-font-size-20 g-color-red"></i></button>
                    </div>
                    <div v-if="loading.banner" class="modal-body">
                        <div class="text-center"><img src="../img/loading_v2.gif"></div>
                    </div>
                    <div v-else class="modal-body">
                        <div v-if="bannerStatus == 100" class="g-mb-10">
                            <input class="form-control" type="file" name="bannerimage" id="bannerimage" ref="bannerimage" @change="onChangeFileUpload()" required>
                            <span class="g-color-red g-font-size-12">* ขนาด {{bannerWidth}} x {{bannerHeight}} px (ไม่เกิน 1 MB และต้องเป็นไฟล์ jpeg หรือ gif เท่านั้น)</span>
                        </div>
                        <div v-else-if="bannerLength < bannerLimit" class="g-mb-10">
                            <input class="form-control" type="file" name="bannerimage" id="bannerimage" ref="bannerimage" @change="onChangeFileUpload()" required>
                            <span class="g-color-red g-font-size-12">* ขนาด {{bannerWidth}} x {{bannerHeight}} px (ไม่เกิน 1 MB และต้องเป็นไฟล์ jpeg หรือ gif เท่านั้น)</span>
                        </div>
                        <table class="table g-mb-20" style="border-bottom: 1px solid #ddd;">
                            <thead>
                                <tr class="g-bg-primary g-color-white">
                                    <th class="text-center" style="width: 5%;">#</th>
                                    <th style="width: 65%;">Banner</th>
                                    <th class="text-center" style="width: 15%">ตำแหน่ง</th>
                                    <th class="text-center" style="width: 15%;">สถานะ</th>
                                </tr>
                            </thead>
                            <tbody class="g-font-size-14">
                                <tr v-for="(bannerline, index) in bannerlines">
                                    <td class="text-center">{{index + 1}}.</td>
                                    <td><img class="img-fluid" v-bind:src="bannerline.image.url"></td>
                                    <td class="text-center">{{bannerline.banner.position}}</td>
                                    <td class="text-center g-font-size-12">
                                        <div v-if="bannerline.isactive == 'N'">
                                            <span class="badge badge-dr">รอตรวจสอบ</span><br>
                                            <button class="btn btn-danger btn-sm g-mt-10" type="button" @click="delBannerImage(bannerline.id)"><i class="fa fa-trash-o"></i></button>
                                        </div>
                                        <div v-if="bannerline.isactive == 'Y'">
                                            <span class="badge badge-co">เปิดใช้งาน</span><br>
                                            <button class="btn btn-danger btn-sm g-mt-10" type="button" @click="delBannerImage(bannerline.id)"><i class="fa fa-trash-o"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="bannerStatus == 100" class="modal-footer">
                        <button class="btn u-btn-primary g-color-white rounded-5 g-px-40 g-py-10" @click="saveBannerImage()" type="button" id="bt_submit">ส่ง</button>
                    </div>
                    <div v-else-if="bannerLength < bannerLimit" class="modal-footer">
                        <button class="btn u-btn-primary g-color-white rounded-5 g-px-40 g-py-10" @click="saveBannerImage()" type="button" id="bt_submit">ส่ง</button>
                    </div>
                </div>
            
            </div>
        </div>

        <div class="modal fade" id="modalPackage" role="dialog">
            <div class="modal-dialog modal-banner">
            
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><i class="fa fa-window-close g-font-size-20 g-color-red"></i></button>
                    </div>
                    
                    <div class="modal-body">
                        <package-select></package-select>
                    </div>
                    <div class="modal-footer">
                        
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</div>

<style>
    .badge-dr {
        background-color: #555;
        padding: 5px;
        color: #eee;
    }
    .badge-co {
        background-color: #1c9a0a;
        padding: 5px;
        color: #eee;
    }
    .badge-ex {
        background-color: #cc0000;
        padding: 5px;
        color: #eee;
    }
    .modal-banner {
        max-width: 70%;
    }
</style>

<script>
let packagepaymentlist = new Vue ({
    el: '#package-payment-list',
    data () {
        return {
            loading: {
                banner: true,
                paymentline: true
            },
            renew: {
                package: '',
                package_id: null,
                time: '',
                amount: null,
                financial: '',
                financialtype: null,
                detail: null,
                slip: null
            },
            image: {
                width: null,
                height: null,
                size: null,
                type: null
            },
            payments: [],
            paymentlines: [],
            bannerlines: [],
            packages: [],
            financials: [],
            imageUrl: null,
            showbanners: false,
            bannerImage: null,
            paymentId: null,
            bannerLimit: null,
            bannerLength: null,
            bannerStatus: null,
            notice: null,
            payment_id: null,
            bannerWidth: null,
            bannerHeight: null
        }
    },
    mounted () {
        this.loadpayment()
    },
    methods: {
        loadpayment: function () {
            axios.get(apiurl + 'api-payments/listpayment?id=' + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                this.payments = response.data.paymentlist
            })
            .catch(e => {
                console.log(e)
            })
        },
        loadpaymentline: function (id) {
            this.loading.paymentline = true
            axios.get(apiurl +  'api-payments/listpaymentline?id=' + id)
            .then((response) => {
                this.paymentlines = response.data.paymentline
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => this.loading.paymentline = false)
        },
        loadbanner: function (id,width,height) {
            this.bannerlines = null
            this.loading.banner = true
            this.bannerWidth = width
            this.bannerHeight = height
            axios.get(apiurl + 'api-banners/listbannerline?id=' + id)
            .then((response) => {
                this.paymentId = id
                this.bannerStatus = response.data.status
                if(this.bannerStatus != 100) {
                    this.bannerLimit = response.data.bannerlinelist[0].banner.limit
                    this.bannerLength = response.data.bannerlinelist.length
                }
                this.bannerlines = response.data.bannerlinelist
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => this.loading.banner = false)
        },
        loadpackage: function () {
            axios.get(apiurl + 'api-packages/listpackages')
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
        thaiDateFormat: function (d) {
            let cutT = d.split("T")
            let setDate = cutT[0].split("-")

            return setDate[2] + "-" + setDate[1] + "-" + setDate[0]
        },
        driffday: function (d,id,status) {
            let aday = new Date(d)
            let fgg = (aday.getTime() - Date.now()) / (1000 * 3600 * 24)

            if (fgg < 0) {
                if(status == 'CO'){
                    this.paymentexp(id)
                }
                return fgg = 0
            } else {
                return fgg.toFixed(0)
            }
        },
        paymentexp: function (id) {
            axios.post(apiurl + 'api-payments/exp?id=' + id)
            .then((response) => {
                console.log(response)
            })
            .catch(e => {
                console.log(e)
            })
        },
        renewmodal: function (id,package_name) {
            this.renew.time = ''
            this.renew.package = ''
            this.renew.package_id = null
            this.renew.amount = null
            this.renew.detail = null
            this.renew.financial = ''
            this.renew.financialtype = null
            this.renew.slip = null

            this.loadpackage()
            this.loadfinancials()
            this.renew.package = package_name
            this.payment_id = id
        },
        checkfrm: function () {
            if(this.renew.time && this.renew.package && this.renew.detail && this.renew.slip) {
                this.paymentrenew(this.payment_id)
            }

            if(!this.renew.slip) {
                this.notice = 'กรุณาแนบหลักฐานการโอนเงิน'
            }

            if(!this.renew.detail) {
                this.notice = 'กรุณาระบุรายละเอียด'
            }

            if(!this.renew.time) {
                this.notice = 'กรุณาเลือกระยะเวลาลงประกาศ'
            }

            if(!this.renew.package) {
                this.notice = 'กรุณาเลือกแพ็คเกจ'
            }
        },
        checkpackage: function () {
            if(this.renew.time == '1 เดือน') {
                if(this.renew.package) {
                    this.packages.forEach(pk => {
                        if(this.renew.package == pk.name){
                            this.renew.package_id = pk.id
                            this.renew.amount = pk.monthly_price
                        }
                    })
                }
            } else if(this.renew.time == '1 ปี') {
                if(this.renew.package) {
                    this.packages.forEach(pk => {
                        if(this.renew.package == pk.name){
                            this.renew.package_id = pk.id
                            this.renew.amount = pk.annual_price
                        }
                    })
                }
            }
        },
        fincancialSelected: function () {
            if (this.renew.financial) {
                this.financials.forEach(fc => {
                    if (this.renew.financial == fc.id) {
                        this.renew.financialtype = fc.type
                    }
                })
            }
        },
        paymentrenew: function (id) {
            let formData = new FormData()
            formData.append('payment_method', this.renew.financialtype)
            formData.append('amount', this.renew.amount)
            formData.append('package_id', this.renew.package_id)
            formData.append('package_duration', this.renew.time)
            formData.append('financial_account_id', this.renew.financial)
            formData.append('image_id', this.renew.slip)
            formData.append('description', this.renew.detail)
            formData.append('package_name', this.renew.package)
            
            axios.post(apiurl + 'api-payments/renew/' + id, formData , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                this.loadpayment()
                this.renew.time = ''
                this.renew.package = ''
                this.renew.package_id = null
                this.renew.amount = null
                this.renew.detail = null
                this.renew.financial = ''
                this.renew.financialtype = null
                this.renew.slip = null
                this.notice = null
            })
            .catch(e => {
                console.log(e)
            })
        },
        showSlipImage: function (image) {
            this.imageUrl = image
        },
        saveBannerImage: function () {
            const imageSizeSeting = 1048567
            if (this.image.size > imageSizeSeting || this.image.width != this.bannerWidth || this.image.height != this.bannerHeight || this.image.type != 'jpeg' && this.image.type != 'gif') {
                    let imagesize = this.image.size/imageSizeSeting
                    alert('ขนาดของรูปแบนเนอร์ไม่ถูกต้อง กรุณาตรวจสอบ!!!\n'+
                            'ข้อกำหนด : '+this.bannerWidth+' x '+this.bannerHeight+' px : ไม่เกิน 1 MB : ไฟล์ jpeg หรือ gif \n'+
                            'ไฟล์ของคุณ : '+this.image.width+' x '+this.image.height+' px : ขนาด '+imagesize.toFixed(2)+' MB : ไฟล์ '+this.image.type)
            } else {
                let formData = new FormData()
                formData.append('type', 'ADS')
                formData.append('image_id', this.bannerImage)
                formData.append('payment_id', this.paymentId)
                formData.append('user_id', localStorage.getItem('MAPCII_USER'))

                axios.post(apiurl + 'api-banners/saveimage', formData , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    this.bannerImage = null
                    this.loadbanner(this.paymentId,this.bannerWidth,this.bannerHeight)
                })
                .catch(e => {
                    console.log(e)
                })
            }
        },
        delBannerImage: function (id) {
            if(confirm('ยืนยันการลบ?')){
                axios.post(apiurl + 'api-banners/deleteimage?id=' + id)
                .then((response) => {
                    this.loadbanner(this.paymentId,this.bannerWidth,this.bannerHeight)
                })
                .catch(e => {
                    console.log(e)
                })
            }
        },
        onChangeFileUpload: function () {
            this.bannerImage = this.$refs.bannerimage.files[0]
            this.image.size = this.bannerImage.size
            let imagetype = this.$refs.bannerimage.files[0]['type'].split("/")
            this.image.type = imagetype[1]
            
            let reader = new FileReader()
            reader.readAsDataURL(this.bannerImage)
            reader.onload = evt => {
                let img = new Image()
                img.onload = () => {
                    this.image.width = img.width
                    this.image.height = img.height
                }
                img.src = evt.target.result
            }
        },
        onChangeSlipUpload: function (){
            this.renew.slip = this.$refs.slip.files[0];
        }
    }
})

Vue.component ('add-banner-ads', {
    template: `<div class="g-mb-20"><button class="btn btn-md g-bg-primary g-color-white" type="button" data-toggle="modal" data-target="#modalPackage"><i class="fa fa-plus"></i> รายละเอียดแพ็คเกจ</button></div>`
})

Vue.component ('package-select', {
    data () {
        return {
            packages: [],
            getPackage: {
                name: null,
                showpage: null,
                monthly_price: null,
                annual_price: null,
                showcase: null,
                size: null
            },
            selected: false
        }
    },
    mounted () {
        this.loadpackages()
    },
    methods: {
        loadpackages: function () {
            axios.get(apiurl + 'api-packages/listpackages')
            .then((response) => {
                this.packages = response.data.packagelist
            })
            .catch(e => {
                console.log(e)
            })
        },
        selectedpackage: function (name,showpage,monthly_price,annual_price,showcase,size) {
            this.selected = true
            this.getPackage.name = name
            this.getPackage.showpage = showpage
            this.getPackage.monthly_price = monthly_price
            this.getPackage.annual_price = annual_price
            this.getPackage.showcase = showcase
            this.getPackage.size = size
        },
        unSelectedPackage: function () {
            this.selected = false
        }
    },
    computed: {
        priceDiscount: function () {
            return (this.getPackage.monthly_price * 12) - this.getPackage.annual_price
        }
    },
    template: `<div class="row">
                <div class="col-md-12 g-mt-20" id="selectpackage">
                    <div v-if="selected == false">
                        <table class="table g-mb-20" style="border-bottom: 1px solid #ddd;">
                            <thead>
                                <tr class="g-bg-primary g-color-white">
                                    <th style="width: 17%;">Package</th>
                                    <th style="width: 18%;">หน้าที่แสดง</th>
                                    <th class="text-center" style="width: 24%;">ราคา 1 เดือน (30 วัน)</th>
                                    <th class="text-center" style="width: 15%;">ราคา 1 ปี</th>
                                    <th style="width: 30%;">การแสดงผล</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="g-font-size-14">
                                <tr v-for="(package, index) in packages">
                                    <td>{{package.name}}</td>
                                    <td>{{package.showpage}}</td>
                                    <td class="text-center">{{package.monthly_price}} บาท</td>
                                    <td class="text-center">{{package.annual_price}} บาท<br/><span class="g-font-size-12">(ประหยัด ... บาท)</span></td>
                                    <td class="g-color-red g-font-size-12">{{package.showcase}}</td>
                                    <td class="text-center"><button type="button" class="btn u-btn-primary u-btn-hover-v1-1 g-mb-20" @click="selectedpackage(package.name,package.showpage,package.monthly_price,package.annual_price,package.showcase,package.size)">เลือก</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="selected">
                        <button type="button" class="btn btn-secondary waves-effect g-mb-20" @click="unSelectedPackage()"><i class="fa fa-arrow-left"></i> ย้อนกลับ</button>

                        <div v-if="getPackage.size == 0" class="row">
                            <div class="col-md-12">
                                <h3 class="text-center g-mb-0">{{getPackage.name}}</h3>
                                <p class="text-center g-font-size-12">(ตัวอย่างขนาดและการแสดงผล)</p>
                                <?= $this->Html->image('simple_banner_A.jpg', ['class' => 'img-fluid g-mb-20']) ?>
                            </div>
                        </div>
                        <div v-if="getPackage.size == 1" class="row">
                            <div class="col-md-6">
                                <?= $this->Html->image('simple_banner_B.jpg', ['class' => 'img-fluid g-mb-20']) ?>
                            </div>
                            <div class="col-md-6 text-center align-self-center">
                                <h3 class="text-center g-mb-0">{{getPackage.name}}</h3>
                                <p class="text-center g-font-size-12">(ตัวอย่างขนาดและการแสดงผล)</p>
                            </div>
                        </div>

                        <table class="table g-mb-20" style="border-bottom: 1px solid #ddd;">
                            <thead>
                                <tr class="g-bg-primary g-color-white">
                                    <th style="width: 13%;">Package</th>
                                    <th style="width: 15%;">หน้าที่แสดง</th>
                                    <th class="text-center" style="width: 22%;">ราคา 1 เดือน (30 วัน)</th>
                                    <th class="text-center" style="width: 17%;">ราคา 1 ปี</th>
                                    <th style="width: 35%;">การแสดงผล</th>
                                </tr>
                            </thead>
                            <tbody class="g-font-size-14">
                                <tr>
                                    <td>{{getPackage.name}}</td>
                                    <td>{{getPackage.showpage}}</td>
                                    <td class="text-center">{{getPackage.monthly_price}} บาท</td>
                                    <td class="text-center">{{getPackage.annual_price}} บาท<br/><span class="g-font-size-12">(ประหยัด {{priceDiscount}} บาท)</span></td>
                                    <td class="g-color-red g-font-size-12">{{getPackage.showcase}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <howto-payment></howto-payment>
                    </div>
                </div>
            </div>`
})

Vue.component ('howto-payment', {
    template: `<div>
                <h4>ขั้นตอนการชำระเงิน/ลงโฆษณา</h4>
                    <ol class="g-pl-30">
                        <li>ลูกค้า <?=$this->Html->link('สมัครสมาชิก',['controller'=>'register'],['target'=>'_blank'])?> เว็บ mapcii.com</li>
                        <li>เลือกแพ็กเกจ และ ระยะเวลา การลงโฆษณา</li>
                        <li>ชำระเงินโดยการโอนเงินเข้าบัญชี ตามแพ็กเกจ/ระยะเวลา ที่ต้องการลง มาที่</li>
                        <li><?=$this->Html->link('แจ้งชำระเงิน',['action'=>'package_payment'],['target'=>'_blank'])?> พร้อมแนบหลักฐานการโอนเงิน</li>
                        <li>ทางทีมงานจะทำการตรวจสอบ เมื่อยอดชำระถูกต้องจะทำการกำหนดสิทธิ์ให้ลูกค้าสามารถลงโฆษณาได้ทันที</li>
                        <li>เริ่มลงโฆษณาโดยการ <?=$this->Html->link('เข้าสู่ระบบสมาชิก',['controller'=>'login'],['target'=>'_blank'])?> และลงโฆษณาตามแพ็กเกจที่เลือก</li>
                        <li>หากมีคำถาม <?=$this->Html->link('โปรดติดต่อ',['controller'=>'contact'],['target'=>'_blank'])?></p>
                    </ol>
                </div>`
})
</script>