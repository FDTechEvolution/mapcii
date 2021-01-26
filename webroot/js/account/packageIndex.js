import {packageAdAnnounce} from './components/packageAds/packageAdAnnounce.js'
import {packageAdBanner} from './components/packageAds/packageAdBanner.js'
import {packageCredit} from './components/packageAds/packageCredit.js'

export const packageIndex = {
    components: {
        'package-ad-announce' : packageAdAnnounce,
        'package-ad-banner' : packageAdBanner,
        'package-credit' : packageCredit
    },
    data() {
        return {
            
        }
    },
    template: `<div class="container" style="max-width: 100%;">
                    <package-credit></package-credit>
                    <hr class="mt-3 mb-4"/>
                    <ul class="nav nav-tabs">
                        <li class="active show"><a class="active show" data-toggle="tab" href="#ads">รายการประกาศโฆษณา</a></li>
                        <li><a data-toggle="tab" href="#banner">รายการแบนเนอร์โฆษณา</a></li>
                    </ul>
                
                    <div class="tab-content">
                        <div id="ads" class="tab-pane fade in active show">
                            <package-ad-announce></package-ad-announce>
                        </div>
                        <div id="banner" class="tab-pane fade">
                            <package-ad-banner></package-ad-banner>
                        </div>
                    </div>
                </div>`
}