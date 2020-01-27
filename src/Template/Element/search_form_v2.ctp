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

<?= $this->Form->create('', ['id' => 'frm_search', 'type' => 'GET']) ?>
<div class="g-pa-30 g-bg-black-opacity-0_5">
    <div class="row">
        <div class="col-md-2 col-6 g-mb-10">
            <a href="javascript:void(0);" class="btn btn-lg btn-block g-font-weight-600 g-py-8 rounded-0 g-bg-primary g-color-white" id="bt_sales">ขาย</a>
            <input type="hidden" name="issales" id="issales" value="Y" />
        </div>
        <div class="col-md-2 col-6 g-mb-10">
            <a href="javascript:void(0);" class="btn btn-lg btn-block g-font-weight-600 g-py-8 rounded-0 g-bg-white g-color-gray-light-v1" id="bt_rent">ให้เช่า</a>
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
        <div class="col-md-8 g-mb-10">
            <div class="input-group u-shadow-v21 g-bg-white rounded-0 ">
                <div id="form-icon-location-pin" class="input-group-append">
                    <span class="input-group-text rounded-0 border-0 g-font-size-16 g-color-gray-light-v1"><i class="icon-location-pin g-pos-rel g-top-1 g-px-1"></i></span>
                </div>
                <input name="search_text" class="form-control rounded-0 g-px-20 g-py-12" type="text" placeholder="ชื่อเมือง,โครงการ หรือสถานที่สำคัญ" style="border: 0px;" aria-label="City, Zip or Country" aria-describedby="form-icon-location-pin">
            </div>

        </div>
        <div class="col-md-4 g-mb-10">
            <a href="javascript:void(0)" id="bt_more_search" class="btn btn-lg btn-block g-font-weight-600 g-py-8 rounded-0 g-bg-white g-font-size-14"><i class="fa fa-sliders"></i> ค้นหาแบบละเอียด</a>
        </div>

    </div>
    <div class="row"  id="box_more_search" style="display:none;">
        <div class="col-md-4 g-mb-10">
            <select name="search_province_id[]"  id="search_province_id" class="custom-select form-control-lg rounded-0"></select>
        </div>
        <div class="col-md-4 g-mb-10">
            <div class="input-group-btn">
                <select name="search_district_id[]" id="search_district_id" class="custom-select form-control form-control-lg rounded-0">

                </select>
            </div>
        </div>
        <div class="col-md-4 g-mb-10">
            <div class="input-group-btn">
                <select name="search_sub_district_id[]" id="search_sub_district_id" class="custom-select form-control form-control-lg rounded-0">

                </select>
            </div>
        </div>
        <div class="col-md-4 g-mb-10">
            <div class="input-group-btn">
                <select name="orderby" id="orderby" class="custom-select form-control form-control-lg rounded-0" required
                        data-placeholder=""
                        data-open-icon="fa fa-angle-down"
                        data-close-icon="fa fa-angle-up" style="display: none;">
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="date">เรียงตามวันที่ลงประกาศล่าสุด</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="price">เรียงตามราคาจากมากไปน้อย</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="date">เรียงตามราคาจากน้อยไปมาก</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="land_size_asc">เรียงตามขนาดที่ดินจากน้อยไปมาก</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="land_size_desc">เรียงตามขนาดที่ดินจากมากไปน้อย</option>

                </select>
                <select name="announce_type" id="announce_type" class="custom-select form-control form-control-lg rounded-0" required
                        data-placeholder=""
                        data-open-icon="fa fa-angle-down"
                        data-close-icon="fa fa-angle-up" >
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="all">แสดงทุกประกาศ</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="hot_sales">แสดงเฉพาะประกาศขายด่วน</option>
                </select>
                <select style="display: none;" name="renttype" id="renttype" class="custom-select form-control form-control-lg rounded-0" required
                        data-placeholder=""
                        data-open-icon="fa fa-angle-down"
                        data-close-icon="fa fa-angle-up">
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="daily">รายวัน</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="monthly" selected="selected">รายเดือน</option>

                </select>
            </div>
        </div>
        <div class="col-md-4 g-mb-10">

            <select id="price_sales_start" class="custom-select form-control form-control-lg rounded-0" 
                    data-placeholder="ตั้งแต่ราคา"
                    data-open-icon="fa fa-angle-down"
                    data-close-icon="fa fa-angle-up">
                <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" ></option>
                <?php foreach ($startPrice['sales'] as $item) : ?>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="<?= $item['value'] ?>"><?= $item['label'] ?></option>
                <?php endforeach; ?>
            </select>
            <select style="display:none;" id="price_rent_start" class="custom-select form-control form-control-lg rounded-0" 
                    data-placeholder="ตั้งแต่ราคา"
                    data-open-icon="fa fa-angle-down"
                    data-close-icon="fa fa-angle-up">
                <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" ></option>
                <?php foreach ($startPrice['rent'] as $item) : ?>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="<?= $item['value'] ?>"><?= $item['label'] ?></option>
                <?php endforeach; ?>
            </select>

            <?= $this->Form->hidden('price_start', ['id' => 'price_start', 'value' => '0']) ?>
            <?= $this->Form->hidden('price_end', ['id' => 'price_end', 'value' => '1000000000000']) ?>
        </div>
        <div class="col-md-4 g-mb-10">

            <select id="price_sales_end" class="custom-select form-control form-control-lg rounded-0" 
                    data-placeholder="ถึงราคา"
                    data-open-icon="fa fa-angle-down"
                    data-close-icon="fa fa-angle-up">
                <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" ></option>
                <?php foreach ($endPrice['sales'] as $item) : ?>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="<?= $item['value'] ?>"><?= $item['label'] ?></option>
                <?php endforeach; ?>
            </select>
            <select style="display:none;" id="price_rent_end" class="custom-select form-control form-control-lg rounded-0" 
                    data-placeholder="ถึงราคา"
                    data-open-icon="fa fa-angle-down"
                    data-close-icon="fa fa-angle-up">
                <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" ></option>
                <?php foreach ($endPrice['rent'] as $item) : ?>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="<?= $item['value'] ?>"><?= $item['label'] ?></option>
                <?php endforeach; ?>
            </select>
        </div>
    </div>


    <div class="row">
        <div class="col-md-4 offset-md-4">
            <button class="btn btn-lg btn-block u-btn-primary g-color-white g-bg-primary-dark-v1--hover g-font-weight-600 rounded-0 g-px-18" type="submit" id="bt-search">
                <i class="fa fa-search"></i> ค้นหา
            </button>
        </div>
    </div>

</div>
<?= $this->Form->end() ?>
<?= $this->Html->script('jquery.multiselect.js') ?>

<?= $this->Html->script('address-option-search.js') ?>
<script>

    function activeButton(eleId) {
        $(eleId).removeClass('g-bg-white');
        $(eleId).removeClass('g-color-white');
        $(eleId).removeClass('g-color-gray-light-v1');

        $(eleId).addClass("g-bg-primary");
        $(eleId).addClass("g-color-white");
    }

    function inactiveButton(eleId) {
        $(eleId).addClass('g-bg-white');
        $(eleId).addClass('g-color-gray-light-v1');
        $(eleId).removeClass('g-color-white');

        $(eleId).removeClass("g-bg-primary");
    }

    function priceManage() {
        var issales = $('#issales').val();
        if (issales === 'Y') {
            var price_start = $('#price_sales_start').val();
            $('#price_start').val(price_start);
            $('#price_end').val($('#price_sales_end').val());
            
            disablePriceOption('price_sales_end',price_start);
        } else {
            $('#price_start').val($('#price_rent_start').val());
            $('#price_end').val($('#price_rent_end').val());
            
            disablePriceOption('price_rent_end',$('#price_rent_start').val());
        }
    }

    function disablePriceOption(element_id, start_value) {
        $('#' + element_id + ' option').each(function () {
            console.log($(this).val()+' / '+start_value);
            if(parseInt($(this).val()) <= parseInt(start_value)){
                $(this).attr('disabled', true);
            }else{
                $(this).attr('disabled', false);
            }
        });
    }

    $(document).ready(function () {


        $('#bt_more_search').on('click', function () {
            if ($('#box_more_search').is(":visible")) {
                $('#box_more_search').hide();
            } else {
                $('#box_more_search').show();
            }

        });

        $('#bt_rent').on('click', function () {

            activeButton('#bt_rent');
            inactiveButton('#bt_sales');
            $('#isrent').val('Y').trigger('change');
            $('#issales').val('N').trigger('change');

            $('#announce_type').hide();
            $('#renttype').show();


            $('#price_sales_start').hide();
            $('#price_sales_end').hide();

            $('#price_rent_start').show();
            $('#price_rent_end').show();
            priceManage();
        });

        $('#bt_sales').on('click', function () {
            activeButton('#bt_sales');
            inactiveButton('#bt_rent');
            $('#isrent').val('N').trigger('change');
            $('#issales').val('Y').trigger('change');

            $('#announce_type').show();
            $('#renttype').hide();

            $('#price_sales_start').show();
            $('#price_sales_end').show();

            $('#price_rent_start').hide();
            $('#price_rent_end').hide();
            priceManage();
        });


        $('#search_asset_type_id').on('change', function () {
            //console.log($(this).val());
            $('#asset_type').val($(this).val());
        });

        $('#price_sales_start').val('0').trigger('change');
        $('#price_rent_start').val('0').trigger('change');

        $('#price_sales_end').val('10000000000').trigger('change');
        $('#price_rent_end').val('10000000000').trigger('change');

        $('#price_sales_start').on('change', function () {
            //console.log('price_sales_start changed = '+$(this).val());
            //$('#price_start').val($(this).val());
            priceManage();
            $('#price_sales_end').val('10000000000').trigger('change');
        });
        $('#price_rent_start').on('change', function () {
            //$('#price_start').val($(this).val());
            priceManage();
            $('#price_rent_end').val('10000000000').trigger('change');
        });

        $('#price_sales_end').on('change', function () {
            //$('#price_end').val($(this).val());
            priceManage();
        });
        $('#price_rent_end').on('change', function () {
            // $('#price_end').val($(this).val());
            priceManage();
        });
    }
    );
</script>