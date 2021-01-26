export const showAssetInHome = {
    props: ['type'],
    data() {
        return {
            siteURL: '',
            errorMSG: '',
            assets: [],
            assetLoading: true
        }
    },
    mounted() {
        this.siteURL = siteurl
        this.loadAssetInHome()
    },
    methods: {
        loadAssetInHome() {
            try{
                axios.get(apiurl + 'api-assets/loadassets?limit=4&from=home&asset_type=' + this.type)
                .then((response) => {
                    if(response.data.status === 200) {
                        this.assets = response.data.listasset
                    }else{
                        this.errorMSG = 'error.'
                    }
                })
                .finally(() => this.assetLoading = false)
            }catch(e) {
                console.log(e)
            }
        },
        getAssetDefaultImg(asset_images) {
            let filterImage = asset_images.filter(img => img.isdefault === 'Y')
            return filterImage[0].image.url
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        thaiDateFormat: function (d) {
            let cutT = d.split("T")
            let setDate = cutT[0].split("-")

            return setDate[2] + "/" + setDate[1] + "/" + setDate[0]
        },
        calculateDiscount(price, discount) {
            if(discount === null || discount === '' || discount === undefined || discount === 0) {
                return price
            }else{
                this.isDiscount = price - discount
                return price - discount
            }
        },
        showDiscount(discount) {
            return (discount !== 0) ? true : false
        },
        cuttingAssetName(name) {
            return name.substr(0, 45)
        }
    },
    template: `<div class="row">
                    <div v-if="assetLoading" class="col-md-12 text-center">
                        <div class="loadingio-spinner-rolling-a923dqk1cyb">
                            <div class="ldio-y4i9wq9ei49">
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div v-else v-for="asset in assets" class="col-md-3">
                        <article style="box-shadow: 2px 3px 6px #ccc;">
                            <figure class="g-pos-rel">
                                <a :href="siteURL + 'property/view?id=' + asset.id"><img class="img-fluid w-100" :src="getAssetDefaultImg(asset.asset_images)" alt="" target="_blank"></a>
                            </figure>
                            <figcaption class="g-pos-abs g-top-0 g-left-15">
                                <p class="is-show-new font-new-family">NEW</p>
                            </figcaption>
                            <figcaption class="g-pos-abs g-top-0 g-right-15">
                                <p v-if="showDiscount(asset.discount)" class="is-show-discount">ลด : {{formatNumber(asset.discount)}} ฿</p>
                            </figcaption>
                        
                            <div class="g-brd-around g-brd-top-none g-brd-gray-light-v3 g-bg-white">
                                <div class="g-pt-10 g-px-10 g-pb-5" style="height: 60px;">
                                    <p class="mb-0"><a :href="siteURL + 'property/view?id=' + asset.id" :title="asset.name"><strong class="text-dark">[{{asset.announce}}] :</strong> {{cuttingAssetName(asset.name)}}...</a></p>
                                </div>

                                <div class="g-px-10" style="height: 40px;">
                                    <hr class="mt-1 my-2"/>
                                    <span v-if="asset.issales === 'Y'">
                                        <slot v-if="showDiscount(asset.discount)">
                                            <div class="row">
                                                <div :class="[asset.isrent === 'Y' ? 'col-md-6' : 'col-md-12']">
                                                    <p class="mb-0" style="font-size: 8px; line-height: 8px;"><s class="text-danger">{{formatNumber(asset.price)}} ฿</s></p>
                                                    <strong class="text-success">{{formatNumber(calculateDiscount(asset.price, asset.discount))}}</strong> ฿
                                                </div>
                                                <div v-if="asset.isrent === 'Y'" class="col-md-6 border-left border-dark">
                                                    <strong class="text-info">{{formatNumber(asset.rental)}}</strong> ฿<small>/เดือน</small>
                                                </div>
                                            </div>
                                        </slot>
                                        <slot v-else>
                                            <div class="row">
                                                <div :class="[asset.isrent === 'Y' ? 'col-md-6' : 'col-md-12']">
                                                    <strong class="text-success">{{formatNumber(asset.price)}}</strong> ฿
                                                </div>
                                                <div v-if="asset.isrent === 'Y'" class="col-md-6 border-left border-dark">
                                                    <strong class="text-info">{{formatNumber(asset.rental)}}</strong> ฿<small>/เดือน</small>
                                                </div>
                                            </div>
                                        </slot>
                                    </span>
                                    <span v-else>
                                        <strong class="text-info">{{formatNumber(asset.rental)}}</strong> ฿<small>/เดือน</small>
                                    </span>
                                </div>
                                
                                <div class="g-px-10 g-py-2">
                                    <hr class="mt-0 mb-1"/>
                                    <ul class="d-flex list-inline mb-0">
                                        <li class="list-inline-item col-2 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-0 mr-0">
                                            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i> {{asset.bedroom}}
                                        </li>
                                        <li class="list-inline-item col-2 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-0 mr-0">
                                            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i> {{asset.bathroom}}
                                        </li>
                                        <li class="list-inline-item col-8 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-0 mr-0">
                                            <small style="font-size: 60% !important;"><strong>วันที่ประกาศ : </strong>{{thaiDateFormat(asset.startdate)}}</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>`
}