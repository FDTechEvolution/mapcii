<div class="g-pl-0 g-pr-0" id="div_banner_top">
    <div id="banner-left" class="row">
        <div class="col-md-12">
            <?= $this->Html->link('{{package}}<br>ลงโฆษณา', ['controller' => 'property', 'action' => 'view', 'id' => '123456'], ['class' => 'div-type text-center g-font-size-11 g-px-10 g-py-3', 'escape' => false]) ?>
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel" data-interval="4000">
                <div class="carousel-inner">
                    <div class="carousel-item" v-for="(imgbanner, index) in imgBanners" :class="{active : index == 0}"><img  class="d-block w-100" :src="imgbanner.image.url"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    new Vue ({
        el: '#banner-left',
        data () {
            return {
                imgBanners: [],
                package: null
            }
        },
        mounted () {
            axios.get(apiurl + 'api-banners/loadbannerimages?position=left')
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