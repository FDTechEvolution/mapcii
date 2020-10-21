import {NoticeContent} from './noticeContent.js'
import {SelectBannerB} from './selectedBannerB.js'
import {PackageBannerB} from './packageBannerB.js'
import {SelectedPayment} from '../selectedPayment.js'

export const IndexPackageBannerB = {
    components: {
        'notice-content' : NoticeContent,
        'select-banner-b' : SelectBannerB,
        'package-banner-b' : PackageBannerB,
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

                        <package-banner-b></package-banner-b>
                        <hr/>
                        <select-banner-b></select-banner-b>

                        <select-payment></select-payment>

                    </div>
                </div>`
}