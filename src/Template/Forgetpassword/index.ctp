<div class="row justify-content-center g-pt-50">
    <div class="col-sm-7 col-md-6 col-lg-4 text-center g-mb-70">
        <h2 class="h4 mb-4">ลืมรหัสผ่าน?</h2>
        <p>กรุณาระบุ email แล้วเราจะส่ง link สำหรับตั้งค่ารหัสใหม่</p>
        <form class="g-mb-30" id="frm_forgot">
            <div class="g-mb-20">
                <input class="form-control g-color-black g-bg-white g-bg-white--focus g-brd-gray-light-v3 g-brd-primary--hover rounded-0 g-py-13 g-px-15" type="email" name="email" id="email" placeholder="Email Address">
            </div>
            <?= $this->element('alert') ?>
            <button id="bt_submit" class="btn btn-block u-btn-primary g-color-white g-bg-primary-dark-v1--hover g-font-weight-600 g-font-size-12 text-uppercase rounded-0 g-px-25 g-py-15" type="button">Reset Password</button>
        </form>
        <?= $this->Html->link('ยกเลิก', ['controller' => 'login'], ['class' => 'd-block g-mb-10']) ?>
    </div>
</div>
<script>
    $(document).ready(function () {
        $('#bt_submit').on('click', function () {
            var email = $('#email').val();
            $.post(apiurl + 'api-authen/forgot', {email: email}).done(function (res) {
                res = JSON.parse(res);
                if (res.status == 200) {
                    $('#bt_submit').hide();
                    success('เรียบร้อยแล้ว กรุณาตรวจสอบ email ของท่าน');
                }
            });
        });
    });
</script>