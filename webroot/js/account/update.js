
$(document).ready(function () {
    $.get(apiurl + 'api-users/user?id=' + user_id).done(function (res) {
        res = JSON.parse(res);
        console.log(res);
        setFormJsonData(res.data);
    });

    $('#bt_submit').on('click', function () {
        var formdata = $("#frm_user").serialize();
        $('#page-load').show();
        $.post(apiurl + 'api-users/update?id=' + user_id, formdata).done(function (res) {
            res = JSON.parse(res);
            //console.log(res);
            if (res.status === 200) {
                success('บันทึกแล้ว');
            } else {
                error('มีปัญหาในการบันทึก');
                console.log(res);
            }
            $('#page-load').hide();
        });
    });
});