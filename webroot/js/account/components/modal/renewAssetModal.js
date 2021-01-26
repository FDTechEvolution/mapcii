export const renewAssetModal = {
    props: ['assetId', 'assetName', 'assetDuration', 'assetCode', 'packageCode', 'packageCredit', 'packageUsed'],
    methods: {
        confirmedRenewAsset(id) {
            this.$store.dispatch('renewAssetAd', id)
        }
    },
    template: `<transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container-closeasset">

                                <div v-if="assetDuration <= 0" class="modal-body text-center pt-4 pb-4">\
                                    <h5>ขออภัย...</h5>
                                    <strong class="border-bottom">{{packageCode}} : </strong> หมดเวลาแล้ว...กรุณาต่ออายุแพ็คเกจ.....
                                </div>

                                <div v-else class="modal-body text-center pt-4 pb-4">
                                    <slot v-if="packageCredit > packageUsed" name="body">
                                        <h5>ยืนยันการเปิดประกาศอีกครั้ง?</h5>
                                        <strong class="border-bottom">"[{{assetCode}}] : {{assetName}}"</strong><br/><br/>
                                        <strong class="border-bottom">{{packageCode}} : </strong> คุณจะต้องใช้เครดิต <strong class="border-bottom">1</strong> เครดิต<br/>
                                        <strong class="border-bottom">เครดิตที่เหลืออยู่ : </strong> {{(packageCredit - packageUsed)}} เครดิต | <strong class="border-bottom">ระยะเวลาคงเหลือ : </strong> {{assetDuration}} วัน
                                    </slot>
                                    <slot v-else name="body">
                                        <h5>ขออภัย...</h5>
                                        <strong class="border-bottom">"[{{assetCode}}] : {{assetName}}"</strong><br/><br/>
                                        <strong class="border-bottom">{{packageCode}} : </strong> เครดิตของคุณหมดแล้ว...
                                    </slot>
                                </div>

                                <div class="modal-footer d-flex">
                                    <slot v-if="!$store.getters.loadingRenewAsset" name="footer">
                                        <button v-if="packageCredit > packageUsed" class="btn btn-danger" @click="confirmedRenewAsset(assetId)">ยืนยัน</button>
                                        <button class="btn btn-secondary" @click="$store.dispatch('renewAssetModal', false)">ยกเลิก</button>
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