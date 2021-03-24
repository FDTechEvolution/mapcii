import {userProfile} from './components/userProfile/userProfile.js'
import {userDisplay} from './components/userProfile/userDisplay.js'
import {userChangePassword} from './components/userProfile/userChangePassword.js'

export const userProfileIndex = {
    components: {
        'user-profile' : userProfile,
        'user-display' : userDisplay,
        'user-change-password' : userChangePassword
    },
    template: `<div>
                    <div class="text-left pt-4"><h3>ข้อมูลส่วนตัว</h3></div>
                    <div class="card p-4 bg-light-blue rounded">
                        <div v-if="$store.getters.loadingUserProfile" class="row">
                            <div class="col-md-12 text-center">
                                <div class="loadingio-spinner-spinner-pc6b8g2r9j">
                                    <div class="ldio-8gc4kjnx9fm">
                                        <div></div><div></div><div></div><div></div><div></div><div></div>
                                        <div></div><div></div><div></div><div></div><div></div><div></div>
                                        <div></div><div></div><div></div><div></div><div></div><div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="card-body row card-no-padding-on-mobile">
                            <div class="col-lg-6 col-sm-12">
                                <h5 class="mb-4">บัญทึกข้อมูลการติดต่อ เพื่อความสะดวกในการซื้อขาย</h5>
                                <user-profile
                                    :user-profile = '$store.getters.userProfile'>
                                </user-profile>
                            </div>
                            <div class="col-lg-6 col-sm-12">
                                <user-display
                                    :user-display = '$store.getters.userDisplay'
                                    :loading = '$store.getters.loadingUserProfile'>
                                </user-display>
                                <user-change-password/>
                            </div>
                        </div>
                    </div>
                </div>`
}