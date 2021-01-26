export const closeBannerImageModal = {
    props: ['packageCode', 'topic', 'id', 'url'],
    methods: {
        confirmCloseBanner() {
            this.$store.dispatch('closeBannerImage', this.id)
        }
    },
    template: `<transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container-closeasset">

                                <div class="modal-body text-center pt-4 pb-4">
                                    <slot name="body">
                                        <h4>ยืนยันการปิดแบนเนอร์ ?</h4>
                                        <strong class="border-bottom">"{{topic}}"</strong><br/>
                                        <strong class="border-bottom">{{packageCode}}</strong> : คุณจะได้รับเครดิตคืน <strong class="border-bottom">1</strong> เครดิต<br/><br/>
                                        <img :src="url" class="w-100">
                                    </slot>
                                </div>

                                <div class="modal-footer d-flex">
                                    <slot v-if="!$store.getters.bannerImageLoading" name="footer">
                                        <button class="btn btn-danger" @click="confirmCloseBanner">ยืนยัน</button>
                                        <button class="btn btn-secondary" @click="$store.dispatch('showDeleteBannerModal', false)">ยกเลิก</button>
                                    </slot>
                                    <slot v-else name="footer">
                                        <div class="loadingio-spinner-gear-31k4689btaa mt-1 mr-2 pr-3">
                                            <div class="ldio-hi7wef2pqwc">
                                                <div><div></div><div></div><div></div>
                                                <div></div><div></div><div></div></div>
                                            </div>
                                        </div>
                                        <button class="btn btn-secondary" disabled>กำลังดำเนินการ</button>
                                    </slot>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </transition>`
}