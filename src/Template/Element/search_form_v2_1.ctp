

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

<?= $this->Form->create('', ['id' => 'frm_search', 'method' => 'GET']) ?>
<div class="g-bg-gray-light-v4 g-pa-30">


    <div class="row">
        <div class="col-md-2 col-6 g-mb-10">
            <a href="javascript:void(0);" class="btn btn-lg btn-block g-font-weight-600 g-py-8 rounded-0 g-bg-white" id="bt_sales">ซื้อ</a>
            <input type="hidden" name="issales" id="issales" value="N" />
        </div>
        <div class="col-md-2 col-6 g-mb-10">
            <a href="javascript:void(0);" class="btn btn-lg btn-block g-font-weight-600 g-py-8 rounded-0 g-bg-white" id="bt_rent">เช่า</a>
            <input type="hidden" name="isrent" id="isrent" value="N" />
        </div>
        
        <div class="col-12 col-md-8 g-mb-10">
            <div class="input-group-btn">
                <select name="search_asset_type_id[]" multiple id="search_asset_type_id" class="form-control rounded-0">

                </select>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 g-mb-10">
            <div class="input-group u-shadow-v21 g-bg-white rounded-0 ">
                <div id="form-icon-location-pin" class="input-group-append">
                    <span class="input-group-text rounded-0 border-0 g-font-size-16 g-color-gray-light-v1"><i class="icon-location-pin g-pos-rel g-top-1 g-px-1"></i></span>
                </div>
                <input name="search_text" class="form-control rounded-0 g-px-20" type="text" placeholder="ชื่อเมือง,โครงการ หรือสถานที่สำคัญ" style="border: 0px;" aria-label="City, Zip or Country" aria-describedby="form-icon-location-pin">
            </div>

        </div>


    </div>
    <div class="row"  id="box_more_search">
        <div class="col-md-4 g-mb-10">
            <select name="search_province_id[]"  id="search_province_id" class="custom-select form-control-md rounded-0"></select>
        </div>
        <div class="col-md-4 g-mb-10">
            <div class="input-group-btn">
                <select name="search_district_id[]" id="search_district_id" class="custom-select form-control form-control-md rounded-0">

                </select>
            </div>
        </div>
        <div class="col-md-4 g-mb-10">
            <div class="input-group-btn">
                <select name="search_sub_district_id[]" id="search_sub_district_id" class="custom-select form-control form-control-md rounded-0">

                </select>
            </div>
        </div>
        <div class="col-md-4 g-mb-10">
            <div class="input-group-btn">
                <select name="orderby" class="custom-select g-bg-white u-select-v1 w-100 g-brd-gray-light-v3 g-color-main g-color-primary--hover" required
                        data-placeholder=""
                        data-open-icon="fa fa-angle-down"
                        data-close-icon="fa fa-angle-up">
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="date">เรียงตามวันที่ลงประกาศล่าสุด</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="price">เรียงตามราคาจากมากไปน้อย</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="date">เรียงตามราคาจากน้อยไปมาก</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="land_size_asc">เรียงตามขนาดที่ดินจากน้อยไปมาก</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="land_size_desc">เรียงตามขนาดที่ดินจากมากไปน้อย</option>

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
                <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" ></option>
                <?php foreach ($startPrice as $item) : ?>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="<?= $item['value'] ?>"><?= $item['label'] ?></option>
                <?php endforeach; ?>
            </select>
            <?= $this->Form->hidden('price_start', ['id' => 'price_start', 'value' => '0']) ?>
            <?= $this->Form->hidden('price_end', ['id' => 'price_end', 'value' => '10000000']) ?>
        </div>
        <div class="col-md-4 g-mb-10">
            <?php
            $endPrice = [
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
                <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" ></option>
                <?php foreach ($endPrice as $item) : ?>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="<?= $item['value'] ?>"><?= $item['label'] ?></option>
                <?php endforeach; ?>
            </select>
        </div>
    </div>


    <div class="row">
        <div class="col-md-4 offset-md-4">
            <button class="btn btn-lg btn-block u-btn-primary g-color-white g-bg-primary-dark-v1--hover g-font-weight-600 rounded-0 g-px-18" type="button" id="bt_search">
                <i class="fa fa-search"></i> ค้นหา
            </button>
        </div>
    </div>

</div>
<?= $this->Form->end() ?>

<?= $this->Html->script('jquery.multiselect.js') ?>
<?= $this->Html->script('url.min.js') ?>
<?= $this->Html->script('address-option-search.js') ?>
<script>
    $(document).ready(function () {
        //$.HSCore.components.HSSlider.init('#rangeSlider1');

        

        $('#bt_search').on('click', function () {
            var form_data = $('#frm_search').serializeArray();
            var urlParam = $.AssetCore.search.makeUrlParam(form_data);
            console.log(urlParam);
            window.location.href = siteurl + 'search?search=1' + urlParam;
        });

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
        
        
        
        //set default from url
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('issales')) {
            $('#issales').val(urlParams.get('issales')).trigger('change');
        }
    });
</script>