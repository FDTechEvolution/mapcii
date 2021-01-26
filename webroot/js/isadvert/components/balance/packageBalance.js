import {ModalPackageBalanceLine} from './modalPackageBalanceLine.js'
import {packageRenewModal} from '../modal/packageRenewModal.js'
import {progressBar} from '../../../components/progressBar.js'
import {packageCloseModal} from '../modal/packageCloseModal.js'

export const PackageBalance = {
    components: {
        'balance-lines' : ModalPackageBalanceLine,
        'package-renew' : packageRenewModal,
        'progress-bar' : progressBar,
        'package-close' : packageCloseModal
    },
    data() {
        return {
            status: {
                isY: 'Y',
                isN: 'N',
                Complete: 'CO',
                Expire: 'EX'
            },
            showModal: false,
            code: '',
            name: '',
            size: '',
            showAll: false,
            packageRenew: {
                id: '',
                code: '',
                name: '',
                size: ''
            },
            packageClose: {
                id: '',
                code: '',
                name: '',
                size: ''
            }
        }
    },
    mounted() {
        this.$store.dispatch('getUserPackageBalance', true)
    },
    computed: {
        balanceSofting() {
            let balance = this.$store.getters.package_balance
            let balance_expire = balance.filter(item => item.isexpire === this.status.isY)
            let balance_allUsed = balance.filter(item => this.isBalance(item.credit, item.used) <= 0)
            let balance_active = balance.filter(item => item.isexpire === this.status.isN && this.isBalance(item.credit, item.used) > 0)

            return balance_active.concat(balance_expire, balance_allUsed)
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
        BalanceLine(id,code,name,size) {
            this.code = code
            this.name = name
            this.size = size
            this.$store.dispatch('getBalanceLines', id)
            this.showModal = true
        },
        goToPayment(id,packagename,duration,price,index) {
            let packageDetail = {id: id, name: packagename, duration: duration, price: price, index: index}
            this.$store.dispatch('getDataToPayment', packageDetail)
            this.$router.push('/payment')
        },
        dateIsZero(duration) {
            return (duration > 0) ? duration : 0
        },
        renewAdsBalance(id,code,name,size) {
            this.packageRenew.id = id
            this.packageRenew.code = code
            this.packageRenew.name = name
            this.packageRenew.size = size
            this.$store.dispatch('showPackageRenewModal', true)
        },
        closeAdsBalance(id, code, name, size) {
            this.packageClose.id = id
            this.packageClose.code = code
            this.packageClose.name = name
            this.packageClose.size = size
            this.$store.dispatch('showPackageCloseModal', true)
        },
        checkRenewButtonCondition(isExp, duration) {
            return (isExp === this.status.isY || duration < 1) ? true : false
        }
    },
    template: `<div class="tableresponsive style-on-package-account">
                    <div class="row">
                        <div class="col-md-6" style="text-align: left;">
                            <span><input v-model="showAll" type="checkbox" id="showall" style="cursor: pointer;"> <label for="showall" style="cursor: pointer;"><small>แสดงเฉพาะแพ็คเกจที่สามารถใช้งานได้</small></label></span>
                        </div>
                        <div class="col-md-6">
                            <p class="text-right mb-0 icon-description"><small><button class="btn btn-sm btn-info" style="padding: 0.05rem .25rem;"><i class="fas fa-redo-alt"></i></button> = ต่ออายุแพ็คเกจ , <button class="btn btn-sm btn-danger" style="padding: 0.05rem .25rem;" title="ปิดแพ็คเกจ"><i class="fas fa-times-circle"></i></button> = ปิดแพ็คเกจ , <i class="fas fa-check-circle text-secondary" style="font-size: 16px;"></i> = เครดิตเต็ม</small></p>
                        </div>
                    </div>
                    <progress-bar v-if="$store.getters.balance_progress_bar"></progress-bar>
                    <table class="table g-mb-20 w-100 bg-white" style="border-bottom: 1px solid #ddd;">
                        <thead>
                            <tr class="g-bg-primary g-color-white">
                                <th>หมายเลขคำสั่งซื้อ</th>
                                <th class="text-center">ประเภทโฆษณา</th>
                                <th class="text-center">วันที่ซื้อ</th>
                                <th class="text-center">สิทธิ์ลงโฆษณา</th>
                                <th class="text-center">ใช้สิทธิ์ไปแล้ว</th>
                                <th class="text-center">คงเหลือ</th>
                                <th class="text-center td-activity"></th>
                            </tr>
                        </thead>
                        <tbody class="g-font-size-14">
                            <slot v-if="!$store.getters.balance_loaded">
                                <slot v-if="$store.getters.package_balance !== ''">
                                    <tr v-for="(balance, index) in balanceSofting" :class="[(balance.isexpire === status.isY || isBalance(balance.credit, balance.used) <= 0 || balance.duration <= 0) ? 'bg-light' : '', (balance.isexpire === status.isY && showAll || isBalance(balance.credit, balance.used) <= 0 && showAll || balance.duration <= 0 && showAll) ? 'isNone' : '']">
                                        <td data-title="หมายเลขคำสั่งซื้อ">
                                            <button class="btn btn-link p-0" @click="BalanceLine(balance.u_pack_id,balance.order_code,balance.name,balance.size)">{{ balance.order_code }}</button> <i v-if="balance.attention" class="fas fa-exclamation-circle text-warning"></i> 
                                        </td>
                                        <td data-title="ประเภทโฆษณา" class="text-center">{{ balance.name }} <span v-if="balance.size !== null">- {{ balance.size }}</span> </td>
                                        <td data-title="วันที่ซื้อ" class="text-center">{{ thDateFormat(balance.buy_date) }} <span v-if="balance.duration !== null">(<strong :class="[(balance.duration < 10) ? 'text-danger' : 'text-info']">{{ dateIsZero(balance.duration) }}</strong> <small>วัน</small>)</span></td>
                                        <td data-title="สิทธิ์ลงโฆษณา" class="text-center"><strong>{{ balance.credit }}</strong></td>
                                        <td data-title="ใช้สิทธิ์ไปแล้ว" class="text-center"><strong class="text-danger">{{ balance.used }}</strong></td>
                                        <td data-title="คงเหลือ" class="text-center"><strong class="text-success">{{ isBalance(balance.credit, balance.used) }}</strong></td>
                                        <td v-if="balance.attention" class="text-center td-activity"></td>
                                        <td v-else class="text-center td-activity">
                                            <slot v-if="checkRenewButtonCondition(balance.isexpire, balance.duration)">
                                                <span v-if="isBalance(balance.credit, balance.used) <= 0"><i class="fas fa-check-circle text-secondary" style="font-size: 20px; margin-bottom: -4px;"></i></span>
                                                <button class="btn btn-sm btn-info" style="padding: 0.05rem .25rem;" title="ต่ออายุแพ็คเกจ" @click="renewAdsBalance(balance.u_pack_id,balance.order_code,balance.name,balance.size)"><i class="fas fa-redo-alt"></i></button>
                                                <button class="btn btn-sm btn-danger" style="padding: 0.05rem .25rem;" title="ปิดแพ็คเกจ" @click="closeAdsBalance(balance.u_pack_id,balance.order_code,balance.name,balance.size)"><i class="fas fa-times-circle"></i></button>
                                            </slot>
                                            <slot v-else>
                                                <span v-if="isBalance(balance.credit, balance.used) <= 0"><i class="fas fa-check-circle text-secondary" style="font-size: 20px;"></i></span>
                                            </slot>
                                        </td>
                                    </tr>
                                </slot>
                                <slot v-else>
                                    <tr>
                                        <td colspan="6" class="text-center">ยังไม่มีรายการโฆษณาของคุณ</td>
                                    </tr>
                                </slot>
                            </slot>
                            <slot v-else>
                                <tr>
                                    <td colspan="6" class="text-center">
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
                    <balance-lines v-if="showModal" @close="showModal = false">
                        <h4 slot="header">[ {{ code }} ] : {{ name }} <span v-if="size !== null">- {{ size }}</span></h4>
                        <div slot="body" class="tableresponsive">
                            <table class="table g-mb-20 w-100" style="border-bottom: 1px solid #ddd;">
                                <thead>
                                    <tr class="g-bg-secondary g-color-dark">
                                        <th># หมายเลขใบเสร็จ</th>
                                        <th class="text-center">วันที่เริ่ม - วันสุดท้าย</th>
                                        <th class="text-center">ระยะเวลา</th>
                                        <th class="text-center">เครดิต</th>
                                        <th class="text-center">ราคา(฿)</th>
                                        <th class="text-center"></th>
                                    </tr>
                                </thead>
                                <tbody v-if="!$store.getters.balanceline_loaded">
                                    <tr class="pt-2 pb-2" v-for="(balanceline, index) in $store.getters.balance_line">
                                        <td data-title="หมายเลขใบเสร็จ">
                                            <span v-if="balanceline.user_payments[0].documentno !== null">
                                                {{index+1}}. {{ balanceline.user_payments[0].documentno }}
                                            </span>
                                            <span v-else>
                                                ยังไม่ได้ชำระเงิน...
                                            </span>
                                        </td>
                                        <td data-title="วันที่เริ่ม - วันสุดท้าย" class="text-center">
                                            <span v-if="balanceline.start_date !== null">
                                                {{ thDateFormat(balanceline.start_date) }} - {{ thDateFormat(balanceline.end_date) }}
                                            </span>
                                            <span v-else>
                                                ยังไม่มีกำหนด...
                                            </span>
                                        </td>
                                        <td data-title="ระยะเวลา" class="text-center">{{ balanceline.duration }} วัน</td>
                                        <td data-title="เครดิต" class="text-center">{{ balanceline.credit }}</td>
                                        <td data-title="ราคา(฿)" class="text-center">{{ formatNumber(balanceline.price) }}</td>
                                        <td data-title="การจัดการ" class="text-center">
                                            <slot v-if="balanceline.ispaid === 'Y'">
                                                <button class="btn btn-primary btn-sm">ชำระเงินแล้ว</button>
                                            </slot>
                                            <slot v-else>
                                                <div class="row">
                                                    <slot v-if="balanceline.user_payments[0].status === 'DR'">
                                                        <div class="col-md-8 p-0">
                                                            <button class="btn btn-info btn-sm" @click="goToPayment(balanceline.id, balanceline.package_name, balanceline.duration_name, balanceline.price, index)">ชำระเงิน</button>
                                                        </div>
                                                        <div class="col-md-4 p-0">
                                                            <button class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button>
                                                        </div>
                                                    </slot>
                                                    <slot v-else-if="balanceline.user_payments[0].status === 'CK'">
                                                        <div class="col-md-12 p-0 text-center">
                                                            กำลังตรวจสอบ...
                                                        </div>
                                                    </slot>
                                                </div>
                                            </slot>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="6" class="text-center">
                                            <div class="loadingio-spinner-pulse-s0fdf1v0u4">
                                                <div class="ldio-ukcojlsaueg">
                                                    <div></div><div></div><div></div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </balance-lines>
                    <package-renew v-if="$store.getters.showPackageRenewModal"
                        :id = packageRenew.id
                        :packageCode = packageRenew.code
                        :name = packageRenew.name
                        :size = packageRenew.size
                    ></package-renew>

                    <package-close v-if="$store.getters.showPackageCloseModal"
                        :id = packageClose.id
                        :packageCode = packageClose.code
                        :name = packageClose.name
                        :size = packageClose.size
                    ></package-close>
                </div>`
}