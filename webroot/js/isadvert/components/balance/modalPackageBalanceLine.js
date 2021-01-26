export const ModalPackageBalanceLine = {
    props: ['name'],
    template: `<transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container-closeasset">
                                <div class="modal-header">
                                    <slot name="header"></slot>
                                </div>
                                <div class="modal-body mt-0">
                                    <slot name="body"></slot>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" @click="$emit('close')"><i class="far fa-times-circle"></i> ปิดหน้าต่าง</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>`
}