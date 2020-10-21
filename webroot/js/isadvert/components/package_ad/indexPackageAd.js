import {NoticeContent} from './noticeContent.js'
import {SelectAds} from './selectedAds.js'
import {PackageAd} from './packageAd.js'
import {SelectedPayment} from '../selectedPayment.js'

export const IndexPackageAd = {
    components: {
        'notice-content' : NoticeContent,
        'select-ads' : SelectAds,
        'package-ad' : PackageAd,
        'select-payment' : SelectedPayment
    },
    methods: {
        
    },
    template: `<div class="row">
                    <div class="col-md-12 text-left"><button class="btn btn-secondary" @click="$parent.goBack">< กลับ</button></div>
                    <div class="col-md-4 g-mt-20">
                        <notice-content></notice-content>
                    </div>
                    <div class="col-md-8 g-mt-20">

                        <package-ad></package-ad>
                        <hr/>
                        <select-ads></select-ads>

                        <select-payment></select-payment>

                    </div>
                </div>`
}