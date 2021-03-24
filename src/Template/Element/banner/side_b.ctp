<?= $this->Html->css('/owlcarousel2-2.3.4/dist/assets/owl.theme.default.min.css') ?>
<?= $this->Html->css('/owlcarousel2-2.3.4/dist/assets/owl.carousel.min.css') ?>
<div class="g-pl-0 g-pr-0" id="div_banner_top">
    <div id="banner-b" class="row">
        <div class="col-md-12">
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" data-interval="4000">
                <div v-if="noBanner">
                    <a :href="linkPackage" class="div-type text-center g-font-size-11 g-px-10 g-py-5" target="_blank">ลงโฆษณา</a>
                    <img class="d-block w-100" src="<?= SITE_URL . 'img/banner-side-on-null.jpg' ?>">
                </div>
                <div v-else class="carousel-inner">
                    <a :href="linkPackage" class="div-type text-center g-font-size-11 g-px-10 g-py-5" target="_blank">ลงโฆษณา</a>
                    <div class="carousel-item" v-for="(imgbanner, index) in imgBanners" :class="{active : index == 0}"><img  class="d-block w-100" :src="imgbanner"></div>
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

<?= $this->Html->script('/owlcarousel2-2.3.4/dist/owl.carousel.min.js') ?>

<script>
    new Vue ({
        el: '#banner-b',
        data () {
            return {
                imgBanners: [],
                package: null,
                noBanner: false,
                linkPackage: null
            }
        },
        mounted () {
            axios.get(apiurl + 'api-banners/load-banner-ad?package=b')
            .then((response) => {
                // console.log(response)
                if(response.data.status === 200) {
                    this.imgBanners = response.data.bannerlinelist
                    this.package = response.data.bannertype
                    this.linkPackage = siteurl + 'advertisements/package-banner-b#/'
                    // this.linkPackage = response.data.bannerlinelist[0].banner.payment.package.id
                }else if(response.data.status === 404) {
                    this.noBanner = true
                    this.linkPackage = siteurl + 'advertisements/package?b=' + response.data.message.id
                }
            })
            .catch(e => {
                console.log(e)
            })
        }
    })
</script>