<div class="col-lg-12 g-mb-0 g-px-0 mt-2" id="asset-ads" class="asset-ads-style">
    <button v-if="asset_type !== 'มือสอง'" class="btn btn-block text-white rounded-0 mb-1" style="line-height: 16px; background-color: #ff8027; letter-spacing: 1px;" @click="buyAdAssetLink"><strong>AD ประกาศ<br/>ลงโฆษณา</strong></button>
    <div v-for="(ads, index) in assetAds">
        <article class="row no-gutters g-mb-15 ads-asset-banner">
            <div class="col-lg-4 g-bg-img-hero g-min-height-100" :style="backgroundImages[index]"></div>
            <div class="col-lg-8">
                <p v-if="ads.asset.discount !== ''" class="is-show-discount">ลด : {{formatNumber(ads.asset.discount)}} ฿</p>
                <div class="g-brd-around g-brd-gray-light-v3 g-bg-white">
                    <div class="g-pa-10 g-pt-10">
                        <strong class="g-color-primary--hover g-font-size-12 g-font-weight-700"><a class="asset-content-name" :href="'<?= SITE_URL ?>property/view?id=' + ads.asset.id">{{ads.asset.name}}</a></strong>
                        <p class="g-color-text g-font-weight-500 g-font-size-12 mb-0"><small><strong>ปรับปรุงเมื่อ :</strong> <span class="g-color-text g-font-weight-400">{{thDateFormat(ads.asset.modified)}}</span></small></p>
                    </div>
                    <ul class="d-flex list-inline align-items-center g-brd-top g-brd-gray-light-v3 mb-0">
                        <li class="list-inline-item col-2 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-0 mr-0">
                            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i>{{ads.asset.bedroom}}
                        </li>
                        <li class="list-inline-item col-2 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-5 mr-0">
                            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i>{{ads.asset.bathroom}}
                        </li>
                        <li class="list-inline-item col-6 g-font-weight-600 g-font-size-14 text-right g-color-red g-px-0 g-pr-5 g-py-5 mr-0">
                            <slot v-if="ads.asset.discount !== ''">
                                <small><s>{{formatNumber(ads.asset.price)}} ฿</s></small><br/>
                                {{formatNumber(calculateDiscount(ads.asset.price, ads.asset.discount))}} ฿
                            </slot>
                            <slot v-else>
                                {{formatNumber(ads.asset.price)}} ฿
                            </slot>
                        </li>
                        <li class="list-inline-item col-2 g-px-0 mr-0">
                            <a class="d-block g-brd-x g-brd-gray-light-v3 g-color-text g-color-primary g-font-size-17 text-center g-text-underline--none--hover g-py-5">
                                <i v-if="favorites.includes(ads.asset.id) == true" class="fa fa-star"></i>
                                <i v-else class="fa fa-star-o on-cursor-pointer" data-toggle="tooltip" data-placement="top" title="เก็บไว้" @click="addToFavorite(ads.asset.id)"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </article>
    </div>
</div>

<style>
button.asset-content-name {
    background: transparent;
    border: none;
    text-align: left;
    cursor: pointer;
    font-size: 13px;
    font-family: 'Sarabun';
    font-weight: 400;
    padding: 0;
    color: #145ebe;
    outline: none;
}
button.asset-content-name:hover {
    color: #28a745;
    text-decoration: underline;
}
.ads-asset-banner:before {
    content: 'ADS';
    position: absolute;
    z-index: 30;
    font-size: 11px;
    font-weight: 600;
    padding: 0px 4px;
    border-radius: 3px;
    border: 1.3px solid #dd0000;
    color: #dd0000;
    background-color: rgba(255,255,255,0.7);
}
.asset-ads-style {
    height: 500px;
    overflow-y: auto;
}
.asset-ads-style::-webkit-scrollbar {
    width: 7px;
}
.asset-ads-style::-webkit-scrollbar-track {
    background: #f1f1f1;
}
.asset-ads-style::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}
.asset-ads-style::-webkit-scrollbar-thumb:hover {
    background: #555;
}

</style>

<script>
    new Vue ({
        el: '#asset-ads',
        data () {
            return {
                assetAds: [],
                imageAssets: null,
                backgroundImages: [],
                queryString: null,
                urlParams: null,
                issales: '',
                isrent: '',
                isnewproject: '',
                type: [],
                search_text: '',
                province: '',
                search_district_id: '',
                search_sub_district_id: '',
                price_start: '',
                price_end: '',
                favorites: [],
                limit: 5,
                isDiscount: '',
                asset_type: ''
            }
        },
        mounted () {
            this.queryString = window.location.search
            this.urlParams = new URLSearchParams(this.queryString)
            this.issales = this.urlParams.get('issales')
            this.isrent = this.urlParams.get('isrent')
            this.isnewproject = this.urlParams.get('isnewproject')
            this.type = this.urlParams.getAll('search_asset_type_id')
            this.search_text = this.urlParams.get('search_text')
            this.province = this.urlParams.get('province')
            this.search_district_id = this.urlParams.get('search_district_id')
            this.search_sub_district_id = this.urlParams.get('search_sub_district_id')
            this.price_start = this.urlParams.get('price_start')
            this.price_end = this.urlParams.get('price_end')

            let isType = this.urlParams.get('type')
            if(isType !== '') {
                let exType = isType.split('-')
                this.asset_type = exType[1]
            }else{
                this.asset_type = ''
            }

            this.loadAssetsAdsList()
            this.loadAssetFavorite()
            // console.log(this.province)
            // console.log(this.search_district_id)
            // console.log(this.type)
        },
        methods: {
            loadAssetsAdsList () {
                axios.get(apiurl + 'api-assets/loadassetads?isnewproject=' + this.isnewproject +
                                    '&type=' + this.type +
                                    '&search_text=' + this.search_text +
                                    '&province=' + this.province +
                                    '&search_district_id=' + this.search_district_id +
                                    '&search_sub_district_id=' + this.search_sub_district_id +
                                    '&price_start=' + this.price_start +
                                    '&price_end=' + this.price_end +
                                    '&limit =' + this.limit +
                                    '&asset_type=' + this.asset_type)
                .then((response) => {
                    // console.log(response)
                    if(response.data.status === 200) {
                        this.assetAds = response.data.asset_ads
                        response.data.asset_ads_img.forEach(img => {
                            let bgImgSplit = img.split('\\')
                            let bgImgSplitCombine = bgImgSplit[0] + bgImgSplit[1]
                            this.backgroundImages.push('background-image: url('+bgImgSplitCombine+')')
                        })
                        // console.log(this.backgroundImages)
                    }else{ ////////// ปิดไว้เผื่อข้าม /////////////
                        if(this.province != null) {
                            if(this.search_district_id == ''){
                                this.assetAds = response.data.listprovince
                                if(this.assetAds != null){
                                    response.data.imgprovince.forEach((img,index) => {
                                        this.backgroundImages.push('background-image: url('+img+')')
                                    })
                                }
                                // console.log('4444444444')
                            }else{
                                if(response.data.listprovince != '' && response.data.listdistrict != '') {
                                    if(response.data.status == 200) {
                                        response.data.listprovince.forEach((province,index) => {
                                            this.assetAds.push(province)
                                            // console.log('11111111')
                                        })
                                        response.data.imgprovince.forEach((img,index) => {
                                            this.backgroundImages.push('background-image: url('+img+')')
                                        })


                                        response.data.listdistrict.forEach((district,index) => {
                                            this.assetAds.push(district)
                                            // console.log('222222222')
                                        })
                                        response.data.imgdistrict.forEach((img,index) => {
                                            this.backgroundImages.push('background-image: url('+img+')')
                                        })
                                    }
                                }else if(response.data.listprovince == ''){
                                    this.assetAds = response.data.listdistrict
                                    if(this.assetAds != null){
                                        response.data.imgdistrict.forEach((img,index) => {
                                            this.backgroundImages.push('background-image: url('+img+')')
                                        })
                                    }
                                    // console.log('3333333333')
                                }else if(response.data.listprovince != ''){
                                    this.assetAds = response.data.listprovince
                                    if(this.assetAds != null){
                                        response.data.imgprovince.forEach((img,index) => {
                                            this.backgroundImages.push('background-image: url('+img+')')
                                        })
                                    }
                                    // console.log('555555555555')
                                }
                            }
                        }
                        // console.log(this.backgroundImages)
                        // console.log(this.assetAds)
                        
                        // if(response.data.status == 200){
                        //     this.assetAds.forEach(ads => {
                        //         // console.log(ads.asset.id)
                        //         this.assetImages(ads.asset.id)
                        //     })
                        // }
                    }
                })
                .catch(e => {
                    console.log(e)
                })
            },
            assetAdsClicked (id) {
                window.location.href = siteurl + 'property/view?id=' + id
            },
            assetImages (id) {
                axios.get(apiurl + 'api-assets/asset-image?id=' + id)
                .then((response) => {
                    response.data.data.forEach((img,index) => {
                        this.backgroundImages.push('background-image: url('+img.image.url+')')
                    })
                    // console.log(this.backgroundImages)
                })
                .catch(e => {
                    console.log(e)
                })
            },
            formatNumber(num) {
                return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            },
            driffday: function (d) {
                let aday = new Date(d)
                let fgg = (Date.now() - aday.getTime()) / (1000 * 3600 * 24)

                return fgg.toFixed(0)
            },
            addToFavorite (fav_id) {
                axios.get(siteurl + 'services/property?action=favorite&id='+fav_id)
                .then((response) => {
                    // console.log(response)
                    if(response.data.code == 200){
                        this.loadAssetFavorite()
                    }else{
                        window.location.href = siteurl+'login';
                        console.log('failed...')
                    }
                })
                .catch(e => {
                    console.log(e)
                })
            },
            loadAssetFavorite () {
                axios.get(apiurl + 'api-assets/asset-favorite?id=' + localStorage.getItem('MAPCII_USER'))
                .then((response) => {
                    // console.log(response)
                    if(response.data.status == 200){
                        this.favorites = response.data.assetfavorite
                    }
                })
                .catch(e => {
                    console.log(e)
                })
            },
            buyAdAssetLink() {
                window.location.href = siteurl + 'advertisements/package-ad#/'
            },
            calculateDiscount(price, discount) {
                if(discount === null || discount === '' || discount === undefined || discount === 0) {
                    return price
                }else{
                    this.isDiscount = price - discount
                    return price - discount
                }
            }
        }
    })
</script>