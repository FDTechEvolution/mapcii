const MAX_SIZE = 1048576;
const MAX_WIDTH = 500;
const MAX_HEIGHT = 400;

export const bannerAddImageB = {
    data() {
        return {
            imageData: '',
            bannerImage: '',
            imgSize: {
                width: '',
                height: ''
            },
            max_width: MAX_WIDTH,
            max_height: MAX_HEIGHT
        }
    },
    computed: {
        setBannerImage() {
            this.$store.dispatch('setBannerImage', this.bannerImage)
        }
    },
    methods: {
        bannerImageDefault() {
            return false
        },
        selectImage () {
            document.getElementById("fileUpload").click()
        },
        previewImage(event) {
            let input = event.target
            if (input.files && input.files[0]) {
                if(input.files[0].size > MAX_SIZE) {
                    this.$parent.bannerNotice = 'ขนาดของแบนเนอร์เกินกว่าที่กำหนด กรุณาลดขนาดไฟล์... \n[ขนาดที่กำหนด 1MB]'
                    return
                }
                if(input.files[0].type !== 'image/jpeg' && input.files[0].type !== 'image/png') {
                    this.$parent.bannerNotice = 'ประเภทของไฟล์แบนเนอร์ไม่ถูกต้อง ต้องเป็น PNG หรือ JPEG เท่านั้น'
                    return
                }
                
                this.$parent.bannerNotice = ''
                let reader = new FileReader()

                reader.readAsDataURL(input.files[0])
                reader.onload = (e) => {
                    let img = new Image
                    img.onload = () => {
                        this.$parent.bannerNotice = (img.width !== MAX_WIDTH && img.height !== MAX_HEIGHT) ? 'ขนาดความกว้างของแบนเนอร์ไม่เท่ากับที่กำหนด \n[ ที่กำหนด : ' + MAX_WIDTH + 'x' + MAX_HEIGHT + 'px | ขนาดแบนเนอร์ของคุณ : ' + img.width + 'x' + img.height + 'px ]' : ''
                    }
                    img.src = reader.result
                    this.imageData = e.target.result
                    this.bannerImage = this.$refs.file.files[0]
                }
            }
        },
        clearIMageUpload () {
            this.imageData = ''
            this.$parent.bannerNotice = ''
            this.$store.dispatch('setBannerImage', '')
        }
    },
    template: `<div class="col-4 offset-2 text-center" :class="[(bannerImage === '') ? 'border border-secondary rounded' : '']">
                    <slot v-if="imageData.length > 0">
                        {{setBannerImage}}
                        <img :src="imageData" class="w-100 bg-white rounded banner-notice-img" :class="[($parent.bannerNotice !== '') ? 'banner-notice-border' : '']">
                        <span class="btn-edit-profile-img banner-notice-btn"> 
                            <button class="btn btn-sm btn-info" style="border: 2px solid #fff;" @click="selectImage"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-sm btn-danger" style="border: 2px solid #fff;" @click="clearIMageUpload"><i class="fas fa-times"></i></button>
                        </span>
                    </slot>
                    <slot v-else>
                        <img v-if="!bannerImageDefault" :src="bannerImageDefault" class="g-width-100 bg-white rounded">
                        <button :disabled="!$parent.isAvaliableCredit()" class="btn btn-sm btn-primary border border-white mt-4" @click="selectImage"><i class="far fa-image"></i> เลือกรูปแบนเนอร์</button>
                        <p class="text-secondary mt-2">
                            <small>
                                <strong>ขนาด {{max_width}}x{{max_height}}px เท่านั้น!!</strong><br/>
                                ไม่เกิน 1MB และต้องเป็นไฟล์ PNG หรือ JPEG เท่านั้น
                            </small>
                        </p>
                    </slot>
                    <input type="file" id="fileUpload" ref="file" @change="previewImage" hidden>
                    <strong v-if="$parent.bannerNotice !== ''" class="text-danger">{{$parent.bannerNotice}}</strong>
                </div>`
}