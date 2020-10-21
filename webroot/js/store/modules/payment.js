const state = {
    userData: '',
    userLoaded: false,
    userPaymentSaved: false
}

const getters = {
    user_data: state => state.userData,
    user_loaded: state => state.userLoaded,
    payment_saved: state => state.userPaymentSaved
}

const mutations = {
    SET_USER_DATA (state, data) {
        state.userData = data
    }
}

const actions = {
    getDataToPayment ({commit, dispatch, state}, data) {
        state.userPaymentSaved = false
        state.userLoaded = true
        try{
            axios.get(apiurl + 'api-users/user?id=' + user_id)
            .then((response) => {
                let fullname = response.data.data.firstname + " " + response.data.data.lastname
                let isOperate = (data.index === 0) ? 'ลงโฆษณา' : 'ต่ออายุ'
                let isPackage = isOperate + " / " + data.name + " / " + data.duration
                let setUserData = {id: data.id, name: fullname, code: response.data.data.usercode, package: isPackage, price: data.price}
                commit('SET_USER_DATA', setUserData)
            })
            .finally(() => state.userLoaded = false)
        }catch(e){
            console.log(e)
        }
    },
    saveUserPayment ({commit, state}, payload) {
        try{
            let formData = new FormData()
            formData.append('id', payload.id)
            formData.append('image_id', payload.img)
            axios.post(apiurl + 'api-payments/user-package-payment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if(response.data.status === 200) {
                    window.location.href = siteurl + 'advertisements/balance'
                }
            })
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