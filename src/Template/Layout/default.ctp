<!DOCTYPE html>
<html lang="en">
    <head>
        <title>mapcii.com <?= isset($headTitle) ? $headTitle : '' ?></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">

        <link rel="apple-touch-icon" sizes="57x57" href="<?=SITE_URL?>fav.ico/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="<?=SITE_URL?>fav.ico/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="<?=SITE_URL?>fav.ico/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="<?=SITE_URL?>fav.ico/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="<?=SITE_URL?>fav.ico/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="<?=SITE_URL?>fav.ico/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="<?=SITE_URL?>fav.ico/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="<?=SITE_URL?>fav.ico/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="<?=SITE_URL?>fav.ico/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="<?=SITE_URL?>fav.ico/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="<?=SITE_URL?>fav.ico/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="<?=SITE_URL?>fav.ico/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="<?=SITE_URL?>fav.ico/favicon-16x16.png">
       
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="<?=SITE_URL?>fav.ico/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">

        <?= $this->Html->css('style.css') ?>
        <?= $this->Html->css('/assets/vendor/bootstrap/bootstrap.min.css') ?>
        <!-- CSS Implementing Plugins -->
        <?= $this->Html->css('/assets/vendor/icon-awesome/css/font-awesome.min.css') ?>
        <?= $this->Html->css('/assets/vendor/icon-line/css/simple-line-icons.css') ?>
        <?= $this->Html->css('/assets/vendor/icon-line-pro/style.css') ?>
        <?= $this->Html->css('/assets/vendor/icon-hs/style.css') ?>
        <?= $this->Html->css('/assets/vendor/animate.css') ?>

        <?= $this->Html->css('/assets/vendor/dzsparallaxer/dzsparallaxer.css') ?>
        <?= $this->Html->css('/assets/vendor/dzsparallaxer/dzsscroller/scroller.css') ?>
        <?= $this->Html->css('/assets/vendor/dzsparallaxer/advancedscroller/plugin.css') ?>

        <?= $this->Html->css('/assets/vendor/hs-megamenu/src/hs.megamenu.css') ?>
        <?= $this->Html->css('/assets/vendor/hamburgers/hamburgers.min.css') ?>
        <?= $this->Html->css('/assets/vendor/chosen/chosen.css') ?>
        <?= $this->Html->css('/assets/vendor/slick-carousel/slick/slick.css') ?>
        <?= $this->Html->css('/assets/vendor/fancybox/jquery.fancybox.min.css') ?>
        <?= $this->Html->css('/assets/css/styles.multipage-real-estate.css') ?>
        <?= $this->Html->css('/assets/css/unify-core.css') ?>
        <?= $this->Html->css('/assets/css/unify-globals.css') ?>


        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.18.0/jquery.validate.min.js"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=<?= GOOGLE_MAP_API_KEY ?>" async defer></script>
        <?= $this->Html->script('alert.js') ?>
        <script>var siteurl = '<?= SITE_URL ?>'; var apiurl = '<?= SITE_API ?>'; var user_id = '<?= $USERID ?>';</script>

    </head>

    <body>
        <?= $this->element('Layout/header') ?>

        <main class="g-pt-50" style="min-height:700px;">
            <div class="overlay" id="page-load">
                <div class="m-loader mr-4">
                    <svg class="m-circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"></circle>
                    </svg>
                </div>
                <h3 class="l-text">กำลังทำงาน...</h3>
            </div>
            <div class="container-fluid g-pb-10 g-px-0--md">

                <?= $this->fetch('content') ?>
            </div>

        </main>
        <?= $this->element('Layout/footer') ?>

        <?= $this->Html->script('/assets/vendor/jquery-migrate/jquery-migrate.min.js') ?>
        <?= $this->Html->script('/assets/vendor/popper.min.js') ?>


        <!-- JS Implementing Plugins -->
        <?= $this->Html->script('/assets/vendor/hs-megamenu/src/hs.megamenu.js') ?>
        <?= $this->Html->script('/assets/vendor/jquery-ui/ui/widget.js') ?>
        <?= $this->Html->script('/assets/vendor/jquery-ui/ui/widgets/menu.js') ?>
        <?= $this->Html->script('/assets/vendor/jquery-ui/ui/widgets/mouse.js') ?>
        <?= $this->Html->script('/assets/vendor/jquery-ui/ui/widgets/slider.js') ?>
        <?= $this->Html->script('/assets/vendor/chosen/chosen.jquery.js') ?>
        <?= $this->Html->script('/assets/vendor/slick-carousel/slick/slick.js') ?>
        <?= $this->Html->script('/assets/vendor/fancybox/jquery.fancybox.min.js') ?>

        <?= $this->Html->script('/assets/vendor/dzsparallaxer/dzsparallaxer.js') ?>
        <?= $this->Html->script('/assets/vendor/dzsparallaxer/dzsscroller/scroller.js') ?>
        <?= $this->Html->script('/assets/vendor/dzsparallaxer/advancedscroller/plugin.js') ?>


        <!-- JS Unify -->
        <?= $this->Html->script('/assets/js/hs.core.js') ?>
        <?= $this->Html->script('/assets/js/components/hs.header.js') ?>
        <?= $this->Html->script('/assets/js/helpers/hs.hamburgers.js') ?>
        <?= $this->Html->script('/assets/js/components/hs.dropdown.js') ?>
        <?= $this->Html->script('/assets/js/components/hs.slider.js') ?>
        <?= $this->Html->script('/assets/js/components/hs.select.js') ?>
        <?= $this->Html->script('/assets/js/components/hs.carousel.js') ?>
        <?= $this->Html->script('/assets/js/components/hs.popup.js') ?>
        <?= $this->Html->script('/assets/js/components/hs.go-to.js') ?>

        <?= $this->Html->script('utils.js') ?>

        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>


        <script>
            $(document).on('ready', function () {


                $('[data-toggle="tooltip"]').tooltip('show');

                // initialization of HSDropdown component
                $.HSCore.components.HSDropdown.init($('[data-dropdown-target]'), {
                    afterOpen: function () {
                        $(this).find('input[type="search"]').focus();
                    }
                });

                // initialization of range slider
                $.HSCore.components.HSSlider.init('#rangeSlider1');

                // initialization of custom select
                $.HSCore.components.HSSelect.init('.js-custom-select');

                // initialization of carousel
                $.HSCore.components.HSCarousel.init('[class*="js-carousel"]');

                // initialization of popups
                $.HSCore.components.HSPopup.init('.js-fancybox');

                // initialization of go to
                $.HSCore.components.HSGoTo.init('.js-go-to');

                $(document).ready(function () {
                    $('#page-load').hide();
                });
            });

            $(window).on('load', function () {
                // initialization of header
                $.HSCore.components.HSHeader.init($('#js-header'));
                $.HSCore.helpers.HSHamburgers.init('.hamburger');

                // initialization of HSMegaMenu component
                $('.js-mega-menu').HSMegaMenu({
                    event: 'hover',
                    pageContainer: $('.container'),
                    breakpoint: 991
                });
            });

        </script>

    </body>
</html>
