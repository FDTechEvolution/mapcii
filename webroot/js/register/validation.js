function validatePassword() {
    var password = $('#password').val();
    var confirmPassword = $('#confirmpassword').val();
    if (password === confirmPassword) {
        console.log('password is match.');
        return true;
    }
    swal("ข้อมูลไม่ถูกต้อง", "ยืนยันรหัสผ่านไม่ตรงกัน", "error");
    console.log('password is not match.');
    return false;
}
function validateAccept() {
    if ($('#accept').is(":checked")) {
        return true;
    } else {
        swal("ยอมรับข้อตกลงและเงื่อนไขการใช้บริการเว็บไซต์", "", "error");
        //console.log('password is not match.');
        return false;
    }
}

$(document).ready(function () {


    $("#frm").validate({
        rules:
                {
                    firstname: {
                        required: true
                    },
                    lastname: {
                        required: true
                    },
                    email: {
                        required: true
                    },
                    phone: {
                        required: true
                    },
                    password: {
                        required: true
                    },
                    confirmpassword: {
                        required: true
                    },

                },

        // Messages for form validation
        messages:
                {
                    firstname: {
                        required: "กรุณาระบุชื่อจริง"
                    },
                    lastname: {
                        required: "กรุณาระบุนามสกุล"
                    },
                    email: {
                        required: "กรุณาระบุอีเมล์"
                    },
                    phone: {
                        required: "กรุณาระบุหมายเลขโทรศัพท์"
                    },
                    password: {
                        required: "กรุณาระบุรหัสผ่าน"
                    },
                    confirmpassword: {
                        required: "กรุณายืนยันรหัสผ่าน"
                    },

                },

        // Do not change code below
        errorPlacement: function (error, element)
        {
            error.insertAfter(element);
        }
    });
});