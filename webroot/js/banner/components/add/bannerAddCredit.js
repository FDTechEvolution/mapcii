export const bannerAddCredit = {
    template: `<div class="col-md-12 text-danger">
                    <div class="row">
                        <div v-if="$store.getters.announceStatus.isTestAnnounce" class="col-md-10 offset-1 margin-top--40">
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <small><i class="fa fa-exclamation-triangle"></i> กรุณาชำระเงินตามแพ็คเกจที่คุณได้เลือกไว้...เพื่อใช้งานประกาศประเภทอื่นๆ <a href="#">ดูเครดิตของคุณ</a></small>
                            </div>
                        </div>
                        <div v-else-if="!$store.getters.announceStatus.isDuration" class="col-md-10 offset-1 margin-top--40">
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <small><i class="fa fa-exclamation-triangle"></i> แพ็คเกจของคุณหมดอายุแล้ว...กรุณาต่ออายุแพ็คเกจ <a href="#">ดูเครดิตของคุณ</a></small>
                            </div>
                        </div>
                        <div v-else-if="!$store.getters.announceStatus.isHasCredit" class="col-md-10 offset-1 margin-top--40">
                            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                <small><i class="fa fa-exclamation-triangle"></i> แพ็คเกจของคุณเครดิตเต็มแล้ว...กรุณาปิดประกาศอื่นๆหรือซื้อแพ็คเกจใหม่เพื่อเพิ่มเครดิต <a href="#">ดูเครดิตของคุณ</a></small>
                            </div>
                        </div>
                    </div>
                </div>`
}