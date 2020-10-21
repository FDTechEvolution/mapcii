<?= $this->Html->css('/assets/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css') ?>
<?= $this->Html->script('/assets/bootstrap-datepicker-thai-thai/js/bootstrap-datepicker.js'); ?>
<?= $this->Html->script('/assets/bootstrap-datepicker-thai-thai/js/bootstrap-datepicker-thai.js'); ?>
<?= $this->Html->script('/assets/bootstrap-datepicker-thai-thai/js/locales/bootstrap-datepicker.th.js'); ?>
<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
<?php
    if($this->request->getSession()->read('Authen.User.islocked') == 'Y') {
        echo "<script>
        $(window).on('load',function(){
            $('#blockModal').modal({show: true, backdrop: 'static', keyboard: false})
        })
        </script>";
    }
?>
<div class="modal fade" id="blockModal" role="dialog">
    <div class="modal-dialog modal-banner">
    
        <div class="modal-content">
            <div class="modal-header">
                lock
            </div>
            
            <div class="modal-body">
                คุณถูกบล๊อค
            </div>
            <div class="modal-footer">
                <?= $this->Html->link('<i class="fa fa-home"></i> กลับหน้าหลัก', ['controller' => 'home'], ['class' => 'btn btn-primary', 'escape' => false]) ?>
            </div>
        </div>
    
    </div>
</div>

    <div class="g-pos-rel g-z-index-1">
        <!-- Breadcrumbs -->
        <div class="container-fluid g-py-50">
            <ul class="u-list-inline g-font-weight-500 mb-2">
                <li class="list-inline-item g-mr-5">
                    <?= $this->Html->link('รายการประกาศ', ['controller' => 'myassets'], ['class' => 'u-link-v5 g-color-gray-dark-v5 g-color-main--hover']) ?>
                    <i class="g-color-gray-light-v2 g-ml-5 fa fa-angle-right"></i>
                </li>

                <li class="list-inline-item g-color-primary">
                    <span>เพิ่มประกาศใหม่</span>
                </li>
            </ul>
            <h1 class="h2 mb-0 prompt-600">เพิ่มประกาศใหม่</h1>
        </div>
    </div>
</div>
<div class="container-fluid g-pb-100">
    <?= $this->element('alert') ?>
    <div class="row">
        <div class="col-md-12">
            
            <ul class="nav u-nav-v1-1 u-nav-primary g-brd-bottom--md g-brd-primary g-mb-20" role="tablist" data-target="nav-create-asset" data-tabs-mobile-type="slide-up-down" data-btn-classes="btn btn-md btn-block rounded-0 u-btn-outline-primary g-mb-20">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#detail" role="tab">รายละเอียด</a>
                </li>
                <li class="nav-item" id="li_utility">
                    <a class="nav-link" data-toggle="tab" href="#utility" role="tab" disabled="disabled">สิ่งอำนวยความสะดวก/สถานที่ใกล้เคียง</a>
                </li>

                <li class="nav-item" id="li_address">
                    <a class="nav-link" data-toggle="tab" href="#address" role="tab">ตำแหน่งที่ตั้งสินทรัพย์</a>
                </li>
                <li class="nav-item" id="li_image">
                    <a class="nav-link" data-toggle="tab" href="#image" role="tab">รูปประกอบ</a>
                </li>
            </ul>
            <div id="nav-create-asset" class="tab-content">
                <div class="tab-pane fade show active" id="detail" role="tabpanel">
                    <?= $this->Form->create('asset', ['id' => 'frm_detail']) ?>
                    <input name="asset_id" id="asset_id" type="hidden"/>
                    <?= $this->Form->hidden('user_id', ['id' => 'user_id', 'value' => $user_id]) ?>
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <button class="btn u-btn-teal rounded-0 g-px-25 g-py-13" type="button" role="button" id="bt_save_detail">บันทึก</button>
                        </div>

                        <div class="col-md-8">
                            <div class="form-group">
                                <label for="name">หัวข้อประกาศ <strong class="text-danger">*</strong></label>
                                <input type="text" name="name" id="name" class="form-control rounded-0" size="255"/>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group g-mb-25">
                                <label for="asset_type_id">ประเภทสินทรัพย์ <strong class="text-danger">*</strong></label>
                                <select class="form-control rounded-0" id="asset_type_id" name="asset_type_id">
                                </select>
                            </div>
                        </div>


                        <div class="col-md-7">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group g-mb-25">
                                        <label for="type">สำหรับ <strong class="text-danger">*</strong></label>
                                        <select class="form-control rounded-0" id="type" name="type">
                                            <option value="ขาย">อสังหาขายด่วน</option>
                                            <option value="มือสอง">อสังหามือสอง</option>
                                            <option value="โครงการใหม่">โครงการใหม่</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="form-group">
                                        <label for="price">ราคาเต็ม <strong class="text-danger">*</strong></label>
                                        <input type="number" name="price" id="price" class="form-control rounded-0"/>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="discount">ส่วนลด</label>
                                        <input type="number" name="discount" id="discount" class="form-control rounded-0"/>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group g-mb-25">
                                        <label for="total_publish_day">จำนวนวันที่ประกาศ/วัน <strong class="text-danger">*</strong></label>
                                        <select class="form-control rounded-0" id="total_publish_day" name="total_publish_day">
                                            <option value="30">30</option>
                                            <option value="60">60</option>
                                            <option value="90">90</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="startdate">เริ่มประกาศวันที่ <strong class="text-danger">*</strong></label>
                                        <input type="text" name="startdate" id="startdate" class="form-control rounded-0" readonly="readonly" data-provide="datepicker" data-date-language="th-th" autocomplete="off"/>
                                    </div>
                                </div>
                                
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="bedroom">จำนวนห้องนอน</label>
                                        <input type="number" name="bedroom" id="bedroom" class="form-control rounded-0"/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="bathroom">จำนวนห้องน้ำ</label>
                                        <input type="number" name="bathroom" id="bathroom" class="form-control rounded-0"/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="usefulspace">พื้นที่ใช้สอย(ตรม)</label>
                                        <input type="number" name="usefulspace" id="usefulspace" class="form-control rounded-0"/>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="landsize">ขนาดที่ดิน(ตรว)</label>
                                        <input type="number" name="landsize" id="landsize" class="form-control rounded-0"/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-5">
                            <div class="form-group g-mb-25">
                                <label for="description">รายละเอียดอื่นๆ</label>
                                <textarea class="form-control rounded-0 form-control-md" name="description" id="description" rows="7"></textarea>
                            </div>
                        </div>
                    </div>
                    <?= $this->Form->end() ?>
                </div>

                <div class="tab-pane fade" id="utility" role="tabpanel">
                    <?= $this->Form->create('utility', ['id' => 'frm_utility']) ?>
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <button class="btn u-btn-teal rounded-0 g-px-25 g-py-13" type="button" role="button" id="bt_save_utility">บันทึก</button>
                        </div>
                        <div class="col-md-12">
                            <h4>สิ่งอำนวยความสะดวก</h4>
                            <div class="row g-pl-25" id="div_fac"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h4>สถานที่ใกล้เคียง</h4>
                            <div class="row g-pl-25" id="div_plac"></div>
                        </div>
                    </div>
                    <?= $this->Form->end() ?>
                </div>

                <div class="tab-pane fade" id="address" role="tabpanel">
                    <?= $this->Form->create('address', ['id' => 'frm_address']) ?>
                    <?= $this->Form->hidden('address_id', ['id' => 'address_id']) ?>
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <button class="btn u-btn-teal rounded-0 g-px-25 g-py-13" type="button" role="button" id="bt_save_address">บันทึก</button>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="address1">ที่อยู่</label>
                                <input type="text" name="address1" id="address1" class="form-control rounded-0"/>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group g-mb-25">
                                <label for="province_id">จังหวัด</label>
                                <select class="form-control rounded-0" id="province_id" name="province_id">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group g-mb-25">
                                <label for="district_id">อำเภอ</label>
                                <select class="form-control rounded-0" id="district_id" name="district_id">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group g-mb-25">
                                <label for="subdistrict_id">ตำบล</label>
                                <select class="form-control rounded-0" id="subdistrict_id" name="subdistrict_id">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12" style="margin-top: 15px !important;">
                            <div id="map" class="map margin-bottom-10" style="height: 400px;"></div>
                        </div>
                        <div class="col-md-3">
                            <label for="example-nf-email">ตำแหน่งละติจูด</label>
                            <?= $this->Form->control('latitude', ['class' => 'form-control', 'label' => false, 'id' => 'latitude']); ?>

                        </div>
                        <div class="col-md-3">
                            <label for="example-nf-email">ตำแหน่งลองติจูด</label>
                            <?= $this->Form->control('longitude', ['class' => 'form-control', 'label' => false, 'id' => 'longitude']); ?>
                        </div>
                    </div>
                    <?= $this->Form->end() ?>
                </div>

                <div class="tab-pane fade" id="image" role="tabpanel">
                    <div class="row">

                    </div>
                </div>
            </div>

            <?= $this->Form->end() ?>
        </div>

    </div>
</div>

<?= $this->Html->script('map.js') ?>
<?= $this->Html->script('asset/validation.js') ?>
<?= $this->Html->script('asset-option.js') ?>
<?= $this->Html->script('asset/asset.js') ?>
<?= $this->Html->script('address-option.js') ?>
