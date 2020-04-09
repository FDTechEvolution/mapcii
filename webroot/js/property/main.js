Vue.component('map-marker', {
    props: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    data: () => ({
        marker: null
    }),
    mounted() {
        this.$parent.getMap(map => {
            this.marker = new window.google.maps.Marker({
                position: { lat: this.lat, lng: this.lng },
                map: map
            })
        })
    },
    beforeDestroy() {
        this.marker.setMap(null)
        window.google.maps.event.clearInstanceListeners(this.marker)
    },
    render() {
        return null
    }
})

Vue.component('map-info-window', {
    props: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    data: () => ({
        infoW: null
    }),
    mounted() {
        this.$parent.getMap(map => {
            (this.infoW = new window.google.maps.InfoWindow({
                position: { lat: this.lat, lng: this.lng },
                content: this.$el,
                disableAutoPan: true
            })),
                this.infoW.open(map)
        })
    },
    beforeDestroy() {
        this.infoW.close()
    },
    template: `<div>
                    <slot></slot>
                </div>`
})


new Vue ({
    el: '#g-map',
    data () {
        return {
            map: null,
            infowindow: null,
            assets: [],
            assetAds: [],
            assetAdsProvince: [],
            assetAdsDistrict: [],
            assetimages: [],
            assetimageAds: [],
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
            lat: null,
            lng: null,
            zoom: null,
            classObj: {
                infowindowActive: null,
                infowindowPrice: null
            }
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

        this.getPositionAsset()

        // console.log(this.issales)
        // console.log(this.isrent)
        // console.log(this.province)
    },
    methods: {
        loadMap () {
            this.map = new window.google.maps.Map(this.$refs['map'], {
                center: { lat: this.lat, lng: this.lng },
                zoom: this.zoom
            })
        },
        getMap(callback) {
            let vm = this
            function checkForMap() {
                if (vm.map) callback(vm.map)
                else setTimeout(checkForMap, 200)
            }
            checkForMap()
        },
        getPositionAsset () {
            axios.get(apiurl + 'api-assets/listassetaddress?issales=' + this.issales +
                                '&isrent=' + this.isrent +
                                '&type=' + this.type +
                                '&search_text=' + this.search_text +
                                '&province=' + this.province +
                                '&search_district_id=' + this.search_district_id +
                                '&search_sub_district_id=' + this.search_sub_district_id +
                                '&price_start=' + this.price_start +
                                '&price_end=' + this.price_end)
            .then((response) => {
                // console.log(response)
                this.assets = response.data.list
                this.assetAds = response.data.ads
                if(response.data.status == 200) {
                    this.assetAds.forEach((adsPosition) => {
                        if (adsPosition.position.position == 'province') {
                            this.assetAdsProvince.push(adsPosition)
                        } else if (adsPosition.position.position == 'district') {
                            this.assetAdsDistrict.push(adsPosition)
                        }
                    })
                }
                // console.log(this.assetAdsProvince)
                // console.log(this.assetAdsDistrict)
                if(this.province != null && this.search_district_id != null && response.data.status == 200){
                    if(this.assets.length > 0){
                        this.lat = response.data.list[0].address.province.lat
                        this.lng = response.data.list[0].address.province.lng
                        this.zoom = response.data.list[0].address.province.zoom
                    }else if(this.assetAds.length > 0){
                        this.lat = response.data.ads[0].asset.address.province.lat
                        this.lng = response.data.ads[0].asset.address.province.lng
                        this.zoom = response.data.ads[0].asset.address.province.zoom
                    }
                }else if(this.province != null && response.data.status == 200){
                    this.lat = response.data.list[0].address.province.lat
                    this.lng = response.data.list[0].address.province.lng
                    this.zoom = response.data.list[0].address.province.zoom
                }else if(this.province == null || response.data.status == 400){
                    if(this.province == null){
                        this.lat = 13.7645601
                        this.lng = 100.6930241
                        this.zoom = 7
                    }else{
                        this.lat = response.data.position.lat
                        this.lng = response.data.position.lng
                        this.zoom = response.data.position.zoom
                    }
                }
                // console.log(this.lat + ' ' + this.lng + ' ' + this.zoom)
                this.assetimages = response.data.image
                this.assetimageAds = response.data.imgads
                this.loadMap()
            })
            .catch(e => {
                console.log(e)
            })
        },
        getImageAsset (id) {
            axios.get(apiurl + 'api-assets/listassetimage?id=' + id)
            .then((response) => {
                this.assetimages = response.data.list[0].image.url
            })
            .catch(e => {
                console.log(e)
            })
        },
        assetprice (price) {
            return price/1000000
        },
        getDetailAsset (index) {
            this.classObj.infowindowActive = index
            this.classObj.infowindowPrice = index
        },
        closeDetailAsset () {
            this.classObj.infowindowActive = 'x'
            this.classObj.infowindowPrice = 'x'
        },
        async loadFunction () {
            await this.getPositionAsset()
            await this.loadMap()
        }
    }
})

new Vue ({
    el: '#avaliable-assets',
    data () {
        return {
            assets: [],
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
            imageAssets: null,
            backgroundImages: [],
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

        this.loadAssetsAvaliable()
    },
    methods: {
        loadAssetsAvaliable () {
            axios.get(apiurl + 'api-assets/loadassets?issales=' + this.issales +
                                '&isrent=' + this.isrent +
                                '&type=' + this.type +
                                '&search_text=' + this.search_text +
                                '&province=' + this.province +
                                '&search_district_id=' + this.search_district_id +
                                '&search_sub_district_id=' + this.search_sub_district_id +
                                '&price_start=' + this.price_start +
                                '&price_end=' + this.price_end)
            .then((response) => {
                // console.log(response)
                this.assets = response.data.listasset
                if(this.assets != null){
                    response.data.imgasset.forEach((img,index) => {
                        this.backgroundImages.push('background-image: url('+img+')')
                    })
                }
                // console.log(this.assets)
 
                // if(response.data.status == 200){
                //     this.assets.forEach(asset => {
                //         this.assetImages(asset.id)
                //     })
                // }
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
        addToFavolite (fav_id) {
            axios.get(siteurl + 'services/property?action=favorite&id='+fav_id)
            .then((response) => {
                console.log(response)
            })
            .catch(e => {
                console.log(e)
            })
        }
    }
})