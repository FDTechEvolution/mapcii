export const userChangePassword = {
    props: [],
    data () {
        return {
            type: {
                oldPassword: 'password',
                newPassword: 'password',
                confirmPassword: 'password'
            },
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    },
    methods: {
        showPassword (point) {
            switch(point) {
                case 'oldPassword':
                    this.type.oldPassword = this.type.oldPassword === 'password' ? 'text' : 'password'
                    break
                case 'newPassword':
                    this.type.newPassword = this.type.newPassword === 'password' ? 'text' : 'password'
                    break
                case 'confirmPassword':
                    this.type.confirmPassword = this.type.confirmPassword === 'password' ? 'text' : 'password'
                    break
            }
        },
        checkNewPassword () {
            if(this.oldPassword === '' || this.newPassword === '' || this.confirmPassword === ''){
                alert('กรุณากรอกข้อมูลให้ครบถ้วน...')
            }else{
                if(this.newPassword !== this.confirmPassword) {
                    alert('รหัสผ่านไม่ตรงกัน...')
                }else{
                    this.changePassword()
                }
            }
        },
        changePassword () {
            try{
                let formData = new FormData()
                formData.append('id', user_id)
                formData.append('old', this.oldPassword)
                formData.append('new', this.newPassword)

                axios.post(apiurl + 'api-authen/ischangepassword', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    if(response.data.status === 200) {
                        alert('เปลี่ยนรหัสผ่านเรียบร้อยแล้ว...')
                    }else{
                        alert('เกิดข้อผิดพลาดเกี่ยวกับรหัสผ่านเดิม กรุณาตรวจสอบอีกครั้ง...')
                    }
                })
                .finally(() => {
                    this.oldPassword = ''
                    this.newPassword = ''
                    this.confirmPassword = ''
                })
            }catch(e) {
                console.log(e)
            }
        }
    },
    template: `<div class="card-body row">
                    <div class="col-4 text-right">
                        <h4 class="mb-0">เปลี่ยนรหัสผ่าน</h4>
                        <p class="text-info">(Password)</p>
                    </div>
                    <div class="col-8 border-left">
                        <div class="mb-2">
                            <label class="mb-0" for="oldPassword">รหัสผ่านเดิม</label>
                            <input v-model="oldPassword" class="form-control ml-2" :type="type.oldPassword" id="oldPassword">
                            <span @click="showPassword('oldPassword')" :class="type.oldPassword === 'password' ? 'fa fa-fw fa-eye' : 'fa-eye fa-eye-slash'" class="fa fa-fw fa-eye field-icon"></span>
                        </div>
                        <div class="mb-2">
                            <label class="mb-0" for="newPassword">รหัสผ่านใหม่</label>
                            <input v-model="newPassword" class="form-control ml-2" :type="type.newPassword" id="newPassword">
                            <span @click="showPassword('newPassword')" :class="type.newPassword === 'password' ? 'fa fa-fw fa-eye' : 'fa-eye fa-eye-slash'" class="fa fa-fw fa-eye field-icon"></span>
                        </div>
                        <div class="mb-4">
                            <label class="mb-0" for="confirmPassword">ยืนยันรหัสผ่านใหม่</label>
                            <input v-model="confirmPassword" class="form-control ml-2" :type="type.confirmPassword" id="confirmPassword">
                            <span @click="showPassword('confirmPassword')" :class="type.confirmPassword === 'password' ? 'fa fa-fw fa-eye' : 'fa-eye fa-eye-slash'" class="fa fa-fw fa-eye field-icon"></span>
                        </div>
                        <div class="text-right">
                            <button class="btn btn-sm btn-outline-info ml-3" @click="checkNewPassword">แก้ไขรหัสผ่าน</button>
                        </div>
                    </div>
                </div>`
}