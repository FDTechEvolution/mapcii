<?= $this->Html->css('/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css') ?>
<?= $this->Html->css('/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css') ?>
<div class="container g-pl-0 g-pr-0 g-pt-10 g-mb-20" id="div_banner_top">
    <div id="banner-top" class="row">
        <div class="col-md-12">
            <div class="owl-carousel owl-theme">
                <!-- <div><image src="<?= SITE_API . 'img/uploads/banner/1000x120/ad-1.jpeg' ?>" class="w-100" /></div>
                <div><image src="<?= SITE_API . 'img/uploads/banner/1000x120/ad-2.jpeg' ?>" class="w-100" /></div> -->
            </div>
        </div>

        <div class="col-md-12">
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" data-interval="4000">
                <div v-if="noBanner">
                    <a :href="linkPackage" class="div-type text-center g-font-size-11 g-px-10 g-py-3" target="_blank">{{noBanner.name}}<br>ลงโฆษณา</a>
                    <img class="d-block w-100" src="<?= SITE_URL . 'img/banner-top-on-null.jpg' ?>">
                </div>
                <div v-else class="carousel-inner">
                    <a :href="linkPackage" class="div-type text-center g-font-size-11 g-px-10 g-py-3" target="_blank">{{package}}<br>ลงโฆษณา</a>
                    <div class="carousel-item" v-for="(imgbanner, index) in imgBanners" :class="{active : index == 0}"><img class="d-block w-100" :src="imgbanner.image.url"></div>
                </div>
                
            </div>
        </div>

    </div>
</div>

<style>
    .div-type {
        background-color: rgba(255,255,255,0.6);
        color: #0011dd;
        border-radius: 0 0 5px 0;
        position: absolute;
        z-index: 30;
        line-height: 12px;
    }
</style>

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
                imgBanners: [],
                package: null,
                noBanner: null,
                linkPackage: null
            }
        },
        mounted () {
            axios.get(apiurl + 'api-banners/loadbannerimages?position=top&limit=10&package=a')
            .then((response) => {
                if(response.data.status === 200) {
                    this.imgBanners = response.data.bannerlinelist
                    this.package = response.data.bannerlinelist[0].banner.payment.package.name
                    this.linkPackage = response.data.bannerlinelist[0].banner.payment.package.id
                }else if(response.data.status === 100) {
                    this.noBanner = response.data.message
                    this.linkPackage = siteurl + 'advertisements/package?b=' + response.data.message.id
                    // console.log(this.noBanner)
                }
            })
            .catch(e => {
                console.log(e)
            })
        },
        methods: {

        }
    })
</script>