const state = {
    assetAdList: [],
    imagesAdList: [],
    packageAdList: [],
    durationAdList: [],
    loadingAdList: false,
    loadingPackageAdList: false,
    loadingCloseAsset: false,
    closeAssetModal: false,
    loadingUpAssetToTop: false,
    driffDate: null
}

const getters = {
    asset: state => state.assetAdList,
    images: state => state.imagesAdList,
    package: state => state.packageAdList,
    duration: state => state.durationAdList,
    loading: state => state.loadingAdList,
    loadingPackage: state => state.loadingPackageAdList,
    loadingCloseAsset: state => state.loadingCloseAsset,
    loadingUpAssetToTop: state => state.loadingUpAssetToTop,
    closeAssetModal: state => state.closeAssetModal
}

const mutations = {
    SET_ADS_ASSET_LOADING(state, status) {
        state.loadingAdList = status
    },
    SET_ADS_ASSET_LIST(state, data) {
        state.assetAdList = data
    },
    SET_ADS_ASSET_IMAGE(state, data) {
        state.imagesAdList = data
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
    SET_CLOSE_ASSET_LOADING(state, status) {
        state.loadingCloseAsset = status
    },
    SET_UP_TO_TOP_LOADING(state, status) {
        state.loadingUpAssetToTop = status
    },
    DRIFF_DATE(state, data) {
        state.driffDate = data
    }
}

const actions = {
    loadAssetList ({commit, state, dispatch}) {
        commit('SET_ADS_ASSET_LOADING', true)
        try{
            axios.get(apiurl + 'api-assets/listassetads?user=' + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                let isDuration = []
                response.data.list_ad_packages.forEach(item => {
                    item.user_package_lines.forEach(item => {
                        let toDiffDate = {paidDate: item.start_date, duration: item.duration}
                        dispatch('diffDate', toDiffDate)
                        isDuration.push({duration: Math.ceil(state.driffDate)})
                    })
                })

                commit('SET_ADS_ASSET_LIST', response.data.list_ads)
                commit('SET_ADS_ASSET_IMAGE', response.data.list_ad_imgs)
                commit('SET_ADS_ASSET_PACKAGE', response.data.list_ad_packages)
                commit('SET_ADS_ASSET_DURATION', isDuration)
            })
            .finally(() => commit('SET_ADS_ASSET_LOADING', false))
        }catch(e){
            throw e
        }
    },
    loadAssetListNoLoading ({commit, state, dispatch}) {
        try{
            axios.get(apiurl + 'api-assets/listassetads?user=' + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                let isDuration = []
                response.data.list_ad_packages.forEach(item => {
                    item.user_package_lines.forEach(item => {
                        let toDiffDate = {paidDate: item.start_date, duration: item.duration}
                        dispatch('diffDate', toDiffDate)
                        isDuration.push({duration: Math.ceil(state.driffDate)})
                    })
                })

                commit('SET_ADS_ASSET_LIST', response.data.list_ads)
                commit('SET_ADS_ASSET_IMAGE', response.data.list_ad_imgs)
                commit('SET_ADS_ASSET_PACKAGE', response.data.list_ad_packages)
                commit('SET_ADS_ASSET_DURATION', isDuration)
            })
        }catch(e){
            throw e
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
    closeAssetAd ({commit, dispatch}, id) {
        commit('SET_CLOSE_ASSET_LOADING', true)
        try{
            let formData = new FormData()
            formData.append('id', id)
            axios.post(apiurl + 'api-assets/close-asset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if(response.data.status === 200){
                    dispatch('closeAssetModal', false)
                    dispatch('loadAssetListNoLoading')
                }
            })
            .finally(() => commit('SET_CLOSE_ASSET_LOADING', false))
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
                    dispatch('loadAssetListNoLoading')
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}