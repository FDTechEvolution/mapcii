export const assetPrice = {
    props: ['price', 'discount', 'rental', 'issales'],
    methods: {
        formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
        }
    },
    template: `<div>
                    <span v-if="issales === 'Y'">
                        <slot v-if="showDiscount(discount)">
                            <small><s>{{formatNumber(price)}} ฿</s></small><br/>
                            {{formatNumber(calculateDiscount(price, discount))}} ฿
                        </slot>
                        <slot v-else>
                            {{formatNumber(price)}} ฿
                        </slot>
                    </span>
                    <span v-else>
                        {{formatNumber(rental)}} ฿<small>/เดือน</small>
                    </span>
                </div>`
}