<style>
    /* ===== Horizontal Rule ===== */
    .rule {
        margin: 10px 0;
        border: none;
        height: 1.5px;
        background-image: linear-gradient(left, #f0f0f0, #c9bbae, #f0f0f0);
    }

    /* ===== Select Box ===== */
    .sel {
        font-size: 1rem;
        display: inline-block;

        width: 100%;
        background-color: transparent;
        position: relative;
        cursor: pointer;
    }

    .sel::before {
        position: absolute;
        content: '\f063';
        font-family: 'FontAwesome';
        font-size: 1.3rem;
        color: #000000;
        right: 20px;
        top: calc(50% - 0.5em);
    }

    .sel.active::before {
        transform: rotateX(-180deg);
    }

    .sel__placeholder {
        display: block;

        font-size: 1.2em;
        padding: 0.2em 0.5em;
        text-align: left;
        pointer-events: none;
        user-select: none;
        visibility: visible;
    }

    .sel.active .sel__placeholder {
        visibility: hidden;
    }

    .sel__placeholder::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0.2em 0.5em;
        content: attr(data-placeholder);
        visibility: hidden;
    }

    .sel.active .sel__placeholder::before {
        visibility: visible;
    }

    .sel__box {
        position: absolute;
        top: calc(100% + 4px);
        left: -4px;
        display: none;
        list-style-type: none;
        text-align: left;
        font-size: 1em;
        background-color: #FFF;
        width: calc(100% + 8px);
        box-sizing: border-box;
    }

    .sel.active .sel__box {
        display: block;
        animation: fadeInUp 500ms;
    }

    .sel__box__options {
        display: list-item;
        font-size: 1.5em;
        padding: 0.5em 1em;
        user-select: none;
    }

    .sel__box__options::after {
        content: '\f00c';
        font-family: 'FontAwesome';
        font-size: 0.5em;
        margin-left: 5px;
        display: none;
    }

    .sel__box__options.selected::after {
        display: inline;
    }

    .sel__box__options:hover {
        background-color: #ebedef;
    }

    /* ----- Select Box Black Panther ----- */
    .sel {
        border-bottom: 2px solid rgba(0, 0, 0, 0.7);
    }

    .sel--black-panther {
        z-index: 3;
    }

    /* ----- Select Box Superman ----- */
    .sel--superman {
        /*   display: none; */
        z-index: 2;
    }

    /* ===== Keyframes ===== */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
        }

        to {
            opacity: 1;
            transform: none;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }
</style>

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
<section class="dzsparallaxer auto-init height-is-based-on-content use-loading" data-options='{direction: "reverse", settings_mode_oneelement_max_offset: "150"}'>
    <!-- Parallax Image -->
    <div class="divimage dzsparallaxer--target w-100 u-bg-overlay g-bg-white-opacity-0_4--after" style="height: 110%; background-image: url(<?= SITE_URL ?>img/cover/home_cover.jpg);"></div>
    <!-- End Parallax Image -->

    <div class="container u-bg-overlay__inner  g-pt-50 g-pb-10">
        <h2 class="h1 g-color-white text-center g-font-weight-600 mx-auto g-mb-0"><span class="">แมพซี่ ดีที่สุด</span></h2>

        <!-- Search Form -->
        <?= $this->Form->create('', ['id' => 'frm_search','method'=>'GET']) ?>
        <div class="g-pa-30">
            <div class="row g-mx-0--md">
                <div class="col-md-8 g-px-0--md g-mb-30">
                    <div class="input-group u-shadow-v21 g-bg-white rounded-0 ">
                        <div id="form-icon-location-pin" class="input-group-append">
                            <span class="input-group-text rounded-0 border-0 g-font-size-16 g-color-gray-light-v1"><i class="icon-location-pin g-pos-rel g-top-1 g-px-1"></i></span>
                        </div>
                        <input name="search_text" class="form-control rounded-0 g-px-20 g-py-12" type="text" placeholder="ชื่อเมือง,โครงการ หรือสถานที่สำคัญ" aria-label="City, Zip or Country" aria-describedby="form-icon-location-pin">
                    </div>

                </div>
                <!-- Button Group -->
                <div class="col-md-4 g-px-0--md g-mb-30">
                    <div class="input-group-btn">
                        <select name="search_province_id[]" multiple id="search_province_id" class="form-control rounded-0">

                        </select>
                    </div>
                </div>
                <div class="col-md-3 g-px-0--md g-mb-30" style="display: none;">
                    <div class="input-group-btn">
                        <select name="search_district_id[]" multiple id="search_district_id" class="form-control rounded-0">

                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-2 g-mb-30">
                    <a href="#!" class="btn btn-md u-btn-outline-teal g-font-weight-600 g-letter-spacing-0_5 text-uppercase g-brd-2 rounded-0 g-mr-10 g-mb-15"> Flat Style
  <i class="fa fa-check-circle g-ml-3"></i>
</a>
                    <!-- Button Group -->
                    <div class="input-group-btn">
                        <select class="js-custom-select g-bg-white u-select-v1 w-100 g-brd-gray-light-v3 g-color-main g-color-primary--hover g-py-12" required
                                data-placeholder="ทั้งเช่าและขาย"
                                data-open-icon="fa fa-angle-down"
                                data-close-icon="fa fa-angle-up" name="asset_for">
                            <option value="all"></option>
                            <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="เช่า">เช่า</option>
                            <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="ขาย">ขาย</option>

                        </select>
                    </div>
                    <!-- End Button Group -->
                </div>

                <div class="col-6 col-lg-3 g-mb-30">
                    <!-- Button Group -->
                    <div class="input-group-btn">
                        <select name="search_asset_type_id[]" multiple id="search_asset_type_id" class="form-control rounded-0">

                        </select>
                    </div>
                    <!-- End Button Group -->
                </div>
                <div class="col-sm-6 col-lg-4 g-mb-30">
                    <h2 class="h6 g-font-weight-600 g-color-white mb-4">ช่วงราคา (<span id="rangeSliderAmount3">0</span>) บาท</h2>
                    <div id="rangeSlider1" class="u-slider-v1-3"
                         data-result-container="rangeSliderAmount3"
                         data-range="true"
                         data-default="0, 100000000"
                         data-min="0"
                         data-max="100000000" data-step="500000">

                    </div>
                    <?= $this->Form->hidden('price_start', ['id'=>'price_start','value' => '0']) ?>
                    <?= $this->Form->hidden('price_end', ['id'=>'price_end','value' => '10000000']) ?>
                </div>
                <div class="col-md-3 g-mb-30">
                    <!-- Button Group -->
                    <div class="input-group-btn">
                        <select name="orderby" class="js-custom-select g-bg-white u-select-v1 w-100 g-brd-gray-light-v3 g-color-main g-color-primary--hover g-py-12" required
                                data-placeholder=""
                                data-open-icon="fa fa-angle-down"
                                data-close-icon="fa fa-angle-up">
                            <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="date">เรียงตามวันที่ลงประกาศ</option>
                            <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="price">เรียงตามราคา</option>
                            <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="land_size_asc">เรียงตามขนาดที่ดินจากน้อยไปหามาก</option>
                            <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="land_size_desc">เรียงตามขนาดที่ดินจากมากไปหาน้อย</option>
                            <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="bedroom">เรียงตามจํานวนห้องนอน</option>

                        </select>
                    </div>
                    <!-- End Button Group -->
                </div>


            </div>

            <div class="text-right">
                <button class="btn btn-block u-btn-primary g-color-white g-bg-primary-dark-v1--hover g-font-weight-600 rounded-0 g-px-18 g-py-15" type="submit">
                    ค้นหา
                </button>
            </div>
        </div>
        <?= $this->Form->end() ?>

        <?= $this->element('banner/top') ?>
    </div>
    
</section>

<?= $this->element('asset_with_map') ?>

<?= $this->Html->script('map.js') ?>
<?= $this->Html->script('home.js') ?>
<?= ''//$this->Html->script('asset-option.js') ?>

<?= $this->Html->script('home/search') ?>
<?= ''///$this->Html->script('asset-option.js') ?>
<?= $this->Html->script('jquery.multiselect.js') ?>

<?= $this->Html->script('address-option-search.js') ?>
<script>
    $(document).ready(function () {
        $.HSCore.components.HSSlider.init('#rangeSlider1');
    });
</script>