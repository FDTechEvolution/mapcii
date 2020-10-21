export const packageLineModal = {
    props: ['packageCode', 'assetName'],
    template: `<transition name="modal">
                    <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-container">

                            <div class="modal-header">
                                <div class="row" style="width: 100%;">
                                    <div class="col-md-10">
                                        <h5 class="mb-0">{{ assetName }}</h5>
                                        <h6 class="mb-0"><strong>แพ็คเกจ : {{ packageCode }}</strong></h6>
                                    </div>
                                    <div class="col-md-2 text-right">
                                        <button class="btn btn-danger" @click="$parent.modalPackage = false"><i class="far fa-times-circle mr-2"></i> ปิดหน้าต่าง</button>
                                    </div>
                                </div>
                            </div>

                            <div class="modal-body">
                                <div class="tableresponsive">
                                    <table class="table g-mb-20 w-100" style="border-bottom: 1px solid #ddd;">
                                        <thead>
                                            <tr class="g-bg-secondary g-color-dark">
                                                <th># หมายเลขใบเสร็จ</th>
                                                <th class="text-center">วันที่เริ่ม - วันสุดท้าย</th>
                                                <th class="text-center">ระยะเวลา</th>
                                                <th class="text-center">เครดิต</th>
                                                <th class="text-center">ราคา(฿)</th>
                                                <th class="text-center"></th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="!$store.getters.balanceline_loaded">
                                            <tr class="pt-2 pb-2" v-for="(balanceline, index) in $store.getters.balance_line">
                                                <td data-title="หมายเลขใบเสร็จ">
                                                    <span v-if="balanceline.user_payments[index].documentno !== null">
                                                        {{index+1}}. {{ balanceline.user_payments[index].documentno }}
                                                    </span>
                                                    <span v-else>
                                                        ยังไม่ได้ชำระเงิน...
                                                    </span>
                                                </td>
                                                <td data-title="วันที่เริ่ม - วันสุดท้าย" class="text-center">
                                                    <span v-if="balanceline.start_date !== null">
                                                        {{ $parent.thaiDateFormat(balanceline.start_date) }} - {{ $parent.thaiDateFormat(balanceline.end_date) }}
                                                    </span>
                                                    <span v-else>
                                                        ยังไม่มีกำหนด...
                                                    </span>
                                                </td>
                                                <td data-title="ระยะเวลา" class="text-center">{{ balanceline.duration }} วัน</td>
                                                <td data-title="เครดิต" class="text-center">{{ balanceline.credit }}</td>
                                                <td data-title="ราคา(฿)" class="text-center">{{ $parent.formatNumber(balanceline.price) }}</td>
                                                <td data-title="การจัดการ" class="text-center">
                                                    <slot v-if="balanceline.ispaid === 'Y'">
                                                        <button class="btn btn-primary btn-sm">ชำระเงินแล้ว</button>
                                                    </slot>
                                                    <slot v-else>
                                                        <div class="row">
                                                            <slot v-if="balanceline.user_payments[0].status === 'DR'">
                                                                <div class="col-md-8 p-0">
                                                                    <button class="btn btn-info btn-sm" @click="goToPayment(balanceline.id, balanceline.package_name, balanceline.duration_name, balanceline.price, index)">ชำระเงิน</button>
                                                                </div>
                                                                <div class="col-md-4 p-0">
                                                                    <button class="btn btn-danger btn-sm"><i class="far fa-trash-alt"></i></button>
                                                                </div>
                                                            </slot>
                                                            <slot v-else-if="balanceline.user_payments[0].status === 'CK'">
                                                                <div class="col-md-12 p-0 text-center">
                                                                    กำลังตรวจสอบ...
                                                                </div>
                                                            </slot>
                                                        </div>
                                                    </slot>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody v-else>
                                            <tr>
                                                <td colspan="6" class="text-center">
                                                    <div class="loadingio-spinner-pulse-s0fdf1v0u4">
                                                        <div class="ldio-ukcojlsaueg">
                                                            <div></div><div></div><div></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                    </div>
                </transition>`
}