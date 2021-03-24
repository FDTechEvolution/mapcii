export const PackageAd = {
    mounted() {
        this.$store.dispatch('getAdPackages')
    },
    methods: {
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    },
    template: `<div class="row mb-4">
                    <div class="col-md-6 text-center package-intro">
                        <img src="/img/simple_announce_A.jpg" class="img-fluid w-100" alt="ตัวอย่างประกาศโฆษณา" title="ตัวอย่างประกาศโฆษณา">
                    </div>
                    <div class="col-md-6 border-left package-intro">
                        <h4>AD ประกาศลงโฆษณา</h4>
                        <p class="mb-0">กรุณาเลือก "แพ็คเกจ" ลงโฆษณา ก่อนชำระเงิน</p>
                        <p style="font-size: 0.8rem;">แพ็คเกจลงโฆษณานี้ สามารถใช้ร่วมกันได้ทั้งหน้า อสังหาขายด่วน อสังหามือสอง และโครงการใหม่ โดยระบบจะนับจำนวนประกาศรวมกันให้ลงได้ตามสิทธิ์ที่สมัครไว้</p>
                    </div>
                    <div v-if="!$store.getters.loading_ad_package" class="col-md-12 tableresponsive">
                        <table class="table g-mb-20 w-100" style="border-bottom: 1px solid #ddd;">
                            <thead>
                                <tr class="g-bg-primary g-color-white" style="font-size: 0.8rem;">
                                    <th>ซื้อโฆษณาแพ็คเกจ</th>
                                    <th class="text-center">อายุ</th>
                                    <th class="text-center">หน้าที่แสดง</th>
                                    <th class="text-center" style="width: 47%;">
                                        <div class="row border-bottom">
                                            <div class="col-md-3">ขนาด</div>
                                            <div class="col-md-3 text-center">{{ $store.getters.package_ad_size.s }}</div>
                                            <div class="col-md-3 text-center">{{ $store.getters.package_ad_size.m }}</div>
                                            <div class="col-md-3 text-center">{{ $store.getters.package_ad_size.l }}</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-3"><small>ลงได้พร้อมกัน </small></div>
                                            <div class="col-md-3 text-center"><small>{{ $store.getters.package_ad_credit.s }} ประกาศ</small></div>
                                            <div class="col-md-3 text-center"><small>{{ $store.getters.package_ad_credit.m }} ประกาศ</small></div>
                                            <div class="col-md-3 text-center"><small>{{ $store.getters.package_ad_credit.l }} ประกาศ</small></div>
                                        </div>
                                    </th>
                                    <th>การแสดงประกาศ</th>
                                </tr>
                            </thead>
                            <tbody class="g-font-size-14">
                                <tr v-for="(packageline, index) in $store.getters.package_ad" style="font-size: 0.9rem;">
                                    <td data-title="ซื้อโฆษณาแพ็คเกจ" class="text-center">{{ packageline.name }}</td>
                                    <td data-title="อายุ" class="text-center">{{ packageline.duration_name }}</td>
                                    <td data-title="หน้าที่แสดง" class="text-center">หน้าค้นหา</td>
                                    <td data-title="ราคา" class="text-center">
                                        <div class="row">
                                            <div class="col-md-3 hide-on-responsive">ราคา</div>
                                            <div class="col-md-3 text-center"><span class="show-on-responsive">ขนาด {{ $store.getters.package_ad_size.s }} | {{ $store.getters.package_ad_credit.s }} ประกาศ | </span>{{ formatNumber(packageline.s) }}฿</div>
                                            <div class="col-md-3 text-center"><span class="show-on-responsive">ขนาด {{ $store.getters.package_ad_size.m }} | {{ $store.getters.package_ad_credit.m }} ประกาศ | </span>{{ formatNumber(packageline.m) }}฿</div>
                                            <div class="col-md-3 text-center"><span class="show-on-responsive">ขนาด {{ $store.getters.package_ad_size.l }} | {{ $store.getters.package_ad_credit.l }} ประกาศ | </span>{{ formatNumber(packageline.l) }}฿</div>
                                        </div>
                                    </td>
                                    <td class="td-in-rowspan" rowspan="2" style="font-size: 0.9rem;">
                                        <ul class="pl-4 mb-0 hide-on-responsive text-left">
                                            <li>แสดงด้านขวามือของแผนที่</li>
                                            <li>แสดงก่อนประกาศฟรี มีสัญลักษณ์ 'AD' ที่ประกาศ</li>
                                            <li>แสดงผลตาม จังหวัด/อำเภอ/ตำบล ที่ค้นหา</li>
                                            <li>ป้ายราคาบนแผนที่กระพริบและเปลี่ยนสีได้</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="mb-0 package-intro">
                            <span class="show-on-responsive">
                                <h4>การแสดงประกาศ</h4>
                                <ul class="pl-4 mb-3">
                                    <li>แสดงด้านขวามือของแผนที่</li>
                                    <li>แสดงก่อนประกาศฟรี มีสัญลักษณ์ 'AD' ที่ประกาศ</li>
                                    <li>แสดงผลตาม จังหวัด/อำเภอ/ตำบล ที่ค้นหา</li>
                                    <li>ป้ายราคาบนแผนที่กระพริบและเปลี่ยนสีได้</li>
                                </ul>
                            </span>
                            <strong style="font-size: 1.3rem;">หมายเหตุ </strong>
                            <span style="font-size: 0.8rem;">ลูกค้าสามารถเพิ่มจำนวนประกาศได้ โดยการชำระค่าแพ็คเกจประกาศ(AD)เพิ่มเติม และสามารถต่ออายุประกาศได้โดยการ ต่ออายุประกาศ(ระบบจะคำนวนอายุแต่ละแพ็คเกจ)</span>
                        </p>
                    </div>
                    <div v-else class="col-md-12 text-center">
                        <div class="loadingio-spinner-pulse-s0fdf1v0u4">
                            <div class="ldio-ukcojlsaueg">
                                <div></div><div></div><div></div>
                            </div>
                        </div>
                    </div>
                </div>`
}