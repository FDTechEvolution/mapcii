export const renewAssetFreeModal = {
    props: ['assetId', 'assetName', 'assetCode'],
    computed: {
        assetStartNewDate() {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            return today = dd + '-' + mm + '-' + yyyy;
        }
    },
    methods: {
        confirmedRenewAsset(id) {
            this.$store.dispatch('renewFreeAsset', id)
        }
    },
    template: `<transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container-closeasset">

                                <div class="modal-body text-center pt-4 pb-4">
                                    <h5>ยืนยันการเปิดประกาศอีกครั้ง?</h5>
                                    <strong class="border-bottom">"[{{assetCode}}] : {{assetName}}"</strong><br/><br/>
                                    <strong class="border-bottom">ระยะเวลาประกาศจะคงเหลือ : </strong> 10 วัน นับจากวันนี้ ({{assetStartNewDate}})
                                </div>

                                <div class="modal-footer d-flex">
                                    <slot v-if="!$store.getters.loadingRenewAssetFree" name="footer">
                                        <button class="btn btn-danger" @click="confirmedRenewAsset(assetId)">ยืนยัน</button>
                                        <button class="btn btn-secondary" @click="$store.dispatch('renewAssetFreeModal', false)">ยกเลิก</button>
                                    </slot>
                                    <slot v-else name="footer">
                                        <div class="loadingio-spinner-gear-31k4689btaa mt-1 mr-2 pr-3">
                                            <div class="ldio-hi7wef2pqwc">
                                                <div><div></div><div></div><div></div>
                                                <div></div><div></div><div></div></div>
                                            </div>
                                        </div>
                                        <button class="btn btn-danger" disabled>กำลังดำเนินการ</button>
                                    </slot>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </transition>`
}