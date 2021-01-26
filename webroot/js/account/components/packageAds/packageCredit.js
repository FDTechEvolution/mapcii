import {PackageBalance} from '../../../isadvert/components/balance/packageBalance.js'

export const packageCredit = {
    components: {
        'package-balance' : PackageBalance
    },
    data() {
        return {
            iconChange: false
        }
    },
    methods: {
        changeCollapse() {
            this.iconChange = (this.iconChange === false) ? true : false
            // console.log(this.iconChange)
        }
    },
    template: `<div class="text-right">
                    <button data-toggle="collapse" data-target="#credit" class="btn btn-info mb-0" @click="changeCollapse"><i :class="[(!iconChange ? 'fas fa-angle-right' : 'fas fa-angle-down')]"></i> รายละเอียดเครดิตในการลงโฆษณาของคุณ...</button>
                    <div id="credit" class="collapse border rounded pt-3 pl-4 pr-4 pb-2 bg-light">
                        <package-balance></package-balance>
                    </div>
                </div>`
}