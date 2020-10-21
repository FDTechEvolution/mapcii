import {BankPayment} from './bankPayment.js'
import {QrcodePayment} from './qrcodePayment.js'

export const PackagePayment = {
    components: {
        'bank-payment' : BankPayment,
        'qrcode-payment' : QrcodePayment
    },
    props: [],
    template: `<div class="col-md-12"><h4>เลือกวิธีการโอนเงิน <button class="btn btn-secondary" @click="$parent.goBack">< กลับ</button></h4>
                    <div v-if="!$store.getters.user_loaded" class="content">
                        <ul class="nav nav-pills" role="tablist">
                            <li class="nav-item-tabs">
                                <a class="nav-link active" data-toggle="pill" href="#bank-payment">โอนเงินเข้าบัญชีธนาคาร</a>
                            </li>
                            <li class="nav-item-tabs">
                                <a class="nav-link" data-toggle="pill" href="#qrcode-payment">โอนเงินด้วย QR โค้ด</a>
                            </li>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div id="bank-payment" class="container tab-pane active">
                                <bank-payment></bank-payment>
                            </div>
                            <div id="qrcode-payment" class="container tab-pane fade">
                                <qrcode-payment></qrcode-payment>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center">
                        <div class="loadingio-spinner-spinner-pc6b8g2r9j">
                            <div class="ldio-8gc4kjnx9fm">
                                <div></div><div></div><div></div><div></div><div></div><div></div>
                                <div></div><div></div><div></div><div></div><div></div><div></div>
                                <div></div><div></div><div></div><div></div><div></div><div></div>
                            </div>
                        </div>
                    </div>
                </div>`
}