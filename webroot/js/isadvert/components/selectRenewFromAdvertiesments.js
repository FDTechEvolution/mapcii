export const selectRenewFromAdvertiesments = {
    props: ['type'],
    data() {
        return {
            countPackage: 0
        }
    },
    mounted() {
        this.$store.dispatch('getUserPackageBalance', true)
    },
    computed: {
        countPK() {
            this.countPackage = this.countPackage + 1
        }
    },
    methods: {
        isBalance(qty, used) {
            return qty - used
        },
        chkBuyDate(date) {
            return (date !== null) ? date : '-'
        },
        thDateFormat(date) {
            let cutT = date.split('T')
            let thDate = cutT[0].split('-')
            return thDate[2] + '/' + thDate[1] + '/' + thDate[0]
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        duedateTime: function (startdate, publishday) {
            let result = new Date(startdate);
            result.setDate(result.getDate() + publishday);
            let setDateFormat = result.getDate() + '-' + (result.getMonth() + 1) + '-' + result.getFullYear()
            return setDateFormat;
        },
        driffday: function (d) {
            let setDate = d.split("-")
            let in_date = setDate[2] + "-" + setDate[1] + "-" + setDate[0]
            let aday = new Date(in_date)
            let fgg = (aday.getTime() - Date.now()) / (1000 * 3600 * 24)

            if (fgg < 0) {
                return fgg = 0
            } else {
                return fgg.toFixed(0)
            }
        },
        dateIsZero(duration) {
            return (duration > 0) ? duration : 0
        },
        renewSelectedPackage(id, size) {
            this.$parent.user_package_id = id
            this.$parent.isSize = size
            this.$parent.packageRenewSelected = true
            // console.log({id:id, code:code})
        },
        checkConditionPackage(type, duration) {
            return (this.type === type && duration < 1) ? true : false
        }
    },
    template: `<div class="tableresponsive p-3 rounded border border-light bg-light is-triangle-top">
                    <h5>2.5 เลือกรายการแพ็คเกจ {{type}} ที่ต้องการต่ออายุ...</h5>
                    <table class="table g-mb-20 w-100 bg-white" style="border-bottom: 1px solid #ddd;">
                        <thead>
                            <tr class="g-bg-primary g-color-white">
                                <th class="text-center"></th>
                                <th><small><strong>หมายเลขคำสั่งซื้อ</strong></small></th>
                                <th class="text-center"><small><strong>ประเภทโฆษณา</strong></small></th>
                                <th class="text-center"><small><strong>วันที่ซื้อ</strong></small></th>
                                <th class="text-center"><small><strong>สิทธิ์ลงโฆษณา</strong></small></th>
                                <th class="text-center"><small><strong>ใช้สิทธิ์ไปแล้ว</strong></small></th>
                                <th class="text-center"><small><strong>คงเหลือ</strong></small></th>
                            </tr>
                        </thead>
                        <tbody class="g-font-size-14">
                            <slot v-if="!$store.getters.balance_loaded">
                                <slot v-if="$store.getters.package_balance !== ''">
                                    <tr v-for="(balance, index) in $store.getters.package_balance">
                                        <slot v-if="checkConditionPackage(balance.name, balance.duration)">{{countPK}}
                                            <td class="text-center"><input type="radio" name="selectPackageRenew" value="true" @click="renewSelectedPackage(balance.u_pack_id, balance.size)"></td>
                                            <td data-title="หมายเลขคำสั่งซื้อ">{{ balance.order_code }}</td>
                                            <td data-title="ประเภทโฆษณา" class="text-center">{{ balance.name }} <span v-if="balance.size !== null">- {{ balance.size }}</span> </td>
                                            <td data-title="วันที่ซื้อ" class="text-center">{{ thDateFormat(balance.buy_date) }} <span v-if="balance.duration !== null">(<strong :class="[(balance.duration < 10) ? 'text-danger' : 'text-info']">{{ dateIsZero(balance.duration) }}</strong> <small>วัน</small>)</span></td>
                                            <td data-title="สิทธิ์ลงโฆษณา" class="text-center"><strong>{{ balance.credit }}</strong></td>
                                            <td data-title="ใช้สิทธิ์ไปแล้ว" class="text-center"><strong class="text-danger">{{ balance.used }}</strong></td>
                                            <td data-title="คงเหลือ" class="text-center"><strong class="text-success">{{ isBalance(balance.credit, balance.used) }}</strong></td>
                                        </slot>
                                    </tr>
                                </slot>
                                <slot v-else>
                                    <tr>
                                        <td colspan="7" class="text-center">ยังไม่มีรายการโฆษณาของคุณ</td>
                                    </tr>
                                </slot>
                                <slot v-if="countPackage === 0">
                                    <tr>
                                        <td colspan="7" class="text-center">ยังไม่มีรายการโฆษณา {{type}} ที่ต้องต่ออายุ</td>
                                    </tr>
                                </slot>
                            </slot>
                            <slot v-else>
                                <tr>
                                    <td colspan="7" class="text-center">
                                        <div class="loadingio-spinner-pulse-s0fdf1v0u4">
                                            <div class="ldio-ukcojlsaueg">
                                                <div></div><div></div><div></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </slot>
                        </tbody>
                    </table>
                </div>`
}