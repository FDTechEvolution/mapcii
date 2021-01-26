<section class="dzsparallaxer auto-init height-is-based-on-content use-loading mode-scroll loaded dzsprx-readyall g-overflow-hidden" data-options="{direction: 'reverse', settings_mode_oneelement_max_offset: '150'}">
    <!-- Parallax Image -->
    <div style="height: 200%; background-image: url(&quot;../../assets/img/bg/pattern6-2.png&quot;); transform: translate3d(0px, -103.491px, 0px);" class="divimage dzsparallaxer--target w-100 g-bg-repeat g-bg-gray-light-v4"></div>
    <!-- End Parallax Image -->

    <div class="container g-z-index-1 g-py-30">
        <h1 class="g-font-weight-300 g-letter-spacing-1 g-mb-15">รายการโฆษณาของคุณ</h1>
        <div class="lead g-font-weight-400 g-line-height-2 g-letter-spacing-0_5">
    </div>
</section>

<section id="isadvert" class="g-py-10 g-mb-40">
    <div class="container">
        <div class="row">
            <div class="col-md-3 g-mt-20">
                <?= $this->element('advertisement/left_sidebar') ?>
            </div>
            <div class="col-md-9 g-mt-20">
                
                <router-view></router-view>

            </div>
        </div>
    </div>
</section>

<style>
    .package-intro {
        display: none;
    }
</style>

<?= $this->Html->css('isadvert/style.css') ?>
<?= $this->Html->script('isadvert/main.js', ['type' => 'module']) ?>