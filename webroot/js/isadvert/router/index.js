import {IndexPackageAd} from '../components/package_ad/indexPackageAd.js'
import {PackageBalance} from '../components/balance/packageBalance.js'
import {PackageAdCreate} from '../components/package_ad/packageAdCreate.js'
import {PackagePayment} from '../components/payment/packagePayment.js'

export const router = new VueRouter({
    routes: [
      { path: '/', component: PackageBalance },
      { path: '/package-ad-create', component: PackageAdCreate },
      { path: '/payment', component: PackagePayment}
    ]
  })