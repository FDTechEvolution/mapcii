export const QrcodePayment = {
    data() {
        return {
            price: 0
        }
    },
    computed: {
        setPaymentPrice() {
            if(this.$store.getters.user_data.price !== undefined){
                this.price = this.$store.getters.user_data.price
            }
        }
    },
    methods: {
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
    },
    template: `<div class="col-md-12">
                    {{setPaymentPrice}}
                    <div class="row">
                        <div class="col-md-8">
                            <h5 class="mb-3"><u>โอนเงินด้วย QR โค้ด</u></h5>
                            <div class="row pb-3 mb-3 border-bottom">
                                <div class="col-md-12" style="line-height: 26px;">
                                    <strong>แพ็คเกจที่คุณเลือก :</strong> {{ $store.getters.user_data.package }}<br/>
                                    <strong>จำนวนเงินที่ต้องชำระ :</strong> {{ formatNumber(price) }} บาท
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-7 text-center" style="line-height: 26px;">
                                    <h5>ชำระเงินด้วย QR โค้ด</h5>
                                    ทำการสแกน QR โค้ด เพื่อชำระค่าบริการ<br/>
                                    <img class="w-25 mt-3 mb-3" src="http://localhost/git/mapcii/webroot/img/Kbank.png"><br/>
                                    <strong>ชื่อบัญชี :</strong> XXXXXXXXXXXXXXXX<br/>
                                    บัญชีออมทรัพย์ ธนาคารกสิกรไทย<br/>
                                    <strong>หมายเลขสมาชิก :</strong> xxxxxxxxx
                                </div>
                                <div class="col-md-5 text-center">
                                    <img class="w-100 rounded" src="http://localhost/git/mapcii/webroot/img/qrCode_simple.jpg">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h5 class="mb-3"><u>วิธีการโอนเงินด้วย QR โค้ด</u></h5>
                            <div class="row pl-3 mb-3">
                                <div class="col-md-12 mb-3">
                                    1. เข้าไปที่แอปพลิเคชั่นของธนาคารในโทรศัพท์ของคุณ
                                </div>
                                <div class="col-md-12 mb-3">
                                    2. กดเลือกเมนู 'สแกน QR โค้ด' บนแอปพลิเคชั่นของธนาคาร แล้วทำการสแกน QR โค้ด ที่อยู่ทางด้วยซ้ายมือนี้เพื่อทำการชำระเงิน
                                </div>
                                <div class="col-md-12">
                                    3. เมื่อชำระเงินเสร็จเรียบร้อยแล้ว คุณจะได้รับสิทธิ์ในการลงโฆษณาได้ทันที
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
}