function updateAssetStatus(){
    $('#page-load').show();
    var assetStatus = $('#bt_update_status').attr('data-value');
    console.log(assetStatus);
    $.post(apiurl+'api-assets/update?id='+asset_id,{status:assetStatus}).done(function(res){
        res = JSON.parse(res);
        console.log(res);
        location.reload();
    });
}

$(document).ready(function () {
    mapWithMarkerDraggable('map');

    //set asset type
    var asset_type_url = apiurl + 'api-assets/type';
    $('#page-load').show();
    $.get(asset_type_url).done(function (res) {
        var asset_types = JSON.parse(res);
        //console.log(asset_types.types);
        $.each(asset_types.types, function (key, item) {
            //console.log(item);
            $('#asset_type_id').append('<option value="' + item.id + '">' + item.name + '</option>');
        });
        $('#page-load').hide();
    });

    //set options
    var asset_option_url = apiurl + 'api-assets/option?type=faci';
    $.get(asset_option_url).done(function (res) {
        var options = JSON.parse(res);
        //console.log(asset_types.types);
        $.each(options.optionlist, function (key, item) {
            //console.log(item);
            var c = '<div class="col-3">';
            c += '<label class="form-check-label g-mb-20">';
            c += '<input type="checkbox" name="asset_option[][option_id]" class="form-check-input mr-1" value="' + item.id + '"><span></span>';
            c += item.name + '</label></div>';

            $('#div_fac').append(c);
        });


    });

    var asset_option_url = apiurl + 'api-assets/option?type=plac';
    $.get(asset_option_url).done(function (res) {
        var options = JSON.parse(res);
        //console.log(asset_types.types);
        $.each(options.optionlist, function (key, item) {
            //console.log(item);
            var c = '<div class="col-3">';
            c += '<label class="form-check-label g-mb-20">';
            c += '<input type="checkbox" name="asset_option[][option_id]" class="form-check-input mr-1" value="' + item.id + '"><span></span>';
            c += item.name + '</label></div>';

            $('#div_plac').append(c);
        });

    });

    //set default data
    $('#page-load').show();
    $.get(apiurl + 'api-assets/asset?id=' + asset_id).done(function (res) {
        var asset_detail_json = JSON.parse(res);
        var asset_json = asset_detail_json.detail;
        //set detail
        var asset_title = asset_json.name;
        if(asset_json.status =='DR'){
            $('#bt_update_status').text('ส่งข้อมูลการประกาศให้ admin');
            $('#bt_update_status').attr('data-value','WT');
            asset_title = '[ฉบับร่าง] '+asset_title;
        }else if(asset_json.status =='WT'){
            $('#l_status').text('ประกาศของท่านอยู่ในระหว่างการตรวจสอบข้อมูล');
            $('#bt_update_status').text('ยกเลิกคำขอประกาศ');
            $('#bt_update_status').attr('data-value','DR');
        }else{
            $('#l_status').text('ประกาศของท่านได้รับการอนุมัติแล้ว');
             $('#bt_update_status').text('ปิดประกาศ');
            $('#bt_update_status').attr('data-value','DR');
        }
        $('#l_name').text(asset_title);
        setFormJsonData(asset_json);
        $('#page-load').hide();
    });

    $('#li_utility').on('click', function () {
        //set default data
        $('#page-load').show();
        $.get(apiurl + 'api-assets/asset?id=' + asset_id).done(function (res) {
            var asset_detail_json = JSON.parse(res);
            var asset_json = asset_detail_json.detail;
            //set options
            $.each(asset_json.asset_options, function (key, value) {
                $("input[value='" + value.option_id + "']").attr('checked', 'checked');
            });
            $('#page-load').hide();
        });
    });

    $('#li_address').on('click', function () {
        //set default data
        $('#page-load').show();
        $.get(apiurl + 'api-assets/asset?id=' + asset_id).done(function (res) {
            var asset_detail_json = JSON.parse(res);
            console.log(asset_detail_json);

            var asset_json = asset_detail_json.detail;
            setFormJsonData(asset_json.address);
            $('#address_id').val(asset_json.address.id);
            $('#district_id').val(asset_json.address.district_id).trigger('change');
            $('#subdistrict_id').val(asset_json.address.subdistrict_id);
            var latitude = parseFloat(asset_json.address.latitude);
            var longitude = parseFloat(asset_json.address.longitude);
            mapWithMarkerDraggable('map', {lat: latitude, lng: longitude});

            $('#page-load').hide();
        });
    });


    //Asset process
    //Detail save
    $('#bt_save_detail').on('click', function () {
        if ($('#frm_detail').valid()) {

            var formdata = $("#frm_detail").serialize();
            $('#page-load').show();
            $.post(apiurl + 'api-assets/update?id=' + asset_id, formdata).done(function (res) {
                res = JSON.parse(res);
                //console.log(res);
                if (res.status === 200) {
                    success('บันทึกแล้ว');
                    $('#l_name').text(res.data.name);
                } else {
                    error('มีปัญหาในการบันทึก');
                    console.log(res);
                }
                $('#page-load').hide();
            });

        }
    });

    //Address save
    $('#bt_save_address').on('click', function () {
        if ($('#frm_address').valid()) {
            $('#page-load').show();
            var formdata = $("#frm_address").serialize();
            var address_id = $('#address_id').val();
            $.post(apiurl + 'api-address/update?id=' + address_id, formdata).done(function (res) {
                res = JSON.parse(res);
                //console.log(res);
                if (res.status === 200) {
                    success('บันทึกแล้ว');
                } else {
                    error('ไม่สามารถบันทึกได้ ' + res.message);
                }
                $('#page-load').hide();
            });
        }
    });

    //Utility save
    $('#bt_save_utility').on('click', function () {
        if ($('#frm_address').valid()) {
            $('#page-load').show();
            var formdata = $("#frm_utility").serialize();
            var url = apiurl + 'api-assets/create-asset-option?id=' + asset_id;
            $.post(url, formdata).done(function (res) {
                res = JSON.parse(res);
                //console.log(res);
                if (res.status === 200) {
                    success('บันทึกแล้ว ' + res.message);
                }
                $('#page-load').hide();
            });
        }
    });

});