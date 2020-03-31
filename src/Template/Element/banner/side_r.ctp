<div class="container g-pl-0 g-pr-0 g-pt-10 g-mb-20" id="div_banner_top">
    <div id="banner-right" class="row">
        <div class="col-md-12">
            <div v-for="(imgbanner, index) in imgBanners" class="div-type g-mb-10">
                <img  class="d-block w-100" :src="imgbanner.image.url">
            </div>
        </div>
    </div>
</div>

<script>
    new Vue ({
        el: '#banner-right',
        data () {
            return {
                imgBanners: []
            }
        },
        mounted () {
            axios.get(apiurl + 'api-banners/loadbannerimages?position=right&limit=3&style=rand')
            .then((response) => {
                this.imgBanners = response.data.bannerlinelist
            })
            .catch(e => {
                console.log(e)
            })
        }
    })
</script>