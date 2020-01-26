$(document).ready(function () {

    $("#frm_detail").validate({
        rules:
                {
                    name: {
                        required: true
                    },
                    price: {
                        required: true
                    },
                    startdate: {
                        required: true
                    }

                },
        messages:
                {
                    name: {
                        required: "กรุณาระบุหัวข้อประกาศ"
                    },
                    price: {
                        required: "กรุณาระบุราคา"
                    },
                    startdate: {
                        required: "กรุณาระบุวันที่เริ่มประกาศ"
                    }
                },

        // Do not change code below
        errorPlacement: function (error, element)
        {
            error.insertAfter(element);
        }
    });
    
    $("#frm_address").validate({
        rules:
                {
                    province_id:{
                        required: true
                    },
                    district_id:{
                        required: true
                    },
                    subdistrict_id:{
                        required: true
                    },
                    address1:{
                        required: true
                    }

                },
        messages:
                {
                    province_id:{
                        required: "กรุณาระบุจังหวัด"
                    },
                    district_id:{
                        required: "กรุณาระบุอำเภอ"
                    },
                    subdistrict_id:{
                        required: "กรุณาระบุตำบล"
                    },
                    address1:{
                        required: "กรุณาระบุที่อยู่"
                    }

                },

        // Do not change code below
        errorPlacement: function (error, element)
        {
            error.insertAfter(element);
        }
    });
});
