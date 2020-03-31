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