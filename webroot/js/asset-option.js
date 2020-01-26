$(document).ready(function () {
    //set asset type
    var asset_type_url = apiurl + 'api-assets/type';
    $.get(asset_type_url).done(function (res) {
        var asset_types = JSON.parse(res);
        //console.log(asset_types.types);
        $.each(asset_types.types, function (key, item) {
            //console.log(item);
            $('#asset_type_id').append('<option value="' + item.id + '">' + item.name + '</option>');
        });
    });
});