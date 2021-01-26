export const PackageBannerA = {
    mounted() {
        this.$store.dispatch('getBannerA')
    },
    methods: {
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    },
    template: `<div class="row mb-4">
                    <div class="col-md-8 text-center package-intro">
                        ตัวอย่างโฆษณา Banner A (Comming Soon...)
                    </div>
                    <div class="col-md-4 border-left package-intro">
                        <h4>ลงโฆษณา Banner A</h4>
                        
                    </div>
                    <div v-if="!$store.getters.loading_ad_package" class="col-md-12 tableresponsive">
                        <table class="table g-mb-20 w-100" style="border-bottom: 1px solid #ddd;">
                            <thead>
                                <tr class="g-bg-primary g-color-white" style="font-size: 0.8rem;">
                                    <th>ซื้อโฆษณาแพ็คเกจ</th>
                                    <th class="text-center">อายุ</th>
                                    <th class="text-center">หน้าที่แสดง</th>
                                    <th class="text-center">จำนวน</th>
                                    <th class="text-center">ราคา</th>
                                    <th class="text-center" style="width: 20%;">
                                        <div class="row">
                                            <div class="col-md-12 text-center border-bottom">โปรโมชั่น</div>
                                            <div class="col-md-6 text-center">จำนวน</div>
                                            <div class="col-md-6 text-center">ราคา</div>
                                        </div>
                                    </th>
                                    <th class="w-25">การแสดงประกาศ</th>
                                </tr>
                            </thead>
                            <tbody class="g-font-size-14">
                                <tr v-for="(packageline, index) in $store.getters.package_banner_a">
                                    <td data-title="ซื้อโฆษณาแพ็คเกจ" class="text-center">{{ packageline.package.name }}</td>
                                    <td data-title="อายุ" class="text-center">{{ packageline.package_duration.duration_name }}</td>
                                    <td data-title="หน้าที่แสดง" class="text-center">หน้าหลัก/หน้าค้นหา/หน้าบทความ</td>
                                    <td data-title="จำนวน" class="text-center">{{ packageline.iscredit }} ประกาศ</td>
                                    <td data-title="ราคา" class="text-center"><s>{{ formatNumber(packageline.isprice) }}</s> ฿</td>
                                    <td data-title="โปรโมชั่น" class="text-center">
                                        <div class="row">
                                            <div class="col-md-6 text-center">{{ packageline.procredit }} ประกาศ</div>
                                            <div class="col-md-6 text-center">{{ formatNumber(packageline.proprice) }} ฿</div>
                                        </div>
                                    </td>
                                    <td class="td-in-rowspan" rowspan="2" style="font-size: 0.9rem;">
                                        <ul class="pl-4 mb-0 hide-on-responsive text-left">
                                            <li>เป็นการสุ่มแสดง Banner ตอนเริ่มต้น จากนั้นจะแสดง Banner ต่อไปแบบเรียงลำดับ</li>
                                            <li>สามารถลง Banner และแก้ไขได้ด้วยตนเอง ตลอด 24 ชั่วโมง</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="mb-0 package-intro">
                            <span class="show-on-responsive">
                                <h4>การแสดงประกาศ</h4>
                                <ul class="pl-4 mb-3">
                                    <li>เป็นการสุ่มแสดง Banner ตอนเริ่มต้น จากนั้นจะแสดง Banner ต่อไปแบบเรียงลำดับ</li>
                                    <li>สามารถลง Banner และแก้ไขได้ด้วยตนเอง ตลอด 24 ชั่วโมง</li>
                                </ul>
                            </span>
                            <strong style="font-size: 1.3rem;">หมายเหตุ </strong>
                            <span style="font-size: 0.8rem;">ลูกค้าสามารถเพิ่มจำนวน Banner ได้ โดยการชำระค่าแพ็คเกจ Banner เพิ่มเติม และสามารถต่ออายุ Banner ได้โดยการ ต่ออายุ Banner (ระบบจะคำนวนอายุแต่ละแพ็คเกจ)</span>
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