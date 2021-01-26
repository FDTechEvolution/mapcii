export const leftMenuAccount = {
    methods: {
        goToMyAsset() {
            window.location.href = siteurl + 'myassets'
        }
    },
    template: `<div class="g-bg-secondary g-pa-5 g-mb-30">
                    <div class="g-bg-white g-pa-15">
                        <ul class="list-unstyled g-font-weight-500 mb-0" style="line-height: 28px;">
                            <li class="g-py-2">
                                <router-link to="/profile" class="router-link-active"><i class="mr-1 fa fa-caret-right"></i> แก้ไขข้อมูลส่วนตัว</router-link>                  
                            </li>
                            <li class="g-py-2">
                                <router-link to="/package" class="router-link-active"><i class="mr-1 fa fa-caret-right"></i> รายการลงโฆษณา</router-link>
                            </li>
                            <li class="g-py-2">
                                <a href="#" class="router-link-active" @click="goToMyAsset"><i class="mr-1 fa fa-caret-right"></i> รายการลงประกาศฟรี</a>
                            </li>
                            <li class="g-py-2">
                                <router-link to="/history" class="router-link-active"><i class="mr-1 fa fa-caret-right"></i> ประวัติโฆษณา/ประกาศ</router-link>
                            </li>
                            <li class="g-py-2">
                                <router-link to="/favorite" class="router-link-active"><i class="mr-1 fa fa-caret-right"></i> รายการสินทรัพย์ที่สนใจ</router-link>
                            </li>
                        </ul>
                    </div>
                </div>`
}