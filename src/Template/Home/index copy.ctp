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
<section class="dzsparallaxer auto-init height-is-based-on-content use-loading" data-options='{direction: "reverse", settings_mode_oneelement_max_offset: "150"}' style="border-bottom: #145ebe solid 7px;">
    <!-- Parallax Image -->
    <div class="divimage dzsparallaxer--target w-100 u-bg-overlay g-bg-white-opacity-0_5--after" style="height: 110%; background-image: url(<?= SITE_URL ?>img/cover/home_cover.jpg);"></div>
    <!-- End Parallax Image -->

    <div class="container u-bg-overlay__inner g-pt-50 g-pb-10">
        <div class="row">
            <div class="col-md-8 col-12 offset-md-2">
                <h1 class="g-color-primary text-center g-font-weight-600 mx-auto g-mb-0"><span class="">แมพซี่ ดีที่สุด</span></h1>

                <!-- Search Form -->
                <?= $this->Form->create('', ['url' => ['controller' => 'search', 'action' => 'index'], 'id' => 'frm_search', 'method' => 'GET']) ?>
                <div class="g-pa-30">
                    <div class="row">
                        <div class="col-md-2 col-6 g-mb-10">
                            <a href="#!" class="btn btn-lg btn-block g-font-weight-600 g-py-8 rounded-0 g-bg-white">ขาย</a>
                        </div>
                        <div class="col-md-2 col-6 g-mb-10">
                            <a href="#!" class="btn btn-lg btn-block g-font-weight-600 g-py-8 rounded-0 g-bg-white">เช่า</a>
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
                                <select name="orderby" class="js-custom-select g-bg-white u-select-v1 w-100 g-brd-gray-light-v3 g-color-main g-color-primary--hover g-py-12" required
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

                            <select name="price_start" id="price_start" class="js-custom-select g-bg-white u-select-v1 w-100 g-brd-gray-light-v3 g-color-main g-color-primary--hover g-py-12" 
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

                            <select name="price_end" id="price_end" class="js-custom-select g-bg-white u-select-v1 w-100 g-brd-gray-light-v3 g-color-main g-color-primary--hover g-py-12" 
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
                            <button class="btn btn-lg btn-block u-btn-primary g-color-white g-bg-primary-dark-v1--hover g-font-weight-600 rounded-0 g-px-18" type="submit">
                                <i class="fa fa-search"></i> ค้นหา
                            </button>
                        </div>
                    </div>

                </div>
                <?= $this->Form->end() ?>
            </div>
        </div>


        <?= $this->element('banner/top') ?>
    </div>

</section>
<section>
    <div class="container g-pt-20 g-pb-10">
        <div class="row">
            <div class="col-md-12" id="">
                <h3>อสังหาฯ มาใหม่ล่าสุด</h3>
            </div>
        </div>
        <div class="row" id="box_last_asset">
            
        </div>
    </div>
</section>
<section>
    <div class="container g-pt-20 g-pb-10">
        <div class="row">
            <div class="col-md-8 text-center" id="" data-id="box_article">
                <div class="g-pa-5 g-mt-3">

                <h3>สำหรับนักลงทุน คุณมีความรู้ด้านอสังหาดีพอแล้วหรือ?</h3>
                <h3>สำหรับผู้ขาย คุณจะขายอย่างไรดี?</h3>
                <h3>สำหรับผู้ซื้อ คุณควรจะซื้อที่ไหนดี?</h3>
                <h3>สำหรับผู้เช่า คุณควรจะเช่าแถวไหนดี?</h3>
                <h3>ทุกคำถาม มีคำตอบ</h3>
                <h3><span class="g-bg-primary g-color-white">&nbsp;&nbsp;อ่านบทความ/ข่าว ที่เรารวบรวมมาให้คุณได้ที่นี่&nbsp;&nbsp;</span></h3>
                </div>
            </div>

            <div class="col-md-4">
                <div class="g-mb-20">
                    <img src="https://sv1.picz.in.th/images/2019/06/25/1Pkhtn.jpg" class="img-fluid w-100">
                </div>
            </div>
        </div>
    </div>
</section>
<section>
    <div class="row" style="border-bottom: #9E9E9E solid 3px;">
        <div class="col-md-12 g-py-5">

        </div>
    </div>
</section>
<?= $this->element('asset_with_map') ?>


<?= $this->Html->script('map.js') ?>
<?= $this->Html->script('home.js') ?>
<?= ''//$this->Html->script('asset-option.js') ?>

<?= $this->Html->script('home/search') ?>
<?= ''///$this->Html->script('asset-option.js')    ?>
<?= $this->Html->script('jquery.multiselect.js') ?>

<?= $this->Html->script('address-option-search.js') ?>
<script>
    $(document).ready(function () {


        $('#bt_more_search').on('click', function () {
            if ($('#box_more_search').is(":visible")) {
                $('#box_more_search').hide();
            } else {
                $('#box_more_search').show();
            }

        });
    }
    );
</script>