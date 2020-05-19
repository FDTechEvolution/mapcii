<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="container g-pt-10">

            <h1 class="h2 mb-0 prompt-600 g-color-primary">ประกาศขาย</h1>
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
        <div class="col-md-8 g-px-0 g-pr-5">
            <div id="g-map">
                <div id="map" ref="map">
                    <!-- <map-marker
                        v-for="(asset, index) in assets" 
                        :lat="parseFloat(asset.address.latitude)" 
                        :lng="parseFloat(asset.address.longitude)"
                    >
                    </map-marker> -->
                    <map-info-window 
                        v-for="(ads, index) in assetAds" 
                        :lat="parseFloat(ads.asset.address.latitude)" 
                        :lng="parseFloat(ads.asset.address.longitude)"
                    >
                        <div class="row" v-bind:class="{ activeFullInfowindow : classObj.infowindowActive != ads.asset.id}">
                            <div class="col-md-2">
                                <img width="40" class="g-mt-3 g-pr-5" :src="assetimageAds[index]">
                            </div>
                            <div class="col-md-10">
                                <div class="row">
                                    <div class="col-md-12">
                                        <a class="asset-a-marker" :href="'<?= SITE_URL ?>property/view?id=' + ads.asset.id">
                                            <span class="asset-content-marker g-font-size-12">{{ads.asset.name}}</span>
                                        </a>
                                        <span class="asset-content-price g-font-size-12"><strong>ราคา :</strong> {{assetprice(ads.asset.price)}} ล้านบาท</span>
                                    </div>
                                </div>
                            </div>
                            <span class="close-btn-infowindow style-pointer" @click="closeDetailAsset()">X</span>
                        </div>
                        <div v-if="province == null" class="row g-px-10 g-py-1 style-pointer" v-bind:class="{ activePriceInfowindow : classObj.infowindowPrice == ads.asset.id}" @click="getDetailAsset(ads.asset.id)">
                            <div class="col-md-12">
                                <strong style="font-weight: 700;"><span class="price-color-ads blinking"><i class="fa fa-star color-gold"></i> {{assetprice(ads.asset.price)}}</span> ลบ.</strong>
                            </div>
                        </div>
                        <div v-else class="row g-px-10 g-py-1 style-pointer" v-bind:class="{ activePriceInfowindow : classObj.infowindowPrice == ads.asset.id}" @click="getDetailAsset(ads.asset.id)">
                            <div v-if="search_district_id == ''" class="col-md-12">
                                <strong v-if="ads.position.position == 'province'" style="font-weight: 700;"><span class="price-color-ads blinking"><i class="fa fa-star color-gold"></i> {{assetprice(ads.asset.price)}}</span> ลบ.</strong>
                                <strong v-if="ads.position.position == 'district'" style="font-weight: 700;"><span class="price-color">{{assetprice(ads.asset.price)}}</span> ลบ.</strong>
                            </div>
                            <div v-if="search_district_id != ''" class="col-md-12">
                                <strong v-if="ads.asset.address.district_id == search_district_id" style="font-weight: 700;"><span class="price-color-ads blinking"><i class="fa fa-star color-gold"></i> {{assetprice(ads.asset.price)}}</span> ลบ.</strong>
                            </div>
                        </div>
                    </map-info-window>

                    <map-info-window 
                        v-for="(asset, index) in assets" 
                        :lat="parseFloat(asset.address.latitude)" 
                        :lng="parseFloat(asset.address.longitude)"
                    >
                        <div class="row" v-bind:class="{ activeFullInfowindow : classObj.infowindowActive != asset.id}">
                            <div class="col-md-2">
                                <img width="40" class="g-mt-3 g-pr-5" :src="assetimages[index]">
                            </div>
                            <div class="col-md-10">
                                <div class="row">
                                    <div class="col-md-12">
                                        <a class="asset-a-marker" :href="'<?= SITE_URL ?>property/view?id=' + asset.id">
                                            <span class="asset-content-marker g-font-size-12">{{asset.name}}</span>
                                        </a>
                                        <span class="asset-content-price g-font-size-12"><strong>ราคา :</strong> {{assetprice(asset.price)}} ล้านบาท</span>
                                    </div>
                                </div>
                            </div>
                            <span class="close-btn-infowindow style-pointer" @click="closeDetailAsset()">X</span>
                        </div>
                        <div class="row g-px-10 g-py-1 style-pointer" v-bind:class="{ activePriceInfowindow : classObj.infowindowPrice == asset.id}" @click="getDetailAsset(asset.id)">
                            <div class="col-md-12">
                                <strong style="font-weight: 700;"><span class="price-color">{{assetprice(asset.price)}}</span> ลบ.</strong>
                            </div>
                        </div>
                    </map-info-window>
                </div>
            </div>
        </div>
        
        <div class="col-md-4 g-px-0">
            <div class="row">
                <div class="col-lg-12 g-mb-0">
                    <?= $this->element('asset/ads') ?>
                </div>
                <div class="col-lg-12 g-mb-10">
                    <?= $this->element('banner/side_b') ?>
                </div>
                <div class="col-lg-12 g-mb-70" id="div_assetlist_">
                    <h3>ประกาศล่าสุด</h3>
                    <hr class="hr-margin-0-10">
                    <div id="avaliable-assets" class="asset-style">
                        <div v-for="(asset, index) in assets">
                            <article class="row no-gutters g-mb-15">
                                <div class="col-lg-5 g-bg-img-hero g-min-height-100" :style="backgroundImages[index]"></div>
                                <div class="col-lg-7">
                                    <div class="g-brd-around g-brd-gray-light-v3 g-bg-white">
                                        <div class="g-pa-10 g-pt-0">
                                            <strong class="g-color-primary--hover g-font-size-13 g-font-weight-700"><a class="asset-content-name" :href="'<?= SITE_URL ?>property/view?id=' + asset.id">{{asset.name}}</a></strong>
                                            <p class="g-color-text g-font-weight-500 g-font-size-13 mb-0"><strong>ประกาศ :</strong> <span class="g-color-text g-font-weight-400">{{driffday(asset.startdate)}} วันที่ผ่านมา</span></p>
                                        </div>
                                        <ul class="d-flex list-inline align-items-center g-brd-top g-brd-gray-light-v3 mb-0">
                                            <li class="list-inline-item col-2 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-5 mr-0">
                                                <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i>{{asset.bedroom}}
                                            </li>
                                            <li class="list-inline-item col-2 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-5 mr-0">
                                                <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i>{{asset.bathroom}}
                                            </li>
                                            <li class="list-inline-item col-6 g-font-weight-600 g-font-size-14 text-right g-color-red g-px-0 g-pr-5 g-py-5 mr-0">{{formatNumber(asset.price)}} ฿</li>
                                            <li class="list-inline-item col-2 g-px-0 mr-0">
                                                <a class="d-block g-brd-x g-brd-gray-light-v3 g-color-text g-color-primary g-font-size-17 text-center g-text-underline--none--hover g-py-5">
                                                    <i v-if="favorites.includes(asset.id) == true" class="fa fa-star"></i>
                                                    <i v-else class="fa fa-star-o on-cursor-pointer" data-toggle="tooltip" data-placement="top" title="เก็บไว้" @click="addToFavorite(asset.id)"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
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
    #map {
        min-height: 870px;
        height: auto;
        max-height: 1200px;
        background: #ddd;
    }
    .asset-content-marker {
        text-overflow: ellipsis;
        overflow: hidden; 
        width: 140px;
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
</style>

<?= $this->Html->script('map.js') ?>
<?= $this->Html->script('asset-with-map.js') ?>
<?= $this->Html->script('asset.js') ?>
<?= $this->Html->script('property/main.js')?>
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