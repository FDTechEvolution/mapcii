export const progressBar = {
    mounted() {
        this.progressLoading()
    },
    methods: {
        progressLoading() {
            let i = 0
            if (i == 0) {
                i = 1
                let elem = document.getElementById("myBar")
                let width = 1
                let id = setInterval(frame, 10)
                function frame() {
                    if (width >= 100) {
                        clearInterval(id)
                        i = 0;
                    } else {
                        width++
                        elem.style.width = width + "%"
                    }
                }
            }
        }
    },
    template:`<div id="myProgress">
                    <div id="myBar" class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar"></div>
                </div>`
}