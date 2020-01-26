<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="container-fluid g-py-50">
            <h1 class="h2 mb-0 prompt-600">บัญชีของฉัน</h1>
            <p>แก้ไขข้อมูลส่วนตัว</p>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-9 order-lg-2 g-mb-70">
            <?= $this->element('alert') ?>
            <div class="row">
                <div class="col-md-12">
                    <form class="g-mb-30" id="frm_user">
                        
                        <div class="row">
                            <div class="col-md-12 text-right">
                                <div class="form-group">
                                    <button class="btn u-btn-primary g-color-white rounded-0 " type="button" id="bt_submit">บันทึก</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="firstname">ชื่อ</label>
                                    <input class="form-control rounded-0" type="text" placeholder="ชื่อ" name="firstname" id="firstname">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="lastname">นามสกุล</label>
                                    <input class="form-control rounded-0" type="text" placeholder="นามสกุล" name="lastname" id="lastname">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input class="form-control rounded-0" type="email" placeholder="อีเมล์" name="email" id="email">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="phone">เบอร์โทร</label>
                                    <input class="form-control rounded-0" type="text" placeholder="เบอร์โทร" name="phone" id="phone">
                                </div>
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
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> แก้ไขข้อมูลส่วนตัว', ['action' => 'update'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> เปลี่ยนรหัสผ่าน', ['action' => 'change-password'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> รายการ Package', ['action' => 'package'], ['escape' => false]) ?>                     
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
    var user_id = '<?= $user_id ?>';
</script>
<?= $this->Html->script('form.js') ?>
<?= $this->Html->script('account/update.js')?>