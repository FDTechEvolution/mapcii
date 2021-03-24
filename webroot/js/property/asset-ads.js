import {assetContent} from './components/asset-content.js'

new Vue ({
    el: '#asset-ads',
    components: {
        'asset-content' : assetContent
    },
    data () {
        return {
            assetAds: [],
            imageAssets: null,
            backgroundImages: [],
            queryString: null,
            urlParams: null,
            issales: '',
            isrent: '',
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
        this.type = this.urlParams.getAll('search_asset_type_id')
        this.search_text = this.urlParams.get('search_text')
        this.province = this.urlParams.get('province')
        this.search_district_id = this.urlParams.get('search_district_id')
        this.search_sub_district_id = this.urlParams.get('search_sub_district_id')
        this.price_start = this.urlParams.get('price_start')
        this.price_end = this.urlParams.get('price_end')

        let isType = this.urlParams.get('type')
        if(isType !== null) {
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
        // console.log(this.asset_type)
    },
    methods: {
        loadAssetsAdsList () {
            if(this.asset_type === 'ขายด่วน') this.limit = 10
            axios.get(apiurl + 'api-assets/loadassetads?issales=' + this.issales +
                                '&isrent=' + this.isrent +
                                '&type=' + this.type +
                                '&search_text=' + this.search_text +
                                '&province=' + this.province +
                                '&search_district_id=' + this.search_district_id +
                                '&search_sub_district_id=' + this.search_sub_district_id +
                                '&price_start=' + this.price_start +
                                '&price_end=' + this.price_end +
                                '&limit=' + this.limit +
                                '&asset_type=' + this.asset_type)
            .then((response) => {
                // console.log(response)
                if(response.data.status === 200) {
                    this.assetAds = response.data.asset_ads
                    // response.data.asset_ads_img.forEach(img => {
                    //     let bgImgSplit = img.split('\\')
                    //     let bgImgSplitCombine = bgImgSplit[0] + bgImgSplit[1]
                    //     this.backgroundImages.push('background-image: url('+bgImgSplitCombine+')')
                    // })
                    response.data.asset_ads.forEach(item => {
                        item.asset.asset_images.forEach(img => {
                            if(img.isdefault === 'Y') {
                                // let bgImgSplit = img.image.url.split('\\')
                                // let bgImgSplitCombine = bgImgSplit[0] + bgImgSplit[1]
                                this.backgroundImages.push('background-image: url('+img.image.url+')')
                            }
                        })
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
                }
                // console.log(this.backgroundImages)
                // console.log(this.assetAds)
                
                // if(response.data.status == 200){
                //     this.assetAds.forEach(ads => {
                //         // console.log(ads.asset.id)
                //         this.assetImages(ads.asset.id)
                //     })
                // }
            })
            .catch(e => {
                console.log(e)
            })
        },
        setAssetType(issales, isrent) {
            if(issales === 'Y' && isrent === 'Y') return 'ขาย/เช่า'
            if(issales === 'Y' && isrent === 'N') return 'ขาย'
            if(issales === 'N' && isrent === 'Y') return 'เช่า'
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
        thDateFormat(date) {
            let cutT = date.split('T')
            let thDate = cutT[0].split('-')
            return thDate[2] + '/' + thDate[1] + '/' + thDate[0]
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
                    // console.log(this.favorites)
                }
            })
            .catch(e => {
                console.log(e)
            })
        },
        buyAdAssetLink() {
            window.location.href = siteurl + 'advertisements/package-ad#/'
        },
        showDiscount(discount) {
            return (discount !== 0) ? true : false
        }
    }
})