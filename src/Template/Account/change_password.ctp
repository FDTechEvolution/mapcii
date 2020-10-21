<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="container-fluid g-py-50">
            <h1 class="h2 mb-0 prompt-600">บัญชีของฉัน</h1>
            <p>เปลี่ยนรหัสผ่าน</p>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-9 order-lg-2 g-mb-70">
            <div class="row" id="changepassword">
                <div class="col-8">
                    <form class="g-mb-30" id="frm">
                        <div class="g-mb-20">
                            <input v-model="newpassword" class="form-control rounded-2 g-py-10 g-px-10" type="password" placeholder="รหัสผ่านใหม่" name="newpassword" id="newpassword">
                        </div>
                        <div class="g-mb-20">
                            <input v-model="confirmpassword" class="form-control rounded-2 g-py-10 g-px-10" type="password" placeholder="ยืนยันรหัสผ่านใหม่" name="confirmpassword" id="confirmpassword">
                        </div>
                        <div class="row">
                            <div class="col-4"></div>
                            <div class="col-4">
                                <button class="btn btn-block u-btn-primary g-color-white g-bg-primary-dark-v1--hover rounded-2 g-px-25 g-py-10" type="button" id="bt_submit" @click="checkNewPassword()">เปลี่ยนรหัสผ่าน</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-5 col-lg-3 order-lg-1 g-mb-70">
            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <ul class="list-unstyled g-font-weight-500 mb-0">
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> แก้ไขข้อมูลส่วนตัว', ['action'=>'update'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> เปลี่ยนรหัสผ่าน', ['action'=>'change-password'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> รายการลงโฆษณา', ['action'=>'package'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> รายการลงประกาศฟรี', ['controller' => 'myassets'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> รายการสินทรัพย์ที่ชอบ', ['action'=>'asset-fav'], ['escape' => false,'class'=>'g-color-primary--active']) ?>                     
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    new Vue ({
        el: '#changepassword',
        data() {
            return {
                newpassword: '',
                confirmpassword: '',
                notice: ''
            }
        },
        methods: {
            checkNewPassword () {
                if(this.newpassword === '' || this.confirmpassword === ''){
                    alert('กรุณากรอกข้อมูลให้ครบถ้วน...')
                }else{
                    if(this.newpassword !== this.confirmpassword) {
                        alert('รหัสผ่านไม่ตรงกัน...')
                    }else{
                        this.changePassword()
                    }
                }
            },
            changePassword () {
                let formData = new FormData()
                formData.append('id', localStorage.getItem('MAPCII_USER'))
                formData.append('old', this.oldpassword)
                formData.append('new', this.newpassword)

                axios.post(apiurl + 'api-authen/ischangepassword', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    // console.log(response)
                    if(response.status === 200) {
                        alert('Complete...')
                        this.oldpassword = ''
                        this.newpassword = ''
                        this.confirmpassword = ''
                    }
                })
                .catch(e => {
                    console.log(e)
                })
            }
        }
    })
</script>