$(document).ready(function () {
    
    
    $("#frm").validate({
        rules:
                {
                    email: {
                        required: true
                    },
                    password: {
                        required: true
                    }

                },

        // Messages for form validation
        messages:
                {
                    email: {
                        required: "กรุณาระบุอีเมล์"
                    },
                    password: {
                        required: "กรุณาระบุรหัสผ่าน"
                    }

                },

        // Do not change code below
        errorPlacement: function (error, element)
        {
            error.insertAfter(element);
        }
    });
});