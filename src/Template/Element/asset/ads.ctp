<?php 
    $exType = explode('-', $_GET['type']);
    $combineType = $exType[0].$exType[1];
?>

<div class="col-lg-12 g-mb-0 g-px-0 mt-2" id="asset-ads" class="asset-ads-style">
    <button class="btn btn-block text-white rounded-0 mb-1" style="line-height: 16px; background-color: #ff8027; letter-spacing: 1px;" @click="buyAdAssetLink"><strong>AD ประกาศลงโฆษณา<br/><?php echo $combineType; ?></strong></button>
    <div v-for="(ads, index) in assetAds">
        <article class="row no-gutters g-mb-15 ads-asset-banner">
            <div class="col-lg-4 g-bg-img-hero g-min-height-100" :style="backgroundImages[index]"></div>
            <div class="col-lg-8">
                <asset-content
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
                    :favorites = 'favorites'
                ></asset-content>
            </div>
        </article>
    </div>
</div>

<style>
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
    .ads-asset-banner:before {
        content: 'AD';
        position: absolute;
        z-index: 30;
        font-size: 11px;
        font-weight: 600;
        padding: 0px 4px;
        border-radius: 3px;
        color: #fff;
        background-color: #aa0000;
    }
    .asset-ads-style {
        height: 500px;
        overflow-y: auto;
    }
    .asset-ads-style::-webkit-scrollbar {
        width: 7px;
    }
    .asset-ads-style::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    .asset-ads-style::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 5px;
    }
    .asset-ads-style::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    p.is-show-discount {
        position: absolute;
        background-color: #dd0000;
        font-size: 10px;
        right: 0px;
        top: -5px;
        padding: 0 5px;
        border-radius: 3px;
        color: #fff;
    }
</style>

<?= $this->Html->script('property/asset-ads.js', ['type' => 'module'])?>