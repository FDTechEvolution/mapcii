export const userDisplay = {
    props: ['userDisplay', 'loading'],
    data () {
        return {
            imageData: '',
            profile: {
                displayname : ''
            },
            clickEdit: {
                displayname: false
            },
            dloading: {
                displayname: false,
                displayimage: false
            }
        }
    },
    computed: {
        userImageDisplay () {
            if(!this.loading){
                return this.userDisplay.image_id === null ? siteurl + 'img/mapcii_avatar.png' : this.userDisplay.image.url
            }
        },
        userDisplayName () {
            this.profile.displayname = this.userDisplay.username !== null ? this.userDisplay.username : this.userDisplay.firstname
        }
    },
    methods: {
        editDisplayName () {
            this.clickEdit.displayname = true
        },
        saveDisplayName () {
            this.dloading.displayname = true
            this.saveUserDisplayName()
            this.clickEdit.displayname = false
        },
        saveUserDisplayName () {
            try {
                let formData = new FormData()
                formData.append('username' , document.getElementById('displayname').value)
                axios.post(apiurl + 'api-users/update?id=' + user_id, formData , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    if(response.data.status === 200) {
                        this.$store.dispatch('getUserProfiles')
                        this.dloading.displayname = false
                    }else{
                        console.log(response)
                    }
                })
            }catch(e){
                console.log(e)
            }
        },
        selectImage () {
            document.getElementById("fileUpload").click()
        },
        previewImage: function(event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
        },
        clearIMageUpload () {
            this.imageData = ''
        },
        saveImageUpload () {
            this.dloading.displayimage = true
            try{
                let formData = new FormData()
                formData.append('image_id', this.$refs.file.files[0])
                axios.post(apiurl + 'api-users/update-profile-image?id=' + user_id, formData , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    this.$store.dispatch('getUserProfiles')
                    this.dloading.displayimage = false
                    this.imageData = ''
                })
            }catch(e){
                console.log(e)
            }
        }
    },
    template: `<div class="card-body rounded mb-4" style="background: #C3EBFF;">
                    {{ userDisplayName }}
                    <div class="row">
                        <div class="col-lg-3 col-sm-12 text-center">
                            <span v-if="imageData.length > 0">
                                <img :src="imageData" class="g-width-100 bg-white rounded">
                                <span class="btn-edit-profile-img">
                                    <slot v-if="!dloading.displayimage">
                                        <button class="btn btn-sm btn-success" @click="saveImageUpload"><i class="fas fa-check"></i></button> 
                                        <button class="btn btn-sm btn-secondary" @click="clearIMageUpload"><i class="fas fa-times"></i></button>
                                    </slot>
                                    <slot v-else>
                                        <div class="loadingio-spinner-gear-3cymlqns1bn text-center">
                                            <div class="ldio-mlvdh911kas">
                                                <div><div></div><div></div><div></div>
                                                <div></div><div></div><div></div></div>
                                            </div>
                                        </div>
                                    </slot>
                                </span>
                            </span>
                            <span v-else>
                                <img :src="userImageDisplay" class="g-width-100 bg-white rounded">
                                <button class="btn btn-sm btn-secondary rounded-circle border border-white btn-edit-profile-img" @click="selectImage"><i class="fas fa-pencil-alt" style="font-size: 12px;"></i></button>
                            </span>
                            <input type="file" id="fileUpload" ref="file" @change="previewImage" hidden>
                        </div>
                        <div class="col-lg-9 col-sm-12 mt-2 pl-3 col-display-on-mobile">
                            <p class="mb-0">หมายเลขสมาชิก</p>
                            <h1 style="line-height: 1;letter-spacing: 1.5px;">{{ userDisplay.usercode }}</h1>
                            <p class="d-flex"><strong class="mt-2 strong-display-on-mobile">DisplayName :</strong> 
                                <input v-if="!clickEdit.displayname" type="text" class="form-control-plaintext w-50 rounded px-2" style="margin-top: 1px;" id="displayname" v-model="profile.displayname" readonly> 
                                <input v-else type="text" class="form-control w-50 rounded px-2" style="margin-top: 1px;" id="displayname" v-model="profile.displayname" placeholder="กรุณาระบุ">
                                <span v-if="!dloading.displayname">
                                    <button v-if="!clickEdit.displayname" class="btn btn-sm btn-outline-info ml-2 mt-1" @click="editDisplayName">แก้ไข</button>
                                    <button v-else class="btn btn-sm btn-info ml-2 mt-1" @click="saveDisplayName">ยืนยัน</button>
                                </span>
                                <span v-else>
                                    <div class="loadingio-spinner-gear-3cymlqns1bn text-center">
                                        <div class="ldio-mlvdh911kas">
                                            <div><div></div><div></div><div></div>
                                            <div></div><div></div><div></div></div>
                                        </div>
                                    </div>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>`
}