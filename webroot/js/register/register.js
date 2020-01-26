$(document).ready(function () {
    $('#bt_submit').on('click', function () {
        if ($('#frm').valid()) {
            if (validatePassword() && validateAccept()) {
                var formdata = $("#frm").serialize();
                $('#page-load').show();
                $.post(apiurl + 'api-users/register', formdata).done(function (res) {
                    res = JSON.parse(res);
                    console.log(res);
                    $('#page-load').hide();

                    if (res.status === 200) {
                        $('#frm').hide();
                        swal("สมัครเรียบร้อยกรุณายืนยันตัวตนในอีเมล์")
                                .then((value) => {
                                    window.location.href = siteurl+'login';
                                });
                    }else{
                        error(res.message);
                    }
                });
            }
        }
    });
});