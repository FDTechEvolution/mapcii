<div class="g-pl-0 g-pr-0" id="div_banner_top">
    <div id="banner-b" class="row">
        <div class="col-md-12">
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" data-interval="4000">
                <div v-if="noBanner">
                    <a :href="linkPackage" class="div-type text-center g-font-size-11 g-px-10 g-py-3" target="_blank">{{noBanner.name}}<br>ลงโฆษณา</a>
                    <img class="d-block w-100" src="<?= SITE_URL . 'img/banner-side-on-null.jpg' ?>">
                </div>
                <div v-else class="carousel-inner">
                    <a :href="linkPackage" class="div-type text-center g-font-size-11 g-px-10 g-py-3" target="_blank">{{package}}<br>ลงโฆษณา</a>
                    <div class="carousel-item" v-for="(imgbanner, index) in imgBanners" :class="{active : index == 0}"><img  class="d-block w-100" :src="imgbanner"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    new Vue ({
        el: '#banner-b',
        data () {
            return {
                imgBanners: [],
                package: null,
                noBanner: null,
                linkPackage: null
            }
        },
        mounted () {
            axios.get(apiurl + 'api-banners/load-banner-ad?package=b')
            .then((response) => {
                if(response.data.status === 200) {
                    this.imgBanners = response.data.bannerlinelist
                    this.package = response.data.bannertype
                    this.linkPackage = siteurl + 'advertisements/package-banner-b#/'
                    // this.linkPackage = response.data.bannerlinelist[0].banner.payment.package.id
                }else if(response.data.status === 100) {
                    this.noBanner = response.data.message
                    this.linkPackage = siteurl + 'advertisements/package?b=' + response.data.message.id
                }
            })
            .catch(e => {
                console.log(e)
            })
        }
    })
</script>