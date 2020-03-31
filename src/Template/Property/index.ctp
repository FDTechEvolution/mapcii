<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="container g-pt-10">

            <h1 class="h2 mb-0 prompt-600 g-color-primary">ประกาศขาย</h1>
            <div class="row">
                <div class="col-md-12 g-px-0">
                    <?= $this->element('search_form_a_1') ?>
                </div>
            </div>
        </div>
    </div>
</div>

<?= $this->element('banner/top') ?>

<div class="container">
    <div class="row">
        <div class="col-md-8 g-px-0 g-pr-5">
            <div id="g-map">
                <div id="map" ref="map">
                    <!-- <map-marker
                        v-for="(asset, index) in assets" 
                        :lat="parseFloat(asset.address.latitude)" 
                        :lng="parseFloat(asset.address.longitude)"
                    >
                    </map-marker> -->
                    <map-info-window 
                        v-for="(asset, index) in assets" 
                        :lat="parseFloat(asset.address.latitude)" 
                        :lng="parseFloat(asset.address.longitude)"
                    >
                            <div class="row">
                                <div class="col-md-2">
                                    <img width="40" class="g-mt-3 g-pr-5" :src="assetimages[index].img_url">
                                </div>
                                <div class="col-md-10">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <a class="asset-a-marker" href="#">
                                                <span class="asset-content-marker g-font-size-12">{{asset.name}}</span>
                                            </a>
                                            <span class="asset-content-price g-font-size-12"><strong>ราคา :</strong> {{assetprice(asset.price)}} ล้านบาท</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </map-info-window>
                </div>
            </div>
        </div>
        <div class="col-md-4 g-px-0">
            <div class="row">
                <div class="col-lg-12 g-mb-0">
                    <?= $this->element('asset/ads') ?>
                </div>
                <div class="col-lg-12 g-mb-10">
                    <?= $this->element('banner/side_l') ?>
                </div>
                <div class="col-lg-12 g-mb-70" id="div_assetlist_">
                    <?php foreach ($assets as $key => $asset): ?>
                        <article class="row no-gutters g-mb-15">
                            <div class="col-lg-5 g-bg-img-hero g-min-height-100" style="background-image: url('<?= $asset['url'] ?>');"></div>

                            <div class="col-lg-7">
                                <div class="g-brd-around g-brd-gray-light-v3 g-bg-white">
                                    <div class="g-pa-10 g-pt-0">
                                        <strong class="g-color-primary--hover g-font-size-13 g-font-weight-700"><?= $this->Html->link($asset['name'], ['controller' => 'property', 'action' => 'view', 'id' => $asset['id']], ['class' => 'asset-content-name']) ?></strong>
                                        <p class="g-color-text g-font-weight-500 g-font-size-13 mb-0">Posted: <span class="g-color-text g-font-weight-400">2 days ago</span></p>
                                    </div>
                                    <ul class="d-flex list-inline align-items-center g-brd-top g-brd-gray-light-v3 mb-0">
                                        <li class="list-inline-item col-2 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-5 mr-0">
                                            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i><?= $asset['bedroom'] ?>
                                        </li>
                                        <li class="list-inline-item col-2 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-5 mr-0">
                                            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i><?= $asset['bathroom'] ?>
                                        </li>
                                        <li class="list-inline-item col-6 g-font-weight-600 g-font-size-14 text-right g-color-red g-px-0 g-pr-5 g-py-5 mr-0"><?= number_format($asset['price']) ?> ฿</li>
                                        <li class="list-inline-item col-2 g-px-0 mr-0">
                                            <a class="d-block g-brd-x g-brd-gray-light-v3 g-color-text g-color-primary g-font-size-17 text-center g-text-underline--none--hover g-py-5" href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="" data-original-title="เก็บไว้" data-id="bt-add-history" data-value="<?=$asset['id']?>">
                                                <i class="fa fa-star-o"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Display none
<div class="container">
    <div class="row justify-content-center g-pt-10">
        <div class="col-lg-9 order-lg-2 g-mb-70" id="div_assetlist_">

            <?php foreach ($assets as $key => $asset): ?>
                <article class="row no-gutters g-mb-15">
                    <div class="col-lg-5 g-bg-img-hero g-min-height-200" style="background-image: url('<?= $asset['url'] ?>');"></div>

                    <div class="col-lg-7">
                        <div class="g-brd-around g-brd-top-none g-brd-gray-light-v3 g-bg-white">
                            <ul class="d-flex list-inline g-brd-y g-brd-gray-light-v3 mb-0">
                                <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-10 mr-0">
                                    <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i><?= $asset['bedroom'] ?> ห้องนอน
                                </li>
                                <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-10 mr-0">
                                    <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i><?= $asset['bathroom'] ?> ห้องน้ำ
                                </li>
                                <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-10 mr-0">
                                    <i class="align-middle g-color-text mr-1 icon-real-estate-047 u-line-icon-pro"></i>
                                    963 sqft
                                </li>
                            </ul>
                            <div class="g-pa-10">
                                <strong class="g-color-primary--hover"><?= $this->Html->link($asset['name'], ['controller' => 'property', 'action' => 'view', 'id' => $asset['id']], []) ?></strong>
                                <p class="g-font-size-13 mb-0"><i> <?= h($asset['address']) ?></i></p>
                                <p class="g-color-text g-font-weight-500 g-font-size-13 mb-1">Agency: <a class="g-color-text g-color-primary--hover g-font-weight-400 g-text-underline--none--hover" href="#">Real Estate State</a></p>
                                <p class="g-color-text g-font-weight-500 g-font-size-13 mb-0">Posted: <span class="g-color-text g-font-weight-400">2 days ago</span></p>
                            </div>
                            <ul class="d-flex list-inline align-items-center g-brd-top g-brd-gray-light-v3 mb-0">
                                <li class="list-inline-item col-10 g-font-weight-600 g-font-size-17 text-center g-color-red g-px-0 g-py-7 mr-0"><?= number_format($asset['price']) ?> บาท</li>
                                <li class="list-inline-item col-2 g-px-0 mr-0">
                                    <a class="d-block g-brd-x g-brd-gray-light-v3 g-color-text g-color-primary g-font-size-17 text-center g-text-underline--none--hover g-py-7" href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="" data-original-title="เก็บไว้" data-id="bt-add-history" data-value="<?=$asset['id']?>">
                                        <i class="fa fa-star-o"></i>
                                    </a>
                                </li>

                            </ul>
                        </div>
                        <a class="btn btn-block g-brd-gray-light-v3 g-color-main g-bg-secondary rounded-0 g-px-10 g-py-10" href="<?= SITE_URL ?>property/view?id=<?= $asset['id'] ?>">
                            ดูรายละเอียด
                            <i class="align-middle ml-2 fa fa-angle-right"></i>
                        </a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>

        <div class="col-md-5 col-lg-3 order-lg-1 g-mb-70">
            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <h2 class="h6 g-font-weight-600 mb-4">ประเภทอสังหาริมทรัพย์</h2>

                    <ul class="list-unstyled g-font-weight-500 mb-0" id="ul_asset_type">

                    </ul>
                </div>
            </div>

            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <h2 class="h6 g-font-weight-600 mb-4">รายการแนะนำ</h2>
                    
                </div>
            </div>
        </div>

    </div>
    <div class="row">
        <div class="col-md-12">

            <h3 class="h3 mb-0 prompt-600 g-color-primary">รีวิวโครงการ</h3>
        </div>
    </div>
</div>

-->


<style>
    .container {
        max-width: 80%;
    }
    #map {
        height: 1200px;
        background: #ddd;
    }
    .asset-content-marker {
        text-overflow: ellipsis;
        overflow: hidden; 
        width: 140px;
        white-space: nowrap;
        display: block;
    }
    a.asset-a-marker {
        font-size: 12px;
    }
    .asset-content-price {
        font-size: 10px;
    }
    .gm-style .gm-style-iw-d {
        overflow: hidden !important;
        padding-bottom: 5px;
    }
    .gm-style .gm-style-iw-c {
        padding: 5px;
    }
</style>

<?= $this->Html->script('map.js') ?>
<?= $this->Html->script('asset-with-map.js') ?>
<?= $this->Html->script('asset.js') ?>
<script>
    $(document).ready(function () {
        var config = {apiurl: apiurl + 'api-assets/type', siteurl: siteurl};
        $.AssetCore.widget.printAssetTypeBar('#ul_asset_type', config);

        $('a[data-id="bt-add-history"]').on('click', function () {
            var asset_id = $(this).attr('data-value');
            var currentA = $(this);
            $.get({
                url: siteurl + 'services/property?action=favorite&id='+asset_id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).done(function (res) {
                res = JSON.parse(res);
                console.log(res);
                if(res.code == 200){
                    currentA.html('<i class="fa fa-star"></i>');
                    //console.log($(this));
                }else{
                    window.location.href = siteurl+'login';
                }
            });
        });

    });
</script>

<script>
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
                assets: [],
                assetimages: [],
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
                zoom: null
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
            // console.log(this.type)
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
                    if(this.province != null && response.data.status == 200){
                        this.lat = response.data.list[0].address.province.lat
                        this.lng = response.data.list[0].address.province.lng
                        this.zoom = response.data.list[0].address.province.zoom
                    }else if(this.province == null || response.data.status == 400){
                        this.lat = 13.7645601
                        this.lng = 100.6930241
                        this.zoom = 7
                    }
                    // console.log(this.lat + ' ' + this.lng + ' ' + this.zoom)
                    this.assetimages = response.data.image
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
            async loadFunction () {
                await this.getPositionAsset()
                await this.loadMap()
                await this.getMap()
            }
        }
    })
</script>