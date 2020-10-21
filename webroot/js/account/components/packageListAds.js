export const PackageListAds = {
    template: `<div class="table-responsive tableresponsive">
                    <table class="table table-hover" id="tb_list_asset">
                        <thead>
                            <tr>
                                <th class="text-center">หมายเลข</th>
                                <th class="text-center">ประเภท</th>
                                <th class="text-center">รูป</th>
                                <th>รายละเอียด</th>
                                <th class="text-center">วันที่ลงประกาศ</th>
                                <th class="text-center">เหลืออายุ</th>
                                <th class="text-center">สถานะ</th>
                                <th class="text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading">
                                <td colspan="8" class="text-center">
                                    <div class="loadingio-spinner-spinner-72aw3to60xg">
                                        <div class="ldio-cm123s8lq54">
                                            <div></div><div></div><div></div>
                                            <div></div><div></div><div></div>
                                            <div></div><div></div><div></div>
                                            <div></div><div></div><div></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-else is="asset-list-table"
                                v-for="(asset, index) in assets"
                                :asset = "asset"
                                :index = "index"
                                :images = "images"
                            >
                            </tr>
                        </tbody>
                    </table>
                </div>`
}