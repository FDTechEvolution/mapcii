
<?= $this->element('banner/top') ?>
<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="container g-pt-10">

            <h1 class="h2 mb-0 prompt-600 g-color-primary">โครงการใหม่</h1>
            <div class="row">
                <div class="col-md-12">
                    <?= $this->element('search_form_v2') ?>
                </div>
            </div>
        </div>
    </div>

</div>
<div class="container">

    <div class="row justify-content-center g-pt-10">
        <div class="col-lg-9 order-lg-2 g-mb-70" id="div_assetlist_">

            <?php foreach ($assets as $key => $asset): ?>
                <article class="row no-gutters g-mb-15">
                    <div class="col-lg-5 g-bg-img-hero g-min-height-200" style="background-image: url('<?= $asset['url'] ?>');"></div>

                    <div class="col-lg-7">
                        <div class="g-brd-around g-brd-top-none g-brd-gray-light-v3 g-bg-white">
                            <ul class="d-flex list-inline g-brd-y g-brd-gray-light-v3 mb-0">
                                <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-10 mr-0">
                                    <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i><?= $asset['bedroom'] ?> ห้องนอน
                                </li>
                                <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-10 mr-0">
                                    <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i><?= $asset['bathroom'] ?> ห้องน้ำ
                                </li>
                                <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-10 mr-0">
                                    <i class="align-middle g-color-text mr-1 icon-real-estate-047 u-line-icon-pro"></i>
                                    963 sqft
                                </li>
                            </ul>
                            <div class="g-pa-10">
                                <strong class="g-color-primary--hover"><?= $this->Html->link($asset['name'], ['controller' => 'property', 'action' => 'view', 'id' => $asset['id']], []) ?></strong>
                                <p class="g-font-size-13 mb-0"><i> <?= h($asset['address']) ?></i></p>
                                <p class="g-color-text g-font-weight-500 g-font-size-13 mb-1">Agency: <a class="g-color-text g-color-primary--hover g-font-weight-400 g-text-underline--none--hover" href="#">Real Estate State</a></p>
                                <p class="g-color-text g-font-weight-500 g-font-size-13 mb-0">Posted: <span class="g-color-text g-font-weight-400">2 days ago</span></p>
                            </div>
                            <ul class="d-flex list-inline align-items-center g-brd-top g-brd-gray-light-v3 mb-0">
                                <li class="list-inline-item col-10 g-font-weight-600 g-font-size-17 text-center g-color-red g-px-0 g-py-7 mr-0"><?= number_format($asset['price']) ?> บาท</li>
                                <li class="list-inline-item col-2 g-px-0 mr-0">
                                    <a class="d-block g-brd-x g-brd-gray-light-v3 g-color-text g-color-primary g-font-size-17 text-center g-text-underline--none--hover g-py-7" href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="" data-original-title="เก็บไว้" data-id="bt-add-history" data-value="<?= $asset['id'] ?>">
                                        <i class="fa fa-star-o"></i>
                                    </a>
                                </li>

                            </ul>
                        </div>
                        <a class="btn btn-block g-brd-gray-light-v3 g-color-main g-bg-secondary rounded-0 g-px-10 g-py-10" href="<?= SITE_URL ?>property/view?id=<?= $asset['id'] ?>">
                            ดูรายละเอียด
                            <i class="align-middle ml-2 fa fa-angle-right"></i>
                        </a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>

        <div class="col-md-5 col-lg-3 order-lg-1 g-mb-70">
            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <h2 class="h6 g-font-weight-600 mb-4">ประเภทอสังหาริมทรัพย์</h2>

                    <ul class="list-unstyled g-font-weight-500 mb-0" id="ul_asset_type">

                    </ul>
                </div>
            </div>
            <!-- End Property Type -->

            <!-- Recently Viewed -->
            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <h2 class="h6 g-font-weight-600 mb-4">รายการแนะนำ</h2>


                </div>

            </div>
        </div>

    </div>
    <div class="row">
        <div class="col-md-12">

            <h3 class="h3 mb-0 prompt-600 g-color-primary">รีวิวโครงการ</h3>
        </div>
    </div>
</div>


<?= $this->Html->script('map.js') ?>
<?= $this->Html->script('asset-with-map.js') ?>
<?= $this->Html->script('asset.js') ?>
<script>
    $(document).ready(function () {


        var config = {apiurl: apiurl + 'api-assets/type', siteurl: siteurl};
        $.AssetCore.widget.printAssetTypeBar('#ul_asset_type', config);

        $('a[data-id="bt-add-history"]').on('click', function () {
            var asset_id = $(this).attr('data-value');
            var currentA = $(this);
            $.get({
                url: siteurl + 'services/property?action=favorite&id=' + asset_id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).done(function (res) {
                res = JSON.parse(res);
                console.log(res);
                if (res.code == 200) {
                    currentA.html('<i class="fa fa-star"></i>');
                    //console.log($(this));
                } else {
                    window.location.href = siteurl + 'login';
                }

            });
        });

    });
</script>