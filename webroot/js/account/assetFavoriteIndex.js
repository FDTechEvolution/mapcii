import {assetFavorite} from './components/userFavorites/asset_favorite.js'

export const assetFavoriteIndex = {
    components: {
        'asset-favorite' : assetFavorite
    },
    data() {
        return {
            
        }
    },
    template: `<div class="container" style="max-width: 100%;">
                    <asset-favorite></asset-favorite>
                </div>`
}