export const deleteAssetFavoriteModal = {
    props: ['assetId', 'assetName'],
    methods: {
        userFavoriteAssetDelete() {
            this.$store.dispatch('loadingProgressBar')
            this.$store.dispatch('loadingDeleteFavorite', true)
            axios.get(siteurl + 'services/property?action=favorite&id=' + this.assetId)
            .then((response) => {
                if(response.data.code === 200){
                    this.$store.dispatch('loadAssetFavorite', true)
                }else{
                    alert('เกิดข้อผิดพลาด กรุณาลองใหม่...')
                }
            })
            .catch(e => {
                console.log(e)
            })
        }
    },
    template: `<transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container-closeasset">

                                <div class="modal-body text-center pt-4 pb-4">
                                    <slot name="body">
                                        <h4>ยืนยันการลบอสังหาฯที่คุณสนใจ ?</h4>
                                        <strong class="border-bottom">"{{assetName}}"</strong>
                                    </slot>
                                </div>

                                <div class="modal-footer d-flex">
                                    <slot v-if="!$store.getters.loadingDeleteFavorite" name="footer">
                                        <button class="btn btn-danger" @click="userFavoriteAssetDelete()">ยืนยัน</button>
                                        <button class="btn btn-secondary" @click="$store.dispatch('confirmDeleteAssetFavoriteModal', false)">ยกเลิก</button>
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