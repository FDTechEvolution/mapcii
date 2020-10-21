export const SelectedPayment = {
    template: `<div v-if="$store.getters.package_payment" class="row">
                    <div class="col-md-12"><h4>เลือกวิธีการชำระเงิน</h4>
                        <ol>
                            <li><a href="#">โอนเงินด้วย QR Code</a></li>
                            <li><a href="#">โอนเงินเข้าบัญชีธนาคาร</a></li>
                        </ol>
                    </div>
                </div>`
}