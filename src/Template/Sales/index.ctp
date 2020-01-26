<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <!-- Breadcrumbs -->
        <div class="container-fluid g-py-50">

            <h1 class="h2 mb-0">รายการประกาศสำหรับขาย</h1>
        </div>

    </div>
</div>
<div class="container-fluid">
    <div class="row d-flex align-items-center">
        <div class="col-md-7 col-lg-6 g-mb-30">
            <div class="d-flex align-items-center">
                
            </div>
        </div>

        <div class="col-md-5 col-lg-6 g-mb-30">
            <div class="d-flex align-items-center float-md-right">
                <h2 class="h6 g-font-weight-600 mr-4 mb-0">เรียงตาม:</h2>

                <!-- Input Group -->
                <div class="input-group-btn">
                    <select class="js-custom-select u-select-v1 g-min-width-150 g-brd-none g-bg-secondary g-color-main g-color-primary--hover g-py-12" required="" data-placeholder="วันที่ลงประกาศ" data-open-icon="fa fa-angle-down" data-close-icon="fa fa-angle-up" style="display: none;">
                        <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="BE">วันที่ลงประกาศ</option>
                        <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="TR">ราคา</option>
                        <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="PR">ขนาดที่ดินจากน้อยไปหามาก</option>
                        <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="PR">ขนาดที่ดินจากมากไปหาน้อย</option>
                        <option class="g-brd-none g-color-main g-color-white--hover g-color-white--active g-bg-primary--hover g-bg-primary--active" value="PR">จำนวนห้องนอน</option>
                    </select>
                </div>
                <!-- End Input Group -->
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-lg-9 order-lg-2 g-mb-70" id="div_asset_list">
            <div class="row" id="div_no_asset">
                <div class="col-md-12 g-brd-around g-brd-gray-light-v3 text-center g-py-30">
                    <h3>ยังไม่มีประกาศ</h3>
                </div>
                
            </div>
        </div>

        <div class="col-md-5 col-lg-3 order-lg-1 g-mb-70">
            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <h2 class="h6 g-font-weight-600 mb-4">Property Status</h2>

                    <ul class="list-unstyled g-font-weight-500 mb-0">
                        <li class="g-py-2">
                            <?=$this->Html->link('<i class="mr-1 fa fa-caret-right"></i> สำหรับเช่า',['controller'=>'rent'],['escape'=>false])?>
                        </li>
                        <li class="g-py-2">
                            <?=$this->Html->link('<i class="mr-1 fa fa-caret-right"></i> สำหรับขาย',['controller'=>'sales'],['escape'=>false])?>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <h2 class="h6 g-font-weight-600 mb-4">Property Type</h2>

                    <ul class="list-unstyled g-font-weight-500 mb-0">
                        <?php foreach ($assetTypes['types'] as $item): ?>
                        <li class="g-py-2">
                            <?=$this->Html->link('<i class="mr-1 fa fa-caret-right"></i> '.$item['name'],['controller' => 'assets', 'action' => 'listview', 'type' =>$item['name'],'id'=>$item['id']],['escape'=>false])?>
                           
                        </li>
                        <?php endforeach;?>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</div>
<?= $this->Html->script('asset/listview.js') ?>
<script>
    $(document).ready(function () {
        $.get(apiurl + 'api-assets/avaliable-asset?for=ขาย').done(function (res) {
            res = JSON.parse(res);
            if(res.list.length >0){
                $('#div_no_asset').hide();
            }
            $.each(res.list, function (key, value) {
                appendAssetList(value);
            });
        });
    });
</script>