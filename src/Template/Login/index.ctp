<div class="g-max-width-645 text-center g-pt-50 mx-auto g-mb-20">
    <h1 class="mb-0">Welcome back!</h1>
</div>
<div class="container g-pb-30">
    <div class="row justify-content-center">
        <div class="col-md-5 text-center g-mb-70">

            <fb:login-button 
                scope="public_profile,email"
                onlogin="checkLoginState();" data-size="large" data-button-type="login_with" data-use-continue-as="true">
            </fb:login-button>

            <h2 class="h5">หรือเข้าสู่ระบบด้วยอีเมล์</h2>

            <form class="g-mb-30" id="frm">
                <div class="g-mb-20">
                    <input class="form-control rounded-0 g-py-13 g-px-15" type="email" placeholder="Email Address" name="email" id="email">
                </div>
                <div class="g-mb-20">
                    <input class="form-control rounded-0 g-py-13 g-px-15" type="password" placeholder="Enter your Password" name="password" id="password">
                    <span toggle="#password" class="fa fa-fw fa-eye field-icon toggle-password" title="แสดงรหัสผ่าน"></span>
                </div>
                <?= $this->Form->hidden('name', ['id' => 'name']) ?>
                <?= $this->Form->hidden('facebookid', ['id' => 'facebookid']) ?>
                <?= $this->Form->hidden('isfacebook', ['id' => 'isfacebook', 'value' => 'N']) ?>
                <button class="btn btn-block u-btn-primary g-color-white g-bg-primary-dark-v1--hover rounded-0 g-px-25 g-py-15" type="button" id="bt_submit">เข้าสู่ระบบ</button>
            </form>

            <?= $this->Form->create('login', ['id' => 'frmverify']) ?>
            <?= $this->Form->hidden('user_id', ['id' => 'user_id']) ?>

            <?= $this->Form->hidden('verifycode', ['id' => 'verifycode']) ?>
            <?= $this->Form->end() ?>

            <div class="d-flex justify-content-between g-mb-10">
                <?= $this->Html->link('สมัครสมาชิก', ['controller' => 'register'], ['class' => 'd-block g-mb-10']) ?>
                <?= $this->Html->link('ลืมรหัสผ่าน?', ['controller' => 'forgetpassword'], ['class' => 'd-block g-mb-10']) ?>
            </div>


        </div>
    </div>
</div>

<style>
.field-icon {
  float: right;
  margin-right: 10px;
  margin-top: -30px;
  position: relative;
  z-index: 2;
}
</style>

<?= $this->Html->script('login/validation.js') ?>
<?= $this->Html->script('login/login.js') ?>


<script>
    window.fbAsyncInit = function () {
        FB.init({
            appId: '445868615942274',
            cookie: true,
            xfbml: true,
            version: 'v3.2'
        });

        FB.AppEvents.logPageView();

    };

    function checkLoginState() {
        FB.getLoginStatus(function (response) {
            //statusChangeCallback(response);
            //console.log(response);
            //getProfile(response.authResponse.userID);
            FB.api(
                    response.authResponse.userID,
                    function (response) {
                        //console.log(response);
                        if (response && !response.error) {
                            /* handle the result */
                            $('#name').val(response.name);
                            $('#facebookid').val(response.id);


                            $('#isfacebook').val('Y');
                            var formdata = $("#frm").serialize();
                            $('#page-load').show();
                            $.post({
                                url: apiurl + 'api-authen/login',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    //'Accept': 'application/json'
                                },
                                data: formdata
                            }).done(function (res) {
                                res = JSON.parse(res);
                                // console.log(res);


                                if (res.status === 200) {
                                    $('#user_id').val(res.user.id);
                                    $('#verifycode').val(res.verifycode);
                                    $('#frmverify').submit();
                                } else {
                                    $('#page-load').hide();
                                    swal('ไม่สำเร็จ', res.message, 'error');
                                }
                            });

                        }
                    }
            );


        });

    }

    function getProfile(userID) {
        FB.api(
                userID,
                function (response) {
                    console.log(response);
                    if (response && !response.error) {
                        /* handle the result */
                        $('#name').val(response.name);
                        $('#facebookid').val(response.id);
                    }
                }
        );
    }



    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    $(".toggle-password").click(function() {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

</script>

<div id="fb-root"></div>
