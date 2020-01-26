$(document).ready(function () {
    $('#bt_save').on('click', function () {
        if ($('#frm_message').valid()) {

            var formdata = $("#frm_message").serialize();
            $('#page-load').show();
            $.post(apiurl + 'api-messages/create', formdata).done(function (res) {
                res = JSON.parse(res);
                console.log(res);
                if (res.status === 200) {
                    success('บันทึกแล้ว');

                } else {
                    error('มีปัญหาในการบันทึก');
                    console.log(res);
                }
                location.reload();
                $('#page-load').hide();
            });

        }
    });
});