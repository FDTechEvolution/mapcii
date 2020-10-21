$(document).ready(function () {
    //Set province and district options
    var address_option_url = apiurl + 'api-address/options';
    var json = [];
    var provinceJson = [];
    var districtJson = [];
    var subDistrictJson = [];

    function resetDistrict() {
        //console.log('reset district');
        $('#district_id').empty();
        $.each(districtJson, function (key, value) {
            if (key == 0) {
                subDistrictJson = value.subdistricts;
            }
            $('#district_id').append('<option value="'+value.id+'">' + value.name + '</option>');
            resetSubdistrict();
        });
    }
    
    function resetSubdistrict(){
        $('#subdistrict_id').empty();
        $.each(subDistrictJson, function (key, value) {
            $('#subdistrict_id').append('<option value="'+value.id+'">' + value.name + '</option>');
        });
    }

    $.get(address_option_url).done(function (res) {
        provinceJson = JSON.parse(res);
        // console.log(provinceJson)
        $('#province_id').empty();
        $.each(provinceJson, function (key, value) {
            if (key == 0) {
                $('#province_id').append('<option disabled value="" selected>เลือกจังหวัด...</option>');
            }
            $('#province_id').append('<option value="'+value.id+'">' + value.name + '</option>');
        });
        resetDistrict();
    });

    $('#province_id').on('change', function () {
        var province_id = $('#province_id').val();
        $.each(provinceJson, function (key, value) {
            if (value.id == province_id) {
                districtJson = value.districts;
                resetDistrict();
            }
        });
    });
    
    $('#district_id').on('change', function () {
        var district_id = $('#district_id').val();
        $.each(districtJson, function (key, value) {
            if (value.id == district_id) {
                subDistrictJson = value.subdistricts;
                resetSubdistrict();
            }
        });
    });
});