<div class="g-max-width-645 text-center g-pt-50 mx-auto g-mb-20">
    <h1 class="mb-0 g-color-primary" id="l_title">สมัครสมาชิก</h1>
</div>
<div class="container g-pb-30">
    <?= $this->element('alert') ?>
    <div class="row">
        <div class="col-md-12">
            <form class="g-mb-30" id="frm">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <input class="form-control rounded-0 g-py-13 g-px-15" type="text" placeholder="ชื่อ" name="firstname" id="firstname">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <input class="form-control rounded-0 g-py-13 g-px-15" type="text" placeholder="นามสกุล" name="lastname" id="lastname">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <input class="form-control rounded-0 g-py-13 g-px-15" type="email" placeholder="อีเมล์" name="email" id="email">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <input class="form-control rounded-0 g-py-13 g-px-15" type="text" placeholder="เบอร์โทร" name="phone" id="phone">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <input class="form-control rounded-0 g-py-13 g-px-15" type="password" placeholder="รหัสผ่าน" name="password" id="password">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <input class="form-control rounded-0 g-py-13 g-px-15" type="password" placeholder="ยืนยันรหัสผ่าน" name="confirmpassword" id="confirmpassword">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <div class="form-check">
                            <label class="form-check-label g-mb-10">
                                <input type="checkbox" class="form-check-input mr-1" name="accept" id="accept" value="Y">ยอมรับข้อตกลงและเงื่อนไขการใช้บริการเว็บไซต์ <a href="<?=SITE_URL?>register/rule" target="_blank">อ่านข้อตกลง</a>
                            </label>
                        </div>
                        <div class="form-check">
                            <label class="form-check-label g-mb-20">
                                <input type="checkbox" class="form-check-input mr-1" name="issubscription" id="issubscription" checked="checked" value="Y">ต้องการรับข่าวสารออนไลน์ผ่านทางอีเมล์
                            </label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2 offset-md-5">
                        <button class="btn btn-block u-btn-primary g-color-white rounded-0 g-px-25 g-py-15" type="button" id="bt_submit">สมัครสมาชิก</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<?= $this->Html->script('register/validation.js') ?>
<?=
$this->Html->script('register/register.js')?>