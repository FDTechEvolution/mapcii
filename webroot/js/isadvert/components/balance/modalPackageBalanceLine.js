export const ModalPackageBalanceLine = {
    props: ['name'],
    template: `<div class="modal fade in modal-active">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <slot name="header"></slot>
                            </div>
                            <div class="modal-body mt-0">
                                <slot></slot>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" @click="$emit('close')"><i class="far fa-times-circle"></i> ปิดหน้าต่าง</button>
                            </div>
                        </div>
                    </div>
                </div>`
}