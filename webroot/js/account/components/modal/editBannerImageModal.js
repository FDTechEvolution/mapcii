const MAX_SIZE = 1048576
const MAX_WIDTH_A = 1500
const MAX_WIDTH_B = 500
const MAX_HEIGHT = 400

export const editBannerImageModal = {
    props: ['id', 'topic', 'description', 'url', 'type'],
    data() {
        return {
            bannerEditData: {
                topic: '',
                description: '',
                url: '',
                type: ''
            },
            bannerNotice: '',
            imageData: '',
            bannerImage: '',
            imgSize: {
                width: '',
                height: ''
            },
            max_width: (this.type === 'Banner A') ? MAX_WIDTH_A : (this.type === 'Banner B') ? MAX_WIDTH_B : '',
            max_height: MAX_HEIGHT
        }
    },
    mounted() {
        this.bannerEditData.topic = this.topic
        this.bannerEditData.description = this.description
        this.bannerEditData.url = this.url
        this.bannerEditData.type = this.type
    },
    computed: {
        check_all_condition() {
            return (this.bannerNotice === '' && this.bannerEditData.topic !== '') ? true : false
        }
    },
    methods: {
        selectImage () {
            document.getElementById("fileUpload").click()
        },
        updateBannerImage() {
            this.$store.dispatch('updateBannerImage', {id:this.id ,topic:this.bannerEditData.topic, description:this.bannerEditData.description, img:this.bannerImage})
        },
        previewImage(event) {
            let input = event.target
            if (input.files && input.files[0]) {
                
                let reader = new FileReader()

                reader.readAsDataURL(input.files[0])
                reader.onload = (e) => {
                    let img = new Image
                    img.onload = () => {
                        if(input.files[0].size > MAX_SIZE) {
                            this.bannerNotice = 'ขนาดของแบนเนอร์เกินกว่าที่กำหนด กรุณาลดขนาดไฟล์... \n[ขนาดที่กำหนด ไม่เกิน 1MB]'
                            return
                        }
                        if(input.files[0].type !== 'image/jpeg' && input.files[0].type !== 'image/png') {
                            this.bannerNotice = 'ประเภทของไฟล์แบนเนอร์ไม่ถูกต้อง ต้องเป็น PNG หรือ JPEG เท่านั้น'
                            return
                        }
                        if(img.width !== this.max_width || img.height !== this.max_height) {
                            this.bannerNotice = 'ขนาดความกว้างของแบนเนอร์ไม่เท่ากับที่กำหนด <br/>[ ที่กำหนด : ' + this.max_width + 'x' + this.max_height + 'px | ขนาดแบนเนอร์ของคุณ : ' + img.width + 'x' + img.height + 'px ]'
                            return
                        }
                        this.bannerNotice = ''
                    }
                    img.src = reader.result
                    this.imageData = e.target.result
                    this.bannerImage = this.$refs.file.files[0]
                }
            }
        },
        clearIMageUpload () {
            this.imageData = ''
            this.bannerNotice = ''
            // this.$store.dispatch('setBannerImage', '')
        },
        errorAlert() {
            alert('เงื่อนไขไม่ถูกต้อง...')
        }
    },
    template: `<transition name="modal">
                    <div class="modal-mask">
                        <div class="modal-wrapper">
                            <div class="modal-container">

                                <div class="modal-header">
                                    <div class="row" style="width: 100%;">
                                        <div class="col-md-10">
                                            <h5 class="mb-0">แก้ไขแบนเนอร์ : {{topic}} - [{{type}}]</h5>
                                        </div>
                                        <div class="col-md-2 text-right">
                                            <button class="btn btn-danger" @click="$store.dispatch('showEditBannerModal', false)"><i class="far fa-times-circle mr-2"></i> ปิดหน้าต่าง</button>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="type === 'Banner A'" class="modal-body p-5 pt-0 mt-3">
                                    <div class="row pb-3 mb-3 border-bottom">
                                        <slot v-if="imageData.length > 0">
                                            <img :src="imageData" class="w-100 bg-white rounded banner-notice-img m-height-custom-270" :class="[(bannerNotice !== '' ? 'banner-notice-border' : '')]">
                                            <span class="btn-edit-banner-img banner-notice-btn"> 
                                                <button class="btn btn-sm btn-info" style="border: 2px solid #fff;" @click="selectImage"><i class="fas fa-edit"></i></button>
                                                <button class="btn btn-sm btn-danger" style="border: 2px solid #fff;" @click="clearIMageUpload"><i class="fas fa-times"></i></button>
                                            </span>
                                            <p class="text-center w-100 mt-2" style="line-height: 16px;"><small><strong v-if="bannerNotice !== ''" class="text-danger" v-html="bannerNotice"></strong></small></p>
                                        </slot>
                                        <slot v-else>
                                            <button class="btn btn-sm btn-success" style="position: absolute; right: 27px;" @click="selectImage"><i class="fas fa-edit"></i> แก้ไขแบนเนอร์</button>
                                            <img :src="bannerEditData.url" class="w-100">
                                        </slot>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <strong>หัวข้อแบนเนอร์ <span class="text-danger">*</span></strong>
                                            <input v-model="bannerEditData.topic" class="form-control" :class="[(bannerEditData.topic === '') ? 'border border-danger' : '']">
                                        </div>
                                        <div class="col-md-6">
                                            <strong>รายละเอียดอื่นๆ</strong>
                                            <textarea v-model="bannerEditData.description" class="form-control"rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="type === 'Banner B'" class="modal-body p-5">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <slot v-if="imageData.length > 0">
                                                <img :src="imageData" class="w-100 bg-white rounded banner-notice-img m-height-custom-270" :class="[(bannerNotice !== '' ? 'banner-notice-border' : '')]">
                                                <span class="btn-edit-banner-img banner-notice-btn"> 
                                                    <button class="btn btn-sm btn-info" style="border: 2px solid #fff;" @click="selectImage"><i class="fas fa-edit"></i></button>
                                                    <button class="btn btn-sm btn-danger" style="border: 2px solid #fff;" @click="clearIMageUpload"><i class="fas fa-times"></i></button>
                                                </span>
                                                <p class="text-center w-100 mt-2" style="line-height: 16px;"><small><strong v-if="bannerNotice !== ''" class="text-danger" v-html="bannerNotice"></strong></small></p>
                                            </slot>
                                            <slot v-else>
                                                <button class="btn btn-sm btn-success" style="position: absolute; right: 27px;" @click="selectImage"><i class="fas fa-edit"></i> แก้ไขแบนเนอร์</button>
                                                <img :src="bannerEditData.url" class="w-100">
                                            </slot>
                                        </div>
                                        <div class="col-md-6">
                                            <strong>หัวข้อแบนเนอร์ <span class="text-danger">*</span></strong>
                                            <input v-model="bannerEditData.topic" class="form-control" :class="[(bannerEditData.topic === '') ? 'border border-danger' : '']">
                                            <hr/>
                                            <strong>รายละเอียดอื่นๆ</strong>
                                            <textarea v-model="bannerEditData.description" class="form-control"rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <slot v-if="!$store.getters.bannerImageLoading" name="footer">
                                        <button v-if="!check_all_condition" class="btn btn-primary" @click="errorAlert" disabled>แก้ไข</button>
                                        <button v-else class="btn btn-primary" @click="updateBannerImage">แก้ไข</button>
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

                        <input type="file" id="fileUpload" ref="file" @change="previewImage" hidden>
                    </div>
                </transition>`
}