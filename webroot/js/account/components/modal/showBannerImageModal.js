export const showBannerImageModal = {
    props: ['topic','url'],
    template: `<transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container">

                                <div class="modal-header">
                                    <div class="row" style="width: 100%;">
                                        <div class="col-md-10">
                                            <h5 class="mb-0">{{ topic }}</h5>
                                        </div>
                                        <div class="col-md-2 text-right">
                                            <button class="btn btn-danger" @click="$parent.bannerImageModal = false"><i class="far fa-times-circle mr-2"></i> ปิดหน้าต่าง</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-body">
                                    <img :src="url" class="w-100">
                                </div>

                            </div>
                        </div>
                    </div>
                </transition>`
}