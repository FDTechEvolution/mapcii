export const SelectedPayment = {
    methods: {
        isRedirect(status) {
            if(status) window.location.href = siteurl + 'advertisements/balance#/'
        }
    },
    template: `<div v-if="$store.getters.package_payment" class="row">
                    {{isRedirect($store.getters.package_payment)}}
                </div>`
}