import assets from './modules/assets.js'
import packages from './modules/packages.js'
import payment from './modules/payment.js'
import account from './modules/account.js'
import banners from './modules/banners.js'

export const store = new Vuex.Store({
    modules: {
        assets,
        packages,
        payment,
        account,
        banners
    }
})