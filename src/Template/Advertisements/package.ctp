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

<section id="selectpackage" class="g-py-10 g-mb-40">
    <div class="container">
        <div class="row">
            <div class="col-md-4 g-mt-20">
                <h4>แมพซี่ดอทคอม (mapcii.com)</h4>
                <p class="g-font-size-16" style="text-indent: 30px;" v-html="package_description"></p>
            </div>
            <div class="col-md-8 g-mt-20">
                <div v-if="package_name === 'Banner A'" class="mb-3 text-center">
                    <h2>{{package_name}}</h2>
                    <?= $this->Html->image('banner-top-on-null.jpg', ['class' => 'w-100', 'alt' => '']); ?>
                </div>
                <div v-if="package_name === 'Banner B'" class="mb-3">
                    <div class="row">
                        <div class="col-md-6">
                            <?= $this->Html->image('banner-side-on-null.jpg', ['class' => 'w-100', 'alt' => '']); ?>
                        </div>
                        <div class="col-md-6 text-center">
                            <h2 style="margin-top: 20%;">{{package_name}}</h2>
                        </div>
                    </div>
                </div>

                <table class="table g-mb-20 w-100" style="border-bottom: 1px solid #ddd;">
                    <thead>
                        <tr class="g-bg-primary g-color-white">
                            <th style="width: 17%;">Package</th>
                            <th style="width: 18%;">หน้าที่แสดง</th>
                            <th class="text-center" style="width: 24%;">ราคา 1 เดือน (30 วัน)</th>
                            <th class="text-center" style="width: 15%;">ราคา 1 ปี</th>
                            <th style="width: 30%;">การแสดงผล</th>
                        </tr>
                    </thead>
                    <tbody class="g-font-size-14">
                        <tr v-for="(package, index) in packages">
                            <!-- <slot v-if="package.package_type.name === 'Banner'"> -->
                                <td>{{package.name}}</td>
                                <td><span v-html="package.showpage"></span></td>
                                <td class="text-center">{{formatNumber(package.monthly_price)}} บาท</td>
                                <td class="text-center">{{formatNumber(package.annual_price)}} บาท<br/><span class="g-font-size-12">(ประหยัด {{formatNumber(priceDiscount(package.monthly_price,package.annual_price))}} บาท)</span></td>
                                <td class="g-color-red g-font-size-12"><span v-html="package.showcase"></span></td>
                            <!-- </slot> -->
                        </tr>
                    </tbody>
                </table>

                <div>
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
            package_name: null,
            queryString: null,
            urlParams: null,
            package_id: null,
            package_description: null
        }
    },
    mounted () {
        this.queryString = window.location.search
        this.urlParams = new URLSearchParams(this.queryString)
        this.package_id = this.urlParams.get('b')

        this.loadpackages()
    },
    methods: {
        loadpackages: function () {
            axios.get(apiurl + 'api-packages/listpackages?package=' + this.package_id)
            .then((response) => {
                console.log(response)
                this.packages = response.data.packagelist
                this.package_name = response.data.packagelist[0].name
                this.package_description = response.data.packagelist[0].package_type.description
            })
            .catch(e => {
                console.log(e)
            })
        },
        priceDiscount: function (monthly_price, annual_price) {
            return (monthly_price * 12) - annual_price
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    },
    computed: {
        
    }
})
</script>