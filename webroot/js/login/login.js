$(document).ready(function () {
    $('#bt_submit').on('click', function () {
        if ($('#frm').valid()) {
            var formdata = $("#frm").serialize();
            $('#page-load').show();
            $.post(apiurl + 'api-authen/login', formdata).done(function (res) {
                res = JSON.parse(res);
                // console.log(res);


                if (res.status === 200) {
                    $('#user_id').val(res.user.id);
                    localStorage.setItem('MAPCII_USER', res.user.id);
                    $('#verifycode').val(res.verifycode);
                    $('#frmverify').submit();
                } else {
                    $('#page-load').hide();
                    swal('ไม่สำเร็จ', res.message, 'error');
                }
            });
        }
    });
});