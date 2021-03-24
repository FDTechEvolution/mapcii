const state = {
    assetAdList: [],
    imagesAdList: [],
    assetFreeLists: [],
    imageFreeLists: [],
    packageAdList: [],
    durationAdList: [],
    assetFavorite: [],
    loadingAdList: false,
    loadingFreeList: false,
    loadingPackageAdList: false,
    loadingCloseAsset: false,
    loadingRenewAsset: false,
    loadingRenewAssetFree: false,
    closeAssetModal: false,
    renewAssetModal: false,
    renewAssetFreeModal: false,
    loadingUpAssetToTop: false,
    loadingUserProfile: true,
    driffDate: null,
    userProfile: [],
    userDisplay: [],
    cxFree: 0,
    cxADS: 0,
    progressBar: false,
    confirmDeleteAssetFavoriteModal: false,
    loadingDeleteFavorite: false,
    forFavorite: []
}

const getters = {
    userProfile: state => state.userProfile,
    userDisplay: state => state.userDisplay,
    asset: state => state.assetAdList,
    images: state => state.imagesAdList,
    assetFree: state => state.assetFreeLists,
    imageFree: state => state.imageFreeLists,
    package: state => state.packageAdList,
    duration: state => state.durationAdList,
    assetFavorite: state => state.assetFavorite,
    loading: state => state.loadingAdList,
    loadingFree: state => state.loadingFreeList,
    loadingPackage: state => state.loadingPackageAdList,
    loadingCloseAsset: state => state.loadingCloseAsset,
    loadingRenewAsset: state => state.loadingRenewAsset,
    loadingRenewAssetFree: state => state.loadingRenewAssetFree,
    loadingUpAssetToTop: state => state.loadingUpAssetToTop,
    loadingUserProfile: state => state.loadingUserProfile,
    closeAssetModal: state => state.closeAssetModal,
    renewAssetModal: state => state.renewAssetModal,
    renewAssetFreeModal: state => state.renewAssetFreeModal,
    cxFree: state => state.cxFree,
    cxADS: state => state.cxADS,
    progressBar: state => state.progressBar,
    confirmDeleteAssetFavoriteModal: state => state.confirmDeleteAssetFavoriteModal,
    loadingDeleteFavorite: state => state.loadingDeleteFavorite,
    forFavorite: state => state.forFavorite
}

const mutations = {
    SET_ADS_ASSET_LOADING(state, status) {
        state.loadingAdList = status
    },
    SET_ADS_ASSET_LIST(state, data) {
        state.assetAdList = data
        // console.log(data)
        let cxCount = 0
        let forFavorite = []
        data.forEach(item => {
            if(item.status === 'CX' || item.status === 'EX'){
                cxCount ++
            }
            forFavorite.push(item.id)
        })
        state.cxADS = cxCount
        state.forFavorite = forFavorite
    },
    SET_ADS_ASSET_IMAGE(state, data) {
        state.imagesAdList = data
    },
    SET_ASSET_LIST_LOADING(state, status) {
        state.loadingFreeList = status
    },
    SET_FREE_ASSET_LISTS(state, data) {
        state.assetFreeLists = data

        if(data) {
            let cxCount = 0
            data.forEach(item => {
                if(item.status === 'CX' || item.status === 'EX'){
                    cxCount ++
                }
            })
            state.cxFree = cxCount
        }
    },
    SET_FREE_IMAGE_LISTS(state, data) {
        state.imageFreeLists = data
    },
    SET_ADS_ASSET_PACKAGE(state, data) {
        state.packageAdList = data
    },
    SET_ADS_ASSET_DURATION(state, data) {
        state.durationAdList = data
    },
    SET_ADS_PACKAGE_LOADING(state, status) {
        state.loadingPackageAdList = status
    },
    SET_CLOSE_ASSET_MODAL(state, status) {
        state.closeAssetModal = status
    },
    SET_RENEW_ASSET_MODAL(state, status) {
        state.renewAssetModal = status
    },
    SET_RENEW_ASSET_FREE_MODAL(state, status) {
        state.renewAssetFreeModal = status
    },
    SET_CLOSE_ASSET_LOADING(state, status) {
        state.loadingCloseAsset = status
    },
    SET_RENEW_ASSET_LOADING(state, status) {
        state.loadingRenewAsset = status
    },
    SET_RENEW_ASSET_FREE_LOADING(state, status) {
        state.loadingRenewAssetFree = status
    },
    SET_UP_TO_TOP_LOADING(state, status) {
        state.loadingUpAssetToTop = status
    },
    DRIFF_DATE(state, data) {
        state.driffDate = data
    },
    SET_USER_PROFILE(state, data) {
        state.userProfile = data
        state.userDisplay = data
    },
    SET_USER_PROFILE_LOADING(state, status) {
        state.loadingUserProfile = status
    },
    SET_PROGRESS_BAR_LOADING(state, status) {
        state.progressBar = status
    },
    SET_ASSET_FAVORITE(state, data) {
        state.assetFavorite = data
    },
    SET_CONFIRM_DELETE_ASSET_FAVORITE_MODAL(state, status) {
        state.confirmDeleteAssetFavoriteModal = status
    },
    SET_LOADING_DELETE_FAVORITE(state, status) {
        state.loadingDeleteFavorite = status
    }
}

const actions = {
    loadAssetList ({commit, state, dispatch}, inLoad) {
        if(inLoad) commit('SET_ADS_ASSET_LOADING', true)
        try{
            axios.get(apiurl + 'api-assets/listassetads?user=' + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                // console.log(response)
                let isDuration = []
                response.data.list_ad_packages.forEach(item => {
                    // item.user_package_lines.forEach((item2, index) => {
                    //     if(item2.isexpire === 'N' && item2[index] === item2[item2.length -1]) {
                    //         console.log(item2[item2.length -1])
                    //         let toDiffDate = {paidDate: item2.start_date, duration: item2.duration}
                    //         dispatch('diffDate', toDiffDate)
                    //         isDuration.push({duration: Math.ceil(state.driffDate)})
                    //     }
                    // })
                    let toDiffDate = {paidDate: item.user_package_lines[item.user_package_lines.length -1].start_date, duration: item.user_package_lines[item.user_package_lines.length -1].duration}
                    dispatch('diffDate', toDiffDate)
                    isDuration.push({duration: Math.ceil(state.driffDate)})
                })
                // console.log(isDuration)

                commit('SET_ADS_ASSET_LIST', response.data.list_ads)
                commit('SET_ADS_ASSET_IMAGE', response.data.list_ad_imgs)
                commit('SET_ADS_ASSET_PACKAGE', response.data.list_ad_packages)
                commit('SET_ADS_ASSET_DURATION', isDuration)
            })
            .finally(() => {
                commit('SET_ADS_ASSET_LOADING', false)
                commit('SET_PROGRESS_BAR_LOADING', false)
            })
        }catch(e){
            throw e
        }
    },
    loadFreeAssetList ({commit}, inload) {
        if(inload) commit('SET_ASSET_LIST_LOADING', true)
        try{
            axios.get(apiurl + 'api-assets/getlistasset?user=' + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                commit('SET_FREE_ASSET_LISTS', response.data.list)
                commit('SET_FREE_IMAGE_LISTS', response.data.list_image)
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => commit('SET_ASSET_LIST_LOADING', false))
        }catch(e){
            console.log(e)
        }
    },
    getPackageAds ({commit}, id) {
        commit('SET_ADS_PACKAGE_LOADING', true)
        try{
            axios.get(apiurl + 'api-assets/listadpackages?id=' + id)
            .then((response) => {
                console.log(response)
            })
            .finally(() => commit('SET_ADS_PACKAGE_LOADING', false))
        }catch(e){
            throw e
        }
    },
    closeAssetModal ({commit}, status) {
        commit('SET_CLOSE_ASSET_MODAL', status)
    },
    renewAssetModal ({commit}, status) {
        commit('SET_RENEW_ASSET_MODAL', status)
    },
    renewAssetFreeModal ({commit}, status) {
        commit('SET_RENEW_ASSET_FREE_MODAL', status)
    },
    closeAssetAd ({commit, dispatch, state}, payload) {
        commit('SET_CLOSE_ASSET_LOADING', true)
        commit('SET_PROGRESS_BAR_LOADING', true)
        try{
            let formData = new FormData()
            formData.append('id', payload.id)
            axios.post(apiurl + 'api-assets/close-asset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if(response.data.status === 200){
                    dispatch('closeAssetModal', false)
                    dispatch('loadAssetList', false)
                }
            })
            .finally(() => {
                commit('SET_CLOSE_ASSET_LOADING', false)
                // dispatch('packages/getUserPackageBalance', null, {root:true})
            })
        }catch(e){
            throw e
        }
    },
    renewAssetAd({commit, dispatch}, id) {
        commit('SET_RENEW_ASSET_LOADING', true)
        commit('SET_PROGRESS_BAR_LOADING', true)
        try{
            let formData = new FormData()
            formData.append('id', id)
            axios.post(apiurl + 'api-assets/renew-asset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if(response.data.status === 200){
                    dispatch('renewAssetModal', false)
                    dispatch('loadAssetList', false)
                }
            })
            .finally(() => commit('SET_RENEW_ASSET_LOADING', false))
        }catch(e){
            throw e
        }
    },
    renewFreeAsset({commit, dispatch}, id) {
        commit('SET_RENEW_ASSET_FREE_LOADING', true)
        commit('SET_PROGRESS_BAR_LOADING', true)
        try{
            let formData = new FormData()
            formData.append('id', id)
            axios.post(apiurl + 'api-assets/renew-asset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if(response.data.status === 200){
                    dispatch('renewAssetFreeModal', false)
                    dispatch('loadFreeAssetList', false)
                }
            })
            .finally(() => commit('SET_RENEW_ASSET_FREE_LOADING', false))
        }catch(e){
            throw e
        }
    },
    upAssetToTop ({commit, dispatch}, id) {
        commit('SET_UP_TO_TOP_LOADING', true)
        try{
            let formData = new FormData()
            formData.append('id', id)
            axios.post(apiurl + 'api-assets/up-asset-to-top', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if(response.data.status === 200){
                    dispatch('loadAssetList', false)
                }
            })
            .finally(() => commit('SET_UP_TO_TOP_LOADING', false))
        }catch(e){
            throw e
        }
    },
    diffDate({commit}, toDiffDate) {
        let result = new Date(toDiffDate.paidDate);
        result.setDate(result.getDate() + toDiffDate.duration);
        let setDateFormat = result.getDate() + '-' + (result.getMonth() + 1) + '-' + result.getFullYear()

        let setDate = setDateFormat.split("-")
        let in_date = setDate[2] + "-" + setDate[1] + "-" + setDate[0]
        let aday = new Date(in_date)
        let fgg = (aday.getTime() - Date.now()) / (1000 * 3600 * 24)
        commit('DRIFF_DATE', fgg)
    },
    getUserProfiles ({commit}) {
        try{
            axios.get(apiurl + 'api-users/user?id=' + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                commit('SET_USER_PROFILE', response.data.data)
                // console.log(response.data.data)
                // this.userProfile = response.data.data
            })
            .finally(() => commit('SET_USER_PROFILE_LOADING', false))
        }catch(e){
            console.log(e)
        }
    },
    loadAssetFavorite({commit, dispatch}, inLoad) {
        try {
            axios.get(apiurl+"api-assets/user-favorite-asset?user_id=" + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                if(response.data.status === 200) {
                    commit('SET_ASSET_FAVORITE', response.data.fav)
                }
            })
            .finally(() => {
                commit('SET_PROGRESS_BAR_LOADING', false)
                dispatch('confirmDeleteAssetFavoriteModal', false)
                dispatch('loadingDeleteFavorite', false)
            })
        }catch(e) {
            throw e
        }
    },
    confirmDeleteAssetFavoriteModal({commit}, status) {
        commit('SET_CONFIRM_DELETE_ASSET_FAVORITE_MODAL', status)
    },
    loadingDeleteFavorite({commit}, status) {
        commit('SET_LOADING_DELETE_FAVORITE', status)
    },
    loadingProgressBar({commit}) {
        commit('SET_PROGRESS_BAR_LOADING', true)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}