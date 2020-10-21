function setDefault(asset_image_id) {
    $('#page-load').show();
    $.get(apiurl + 'api-assets/asset-image-to-default?id=' + asset_image_id + '&asset_id=' + asset_id).done(function (res) {
        
        getListImage();
        $('#page-load').hide();
        
    });
}
function deleteImage(asset_image_id) {
    $('#page-load').show();
    $.get(apiurl + 'api-assets/asset-image-delete?id=' + asset_image_id + '&asset_id=' + asset_id).done(function (res) {
        
        getListImage();
        $('#page-load').hide();
        
    });
}

function makeShowImage(image_path, asset_image_id) {
    asset_image_id = "'" + asset_image_id + "'";
    var body = '';
    body += '<div class="col-md-4">';
    body += '<image src="' + image_path + '" class="img-fluid w-100 g-mb-10" />';
    body += '<a href="javascript:void(0)" onclick="setDefault(' + asset_image_id + ');" class="g-mr-10"><i class="icon-hotel-restaurant-233 u-line-icon-pro"></i> ตั้งเป็นรูปหน้าปก</a>';
    body += '<a href="javascript:void(0)" onclick="deleteImage(' + asset_image_id + ')"><i class="fa fa-close"></i> ลบ</a>';
    body += '</div>';
    $('#div_list_asset_image').append(body);
}

function getListImage() {
    $('#page-load').show();
    $('#div_list_asset_image').empty();
    $.get(apiurl + 'api-assets/asset-image?id=' + asset_id).done(function (res) {
        json = JSON.parse(res);
        // console.log(json);
        $.each(json.data, function (key, value) {
            makeShowImage(value.image.url, value.id);
        });


        $('#page-load').hide();
    });
}

$(document).ready(function () {
    $('#bt_uploadimage').on('click', function () {

        $('#page-load').show();
        var form = $("#frm_image");
        var formdata = false;
        if (window.FormData) {
            formdata = new FormData(form[0]);
        }

        var formAction = apiurl + 'api-assets/upload-asset-image?id=' + asset_id;
        $.ajax({
            url: formAction,
            data: formdata ? formdata : form.serialize(),
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (data, textStatus, jqXHR) {
                // data = JSON.parse(data);
                console.log(data);
                if (data.status === 200) {

                    success('บันทึกแล้ว');
                    makeShowImage(data.data.image.url, data.data.id);
                }
                $('#page-load').hide();
            }
        });

    });
    getListImage();

});