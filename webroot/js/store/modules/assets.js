const state = {
    countImages : 0,
    checkData : null,
    provinceSelected : false,
    imagesData: [],
    position: '',
    announce: '',
    setDefaultImage: null,
    update_asset: [],
    update_loaded: true,
    update_address_loaded: true,
    province: [],
    district: [],
    subdistrict: [],
    update_success: false,
    updating: false,
    isAnnounceStatus: '',
    isAnnounceStatusLoaded: false,
    driffDate: null,
    isType: '',
    creditList: [],
    categoryList: [],
    creditDescription: '',
    closeAssetFreeModal: false,
    assetLists: [],
    imageLists: [],
    assetListLoading: false
}

const getters = {
    countImages: state => state.countImages,
    checkData: state => state.checkData,
    provinceSelected: state => state.provinceSelected,
    updateAsset: state => state.update_asset,
    updateLoaded: state => state.update_loaded,
    updateAddressLoaded: state => state.update_address_loaded,
    provinces: state => state.province,
    districts: state => state.district,
    subdistricts: state => state.subdistrict,
    updateSuccess: state => state.update_success,
    updating: state => state.updating,
    announceStatus: state => state.isAnnounceStatus,
    announceStatusLoaded: state => state.isAnnounceStatusLoaded,
    creditList: state => state.creditList,
    categorylist: state => state.categoryList,
    creditDescription: state => state.creditDescription,
    closeAssetFreeModal: state => state.closeAssetFreeModal,
    assetLists: state => state.assetLists,
    imageLists: state => state.imageLists,
    assetListLoading: state => state.assetListLoading
}

const mutations = {
    CALCULATE_IMAGEDATA (state, data) {
        state.countImages = data
    },
    CHECK_DATA (state, data) {
        state.checkData = data
    },
    PROVINCE_SELECTED (state, data) {
        state.provinceSelected = data
    },
    SAVE_IMAGES (state, data) {
        state.imagesData = data
    },
    SAVE_POSITION (state, data) {
        state.position = data
    },
    SAVE_DATA (state, data) {
        state.announce = data
    },
    SET_DEFAULT_IMAGE (state, data) {
        state.setDefaultImage = data
    },
    UPDATE_ASSET (state, data) {
        state.update_asset = data
    },
    LOAD_ASSET_DATA_UPDATE (state, status) {
        state.update_loaded = status
    },
    LOAD_ASSET_ADDRESS_UPDATE (state, status) {
        state.update_address_loaded = status
    },
    SEPARATE_ADDRESS (state, data) {
        data.forEach((item_p, index) => {
            let isProvince = {id: item_p.id, name: item_p.name}
            state.province.push(isProvince)

            item_p.districts.forEach((item_d, index) => {
                let isDistrict = {id: item_d.id, name: item_d.name, province_id: item_d.province_id}
                state.district.push(isDistrict)

                item_d.subdistricts.forEach((item_s, index) => {
                    let isSubdistrict = {id: item_s.id, name: item_s.name, district_id: item_s.district_id}
                    state.subdistrict.push(isSubdistrict)
                })
            })
        })
    },
    UPDATE_STATUS (state, status) {
        state.update_success = status
    },
    UPDATING (state, status) {
        state.updating = status
    },
    IS_TEST_ANNOUNCE (state, status) {
        state.isAnnounceStatus = status
        // console.log(state.isAnnounceStatus)
    },
    DRIFF_DATE (state, data) {
        state.driffDate = data
    },
    IS_TEST_ANNOUNCE_LOADED (state, status) {
        state.isAnnounceStatusLoaded = status
    },
    SET_CREDIT_LIST (state, data) {
        state.creditList = data
    },
    SET_IS_TYPE (state, data) {
        state.isType = data
    },
    SET_ASSET_CATEGORY (state, data) {
        state.categoryList = data
    },
    CREDIT_DESCRIPTION (state, data) {
        state.creditDescription = data
    },
    SET_CLOSE_ASSET_MODAL(state, status) {
        state.closeAssetFreeModal = status
    },
    SET_ASSET_LISTS(state, data) {
        state.assetLists = data
    },
    SET_IMAGE_LISTS(state, data) {
        state.imageLists = data
    },
    SET_ASSET_LIST_LOADING(state, status) {
        state.assetListLoading = status
    }
}

const actions = {
    checkImagegCountData ({commit}, payload) {
        let cal = (payload.maxData - payload.countData)
        commit('CALCULATE_IMAGEDATA', cal)
    },
    checkData ({commit}, data) {
        commit('CHECK_DATA', data)
    },
    provinceSelected ({commit}, data) {
        commit('PROVINCE_SELECTED', data)
    },
    saveImages ({commit}, data) {
        commit('SAVE_IMAGES', data)
    },
    setDefaultImage ({commit}, data) {
        commit('SET_DEFAULT_IMAGE', data)
    },
    savePosition ({commit}, payload) {
        commit('SAVE_POSITION', payload)
    },
    saveAnnounceData ({commit}, payload) {
        commit('SAVE_DATA', payload)
    },
    announceSaved ({commit}) {
        try {
            let formData = new FormData()
            formData.append('user_id', localStorage.getItem('MAPCII_USER'))
            formData.append('announce_data', JSON.stringify(state.announce))
            formData.append('announce_position', JSON.stringify(state.position))
            for(let i = 0; i < state.imagesData.length; i++){
                formData.append('announce_images[]', state.imagesData[i])
            }
            formData.append('default_image', state.setDefaultImage)
            axios.post(apiurl + 'api-assets/save-new-asset', formData , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if(response.data.status === 200) {
                    if(response.data.link == 'FREE') window.location.href = siteurl + 'myassets'
                    if(response.data.link == 'AD') window.location.href = siteurl + 'account/package'
                }
            })
        }catch(e) {
            console.log(e)
        }
    },
    announceUpdate ({commit, dispatch}, id) {
        commit('UPDATE_STATUS', false)
        commit('UPDATING', true)
        try{
            let formData = new FormData()
            formData.append('id', id)
            formData.append('user_id', localStorage.getItem('MAPCII_USER'))
            formData.append('announce_update', JSON.stringify(state.announce))
            formData.append('announce_position_update', JSON.stringify(state.position))
            if(state.imagesData.length > 0){
                for(let i = 0; i < state.imagesData.length; i++){
                    formData.append('announce_images[]', state.imagesData[i])
                }
            }
            axios.post(apiurl + 'api-assets/save-update-asset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if(response.data.status === 200) {
                    commit('UPDATE_STATUS', true)
                    commit('LOAD_ASSET_DATA_UPDATE', true)
                    dispatch('loadAssetData', id)
                }
            })
            .finally(() => commit('UPDATING', false))
        }catch(e){
            console.log(e)
        }
    },
    loadAssetData ({commit,dispatch}, id) {
        try {
            axios.get(apiurl + 'api-assets/asset?id=' + id)
            .then((response) => {
                if(response.data.ads_detail){
                    let isCredit = response.data.ads_detail
                    let credit = isCredit.credit - isCredit.used

                    isCredit.user_package_lines.forEach(item => {
                        let toDiffDate = {paidDate: item.start_date, duration: item.duration}
                        dispatch('diffDate', toDiffDate)
                    })

                    let fullDetail = isCredit.order_code + ' - [' + Math.ceil(state.driffDate) + ' วัน : ' + credit + ' เครดิต]'
                    commit('CREDIT_DESCRIPTION', fullDetail)
                }else{
                    commit('CREDIT_DESCRIPTION', 'ลงประกาศฟรี')
                }

                commit('UPDATE_ASSET', response.data.detail)
                dispatch('loadCategories')
                dispatch('loadAddress')
            })
            .finally(() => commit('LOAD_ASSET_DATA_UPDATE', false))
        }catch(e){
            console.log(e)
        }
    },
    loadAddress ({commit}) {
        try{
            axios.get(apiurl + 'api-address/options')
            .then((response) => {
                // console.log(response)
                commit('SEPARATE_ADDRESS', response.data)
            })
            .finally(() => commit('LOAD_ASSET_ADDRESS_UPDATE', false))
        }catch(e){
            console.log(e)
        }
    },
    loadCategories ({commit}) {
        try{
            axios.get(apiurl + 'api-assets/category')
            .then((response) => {
                commit('SET_ASSET_CATEGORY', response.data.categorylist)
            })
        }catch(e){
            console.log(e)
        }
    },
    async packageAdCheck ({commit, dispatch}, data) {
        commit('IS_TEST_ANNOUNCE_LOADED', true)
        let packageResponse = await axios.get(apiurl + 'api-packages/package-list')
        commit('SET_IS_TYPE', (data === 'AD') ? packageResponse.data.packages[2].id : (data === 'A') ? packageResponse.data.packages[0].id : (data === 'B') ? packageResponse.data.packages[1].id : '')

        await dispatch('getPackageAd')
        await dispatch('loadCategories')
        await dispatch('loadAddress')
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
    getPackageAd({commit, dispatch, state}) {
        try{
            axios.get(apiurl + 'api-packages/package-balance?uid=' + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                if(response.data.status === 200){
                    let isDuration = null
                    let isHasCredit = null
                    let isTestAnnounce = null
                    let getCredit = null
                    let getUsed = null
                    let creditList = []

                    response.data.balance.forEach(item => {
                        item.user_package_lines.forEach(item2 => {
                            if(item2.ispaid === 'Y'){
                                let toDiffDate = {paidDate: item2.start_date, duration: item2.duration}
                                dispatch('diffDate', toDiffDate)

                                if(item2.package_line.package_id === state.isType) {
                                    getCredit += item.credit
                                    getUsed += item.used

                                    if(item.credit > item.used) creditList.push({id:item.id, code:item.order_code, duration:Math.ceil(state.driffDate), credit:(item.credit - item.used)})
                                }
                                
                                isDuration = (Math.ceil(state.driffDate) >= 0) ? true : false
                                isTestAnnounce = false
                            }else{
                                isTestAnnounce = true
                            }
                        })
                    })

                    // console.log(creditList)
                    // console.log(getCredit)
                    // console.log(getUsed)
                    if(getCredit > getUsed) isHasCredit = true
                    commit('SET_CREDIT_LIST', creditList)

                    let packageStatus = {isDuration: isDuration, isHasCredit: isHasCredit, isTestAnnounce: isTestAnnounce}
                    commit('IS_TEST_ANNOUNCE', packageStatus)
                }else{
                    commit('IS_TEST_ANNOUNCE', null)
                }
            })
            .finally(() => commit('IS_TEST_ANNOUNCE_LOADED', false))
        }catch(e){
            console.log(e)
        }
    },
    closeAssetFreeModal ({commit}, status) {
        commit('SET_CLOSE_ASSET_MODAL', status)
    },
    closeAssetFree ({commit, dispatch}, id) {
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
                    dispatch('closeAssetFreeModal', false)
                    dispatch('getPackageAd')
                }
            })
        }catch(e){
            throw e
        }
    },
    loadAssetList ({commit}) {
        commit('SET_ASSET_LIST_LOADING', true)
        try{
            axios.get(apiurl + 'api-assets/getlistasset?user=' + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                commit('SET_ASSET_LISTS', response.data.list)
                commit('SET_IMAGE_LISTS', response.data.list_image)
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => commit('SET_ASSET_LIST_LOADING', false))
        }catch(e){
            console.log(e)
        }
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}