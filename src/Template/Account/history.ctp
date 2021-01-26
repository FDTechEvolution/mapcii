<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="container-fluid g-py-50">
            <h1 class="h2 mb-0 prompt-600">บัญชีของฉัน</h1>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div id="account" class="row">
        <div class="col-lg-10 order-lg-2 g-mb-70">
            <router-view></router-view>
        </div>
        <div class="col-md-2 col-lg-2 order-lg-1 g-mb-70">
            <menu-account></menu-account>
        </div>
    </div>
</div>

<?= $this->Html->css('account/style.css') ?>
<?=$this->Html->script('account/main.js', ['type' => 'module'])?>
