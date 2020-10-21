import {AssetAnnounceMapMaker} from './assetAnnounceMapMaker.js'

export const AssetAnnouncePosition = {
    components: {
        'map-maker' : AssetAnnounceMapMaker
    },
    data () {
        return {
            map: [],
            markers: [],
            position: [],
            LatLng: {
                lat: 13.756494,
                lng: 100.494037,
                zoom: 7
            },
            province: '',
            district: '',
            subdistrict: '',
            setDistricts: [],
            setSubdistricts: [],
            onSaving: false
        }
    },
    mounted() {
        this.loadMap()
    },
    computed: {
        savePosition () {
            let payload = {lat:this.LatLng.lat, lng:this.LatLng.lng, province:this.province, district:this.district, subdistrict:this.subdistrict}
            this.$store.dispatch('savePosition', payload)
        }
    },
    methods: {
        loadMap () {
            this.map = new window.google.maps.Map(this.$refs['map'], {
                center: { lat : this.LatLng.lat, lng : this.LatLng.lng },
                zoom: this.LatLng.zoom,
                options: {
                    gestureHandling: 'greedy'
                }
            })
            this.deleteMarkers()
        },
        setMarker () {
            let that = this
            let myLatLng = new google.maps.LatLng(that.LatLng.lat, that.LatLng.lng)
            const marker = new window.google.maps.Marker({
                map: this.map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: myLatLng
            })
            this.markers.push(marker)
            this.setMapOnAll(this.map)

            this.map.addListener('mousemove', function () {
                this.position = marker.getPosition()
                that.LatLng.lat = this.position.lat();
                that.LatLng.lng = this.position.lng();
            })
        },
        setLatitude () {
            this.LatLng.lat = document.getElementById('latitude').value
            this.deleteMarkers()
        },
        setLongitude () {
            this.LatLng.lng = document.getElementById('longitude').value
            this.deleteMarkers()
        },
        setMapOnAll(map) {
            for (let i = 0; i < this.markers.length; i++) {
              this.markers[i].setMap(map);
            }
        },
        clearMarkers() {
            this.setMapOnAll(null)
        },
        showMarkers() {
            this.setMapOnAll(map)
        },
        deleteMarkers() {
            this.clearMarkers()
            this.markers = []
            this.setMarker()
        },
        getMap(callback) {
            let vm = this
            function checkForMap() {
                if (vm.map) callback(vm.map)
                else setTimeout(checkForMap, 200)
            }
            checkForMap()
        },
        setDistrict() {
            this.getLatLng()
            this.setDistricts = []
            this.setSubdistricts = []
            this.district = ''
            this.subdistrict = ''
            this.$store.getters.districts.forEach(district => {
                if(district.province_id === this.province) {
                    this.setDistricts.push(district)
                }
            })
        },
        setSubdistrict() {
            this.setSubdistricts = []
            this.subdistrict = ''
            this.$store.getters.subdistricts.forEach(subdistrict => {
                if(subdistrict.district_id === this.district) {
                    this.setSubdistricts.push(subdistrict)
                }
            })
        },
        getLatLng() {
            try{
                axios.get(apiurl + 'api-address/positions?id=' + this.province)
                .then((response) => {
                    this.LatLng.lat = response.data.lat
                    this.LatLng.lng = response.data.lng
                    this.LatLng.zoom = response.data.zoom
                })
                .finally(() => {
                    this.loadMap()
                    this.$store.dispatch('provinceSelected', true)
                })
            }catch(e){
                console.log(e)
            }
        },
        announceSaved() {
            this.$store.dispatch('announceSaved')
            this.onSaving = true
        }
    },
    template: `<div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group g-mb-0">
                                <label for="provinces_id">จังหวัด <strong class="text-danger">*</strong></label>
                                <select v-model="province" class="form-control" id="provinces_id" name="provinces_id" @change="setDistrict">
                                    <option value="" disabled>เลือก...</option>
                                    <option v-for="province in $store.getters.provinces" :value="province.id">{{ province.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group g-mb-0">
                                <label for="districts_id">เขต/อำเภอ</label>
                                <select v-model="district" class="form-control" id="districts_id" name="districts_id" @change="setSubdistrict">
                                    <option value="" disabled>เลือก...</option>
                                    <slot v-if="province !== ''">
                                        <option v-for="district in setDistricts" :value="district.id">{{ district.name }}</option>
                                    </slot>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group g-mb-0">
                                <label for="subdistricts_id">แขวง/ตำบล</label>
                                <select v-model="subdistrict" class="form-control" id="subdistricts_id" name="subdistricts_id">
                                    <option value="" disabled>เลือก...</option>
                                    <slot v-if="district !== ''">
                                        <option v-for="subdistrict in setSubdistricts" :value="subdistrict.id">{{ subdistrict.name }}</option>
                                    </slot>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12" style="margin-top: 15px !important;">
                            <h5 class="g-mb-0">ระบุตำแหน่งอสังหาฯบนแผนที่</h5>
                            <p class="mb-0" style="text-indent: 40px;">โปรดปักหมุดบนแผนที่ให้ตรงกับตำแหน่งอสังหาฯที่ประกาศ เพื่อเพิ่มโอกาสในการขายสังหาฯ...</p>
                            <div class="map-gg-add-announce" ref="map"></div>
                        </div>
                        <div class="col-md-6 mt-1">
                            <label for="example-nf-email">ตำแหน่งละติจูด</label>
                            <input v-model="LatLng.lat" :disabled="province === ''" type="text" class="form-control" name="latitude" id="latitude" @change="setLatitude">
                        </div>
                        <div class="col-md-6 mt-1">
                            <label for="example-nf-email">ตำแหน่งลองติจูด</label>
                            <input v-model="LatLng.lng" :disabled="province === ''" type="text" class="form-control" name="longitude" id="longitude" @change="setLongitude">
                        </div>
                        <div v-if="!onSaving" class="col-md-6 offset-6 mt-3 pl-5">
                            <button v-if="!this.$store.getters.checkData" :disabled="!this.$store.getters.checkData" class="btn btn-primary btn-block rounted">ลงประกาศ</button>
                            <button v-if="this.$store.getters.checkData" class="btn btn-primary btn-block rounted" @click="announceSaved">ลงประกาศ</button>
                        </div>
                        <div v-else class="col-md-6 offset-6 mt-3 d-flex">
                            <div class="loadingio-spinner-gear-31k4689btaa mt-1 mr-2 pr-3">
                                <div class="ldio-hi7wef2pqwc">
                                    <div><div></div><div></div><div></div>
                                    <div></div><div></div><div></div></div>
                                </div>
                            </div>
                            <button class="btn btn-primary btn-block rounted" disabled>กำลังบันทึก</button>
                        </div>
                    </div>
                    {{ savePosition }}
                </div>`
}