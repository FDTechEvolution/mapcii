$(document).ready(function () {
    /* ===== Logic for creating fake Select Boxes ===== */
    $('.sel').each(function () {
        $(this).children('select').css('display', 'none');

        var $current = $(this);

        $(this).find('option').each(function (i) {
            if (i == 0) {
                $current.prepend($('<div>', {
                    class: $current.attr('class').replace(/sel/g, 'sel__box')
                }));

                var placeholder = $(this).text();
                $current.prepend($('<span>', {
                    class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
                    text: placeholder,
                    'data-placeholder': placeholder
                }));

                return;
            }

            $current.children('div').append($('<span>', {
                class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
                text: $(this).text()
            }));
        });
    });

// Toggling the `.active` state on the `.sel`.
    $('.sel').click(function () {
        $(this).toggleClass('active');
    });

// Toggling the `.selected` state on the options.
    $('.sel__box__options').click(function () {
        var txt = $(this).text();
        var index = $(this).index();

        $(this).siblings('.sel__box__options').removeClass('selected');
        $(this).addClass('selected');

        var $currentSel = $(this).closest('.sel');
        $currentSel.children('.sel__placeholder').text(txt);
        $currentSel.children('select').prop('selectedIndex', index + 1);
    });


    var asset_type_url = apiurl + 'api-assets/type';
    $.get(asset_type_url).done(function (res) {
        var asset_types = JSON.parse(res);
        //console.log(asset_types.types);
        $.each(asset_types.types, function (key, item) {
            //console.log(item);
            $('#search_asset_type_id').append('<option value="' + item.id + '">' + item.name + '</option>');
        });

        $('#search_asset_type_id').multiselect({
            columns: 1,
            placeholder: 'ทุกประเภท',
            search: false
        });
    });


    //Set province and district options
    var address_option_url = apiurl + 'api-address/options';
    var json = [];
    var provinceJson = [];
    var districtJson = [];
    var subDistrictJson = [];

    function resetDistrict() {
        //console.log('reset district');
        $('#search_district_id').empty();
        $('#search_district_id').append('<option value="" selected="">ทุกอำเภอ</option>');
        $.each(districtJson, function (key, value) {
            if (key == 0) {
                subDistrictJson = value.subdistricts;
            }

            $('#search_district_id').append('<option value="' + value.id + '">' + value.name + '</option>');
            resetSubdistrict();
        });
    }

    function resetSubdistrict() {
        $('#search_sub_district_id').empty();
        $('#search_sub_district_id').append('<option value="" selected="">ทุกตำบล</option>');
        $.each(subDistrictJson, function (key, value) {
            $('#search_sub_district_id').append('<option value="' + value.id + '">' + value.name + '</option>');
        });
    }

    $.get(address_option_url).done(function (res) {
        provinceJson = JSON.parse(res);
        //$('#province_id').empty();
        $.each(provinceJson, function (key, value) {
            if (value.id == 1) {
                districtJson = value.districts;
                $('#search_province_id').append('<option value="' + value.id + '" selected>' + value.name + '</option>');
            } else {
                $('#search_province_id').append('<option value="' + value.id + '">' + value.name + '</option>');
            }

        });
        /*
        $('#search_province_id').multiselect({
            columns: 1,
            placeholder: 'ทุกจังหวัด',
            search: true
        });
        */
        resetDistrict();
    });

    $('#search_province_id').on('change', function () {
        var province_id = $('#search_province_id').val();
        $.each(provinceJson, function (key, value) {
            if (value.id == province_id) {
                districtJson = value.districts;
                resetDistrict();
            }

        });
        /*
        $('#search_province_id').multiselect({
            columns: 1,
            placeholder: 'ทุกประเภท',
            search: false
        });
        */
    });

    $('#search_district_id').on('change', function () {
        var district_id = $('#search_district_id').val();
        $.each(districtJson, function (key, value) {
            if (value.id == district_id) {
                subDistrictJson = value.subdistricts;
                resetSubdistrict();
            }
        });
    });
});