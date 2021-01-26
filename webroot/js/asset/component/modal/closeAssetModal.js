export const closeAssetModal = {
    props: ['assetCode', 'assetName', 'assetDuration', 'assetId'],
    methods: {
        confirmCloseAsset(id) {
            this.$store.dispatch('closeAssetFree', id)
        }
    },
    template: `<transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container-closeasset">

                                <div class="modal-body text-center pt-4 pb-4">
                                    <slot name="body">
                                        <h5 class="mb-3">ยืนยันการปิดประกาศ ?</h5>
                                        <strong class="border-bottom">"[{{assetCode}}] : {{assetName}}"</strong><br/>
                                        ระยะเวลาคงเหลือ : <strong v-if="assetDuration > 10" class="text-success">{{assetDuration}}</strong><strong v-else class="text-danger">{{assetDuration}}</strong> วัน
                                    </slot>
                                </div>

                                <div class="modal-footer d-flex pt-2 pb-2">
                                    <slot v-if="!$store.getters.closeAssetFreeLoading" name="footer">
                                        <button class="btn btn-danger" @click="confirmCloseAsset(assetId)">ยืนยัน</button>
                                        <button class="btn btn-secondary" @click="$store.dispatch('closeAssetFreeModal', false)">ยกเลิก</button>
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