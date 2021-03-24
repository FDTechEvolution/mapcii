export const userProfile = {
    props: ['userProfile'],
    data () {
        return {
            profile: {
                firstname: '',
                lastname: '',
                phone: '',
                email: '',
                lineid: '',
                facebook: ''
            },
            clickEdit: {
                firstname: false,
                lastname: false,
                phone: false,
                email: false,
                lineid: false,
                facebook: false
            },
            loading: {
                firstname: false,
                lastname: false,
                phone: false,
                email: false,
                lineid: false,
                facebook: false
            }
        }
    },
    computed: {
        checkNullData () {
            this.clickEdit.phone = this.userProfile.phone !== null ? false : true
            this.clickEdit.email = this.userProfile.email !== null ? false : true
            this.clickEdit.lineid = this.userProfile.lineid !== null ? false : true
            this.clickEdit.facebook = this.userProfile.facebook !== null ? false : true
        },
        setProfile () {
            this.profile.firstname = this.userProfile.firstname
            this.profile.lastname = this.userProfile.lastname
            this.profile.phone = this.userProfile.phone
            this.profile.email = this.userProfile.email
            this.profile.lineid = this.userProfile.lineid
            this.profile.facebook = this.userProfile.facebook
        }
    },
    methods: {
        editProfile (edit) {
            switch(edit) {
                case 'firstname':
                    this.clickEdit.firstname = true
                    break
                case 'lastname':
                    this.clickEdit.lastname = true
                    break
                case 'phone':
                    this.clickEdit.phone = true
                    break
                case 'email':
                    this.clickEdit.email = true
                    break
                case 'lineid':
                    this.clickEdit.lineid = true
                    break
                case 'facebook':
                    this.clickEdit.facebook = true
                    break
            }
        },
        saveProfile (save) {
            switch(save) {
                case 'firstname':
                    if(document.getElementById(save).value == '') {
                        alert('กรุณากรอกข้อมูล...')
                    }else{
                        this.loading.firstname = true
                        this.saveUserProfile(save)
                        this.clickEdit.firstname = false
                    }
                    break
                case 'lastname':
                    if(document.getElementById(save).value == '') {
                        alert('กรุณากรอกข้อมูล...')
                    }else{
                        this.loading.lastname = true
                        this.saveUserProfile(save)
                        this.clickEdit.lastname = false
                    }
                    break
                case 'phone':
                    if(document.getElementById(save).value == '') {
                        alert('กรุณากรอกข้อมูล...')
                    }else{
                        this.loading.phone = true
                        this.saveUserProfile(save)
                        this.clickEdit.phone = false
                    }
                    break
                case 'email':
                    if(document.getElementById(save).value == '') {
                        alert('กรุณากรอกข้อมูล...')
                    }else{
                        this.loading.email = true
                        this.saveUserProfile(save)
                        this.clickEdit.email = false
                    }
                    break
                case 'lineid':
                    if(document.getElementById(save).value == '') {
                        alert('กรุณากรอกข้อมูล...')
                    }else{
                        this.loading.lineid = true
                        this.saveUserProfile(save)
                        this.clickEdit.lineid = false
                    }
                    break
                case 'facebook':
                    if(document.getElementById(save).value == '') {
                        alert('กรุณากรอกข้อมูล...')
                    }else{
                        this.loading.facebook = true
                        this.saveUserProfile(save)
                        this.clickEdit.facebook = false
                    }
                    break
            }
        },
        saveUserProfile (saved) {
            try {
                let formData = new FormData()
                formData.append(saved , document.getElementById(saved).value)
                axios.post(apiurl + 'api-users/update?id=' + user_id, formData , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    if(response.data.status === 200) {
                        this.$store.dispatch('getUserProfiles')
                        this.loading.firstname = false
                        this.loading.lastname = false
                        this.loading.phone = false
                        this.loading.email = false
                        this.loading.lineid = false
                        this.loading.facebook = false
                    }else{
                        console.log(response)
                    }
                })
            }catch(e){
                console.log(e)
            }
        }
    },
    template: `<div>
                    <div class="card-body bg-transparent-8 rounded mb-4">
                        {{ checkNullData }} {{ setProfile }}
                        <div class="form-group row mb-2">
                            <label for="firstname" class="col-sm-2 col-form-label font-weight-bold text-right px-1 label-profile-on-mobile">ชื่อ</label>
                            <div class="col-sm-8 col-text-input-profile-on-mobile">
                                <input v-if="!clickEdit.firstname" type="text" class="form-control-plaintext rounded px-2" id="firstname" v-model="profile.firstname" readonly>
                                <input v-else type="text" class="form-control rounded px-2" id="firstname" v-model="profile.firstname" placeholder="กรุณาระบุ">
                            </div>
                            <div class="col-sm-2 text-center btn-profile-on-mobile">
                                <slot v-if="!loading.firstname">
                                    <button v-if="!clickEdit.firstname" class="btn btn-sm btn-outline-info" @click="editProfile('firstname')">แก้ไข</button>
                                    <button v-else class="btn btn-sm btn-info" @click="saveProfile('firstname')">ยืนยัน</button>
                                </slot>
                                <slot v-else>
                                    <div class="loadingio-spinner-gear-3cymlqns1bn text-center">
                                        <div class="ldio-mlvdh911kas">
                                            <div><div></div><div></div><div></div>
                                            <div></div><div></div><div></div></div>
                                        </div>
                                    </div>
                                </slot>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <label for="lastname" class="col-sm-2 col-form-label font-weight-bold text-right px-1 label-profile-on-mobile">นามสกุล</label>
                            <div class="col-sm-8 col-text-input-profile-on-mobile">
                                <input v-if="!clickEdit.lastname" type="text" class="form-control-plaintext rounded px-2" id="lastname" v-model="profile.lastname" readonly>
                                <input v-else type="text" class="form-control rounded px-2" id="lastname" v-model="profile.lastname" placeholder="กรุณาระบุ">
                            </div>
                            <div class="col-sm-2 text-center btn-profile-on-mobile">
                                <slot v-if="!loading.lastname">
                                    <button v-if="!clickEdit.lastname" class="btn btn-sm btn-outline-info" @click="editProfile('lastname')">แก้ไข</button>
                                    <button v-else class="btn btn-sm btn-info" @click="saveProfile('lastname')">ยืนยัน</button>
                                </slot>
                                <slot v-else>
                                    <div class="loadingio-spinner-gear-3cymlqns1bn text-center">
                                        <div class="ldio-mlvdh911kas">
                                            <div><div></div><div></div><div></div>
                                            <div></div><div></div><div></div></div>
                                        </div>
                                    </div>
                                </slot>
                            </div>
                        </div>
                    </div>
                    <div class="card-body bg-transparent-8 rounded mb-2">
                        <div class="form-group row mb-0">
                            <label for="phone" class="col-sm-2 col-form-label font-weight-bold text-center pt-1 label-profile-on-mobile"><h4><i class="fa fa-mobile-alt text-dark"></i></h4></label>
                            <div class="col-sm-8 col-text-input-profile-on-mobile">
                                <input v-if="!clickEdit.phone" type="number" class="form-control-plaintext rounded px-2" id="phone" v-model="profile.phone" readonly>
                                <input v-else type="number" class="form-control rounded px-2" id="phone" v-model="profile.phone" placeholder="กรุณาระบุ">
                            </div>
                            <div class="col-sm-2 text-center btn-profile-on-mobile">
                                <slot v-if="!loading.phone">
                                    <button v-if="!clickEdit.phone" class="btn btn-sm btn-outline-info" @click="editProfile('phone')">แก้ไข</button>
                                    <button v-else class="btn btn-sm btn-info" @click="saveProfile('phone')">ยืนยัน</button>
                                </slot>
                                <slot v-else>
                                    <div class="loadingio-spinner-gear-3cymlqns1bn text-center">
                                        <div class="ldio-mlvdh911kas">
                                            <div><div></div><div></div><div></div>
                                            <div></div><div></div><div></div></div>
                                        </div>
                                    </div>
                                </slot>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <label for="email" class="col-sm-2 col-form-label font-weight-bold text-center pt-1 label-profile-on-mobile"><h4><i class="fa fa-envelope-open-text text-info"></i></h4></label>
                            <div class="col-sm-8 col-text-input-profile-on-mobile">
                                <input v-if="!clickEdit.email" type="email" class="form-control-plaintext rounded px-2" id="email" v-model="profile.email" readonly>
                                <input v-else type="email" class="form-control rounded px-2" id="email" v-model="profile.email" placeholder="กรุณาระบุ">
                            </div>
                            <div class="col-sm-2 text-center btn-profile-on-mobile">
                                <slot v-if="!loading.email">
                                    <button v-if="!clickEdit.email" class="btn btn-sm btn-outline-info" @click="editProfile('email')">แก้ไข</button>
                                    <button v-else class="btn btn-sm btn-info" @click="saveProfile('email')">ยืนยัน</button>
                                </slot>
                                <slot v-else>
                                    <div class="loadingio-spinner-gear-3cymlqns1bn text-center">
                                        <div class="ldio-mlvdh911kas">
                                            <div><div></div><div></div><div></div>
                                            <div></div><div></div><div></div></div>
                                        </div>
                                    </div>
                                </slot>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <label for="lineid" class="col-sm-2 col-form-label font-weight-bold text-center pt-1 label-profile-on-mobile"><h4><i class="fab fa-line text-success"></i></h4></label>
                            <div class="col-sm-8 col-text-input-profile-on-mobile">
                                <input v-if="!clickEdit.lineid" type="text" class="form-control-plaintext rounded px-2" id="lineid" v-model="profile.lineid" readonly>
                                <input v-else type="text" class="form-control rounded px-2" id="lineid" v-model="profile.lineid" placeholder="กรุณาระบุ">
                            </div>
                            <div class="col-sm-2 text-center btn-profile-on-mobile">
                                <slot v-if="!loading.lineid">
                                    <button v-if="!clickEdit.lineid" class="btn btn-sm btn-outline-info" @click="editProfile('lineid')">แก้ไข</button>
                                    <button v-else class="btn btn-sm btn-info" @click="saveProfile('lineid')">ยืนยัน</button>
                                </slot>
                                <slot v-else>
                                    <div class="loadingio-spinner-gear-3cymlqns1bn text-center">
                                        <div class="ldio-mlvdh911kas">
                                            <div><div></div><div></div><div></div>
                                            <div></div><div></div><div></div></div>
                                        </div>
                                    </div>
                                </slot>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <label for="facebook" class="col-sm-2 col-form-label font-weight-bold text-center pt-1 label-profile-on-mobile"><h4><i class="fa fa-facebook-square text-primary"></i></h4></label>
                            <div class="col-sm-8 col-text-input-profile-on-mobile">
                                <input v-if="!clickEdit.facebook" type="text" class="form-control-plaintext rounded px-2" id="facebook" v-model="profile.facebook" readonly>
                                <input v-else type="text" class="form-control rounded px-2" id="facebook" v-model="profile.facebook" placeholder="กรุณาระบุ">
                            </div>
                            <div class="col-sm-2 text-center btn-profile-on-mobile">
                                <slot v-if="!loading.facebook">
                                    <button v-if="!clickEdit.facebook" class="btn btn-sm btn-outline-info" @click="editProfile('facebook')">แก้ไข</button>
                                    <button v-else class="btn btn-sm btn-info" @click="saveProfile('facebook')">ยืนยัน</button>
                                </slot>
                                <slot v-else>
                                    <div class="loadingio-spinner-gear-3cymlqns1bn text-center">
                                        <div class="ldio-mlvdh911kas">
                                            <div><div></div><div></div><div></div>
                                            <div></div><div></div><div></div></div>
                                        </div>
                                    </div>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>`
}