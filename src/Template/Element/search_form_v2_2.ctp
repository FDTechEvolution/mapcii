

<style>
    /* custom checkbox */
    .checkbox {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* hide the browser's default checkbox */
    .checkbox input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    ul,li { margin:0; padding:0; list-style:none;}
    .label { color:#000; font-size:16px;}


    .combo-label {margin-bottom:.5em;}
</style>
<?= $this->Html->css('jquery.multiselect.css') ?>

<?= $this->Form->create('search', ['id' => 'frm_search', 'type' => 'GET']) ?>
<div class="g-bg-black-opacity-0_5 g-pa-30">


    <div class="row">
        <div class="col-md-2 col-6 g-mb-10">
            <a href="javascript:void(0);" class="btn btn-lg btn-block g-font-weight-600 g-py-8 rounded-0 g-bg-white" id="bt_sales">ขาย</a>
            <input type="hidden" name="issales" id="issales" value="N" />
        </div>
        <div class="col-md-2 col-6 g-mb-10">
            <a href="javascript:void(0);" class="btn btn-lg btn-block g-font-weight-600 g-py-8 rounded-0 g-bg-white" id="bt_rent">ให้เช่า</a>
            <input type="hidden" name="isrent" id="isrent" value="N" />
        </div>
        <div class="col-12 col-md-8 g-mb-10">
            <div class="input-group-btn">
                <select name="search_asset_type_id" multiple id="search_asset_type_id" class="form-control rounded-0 g-color-black">

                </select>
                <input type="hidden" name="asset_type" value="" id="asset_type"/>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-8 g-mb-10">
            <div class="input-group u-shadow-v21 g-bg-white rounded-0 ">
                <div id="form-icon-location-pin" class="input-group-append">
                    <span class="input-group-text rounded-0 border-0 g-font-size-16 g-color-gray-light-v1"><i class="icon-location-pin g-pos-rel g-top-1 g-px-1"></i></span>
                </div>
                <input name="search_text" class="form-control rounded-0 g-px-20 g-py-8" type="text" placeholder="ชื่อเมือง,โครงการ หรือสถานที่สำคัญ" style="border: 0px;" aria-label="City, Zip or Country" aria-describedby="form-icon-location-pin">
            </div>
        </div>
        <div class="col-md-4 g-mb-10">
            <a href="javascript:void(0)" id="bt_more_search" class="btn btn-lg btn-block g-font-weight-600 g-py-8 rounded-0 g-bg-white g-font-size-14">
                <i class="fa fa-sliders"></i> ค้นหาแบบละเอียด
            </a>
        </div>
    </div>
    <div class="row"  id="box_more_search">
        <div class="col-md-4 g-mb-10">
            <select name="province"  id="province" class="custom-select form-control-md rounded-0"></select>
        </div>
        <div class="col-md-4 g-mb-10">
            <div class="input-group-btn">
                <select name="search_district_id" id="search_district_id" class="custom-select form-control form-control-md rounded-0">

                </select>
            </div>
        </div>
        <div class="col-md-4 g-mb-10">
            <div class="input-group-btn">
                <select name="search_sub_district_id" id="search_sub_district_id" class="custom-select form-control form-control-md rounded-0">

                </select>
            </div>
        </div>
        <div class="col-md-4 g-mb-10">
            <div class="input-group-btn">
                <select name="orderby" class="custom-select g-bg-white u-select-v1 w-100 g-brd-gray-light-v3 g-color-main g-color-primary--hover" required id="orderby"
                        data-placeholder=""
                        data-open-icon="fa fa-angle-down"
                        data-close-icon="fa fa-angle-up">
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="date">แสดงทุกประกาศ</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="price_desc">อสังหาขายด่วน</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="price_asc">อสังหามือสอง</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="land_size_asc" selected>โครงการใหม่</option>
                </select>
            </div>
        </div>
        <div class="col-md-4 g-mb-10">
            <?php
            $startPrice = [
                ['value' => '0', 'label' => 'ตั้งแต่ราคา 0'],
                ['value' => '1000000', 'label' => 'ตั้งแต่ราคา 1,000,000'],
                ['value' => '2000000', 'label' => 'ตั้งแต่ราคา 2,000,000'],
                ['value' => '3000000', 'label' => 'ตั้งแต่ราคา 3,000,000'],
                ['value' => '4000000', 'label' => 'ตั้งแต่ราคา 4,000,000'],
                ['value' => '5000000', 'label' => 'ตั้งแต่ราคา 5,000,000'],
                ['value' => '10000000', 'label' => 'ตั้งแต่ราคา 10,000,000'],
                ['value' => '20000000', 'label' => 'ตั้งแต่ราคา 20,000,000'],
                ['value' => '30000000', 'label' => 'ตั้งแต่ราคา 30,000,000'],
                ['value' => '50000000', 'label' => 'ตั้งแต่ราคา 50,000,000'],
                ['value' => '100000000', 'label' => 'ตั้งแต่ราคา 100,000,000'],
            ];
            ?>
            <select name="price_start" id="price_start" class="custom-select g-bg-white u-select-v1 w-100 g-brd-gray-light-v3 g-color-main g-color-primary--hover" 
                    data-placeholder="ตั้งแต่ราคา"
                    data-open-icon="fa fa-angle-down"
                    data-close-icon="fa fa-angle-up">
                <?php foreach ($startPrice as $item) : ?>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="<?= $item['value'] ?>"><?= $item['label'] ?></option>
                <?php endforeach; ?>
            </select>
           
        </div>
        <div class="col-md-4 g-mb-10">
            <?php
            $endPrice = [
                ['value' => '', 'label' => 'ถึงราคาไม่จำกัด'],
                ['value' => '1000000', 'label' => 'ถึงราคา 1,000,000'],
                ['value' => '2000000', 'label' => 'ถึงราคา 2,000,000'],
                ['value' => '3000000', 'label' => 'ถึงราคา 3,000,000'],
                ['value' => '4000000', 'label' => 'ถึงราคา 4,000,000'],
                ['value' => '5000000', 'label' => 'ถึงราคา 5,000,000'],
                ['value' => '10000000', 'label' => 'ถึงราคา 10,000,000'],
                ['value' => '20000000', 'label' => 'ถึงราคา 20,000,000'],
                ['value' => '30000000', 'label' => 'ถึงราคา 30,000,000'],
                ['value' => '50000000', 'label' => 'ถึงราคา 50,000,000'],
                ['value' => '100000000', 'label' => 'ถึงราคา 100,000,000'],
            ];
            ?>
            <select name="price_end" id="price_end" class="custom-select g-bg-white u-select-v1 w-100 g-brd-gray-light-v3 g-color-main g-color-primary--hover" 
                    data-placeholder="ถึงราคา"
                    data-open-icon="fa fa-angle-down"
                    data-close-icon="fa fa-angle-up">
                <?php foreach ($endPrice as $item) : ?>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="<?= $item['value'] ?>"><?= $item['label'] ?></option>
                <?php endforeach; ?>
            </select>
        </div>
    </div>

    <input type="hidden" name="isnewproject" value="Y">

    <div class="row">
        <div class="col-md-4 offset-md-4">
            <button class="btn btn-lg btn-block u-btn-primary g-color-white g-bg-primary-dark-v1--hover g-font-weight-600 rounded-0 g-px-18" type="submit" id="bt_search">
                <i class="fa fa-search"></i> ค้นหา
            </button>
        </div>
    </div>

</div>
<?= $this->Form->end() ?>

<?= $this->Html->script('jquery.multiselect.js') ?>
<!-- <?= $this->Html->script('address-option-search.js') ?> -->
<script>
    let type_id = [];
    function setDefaultFields(){
        //set default from url
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('issales')) {
            $('#issales').val(urlParams.get('issales')).trigger('change');
        }
        if (urlParams.has('isrent')) {
            $('#isrent').val(urlParams.get('isrent')).trigger('change');
        }
        if (urlParams.has('orderby')) {
            $('#orderby').val(urlParams.get('orderby')).trigger('change');
        }

        //console.log(urlParams.get('province'));
        if (urlParams.has('province')) {
            $('#province').val(urlParams.get('province')).trigger('change');
        }
        if (urlParams.has('price_start')) {
            $('#price_start').val(urlParams.get('price_start')).trigger('change');
        }
        if (urlParams.has('price_end')) {
            $('#price_end').val(urlParams.get('price_end')).trigger('change');
        }

    }
    
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
            var urlParams = new URLSearchParams(window.location.search);
            var asset_types = JSON.parse(res);
            // console.log(asset_types.types);
            // let search_asset = urlParams.getAll('search_asset_type_id');
            // console.log(search_asset);
            $.each(asset_types.types, function (key, item) {
                // console.log(item);
                if (urlParams.getAll('search_asset_type_id').includes(item.id) == true) {
                    $('#search_asset_type_id').append('<option value="' + item.id + '" selected>' + item.name + '</option>');
                }else{
                    $('#search_asset_type_id').append('<option value="' + item.id + '">' + item.name + '</option>');
                }
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
            var urlParams = new URLSearchParams(window.location.search);
            $('#search_district_id').append('<option value="" selected="">ทุกอำเภอ</option>');
            $.each(districtJson, function (key, value) {
                if (value.id == urlParams.get('search_district_id')) {
                    $('#search_district_id').append('<option value="' + value.id + '" selected>' + value.name + '</option>');
                } else {
                    $('#search_district_id').append('<option value="' + value.id + '">' + value.name + '</option>');
                }
            });
        }

        function resetSubdistrict() {
            $('#search_sub_district_id').empty();
            var urlParams = new URLSearchParams(window.location.search);
            $('#search_sub_district_id').append('<option value="" selected="">ทุกตำบล</option>');
            $.each(subDistrictJson, function (key, value) {
                if (value.id == urlParams.get('search_sub_district_id')) {
                    $('#search_sub_district_id').append('<option value="' + value.id + '" selected>' + value.name + '</option>');
                } else {
                    $('#search_sub_district_id').append('<option value="' + value.id + '">' + value.name + '</option>');
                }
            });
        }

        $.get(address_option_url).done(function (res) {
            provinceJson = JSON.parse(res);
            $('#province').empty();
            $('#province').append('<option value="" selected>ทุกจังหวัด</option>');
            $.each(provinceJson, function (key, value) {
                $('#province').append('<option value="' + value.id + '">' + value.name + '</option>');
            });

            
            /*
             $('#province').multiselect({
             columns: 1,
             placeholder: 'ทุกจังหวัด',
             search: true
             });
             */
            setDefaultFields();
            resetDistrict();
            resetSubdistrict();
        });

        $('#province').on('change', function () {
            var province_id = $('#province').val();
            $.each(provinceJson, function (key, value) {
                if (value.id == province_id) {
                    subDistrictJson = '';
                    districtJson = value.districts;
                    resetDistrict();
                    resetSubdistrict();
                } else if (province_id == 0) {
                    districtJson = '';
                    subDistrictJson = '';
                    resetDistrict();
                    resetSubdistrict();
                }
            });
        });

        $('#search_district_id').on('change', function () {
            var district_id = $('#search_district_id').val();
            $.each(districtJson, function (key, value) {
                if (value.id == district_id) {
                    subDistrictJson = value.subdistricts;
                    resetSubdistrict();
                } else if (district_id == 0) {
                    subDistrictJson = '';
                    resetSubdistrict();
                }
            });
        });
    });

    $(document).ready(function () {

        $('#bt_rent').on('click', function () {
            if ($(this).hasClass("g-bg-white")) {

                $('#isrent').val('Y').trigger('change');
            } else {

                $('#isrent').val('N').trigger('change');
            }
        });
        $('#bt_sales').on('click', function () {
            if ($(this).hasClass("g-bg-white")) {
                $('#issales').val('Y').trigger('change');
            } else {
                $('#issales').val('N').trigger('change');
            }
        });

        $('#isrent').on('change', function () {
            var value = $(this).val();
            if (value === 'Y') {
                $('#bt_rent').removeClass('g-bg-white');
                $('#bt_rent').removeClass('g-color-white');

                $('#bt_rent').addClass("g-bg-primary");
                $('#bt_rent').addClass("g-color-white");
            } else {
                $('#bt_rent').addClass('g-bg-white');
                $('#bt_rent').removeClass('g-color-white');

                $('#bt_rent').removeClass("g-bg-primary");
            }
        });

        $('#issales').on('change', function () {
            var value = $(this).val();
            if (value === 'Y') {
                $('#bt_sales').removeClass('g-bg-white');
                $('#bt_sales').removeClass('g-color-white');

                $('#bt_sales').addClass("g-bg-primary");
                $('#bt_sales').addClass("g-color-white");
            } else {
                $('#bt_sales').addClass('g-bg-white');
                $('#bt_sales').removeClass('g-color-white');

                $('#bt_sales').removeClass("g-bg-primary");
            }
        });
        
        $('#search_asset_type_id').on('change',function(){
            // console.log($(this).val());
            $('#search_asset_type_id').val($(this).val());
            type_id = $(this).val();
            // console.log(type_id)
        });

        $('#bt_more_search').on('click', function () {
            if ($('#box_more_search').is(":visible")) {
                $('#box_more_search').hide();
            } else {
                $('#box_more_search').show();
            }

        });


        setDefaultFields();
        
    });
</script>