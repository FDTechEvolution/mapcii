import {packageIndex} from '../packageIndex.js'
import {packageAdsUpdate} from '../components/packageAdsUpdate.js'

export const router = new VueRouter({
    routes: [
      { path: '/', component: packageIndex },
      { path: '/update/:id', component: packageAdsUpdate}
    ]
})