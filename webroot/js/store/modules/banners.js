const state = {
    package_id: '',
    topic: '',
    banner: {
        name: '',
        credit: '',
        image: '',
        description: ''
    },
    package: {
        loading: true,
        banner_a: [],
        banner_b: [],
        is_banner: ''
    },
    banner_saving: false,
    banner_list_loading: false,
    my_banners: [],
    bannerImageEditModal: false,
    bannerImageDeleteModal: false,
    loadingCloseBanner: false,
    bannerImageLoading: false,
    bannerProgressBar: false
}

const getters = {
    isBannerLoading: state => state.package.loading,
    banner: state => state.banner,
    banner_a: state => state.package.banner_a,
    banner_b: state => state.package.banner_b,
    is_banner: state => state.package.is_banner,
    banner_saving: state => state.banner_saving,
    banner_list_loading: state => state.banner_list_loading,
    my_banners: state => state.my_banners,
    bannerImageEditModal: state => state.bannerImageEditModal,
    bannerImageDeleteModal: state => state.bannerImageDeleteModal,
    loadingCloseBanner: state => state.loadingCloseBanner,
    bannerImageLoading: state => state.bannerImageLoading,
    bannerProgressBar: state => state.bannerProgressBar,
    banner_topic: state => state.topic
}

const mutations = {
    SET_PACKAGE_FROM_BANNER(state, data) {
        state.package_id = data.id
        state.banner.name = data.name
        state.banner.credit = data.credit
    },
    SET_TOPIC_FROM_BANNER(state, data) {
        state.topic = data
    },
    SET_IMAGE_FROM_BANNER(state, data) {
        state.banner.image = data
    },
    SET_DESCRIPTION_FROM_BANNER(state, data) {
        state.banner.description = data
    },
    SET_CREDIT_BANNER(state, data) {
        // console.log(data)
        state.package.banner_a = data.filter(item => item.user_package_lines[0].package_name === 'Banner A' && item.isexpire === 'N' && item.credit > item.used)
        state.package.banner_b = data.filter(item => item.user_package_lines[0].package_name === 'Banner B' && item.isexpire === 'N' && item.credit > item.used)
        // console.log(state.package.banner_a)
        // console.log(state.package.banner_b)

        let countBannerLength = state.package.banner_a.length + state.package.banner_b.length
        let isBannerPackage = []
        if(countBannerLength === 1) {
            state.package.is_banner = (state.package.banner_a.length === 1) ? {is_banner:'Banner A'} : {is_banner:'Banner B'}
        }else if(countBannerLength > 1){
            if(state.package.banner_a.length === 0) {
                state.package.is_banner = {is_banner:'Banner B'}
            }else if(state.package.banner_b.length === 0) {
                state.package.is_banner = {is_banner:'Banner A'}
            }else{
                state.package.is_banner = {is_banner:'Banner ALL'}
            }
        }
    },
    SET_CHECK_CREDIT_BANNER_LOADING(state, status) {
        state.package.loading = status
    },
    BANNER_SAVING(state, status) {
        state.banner_saving = status
    },
    SET_BANNER_LIST_LOADING(state, status) {
        state.banner_list_loading = status
    },
    SET_BANNER_LIST_TO_MY_ACCOUNT(state, payload) {
        let banners = []
        let lastPackageLine = ''
        if(payload !== ''){
            payload.forEach(item => {
                lastPackageLine = item.user_package.user_package_lines[item.user_package.user_package_lines.length - 1]
                banners.push({
                    id: item.id, 
                    type: item.type, 
                    topic: item.topic, 
                    description: item.description, 
                    status: item.status, 
                    src: item.image.url,
                    created: item.created,
                    paid_date: lastPackageLine.paid_date,
                    duration: lastPackageLine.duration,
                    package_id: item.user_package.id,
                    package: item.user_package.order_code
                })
            })
            // console.log(lastPackageLine)
            state.my_banners = banners
        }else{
            state.my_banners = ''
        }
    },
    SET_SHOW_EDIT_BANNER_MODAL(state, status) {
        state.bannerImageEditModal = status
    },
    SET_SHOW_DELETE_BANNER_MODAL(state, status) {
        state.bannerImageDeleteModal = status
    },
    SET_BANNER_IMAGE_LOADING(state, status) {
        state.bannerImageLoading = status
    },
    SET_PROGRESS_BAR_LOADING(state, status) {
        state.bannerProgressBar = status
    }
}

const actions = {
    setPackageFromBanner({commit}, payload) {
        commit('SET_PACKAGE_FROM_BANNER', payload)
    },
    setTopicFromBanner({commit}, data) {
        commit('SET_TOPIC_FROM_BANNER', data)
    },
    setBannerImage({commit}, payload) {
        commit('SET_IMAGE_FROM_BANNER', payload)
    },
    setDescriptionFromBanner({commit}, data) {
        commit('SET_DESCRIPTION_FROM_BANNER', data)
    },
    checkCreditBanner({commit}) {
        try{
            axios.get(apiurl + 'api-banners/check-credit-banner?id=' + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                // console.log(response)
                if(response.data.status === 200) commit('SET_CREDIT_BANNER', response.data.isUserPackage)
            })
            .finally(() => commit('SET_CHECK_CREDIT_BANNER_LOADING', false))
        }catch(e){
            throw e
        }
    },
    bannerSaved({state, commit}) {
        commit('BANNER_SAVING', true)
        let formData = new FormData()
        formData.append('user_id', localStorage.getItem('MAPCII_USER'))
        formData.append('package_id', state.package_id)
        formData.append('topic', state.topic)
        formData.append('type', state.banner.name)
        formData.append('credit', state.banner.credit)
        formData.append('image', state.banner.image)
        formData.append('description', state.banner.description)
        axios.post(apiurl + 'api-banners/save-and-upload-banner', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            if(response.data.status === 200) {
                commit('BANNER_SAVING', false)
                window.location.href = siteurl + 'account#/package'
            }else{
                alert(response.data.message)
            }
        })
        .catch((e) => console.log(e))
    },
    loadBannerListToMyAccount({commit}, inload) {
        if(inload) commit('SET_BANNER_LIST_LOADING', true)
        axios.get(apiurl + 'api-banners/load-banner-to-my-account?user=' + localStorage.getItem('MAPCII_USER'))
        .then((response) => {
            if(response.data.status === 200) {
                commit('SET_BANNER_LIST_TO_MY_ACCOUNT', response.data.banners)
            }else{
                commit('SET_BANNER_LIST_TO_MY_ACCOUNT', '')
            }
        })
        .catch((e) => console.log(e))
        .finally(() => {
            commit('SET_BANNER_LIST_LOADING', false)
            commit('SET_PROGRESS_BAR_LOADING', false)
        })
    },
    showEditBannerModal({commit}, status) {
        commit('SET_SHOW_EDIT_BANNER_MODAL', status)
    },
    showDeleteBannerModal({commit}, status) {
        commit('SET_SHOW_DELETE_BANNER_MODAL', status)
    },
    updateBannerImage({commit, dispatch}, payload) {
        commit('SET_BANNER_IMAGE_LOADING', true)
        let formData = new FormData()
        formData.append('id', payload.id)
        formData.append('topic', payload.topic)
        formData.append('description', payload.description)
        formData.append('image', payload.img)
        axios.post(apiurl + 'api-banners/update-banner-image', formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
        .then((response) => {
            if(response.data.status === 200) {
                commit('SET_SHOW_EDIT_BANNER_MODAL', false)
                commit('SET_BANNER_IMAGE_LOADING', false)
                
            }
        })
        .finally(() => {
            dispatch('loadBannerListToMyAccount', false)
            commit('SET_PROGRESS_BAR_LOADING', true)
        })
    },
    closeBannerImage({commit, dispatch}, id) {
        commit('SET_BANNER_IMAGE_LOADING', true)
        axios.get(apiurl + 'api-banners/delete-banner-image?id=' + id)
        .then((response) => {
            if(response.data.status === 200) {
                commit('SET_BANNER_IMAGE_LOADING', false)
                commit('SET_SHOW_DELETE_BANNER_MODAL', false)
            }
        })
        .finally(() => {
            dispatch('loadBannerListToMyAccount', false)
            commit('SET_PROGRESS_BAR_LOADING', true)
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}