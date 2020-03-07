<?= $this->Html->css('/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css') ?>
<?= $this->Html->css('/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css') ?>
<div class="container g-pl-0 g-pr-0 g-pt-10 g-mb-0" id="div_banner_top">
    <div id="banner-top" class="row">
        <div class="col-md-12">
            <div class="owl-carousel owl-theme">
                <!-- <div><image src="<?= SITE_API . 'img/uploads/banner/1000x120/ad-1.jpeg' ?>" class="w-100" /></div>
                <div><image src="<?= SITE_API . 'img/uploads/banner/1000x120/ad-2.jpeg' ?>" class="w-100" /></div> -->
                <div v-for="(banner, index) in imgBanners">
                    <div><image class="w-100" v-bind:src="banner.image.url"></div>
                </div>
            </div>
        </div>

    </div>
</div>
<?= $this->Html->script('/OwlCarousel2-2.3.4/dist/owl.carousel.min.js') ?>
<script>
    $(document).ready(function () {
        var owl = $('.owl-carousel');
        owl.owlCarousel({
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true
        });
    });
</script>

<script>
    new Vue ({
        el: '#banner-top',
        data () {
            return {
                imgBanners: []
            }
        },
        mounted () {
            axios.get(apiurl + 'api-banners/loadbannerimages?position=top')
            .then((response) => {
                this.imgBanners = response.data.bannerlinelist
            })
            .catch(e => {
                console.log(e)
            })
        }
    })
</script>