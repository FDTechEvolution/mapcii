const state = {
    packageBalance: [],
    packageDuration: [],
    packagePayment: false,
    packageBalanceLoaded: false,
    balanceLines: [],
    balanceLineLoaded: false,
    packageSize: [],

    adPackages : [],
    adFullPackage: [],
    adPackageName: [],
    adCredit: [],
    adSize: [],
    userSavePackage: false,

    bannerAPackages: [],
    bannerAPackageName:[],

    bannerBPackages: [],
    bannerBPackageName:[],

    driffDate: null
}

const getters = {
    package_balance: state => state.packageBalance,
    package_duration: state => state.packageDuration,
    package_payment: state => state.packagePayment,
    balance_loaded: state => state.packageBalanceLoaded,
    balance_line: state => state.balanceLines,
    balanceline_loaded: state => state.balanceLineLoaded,
    package_size: state => state.packageSize,

    package_ad: state => state.adPackages,
    package_full_ad: state => state.adFullPackage,
    package_ad_name: state => state.adPackageName,
    package_ad_credit: state => state.adCredit,
    package_ad_size: state => state.adSize,
    package_saved: state => state.userSavePackage,

    package_banner_a: state => state.bannerAPackages,
    package_banner_a_name: state => state.bannerAPackageName,

    package_banner_b: state => state.bannerBPackages,
    package_banner_b_name: state => state.bannerBPackageName
}

const mutations = {
    GET_PACKAGE_BALANCE(state, data) {
        state.packageBalance = data
        // (data.status === 200) ? state.packageBalance = data : (data.status === 404) ? state.packageBalance = '' : ''
    },
    GET_PACKAGE_DURATION(state, data) {
        state.packageDuration = data
    },
    GET_PACKAGE_SIZE(state, data) {
        state.packageSize = data
    },
    GET_AD_PACKAGE(state, data) {
        state.adPackages = data
        // console.log(state.adPackages)
        state.adPackageName = data[0].name
    },
    GET_AD_FULL_PACKAGE(state, data) {
        state.adFullPackage = data
    },
    GET_BANNER_A_PACKAGE(state, data) {
        state.bannerAPackages = data
        state.bannerAPackageName = data[0].package.name
    },
    GET_BANNER_B_PACKAGE(state, data) {
        state.bannerBPackages = data
        state.bannerBPackageName = data[0].package.name
    },
    USER_PACKAGE_SAVED(state, status) {
        state.userSavePackage = status
    },
    PACKAGE_PAYMENT(state, status) {
        state.packagePayment = status
    },
    BALANCE_LOADED(state, status) {
        state.packageBalanceLoaded = status
    },
    GET_BALANCE_LINE(state, data) {
        state.balanceLines = data.balance_line
    },
    BALANCELINE_LOADED(state, status) {
        state.balanceLineLoaded = status
    },
    DRIFF_DATE(state, data) {
        state.driffDate = data
    }
}

const actions = {
    getUserPackageBalance({commit, dispatch, state}) {
        commit('BALANCE_LOADED', true)
        try{
            axios.get(apiurl + 'api-packages/package-balance?uid=' + localStorage.getItem('MAPCII_USER'))
            .then((response) => {
                let isBalance = []
                let isPackageName = null
                let isPackageSize = null
                response.data.balance.forEach(item => {
                    let isDuration = null
                    let isAttention = false

                    item.user_package_lines.forEach(item => {
                        isPackageName = item.package_name
                        isPackageSize = item.size
                        if(item.ispaid === 'Y'){
                            let toDiffDate = {paidDate: item.start_date, duration: item.duration}
                            dispatch('diffDate', toDiffDate)
                            isDuration = Math.ceil(state.driffDate)
                        }else{
                            isAttention = true
                        }
                    })

                    isBalance.push({
                        u_pack_id : item.id,
                        order_code : item.order_code, 
                        name : isPackageName, 
                        size: isPackageSize,
                        buy_date : (item.user_package_lines[item.user_package_lines.length - 1].paid_date !== null) ? item.user_package_lines[item.user_package_lines.length - 1].paid_date : item.user_package_lines[item.user_package_lines.length - 1].buy_date,
                        duration : isDuration,
                        credit : item.credit,
                        used : item.used,
                        isexpire : item.isexpire,
                        attention : isAttention
                    })
                })
                commit('GET_PACKAGE_BALANCE', isBalance)
            })
            .finally(() => commit('BALANCE_LOADED', false))
        }catch(e){
            console.log(e)
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
    getBalanceLines({commit}, id) {
        commit('BALANCELINE_LOADED', true)
        try{
            axios.get(apiurl + 'api-packages/package-balance-lines?upid=' + id)
            .then((response) => {
                commit('GET_BALANCE_LINE', response.data)
            })
            .finally(() => commit('BALANCELINE_LOADED', false))
        }catch(e){
            console.log(e)
        }
    },
    getPackageDuration({commit}) {
        try{
            axios.get(apiurl + 'api-packages/package-duration')
            .then((response) => {
                commit('GET_PACKAGE_DURATION', response.data.durations)
            })
        }catch(e){
            console.log(e)
        }
    },
    getPackageSize({commit}) {
        try{
            axios.get(apiurl + 'api-packages/package-size')
            .then((response) => {
                commit('GET_PACKAGE_SIZE', response.data.sizes)
            })
        }catch(e){
            console.log(e)
        }
    },
    getAdPackages({commit,state}) {
        try{
            axios.get(apiurl + 'api-packages/package-ad-list')
            .then((response) => {
                if(response.data.status === 200) {
                    let allDuration = []
                    let one_month = []
                    let one_year = []
                    let fullData = []
                    let creditData = []
                    let nameSize = []
                    response.data.package_ad.forEach(item => {
                        if(item.package_duration.duration_name === '1 เดือน') one_month.push(item)
                        if(item.package_duration.duration_name === '1 ปี') one_year.push(item)
                    })
                    allDuration.push(one_month, one_year)

                    allDuration.forEach(item => {
                        let sPrice = null; let sCredit = null; let sName = null
                        let mPrice = null; let mCredit = null; let mName = null
                        let lPrice = null; let lCredit = null; let lName = null

                        item.forEach(size => {
                            if(size.size.name === 'S') {
                                sPrice = size.isprice
                                sCredit = size.iscredit
                                sName = size.size.name
                            }
                            if(size.size.name === 'M') {
                                mPrice = size.isprice
                                mCredit = size.iscredit
                                mName = size.size.name
                            }
                            if(size.size.name === 'L') {
                                lPrice = size.isprice
                                lCredit = size.iscredit
                                lName = size.size.name
                            }
                        })

                        fullData.push({
                            name: item[0].package.name, 
                            duration_name: item[0].package_duration.duration_name, 
                            duration_time: item[0].package_duration.duration_exp, 
                            s: sPrice, 
                            m: mPrice, 
                            l: lPrice
                        })
                        creditData.push({s: sCredit, m: mCredit, l: lCredit})
                        nameSize.push({s: sName, m: mName, l: lName})
                    })
                    // console.log(creditData)

                    // console.log(fullData)

                    commit('GET_AD_PACKAGE', fullData)
                    commit('GET_AD_FULL_PACKAGE', response.data.package_ad)
                    state.adCredit = creditData[0]
                    state.adSize = nameSize[0]
                }
            })
        }catch(e){
            console.log(e)
        }
    },
    getBannerA({commit}) {
        try{
            axios.get(apiurl + 'api-packages/package-banner-a-list')
            .then((response) => {
                commit('GET_BANNER_A_PACKAGE', response.data.package_banner_a)
            })
        }catch(e){
            console.log(e)
        }
    },
    getBannerB({commit}) {
        try{
            axios.get(apiurl + 'api-packages/package-banner-b-list')
            .then((response) => {
                commit('GET_BANNER_B_PACKAGE', response.data.package_banner_b)
            })
        }catch(e){
            console.log(e)
        }
    },
    saveUserTakePackage({commit}, payload) {
        commit('USER_PACKAGE_SAVED', true)
        try{
            let formData = new FormData()
            formData.append('package', JSON.stringify(payload))
            axios.post(apiurl + 'api-packages/save-user-take-package', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if(response.data.status === 200){
                    commit('PACKAGE_PAYMENT', true)
                }else{
                    console.log(response.data.message)
                }
            })
            .finally(() => commit('USER_PACKAGE_SAVED', false))
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