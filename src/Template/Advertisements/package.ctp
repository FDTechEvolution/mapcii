<section class="dzsparallaxer auto-init height-is-based-on-content use-loading mode-scroll loaded dzsprx-readyall g-overflow-hidden" data-options="{direction: 'reverse', settings_mode_oneelement_max_offset: '150'}">
    <!-- Parallax Image -->
    <div style="height: 200%; background-image: url(&quot;../../assets/img/bg/pattern6-2.png&quot;); transform: translate3d(0px, -103.491px, 0px);" class="divimage dzsparallaxer--target w-100 g-bg-repeat g-bg-gray-light-v4"></div>
    <!-- End Parallax Image -->

    <div class="container g-z-index-1 g-py-30">
        <h1 class="g-font-weight-300 g-letter-spacing-1 g-mb-15">ค่าบริการลงโฆษณา</h1>

        <div class="lead g-font-weight-400 g-line-height-2 g-letter-spacing-0_5">
           
        </div>
    </div>
</section>

<section class="g-py-10 g-mb-40">
    <div class="container">
        <div class="row">
            <div class="col-md-4 g-mt-20">
                <h4>แมพซี่ดอทคอม (mapcii.com)</h4>
                <p class="g-font-size-16" style="text-indent: 30px;">ช่วยเพิ่มยอดขายให้กับธุรกิจของคุณ ด้วยการโฆษณาผ่าน Banner ทำให้โฆษณาของคุณโดดเด่นและเป็นที่จดจำของลูกค้าได้โดยง่าย แค่ปลายนิ้ว</p>
            </div>
            <div class="col-md-8 g-mt-20" id="selectpackage">
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
        </div>
    </div>
</section>

<script>
let selectpackage = new Vue ({
    el: '#selectpackage',
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
    }
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