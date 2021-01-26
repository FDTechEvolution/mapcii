import {userProfileIndex} from '../userProfileIndex.js'
import {packageIndex} from '../packageIndex.js'
import {packageAdsUpdate} from '../components/packageAdsUpdate.js'
import {packageHistoryIndex} from '../packageHistoryIndex.js'
import {assetFavoriteIndex} from '../assetFavoriteIndex.js' 

export const router = new VueRouter({
    routes: [
      { path: '/profile', component: userProfileIndex },
      { path: '/package', component: packageIndex },
      { path: '/update/:id', component: packageAdsUpdate },
      { path: '/history', component: packageHistoryIndex },
      { path: '/favorite', component: assetFavoriteIndex}
    ]
})