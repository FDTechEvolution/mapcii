<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="container pt-5">
            <?php 
                if(isset($_GET['type'])) {
                    $isType = $_GET['type'];
                    $exType = explode('-', $isType);
                    $setType = $exType[0].$exType[1];
                }
                $isTypeName = isset($_GET['is']) ? $_GET['is'] : '';
            ?>
            <h1 class="h2 mb-0 prompt-600 g-color-primary">ประกาศ<?php echo isset($_GET['type']) ? $setType : $isTypeName; ?></h1>
            <div class="row">
                <div class="col-md-12 g-px-0">
                    <?= $this->element('search_form_a_1') ?>
                </div>
            </div>
        </div>
    </div>
</div>

<?= $this->element('banner/top') ?>

<div class="container">
    <div class="row">
        <div class="col-md-9 g-px-0 g-pr-5">
            <div id="g-map">
                <div id="map" ref="map">
                    <!-- <map-marker
                        v-for="(asset, index) in assets" 
                        :lat="parseFloat(asset.address.latitude)" 
                        :lng="parseFloat(asset.address.longitude)"
                    >
                    </map-marker> -->

                    <!-- ประกาศโฆษณา -------------------------------------------------->
                    <map-info-window 
                        v-for="(ads, index) in assetAds" 
                        :lat="parseFloat(ads.asset.address.latitude)" 
                        :lng="parseFloat(ads.asset.address.longitude)"
                    >
                        <div class="row row-to-fix" v-bind:class="{ activeFullInfowindow : classObj.infowindowActive != ads.asset.id}">
                            <div class="col-md-4 px-1 px-in-row-to-fix">
                                <a class="asset-a-marker" :href="'property/view?id=' + ads.asset.id">
                                    <img style="width: 100%;" class="g-mt-5 g-pr-5" :src="assetimageAds[index]" :title="ads.asset.name">
                                </a>
                            </div>
                            <div class="col-md-8 px-1 px-in-row-to-fix">
                                <div class="row">
                                    <div class="col-md-12">
                                        <map-info-windown-content
                                            :id = 'ads.asset.id'
                                            :name = 'ads.asset.name'
                                            :price = 'ads.asset.price'
                                            :discount = 'ads.asset.discount'
                                            :rental = 'ads.asset.rental'
                                            :issales = 'ads.asset.issales'
                                            :isrent = 'ads.asset.isrent'
                                            :bedroom = 'ads.asset.bedroom'
                                            :bathroom = 'ads.asset.bathroom'
                                            :modified = 'ads.asset.modified'
                                        ></map-info-windown-content>
                                    </div>
                                </div>
                            </div>
                            <span class="close-btn-infowindow style-pointer" @click="closeDetailAsset()">X</span>
                        </div>
                        <div v-if="province == null" class="row g-px-10 g-py-1 style-pointer" v-bind:class="{ activePriceInfowindow : classObj.infowindowPrice == ads.asset.id}" @click="getDetailAsset(ads.asset.id)">
                            <div class="col-md-12" style="padding: 0 10px;">
                                <slot v-if="ads.asset.issales === 'Y'">
                                    <strong style="font-weight: 700;"><span class="price-color-ads blinking"><i class="fa fa-star color-gold"></i> {{priceSplitToFixed(assetprice(ads.asset.price, ads.asset.discount))}}</span> ลบ.</strong>
                                </slot>
                                <slot v-else>
                                    <strong style="font-weight: 700;"><span class="price-color-ads blinking"><i class="fa fa-star color-gold"></i>{{formatNumber(ads.asset.rental)}}</span><small>/เดือน</small></strong>
                                </slot>
                            </div>
                        </div>
                        <div v-else class="row g-px-10 g-py-1 style-pointer" v-bind:class="{ activePriceInfowindow : classObj.infowindowPrice == ads.asset.id}" @click="getDetailAsset(ads.asset.id)">
                            <div v-if="search_district_id == ''" class="col-md-12" style="padding: 0 10px;">
                                <slot v-if="ads.asset.issales === 'Y'">
                                    <strong style="font-weight: 700;"><span class="price-color-ads blinking"><i class="fa fa-star color-gold"></i> {{priceSplitToFixed(assetprice(ads.asset.price, ads.asset.discount))}}</span> ลบ.</strong>
                                </slot>
                                <slot v-else>
                                    <strong style="font-weight: 700;"><span class="price-color-ads blinking"><i class="fa fa-star color-gold"></i>{{formatNumber(ads.asset.rental)}}</span><small>/เดือน</small></strong>
                                </slot>
                            </div>
                            <div v-if="search_district_id != ''" class="col-md-12">
                                <slot v-if="ads.asset.issales === 'Y'">
                                    <strong v-if="ads.asset.address.district_id == search_district_id" style="font-weight: 700;"><span class="price-color-ads blinking"><i class="fa fa-star color-gold"></i> {{assetprice(ads.asset.price, ads.asset.discount)}}</span> ลบ.</strong>
                                </slot>
                                <slot v-else>
                                    <strong style="font-weight: 700;"><span class="price-color-ads blinking"><i class="fa fa-star color-gold"></i>{{formatNumber(ads.asset.rental)}}</span><small>/เดือน</small></strong>
                                </slot>
                            </div>
                        </div>
                    </map-info-window>

                    <!-- ประกาศธรรมดา ----------------------------------------------------->
                    <map-info-window 
                        v-for="(asset, index) in assets" 
                        :lat="parseFloat(asset.address.latitude)" 
                        :lng="parseFloat(asset.address.longitude)"
                    >
                        <div class="row row-to-fix" v-bind:class="{ activeFullInfowindow : classObj.infowindowActive != asset.id}">
                            <div class="col-md-4 px-1 px-in-row-to-fix">
                                <img style="width: 100%;" class="g-mt-5 g-pr-5" :src="assetimages[index]">
                            </div>
                            <div class="col-md-8 px-1 px-in-row-to-fix">
                                <div class="row">
                                    <div class="col-md-12">
                                        <map-info-windown-content
                                            :id = 'asset.id'
                                            :name = 'asset.name'
                                            :price = 'asset.price'
                                            :discount = 'asset.discount'
                                            :rental = 'asset.rental'
                                            :issales = 'asset.issales'
                                            :isrent = 'asset.isrent'
                                            :bedroom = 'asset.bedroom'
                                            :bathroom = 'asset.bathroom'
                                            :modified = 'asset.modified'
                                        ></map-info-windown-content>
                                    </div>
                                </div>
                            </div>
                            <span class="close-btn-infowindow style-pointer" @click="closeDetailAsset()">X</span>
                        </div>
                        <div class="row g-px-10 g-py-1 style-pointer" v-bind:class="{ activePriceInfowindow : classObj.infowindowPrice == asset.id}" @click="getDetailAsset(asset.id)">
                            <div class="col-md-12" style="padding: 0 10px;">
                                <slot v-if="asset.issales === 'Y'">
                                    <strong style="font-weight: 700;"><span class="price-color">{{priceSplitToFixed(assetprice(asset.price, asset.discount))}}</span> ลบ. </strong>
                                </slot>
                                <slot v-else>
                                    <strong style="font-weight: 700;"><span class="price-color">{{formatNumber(asset.rental)}}</span><small>/เดือน</small></strong>
                                </slot>
                            </div>
                        </div>
                    </map-info-window>
                </div>
            </div>
        </div>
        
        <div class="col-md-3 g-px-0">
            <div class="row">
                <div class="col-lg-12 g-mb-10">
                    <?= $this->element('banner/side_b') ?>
                </div>
                <div class="col-lg-12 g-mb-0">
                    <?= $this->element('asset/ads') ?>
                </div>
                <div id="avaliable-assets" v-if="!onlyAd" class="col-lg-12 g-mb-70">
                    <div class="asset-style">
                        <div v-for="(asset, index) in assets">
                            <article class="row no-gutters g-mb-15">
                                <div class="col-lg-4 g-bg-img-hero g-min-height-100 bg-asset-on-mobile" :style="backgroundImages[index]"></div>
                                <div class="col-lg-8">
                                    <asset-content
                                        :id = 'asset.id'
                                        :name = 'asset.name'
                                        :price = 'asset.price'
                                        :discount = 'asset.discount'
                                        :rental = 'asset.rental'
                                        :issales = 'asset.issales'
                                        :isrent = 'asset.isrent'
                                        :bedroom = 'asset.bedroom'
                                        :bathroom = 'asset.bathroom'
                                        :modified = 'asset.modified'
                                        :favorites = 'favorites'
                                    ></asset-content>
                                </div>
                            </article>
                        </div>
                        <div v-if="assets == undefined" class="text-center">ไม่มีประกาศ</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<style>
    .container {
        max-width: 80%;
    }
    #g-map {
        height: 100%;
    }
    #map {
        min-height: 1000px;
        height: 100%;
        max-height: 1600px;
        background: #ddd;
    }
    .asset-content-marker {
        text-overflow: ellipsis;
        overflow: hidden; 
        width: 180px;
        white-space: nowrap;
        display: block;
    }
    a.asset-a-marker {
        font-size: 12px;
    }
    .asset-content-price {
        font-size: 10px;
    }
    .gm-style .gm-style-iw-d {
        overflow: hidden !important;
        padding-bottom: 5px;
    }
    .gm-style .gm-style-iw-c {
        padding: 5px;
        border-radius: 5px;
    }
    .activeFullInfowindow {
        display: none;
    }
    .activePriceInfowindow {
        display: none;
    }
    .gm-ui-hover-effect {
        display: none !important;
    }
    .close-btn-infowindow {
        position: absolute;
        right: 0px;
        top: 0px;
        padding: 1px 5px;
    }
    .style-pointer {
        cursor: pointer;
    }
    .price-color {
        color: #333333;
    }
    .price-color-ads {
        color: #dd0000;
    }
    .color-gold{
        color: #DAA520;
    }
    .row-to-fix {
        width: 320px;
        min-height: 60px;
    }
    .blinking{
    animation:blinkingText 1.2s infinite;
    }
    @keyframes blinkingText{
        0%{ color: #000; }
        39%{ color: #333; }
        50%{ color: #B22222; }
        79%{ color: #ff0000; }
        95%{ color: #B22222; }
        100%{ color: #000; }
    }
    button.asset-content-name {
        background: transparent;
        border: none;
        text-align: left;
        cursor: pointer;
        font-size: 13px;
        font-family: 'Sarabun';
        font-weight: 400;
        padding: 0;
        color: #145ebe;
        outline: none;
    }
    button.asset-content-name:hover {
        color: #28a745;
        text-decoration: underline;
    }
    .hr-margin-0-10 {
        margin-top: 0;
        margin-bottom: 10px;
    }
    .on-cursor-pointer {
        cursor: pointer;
    }
    .asset-style {
        height: 500px;
        overflow-y: auto;
        padding-top: 5px;
    }
    .asset-style::-webkit-scrollbar {
        width: 7px;
    }
    .asset-style::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    .asset-style::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }
    .asset-style::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    nav.js-mega-menu.navbar.navbar-expand-lg.g-pa-0.hs-menu-initialized.hs-menu-horizontal .container {
        max-width: 1140px;
    }
    p.is-show-discount-free {
        position: absolute;
        background-color: #dd0000;
        font-size: 12px;
        right: 0px;
        top: -5px;
        padding: 0 7px;
        border-radius: 3px;
        color: #fff;
    }
    @media only screen and (max-width: 600px) {
        .row-to-fix {
            width: 200px;
        }
        .px-in-row-to-fix {
            padding-left: 15px !important;
            padding-right: 15px !important;
        }
    }
</style>

<?= $this->Html->script('map.js') ?>
<?= $this->Html->script('asset-with-map.js') ?>
<?= $this->Html->script('asset.js') ?>
<?= $this->Html->script('property/main.js', ['type' => 'module'])?>
<script>
    $(document).ready(function () {
        var config = {apiurl: apiurl + 'api-assets/type', siteurl: siteurl};
        $.AssetCore.widget.printAssetTypeBar('#ul_asset_type', config);

        $('a[data-id="bt-add-history"]').on('click', function () {
            var asset_id = $(this).attr('data-value');
            var currentA = $(this);
            $.get({
                url: siteurl + 'services/property?action=favorite&id='+asset_id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).done(function (res) {
                res = JSON.parse(res);
                console.log(res);
                if(res.code == 200){
                    currentA.html('<i class="fa fa-star"></i>');
                    //console.log($(this));
                }else{
                    window.location.href = siteurl+'login';
                }
            });
        });
    });
</script>