export const mapInfoWindowContent = {
    props: ['id', 'name', 'price', 'discount', 'rental', 'issales', 'isrent', 'bedroom', 'bathroom', 'modified'],
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
        assetprice (price, discount) {
            if(discount === null || discount === '' || discount === undefined || discount === 0) {
                return (price/1000000).toFixed(2)
            }else{
                return ((price - discount)/1000000).toFixed(2)
            }
        },
        priceSplitToFixed(price) {
            let cutDot = price.split('.')
            let checKAfterDot = (cutDot[1] != '00') ? true : false
            return (checKAfterDot) ? price : cutDot[0]
        }
    },
    template: `<div>
                    <a class="asset-a-marker" :href="'<?= SITE_URL ?>property/view?id=' + id" :title="name">
                        <span class="asset-content-marker g-font-size-12"><strong class="text-danger">[{{setAssetType(issales, isrent)}}]</strong> <strong>{{name}}</strong></span>
                    </a>
                    <small>
                        <span><i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i> {{bedroom}}</span> | 
                        <span><i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i> {{bathroom}}</span><br/>
                    </small>
                    <span><small><strong>ปรับปรุงเมื่อ :</strong> {{thDateFormat(modified)}}</small></span><hr style="margin: 2px 0;"/>
                    <slot v-if="issales === 'Y'">
                        <span class="asset-content-price g-font-size-11"><strong style="font-weight: 700;">ราคา :</strong> <slot v-if="showDiscount(discount)"><s>{{priceSplitToFixed(assetprice(price, ''))}}</s></slot> <u class="price-color-ads blinking" style="font-weight: 700; margin-left: 5px;">{{priceSplitToFixed(assetprice(price, discount))}}</u> ล้านบาท <slot v-if="isrent === 'Y'">| <u class="price-color-ads blinking" style="font-weight: 700; margin-left: 5px;">{{formatNumber(rental)}}</u> ฿/เดือน</slot></span>
                    </slot>
                    <slot v-else>
                        <span class="asset-content-price g-font-size-11"><strong style="font-weight: 700;">ราคา :</strong> <u class="price-color-ads blinking" style="font-weight: 700; margin-left: 5px;">{{formatNumber(rental)}}</u> บาท/เดือน</span>
                    </slot>
                </div>`
}