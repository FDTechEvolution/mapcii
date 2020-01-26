

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

<?= $this->Form->create('', ['id' => 'frm_search', 'url' => ['controller' => 'search']]) ?>
<div class="g-bg-black-opacity-0_7 g-pt-25 g-px-10">
    <div class="row g-mx-0--md">
        <div class="col-md-3 g-px-0--md">
            <div class="input-group u-shadow-v21 g-bg-white rounded-0 ">
                <div id="form-icon-location-pin" class="input-group-append">
                    <span class="input-group-text rounded-0 border-0 g-font-size-16 g-color-gray-light-v1"><i class="icon-location-pin g-pos-rel g-top-1 g-px-1"></i></span>
                </div>
                <input name="hello" class="form-control rounded-0 g-px-20 g-py-12" type="text" placeholder="ชื่อเมือง,โครงการ หรือสถานที่สำคัญ" aria-label="City, Zip or Country" aria-describedby="form-icon-location-pin">
            </div>

        </div>
        <!-- Button Group -->
        <div class="col-md-2 g-px-0--md">
            <div class="input-group-btn">
                <select name="search_province_id[]" multiple id="search_province_id" class="form-control rounded-0">

                </select>
            </div>
        </div>

        <div class="col-md-4 g-mb-30">
            <h2 class="h6 g-font-weight-600 g-color-white mb-4">ช่วงราคา (<span id="rangeSliderAmount3">0</span>) บาท</h2>
            <div id="rangeSlider1" class="u-slider-v1-3"
                 data-result-container="rangeSliderAmount3"
                 data-range="true"
                 data-default="0, 3000000"
                 data-min="0"
                 data-max="10000000" data-step="500000">

            </div>
            <?=$this->Form->hidden('price_start',['value'=>'0'])?>
            <?=$this->Form->hidden('price_end',['value'=>'3000000'])?>
        </div>
        <div class="col-md-2 g-px-0--md">
            <!-- Button Group -->
            <div class="input-group-btn">
                <select name="orderby" class="js-custom-select g-bg-white u-select-v1 w-100 g-brd-gray-light-v3 g-color-main g-color-primary--hover g-py-12" required
                        data-placeholder=""
                        data-open-icon="fa fa-angle-down"
                        data-close-icon="fa fa-angle-up">
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="FR">เรียงตามวันที่ลงประกาศ</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="FS">เรียงตามราคา</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="FS">เรียงตามขนาดที่ดินจากน้อยไปหามาก</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="FS">เรียงตามขนาดที่ดินจากมากไปหาน้อย</option>
                    <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="FS">เรียงตามจํานวนห้องนอน</option>

                </select>
            </div>
            <!-- End Button Group -->
        </div>
        <div class="col-md-1 g-px-0--md">
            <button class="btn btn-block u-btn-primary g-color-white g-bg-primary-dark-v1--hover g-font-weight-600 rounded-0 g-px-18 g-py-12" type="submit">
                ค้นหา
            </button>
        </div>

    </div>
</div>
<?= $this->Form->end() ?>

<?= $this->Html->script('jquery.multiselect.js') ?>

<?= $this->Html->script('address-option-search.js') ?>
<script>
    $(document).ready(function () {
        $.HSCore.components.HSSlider.init('#rangeSlider1');
    });
</script>