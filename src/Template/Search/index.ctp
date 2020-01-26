
<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero g-mb-20" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="g-pt-20">

            <h1 class="h2 mb-0 prompt-600 g-color-primary">ค้นหาสินทรัพย์</h1>
            <div class="row">
                <div class="col-md-12">
                    <?= $this->element('search_form_v1') ?>
                </div>
                <div class="col-md-4" id="" style="display: none;">
                    <image src="http://mna.org/assets/MNPublicNoticeAds_300x2504.jpg" class="w-100"/>
                </div>
            </div>
        </div>
    </div>

</div>
<?= $this->Html->script('asset.js') ?>

<?= $this->element('asset_with_map') ?>

<script>

    $(document).ready(function () {
        
    

    });
</script>
