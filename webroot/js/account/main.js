import {store} from '../store/index.js'
import {router} from './router/index.js'
import {userProfile} from './components/userProfile.js'
import {userDisplay} from './components/userDisplay.js'
import {userChangePassword} from './components/userChangePassword.js'
import {packageIndex} from './packageIndex.js'

new Vue ({
    el: '#account',
    store,
    router,
    components: {
        'user-profile' : userProfile,
        'user-display' : userDisplay,
        'user-change-password' : userChangePassword,
        'package-index' : packageIndex
    },
    data () {
        return {
            userProfile: [],
            loading: true
        }
    },
    mounted() {
        this.getUserProfiles()
    },
    methods: {
        getUserProfiles () {
            try{
                axios.get(apiurl + 'api-users/user?id=' + user_id)
                .then((response) => {
                    // console.log(response)
                    this.userProfile = response.data.data
                })
                .finally(() => this.loading = false)
            }catch(e){
                console.log(e)
            }
        }
    }
})