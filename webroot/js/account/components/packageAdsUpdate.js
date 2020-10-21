export const packageAdsUpdate = {
    methods: {
        backToAccountPackageAds() {
            this.$router.push('/')
        }
    },
    template: `<div>
                    <div class="row">
                        <div class="col-md-12"><button class="btn btn-secondary" @click="backToAccountPackageAds">กลับ</button></div>
                    </div>
                    Asset : {{ $route.params.id }}
                </div>`
}