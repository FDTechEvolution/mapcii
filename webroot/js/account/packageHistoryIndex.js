import {adsHistory} from './components/packageHistory/adsHistory.js'
import {bannerHistory} from './components/packageHistory/bannerHistory.js'
import {freeHistory} from './components/packageHistory/freeHistory.js'

export const packageHistoryIndex = {
    components: {
        'ads-history' : adsHistory,
        'banner-history' : bannerHistory,
        'free-history' : freeHistory
    },
    data() {
        return {
            
        }
    },
    template: `<div class="container" style="max-width: 100%;">
                    <ul class="nav nav-tabs">
                        <li class="active show"><a class="active show" data-toggle="tab" href="#ads">ประวัติประกาศโฆษณา</a></li>
                        <li><a data-toggle="tab" href="#banner">ประวัติแบนเนอร์โฆษณา</a></li>
                        <li><a data-toggle="tab" href="#free">ประวัติประกาศฟรี</a></li>
                    </ul>
                
                    <div class="tab-content">
                        <div id="ads" class="tab-pane fade in active show">
                            <ads-history></ads-history>
                        </div>
                        <div id="banner" class="tab-pane fade">
                            <banner-history></banner-history>
                        </div>
                        <div id="free" class="tab-pane fade">
                            <free-history></free-history>
                        </div>
                    </div>
                </div>`
}