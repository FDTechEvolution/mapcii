import {assetPrice} from './asset-price.js'

export const assetContent = {
    props: ['id', 'name', 'price', 'discount', 'rental', 'issales', 'isrent', 'bedroom', 'bathroom', 'modified', 'favorites'],
    components: {
        'asset-price' : assetPrice
    },
    data() {
        return {
            isStar_O : siteurl + '/img/Star-Favorite-O_2.png',
            isStar : siteurl + '/img/Star-Favorite_2.png',
            isSiteUrl : siteurl
        }
    },
    computed: {
        faveriteIncludes() {
            return (this.favorites.includes(this.id)) ? true : false
        }
    },
    methods: {
        setAssetType(issales, isrent) {
            if(issales === 'Y' && isrent === 'Y') return 'ขาย/เช่า'
            if(issales === 'Y' && isrent === 'N') return 'ขาย'
            if(issales === 'N' && isrent === 'Y') return 'เช่า'
        },
        thDateFormat(date) {
            let cutT = date.split('T')
            let thDate = cutT[0].split('-')
            return thDate[2] + '/' + thDate[1] + '/' + thDate[0]
        },
        showDiscount(discount) {
            return (discount !== 0) ? true : false
        },
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        },
        addToFavorite (fav_id) {
            axios.get(siteurl + 'services/property?action=favorite&id='+fav_id)
            .then((response) => {
                if(response.data.code === 200){
                    // console.log('clicked')
                    // this.$parent.loadAssetFavorite().then(() => {
                    //     this.faveriteIncludes()
                    // })
                    // this.$parent.loadAssetsAdsList()
                    // this.setFavLoaded()
                    // console.log(response.data)
                    this.$parent.loadAssetFavorite()
                }else{
                    alert('เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบก่อน...')
                    // window.location.href = siteurl+'login';
                    // console.log('failed...')
                }
            })
            .catch(e => {
                console.log(e)
            })
        }
    },
    template: `<div>
                    <p v-if="showDiscount(discount)" class="is-show-discount">ลด : {{formatNumber(discount)}} ฿</p>
                    <div class="g-brd-around g-brd-gray-light-v3 g-bg-white">
                        <div class="g-pa-5 g-pt-5">
                            <strong class="g-color-primary--hover g-font-size-12 g-font-weight-700"><a class="asset-content-name" :href="isSiteUrl + 'property/view?id=' + id"><strong class="text-danger">[{{setAssetType(issales, isrent)}}]</strong> {{name}}</a></strong>
                            <p class="g-color-text g-font-weight-500 g-font-size-12 mb-0"><small><strong>ปรับปรุงเมื่อ :</strong> <span class="g-color-text g-font-weight-400">{{thDateFormat(modified)}}</span></small></p>
                        </div>
                        <ul class="d-flex list-inline align-items-center g-brd-top g-brd-gray-light-v3 mb-0">
                            <li class="list-inline-item col-2 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-0 mr-0">
                                <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i>{{bedroom}}
                            </li>
                            <li class="list-inline-item col-2 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-0 mr-0">
                                <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i>{{bathroom}}
                            </li>
                            <li class="list-inline-item col-6 g-font-weight-600 g-font-size-13 text-right g-color-red g-px-0 g-pr-5 g-py-3 mr-0" style="line-height: 14px;">
                                <asset-price
                                    :price = 'price'
                                    :discount = 'discount'
                                    :rental = 'rental'
                                    :issales = 'issales'
                                ></asset-price>
                            </li>
                            <li class="list-inline-item col-2 g-px-0 mr-0">
                                <div class="d-block g-brd-x g-brd-gray-light-v3 g-color-text g-color-primary g-font-size-17 text-center g-text-underline--none--hover g-py-0">
                                    <img v-if="faveriteIncludes" :src="isStar" width="18" class="on-cursor-pointer" style="margin-top: -5px;" @click="addToFavorite(id)">
                                    <img v-else :src="isStar_O" width="18" class="on-cursor-pointer" style="margin-top: -5px;" @click="addToFavorite(id)">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>`
}