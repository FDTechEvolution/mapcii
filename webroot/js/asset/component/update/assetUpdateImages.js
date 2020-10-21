export const AssetUpdateImages = {
    data () {
        return {
            imageData: [],
            imageRef: [],
            imageUpdate: [],
            maxImages: 10,
            defaultImage: null,
            Class: {
                btnSecondary: 'btn-secondary',
                btnInfo: 'btn-info',
                btnDanger: 'btn-danger',
                btnWarning: 'btn-warning',
                btnLight: 'btn-light',
                borderDanger: 'border-danger',
                isdefault: 'btn-info'
            },
            showModal: false,
            removeId: null,
            removeIndex: null
        }
    },
    computed: {
        countImages () {
            let imgLength = this.imageData.length ? this.imageData.length : 0
            let imgUpLength = this.imageUpdate.length ? this.imageUpdate.length : 0
            let countData = imgUpLength + imgLength
            let maxData = this.maxImages
            let payload = {maxData, countData}
            this.$store.dispatch('checkImagegCountData', payload)
            return this.$store.getters.countImages
        },
        saveImages () {
            this.$store.dispatch('saveImages', this.imageRef)
            this.$store.dispatch('setDefaultImage', this.defaultImage)
        },
        setUpdateImages () {
            if(!this.$store.getters.updateLoaded){
                this.imageUpdate = this.$store.getters.updateAsset.asset_images
                this.imageUpdate.forEach((item,index) => {
                    if(item.isdefault === 'Y') {
                        this.defaultImage = index
                    }
                })
            }

            if(this.$store.getters.updateSuccess) {
                this.imageData = ''
                this.imageRef = ''
            }
        }
    },
    methods: {
        selectImage () {
            document.getElementById("fileUpload").click()
        },
        previewImage: function(event) {
            var input = event.target
            if (input.files && input.files[0]) {
                for(let i = 0; i < input.files.length; i++) {
                    var reader = new FileReader()
                    reader.onload = (e) => {
                        this.imageData.push(e.target.result)
                        this.imageRef.push(this.$refs.file.files[i])
                    }
                    reader.readAsDataURL(input.files[i])
                }
            }
        },
        removePreviewImage (index) {
            let navIndex = index - this.imageUpdate.length
            if(this.defaultImage === index) this.defaultImage = null
            this.imageData.splice(navIndex, 1)
            this.imageRef.splice(navIndex, 1)
        },
        removeUpdateImage (id, index) {
            this.removeId = id
            this.removeIndex = index
            this.showModal = true
        },
        confirmedRemoveImage () {
            try{
                let formData = new FormData()
                formData.append('id', this.removeId)
                axios.post(apiurl + 'api-assets/removeimage', formData ,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    this.showModal = false
                    if(response.data.status === 200){
                        this.imageUpdate.splice(this.removeIndex, 1)
                        if(this.defaultImage === this.removeIndex) this.setDefaultImage(this.imageUpdate[0].id, 0)
                    }
                })
            }catch(e){
                console.log(e)
            }
        },
        setDefaultImage (id, index) {
            try{
                let formData = new FormData()
                formData.append('id', id)
                axios.post(apiurl + 'api-assets/defaultimage', formData ,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    if(response.data.status === 200) this.defaultImage = index
                })
            }catch(e){
                console.log(e)
            }
        },
        plusIndex (index) {
            return index + this.imageUpdate.length
        }
    },
    template: `<div class="items-center justify-center w-full h-100 text-center align-middle">
                    {{setUpdateImages}}
                    <button :disabled="imageData.length >= maxImages" class="btn btn-outline-info rounded" @click="selectImage"><i class="far fa-images"></i> เพิ่มรูปภาพ ({{countImages}} รูป)</button>
                    <small v-if="$store.getters.countImages < 0" class="text-danger"><br/>จำนวนของรูปเกินกว่าที่กำหนดไว้ ({{maxImages}} รูป)</small>
                    <span v-if="imageData.length > 0">
                        <div :class="[$store.getters.countImages < 0 ? Class.borderDanger : '']" class="row border rounded mt-2">
                            <div v-for="(image, index) in imageData" class="col-md-3">
                                <button class="btn btn-sm btn-danger btn-remove-images" @click="removePreviewImage(plusIndex(index))" title="ลบรูปภาพ"><i class="fas fa-times"></i></button>
                                <img :src="image" class="w-100 bg-white border border-info rounded my-2">
                            </div>
                        </div>
                    </span>
                    <span v-if="$store.getters.countImages <= maxImages">
                        <div v-if="imageUpdate.length > 0" class="row mt-2">
                            <div v-for="(image, index) in imageUpdate" class="col-md-3">
                                <button class="btn btn-sm btn-danger btn-remove-images" @click="removeUpdateImage(image.id, index)" title="ลบรูปภาพ"><i class="fas fa-times"></i></button>
                                <img :src="image.image.url" class="w-100 bg-white border border-secondary rounded my-2">
                                <button :disabled="$store.getters.countImages < 0" :class="[$store.getters.countImages < 0 ? Class.btnSecondary : '', defaultImage === index ? Class.isdefault : Class.btnLight]" class="btn btn-sm btn-default-images" @click="setDefaultImage(image.id, index)" title="ตั้งเป็นภาพหลัก"><i class="fas fa-image"></i></button>
                            </div>
                        </div>
                        <div v-if="$store.getters.countImages === maxImages" class="row">
                            <div class="col-md-12">
                                <p class="mt-4 text-muted mb-0">ยังไม่ได้เลือกรูปภาพ...</p>
                                <small class="text-muted">ขนาดที่กำหนดไว้ 800 x 500 px (ถ้าขนาดใหญ่กว่าที่กำหนดรูปจะถูกตัดอัตโนมัติ)</small><br/>
                                <small class="text-muted">(กด Shift หรือ Ctrl ค้างไว้ตอนเลือกรูป เพื่อเลือกทีละหลายๆรูป...)</small>
                            </div>
                        </div>
                    </span>
                    {{ saveImages }}
                    <input type="file" id="fileUpload" ref="file" @change="previewImage" multiple hidden>
                    <div v-if="$store.getters.countImages != maxImages" class="row mt-3">
                        <div class="col-md-12">
                            <small class="text-muted">ขนาดที่กำหนดไว้ 800 x 500 px (ถ้าขนาดใหญ่กว่าที่กำหนดรูปจะถูกตัดอัตโนมัติ)</small><br/>
                            <small class="text-muted">(กด Shift หรือ Ctrl ค้างไว้ตอนเลือกรูป เพื่อเลือกทีละหลายๆรูป...)</small>
                        </div>
                        <div class="col-md-12 mt-1">
                            <button class="btn btn-sm btn-info" style="padding: 0 5px;"><i class="fas fa-image"></i></button> <small class="text-muted"> = ตั้งเป็นรูปภาพหลัก (ถ้ามีการอัพโหลดรูปใหม่จะต้อง "อัพเดทประกาศ" ก่อน ถึงจะเลือกรูปภาพหลักได้)</small>
                        </div>
                    </div>
                    <slot v-if="showModal">
                        <transition name="modal">
                            <div class="modal-mask">
                            <div class="modal-wrapper">
                                <div class="modal-container">
                    
                                <div class="modal-header">
                                    <div class="row" style="width: 100%;">
                                        <div class="col-md-1 offset-11 text-right">
                                            <i class="far fa-times-circle" @click="showModal = false" style="cursor: pointer;"></i>
                                        </div>
                                    </div>
                                </div>
                    
                                <div class="modal-body">
                                    <slot name="body">ยืนยันการลบ?</slot>
                                </div>
                    
                                <div class="modal-footer">
                                    <slot name="footer">
                                        <button class="btn btn-secondary" @click="showModal = false">ยกเลิก</button>
                                        <button class="btn btn-danger" @click="confirmedRemoveImage">ยืนยัน</button>
                                    </slot>
                                </div>
                                </div>
                            </div>
                            </div>
                        </transition>
                    </slot>
                </div>`
}