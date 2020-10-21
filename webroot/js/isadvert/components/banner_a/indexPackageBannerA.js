import {NoticeContent} from './noticeContent.js'
import {SelectBannerA} from './selectedBannerA.js'
import {PackageBannerA} from './packageBannerA.js'
import {SelectedPayment} from '../selectedPayment.js'

export const IndexPackageBannerA = {
    components: {
        'notice-content' : NoticeContent,
        'select-banner-a' : SelectBannerA,
        'package-banner-a' : PackageBannerA,
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

                        <package-banner-a></package-banner-a>
                        <hr/>
                        <select-banner-a></select-banner-a>

                        <select-payment></select-payment>

                    </div>
                </div>`
}