export const AssetAnnounceImages = {
    data () {
        return {
            imageData: [],
            imageRef: [],
            maxImages: 10,
            defaultImage: null,
            Class: {
                btnSecondary: 'btn-secondary',
                btnInfo: 'btn-info',
                btnDanger: 'btn-danger',
                btnWarning: 'btn-warning',
                btnLight: 'btn-light',
                borderDanger: 'border-danger'
            }
        }
    },
    computed: {
        countImages () {
            let countData = this.imageData.length ? this.imageData.length : 0
            let maxData = this.maxImages
            let payload = {maxData, countData}
            this.$store.dispatch('checkImagegCountData', payload)
            return this.$store.getters.countImages
        },
        saveImages () {
            this.$store.dispatch('saveImages', this.imageRef)
            this.$store.dispatch('setDefaultImage', this.defaultImage)
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
            if(this.defaultImage === index) this.defaultImage = null
            this.imageData.splice(index, 1)
            this.imageRef.splice(index, 1)
            this.defaultImage = index < this.defaultImage ? this.defaultImage -1 : this.defaultImage
        },
        setDefaultImage (index) {
            this.defaultImage = index
        }
    },
    template: `<div class="items-center justify-center w-full h-100 text-center align-middle">
                    <button :disabled="imageData.length >= maxImages" class="btn btn-outline-info rounded" @click="selectImage"><i class="far fa-images"></i> เพิ่มรูปภาพ ({{countImages}} รูป)</button>
                    <small v-if="$store.getters.countImages < 0" class="text-danger"><br/>จำนวนของรูปเกินกว่าที่กำหนดไว้ ({{maxImages}} รูป)</small>
                    <span v-if="imageData.length > 0">
                        <div :class="[$store.getters.countImages < 0 ? Class.borderDanger : '']" class="row border rounded mt-2">
                            <div v-for="(image, index) in imageData" class="col-md-3">
                                <button class="btn btn-sm btn-danger btn-remove-images" @click="removePreviewImage(index)" title="ลบรูปภาพ"><i class="fas fa-times"></i></button>
                                <img :src="image" class="w-100 bg-white rounded py-2">
                                <button :disabled="$store.getters.countImages < 0" :class="[$store.getters.countImages < 0 ? Class.btnSecondary : '', defaultImage === index ? Class.btnInfo : Class.btnLight]" class="btn btn-sm btn-default-images" @click="setDefaultImage(index)" title="ตั้งเป็นภาพหลัก"><i class="fas fa-image"></i></button>
                            </div>
                        </div>
                    </span>
                    <span v-if="$store.getters.countImages === maxImages">
                        <p class="mt-4 text-muted mb-0">ยังไม่ได้เลือกรูปภาพ...</p>
                    </span>
                    {{ saveImages }}
                    <input type="file" id="fileUpload" ref="file" @change="previewImage" multiple hidden>
                    <small class="text-muted">ขนาดที่กำหนดไว้ 800 x 500 px (ถ้าขนาดใหญ่กว่าที่กำหนดรูปจะถูกตัดอัตโนมัติ)</small><br/>
                    <small class="text-muted">(กด Shift หรือ Ctrl ค้างไว้ตอนเลือกรูป เพื่อเลือกทีละหลายๆรูป...)</small><hr class="mt-1 mb-1">
                    <small class="text-muted"><button class="btn btn-sm btn-info" style="padding: 0 5px;"><i class="fas fa-image"></i></button> = ตั้งเป็นรูปภาพหลัก</small>
                </div>`
}