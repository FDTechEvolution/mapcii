export const packageCloseModal = {
    props: ['id', 'packageCode', 'name', 'size'],
    template: `<transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container-closeasset">
                                <div class="modal-body text-center pt-5 pb-5">
                                    <h5>ยืนยันการปิดแพ็คเกจ : [{{packageCode}}] - {{name}} <span v-if="size !== ''">{{size}}</span> ?</h5>
                                </div>
                                <div class="modal-footer">
                                    <slot v-if="!$store.getters.package_closing">
                                        <button type="button" class="btn btn-danger" @click="$store.dispatch('ClosePackageBalance', id)"><i class="far fa-trash-alt"></i> ลบแพ็คเกจ</button>
                                        <button type="button" class="btn btn-secondary" @click="$store.dispatch('showPackageCloseModal', false)"><i class="far fa-times-circle"></i> ปิดหน้าต่าง</button>
                                    </slot>
                                    <slot v-else>
                                        <div class="loadingio-spinner-gear-31k4689btaa mt-1 mr-2 pr-3">
                                            <div class="ldio-hi7wef2pqwc">
                                                <div><div></div><div></div><div></div>
                                                <div></div><div></div><div></div></div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-danger" disabled>กำลังดำเนินการ...</button>
                                    </slot>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>`
}