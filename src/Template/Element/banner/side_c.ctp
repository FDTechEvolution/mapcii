<div class="g-pl-0 g-pr-0" id="div_banner_top">
    <div id="banner-c" class="row">
        <div class="col-md-12">
            <?= $this->Html->link('{{package}}<br>ลงโฆษณา', ['controller' => 'advertisements', 'action' => 'package'], ['class' => 'div-type text-center g-font-size-11 g-px-10 g-py-3', 'escape' => false]) ?>
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" data-interval="4000">
                <div v-if="imgBanners" class="carousel-inner">
                    <div class="carousel-item" v-for="(imgbanner, index) in imgBanners" :class="{active : index == 0}"><img  class="d-block w-100" :src="imgbanner.image.url"></div>
                </div>
                <div v-else>
                    <img class="d-block w-100" src="<?= SITE_URL . 'img/banner-side-on-null-c.jpg' ?>">
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    new Vue ({
        el: '#banner-c',
        data () {
            return {
                imgBanners: [],
                package: null
            }
        },
        mounted () {
            axios.get(apiurl + 'api-banners/loadbannerimages?position=left&limit=5&package=c')
            .then((response) => {
                this.imgBanners = response.data.bannerlinelist
                this.package = response.data.bannerlinelist[0].banner.payment.package.name
            })
            .catch(e => {
                console.log(e)
            })
        }
    })
</script>