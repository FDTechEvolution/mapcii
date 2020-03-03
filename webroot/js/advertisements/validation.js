let payment = new Vue ({
    el: '#payment',
    data () {
        return {
            packages: [],
            form: {
                email: null,
                time: '',
                package: '',
                price: null,
                detail: null,
                memberID: null,
                tel: null,
                slip: null
            },
            notice: null
        }
    },
    mounted () {
        this.loadPackages()
    },
    methods: {
        loadPackages: function () {
            axios.get(apiurl + 'api-packages/listpackages')
            .then((response) => {
                this.packages = response.data.packagelist
            })
            .catch(e => {
                console.log(e)
            })
        },
        checkfrm: function () {
            if(!this.form.slip) {
                this.notice = 'กรุณาแนบหลักฐานการโอนเงิน'
            }
            
            if(!this.form.tel) {
                this.notice = 'กรุณาระบุหมายเลขโทรศัพท์'
            }

            if(!this.form.memberID) {
                this.notice = 'กรุณาระบุรหัสสมาชิก'
            }

            if(!this.form.detail) {
                this.notice = 'กรุณาระบุรายละเอียด'
            }

            if(!this.form.package) {
                this.notice = 'กรุณาเลือกแพ็คเกจ'
            }

            if(!this.form.time) {
                this.notice = 'กรุณาเลือกระยะเวลาลงประกาศ'
            }

            if(!this.form.email) {
                this.notice = 'กรุณากรอกที่อยู่อีเมล์ของคุณ'
            }
        },
        checkpackage: function () {
            if(this.form.time == '1 เดือน') {
                if(this.form.package) {
                    this.packages.forEach(pk => {
                        if(this.form.package == pk.name){
                            this.form.price = pk.monthly_price
                        }
                    })
                }
            } else if(this.form.time == '1 ปี') {
                if(this.form.package) {
                    this.packages.forEach(pk => {
                        if(this.form.package == pk.name){
                            this.form.price = pk.annual_price
                        }
                    })
                }
            }
        }
    }
})