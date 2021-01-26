export const bannerAddDescription = {
    data() {
        return {
            banner: {
                description: ''
            }
        }
    },
    computed: {
        setDescriptionToStore() {
            this.$store.dispatch('setDescriptionFromBanner', this.banner.description)
        }
    },
    template: `<div class="col-md-4 text-left">
                    {{setDescriptionToStore}}
                    <div class="form-group g-mb-25">
                        <label for="description">รายละเอียดอื่นๆ</label>
                        <textarea v-model="banner.description" :disabled="!$parent.isAvaliableCredit()" class="form-control form-control-md" name="description" id="description" rows="5"></textarea>
                    </div>
                </div>`
}