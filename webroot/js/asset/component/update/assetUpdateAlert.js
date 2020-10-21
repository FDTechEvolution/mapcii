export const AssetUpdateAlert = {
    data () {
        return {
            Class: {
                fadeOut: 'hidden'
            }
        }
    },
    template: `<div class="col-md-12 mt-2">
                    <div v-if="$store.getters.updateSuccess" :class="$store.getters.updateSuccess ? Class.fadeOut : ''" class="alert alert-success" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <strong>ข้อมูลประกาศของคุณได้อัพเดทเรียบร้อยแล้ว...</strong>
                    </div>
                </div>`
}