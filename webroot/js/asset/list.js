$(document).ready(function () {
    var asset_list_url = apiurl + 'api-assets/listasset?user='+user_id;
    var json;

    $('#page-load').show();
    $.get(asset_list_url).done(function (res) {
        json = JSON.parse(res);
        console.log(json);

        var body = '';
        $.each(json.list, function (key, value) {
            body = '<tr class="cursor-pointer" data-id="' + value.id + '">';
            body += '<td>' + (key + 1) + '</td>';
            body += '<td>' + value.name + '</td>';
            body += '<td>' + value.created + '</td>';
            if (value.status == 'CO') {
                body += '<td><span class="u-label u-label-success g-color-white">เผยแพร่แล้ว</span></td>';
            } else {
                body += '<td><span class="u-label u-label-warning g-color-white">ฉบับร่าง</span></td>';
            }

            body += '</tr>';
            $('#tb_list_asset > tbody').append(body);
        });
        $("#tb_list_asset > tbody tr").click(function () {
            var asset_id = $(this).attr('data-id');
            var targeturl = siteurl + 'myassets/update?id=' + asset_id;
            console.log(targeturl);
            window.location.href = targeturl;
        });

        $('#page-load').hide();
    });


});