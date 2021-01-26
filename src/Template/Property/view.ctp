
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<?php 
    function setDateFormat($date) {
        $exTdate = explode('T', $date);
        $exDate = explode('-', $exTdate[0]);
        return $exDate[2].'/'.$exDate[1].'/'.$exDate[0];
    }
?>

<div class="container g-pt-50 g-pb-80">

    <h1 class="h2 mb-0"><span class="text-primary">[<?= $asset['announce'] ?>]</span> : <?= $asset['name'] ?></h1>

    <div class="row">
        <div class="col-md-8">
            <span class="d-block g-font-weight-600 g-font-size-25 text-danger">
                <span class='g-font-size-15 text-dark'>ราคา : </span>
                <?php 
                    if($asset['issales'] == 'Y' && $asset['isrent'] == 'N') {
                        echo ($asset['discount'] !== 0) 
                            ? '<small><s>'.$this->Number->format($asset['price']).'</s></small> '.$this->Number->format($asset['price'] - $asset['discount']) 
                            : $this->Number->format($asset['price']);
                        echo "<span class='g-font-size-15 text-dark'> บาท</span>";
                    }

                    if($asset['issales'] == 'N' && $asset['isrent'] == 'Y') {
                        echo $this->Number->format($asset['rental'])." <span class='g-font-size-15 text-dark'>บาท/เดือน</span>";
                    }

                    if($asset['issales'] == 'Y' && $asset['isrent'] == 'Y') {
                        echo ($asset['discount'] !== 0) 
                            ? '<small><s>'.$this->Number->format($asset['price']).'</s></small> '.$this->Number->format($asset['price'] - $asset['discount']) 
                            : $this->Number->format($asset['price']);
                        echo "<span class='g-font-size-15 text-dark'> บาท</span>";
                        echo "<span class='text-dark'> | </span>";
                        echo $this->Number->format($asset['rental'])." <span class='g-font-size-15 text-dark'>บาท/เดือน</span>";
                    }
                ?> 
                
            </span>
        </div>
    </div>
    <div class="row g-pt-50">
        <div class="col-md-6 g-mb-30">
            <div class="row">
                <!-- Listing - List of Details -->
                <ul class="col-md-12 list-unstyled g-font-weight-600 mb-0">

                    <li class="g-brd-bottom--dashed g-brd-gray-light-v3 pt-1 mb-3">
                        <span class="g-color-text g-font-size-12">ประกาศสำหรับ :</span>
                        <span class="float-right g-color-black">อสังหาฯ <?= $asset['type'] ?></span>
                    </li>
                    <li class="g-brd-bottom--dashed g-brd-gray-light-v3 pt-1 mb-3">
                        <span class="g-color-text g-font-size-12">ที่ตั้ง :</span>
                        <?php $address = $asset['address']; ?>
                        <span class="float-right g-color-black"><?= $address['address1'] . ' ' . $address['subdistrict']['name'] . ' ' . $address['district']['name'] . ' ' . $address['province']['name'] ?></span>
                    </li>
                    <li class="g-brd-bottom--dashed g-brd-gray-light-v3 pt-1 mb-3">
                        <span class="g-color-text g-font-size-12">ห้องนอน :</span>
                        <span class="float-right g-color-black"><?= h($asset['bedroom']) ?> ห้อง</span>
                    </li>
                    <li class="g-brd-bottom--dashed g-brd-gray-light-v3 pt-1 mb-3">
                        <span class="g-color-text g-font-size-12">ห้องน้ำ :</span>
                        <span class="float-right g-color-black"><?= h($asset['bathroom']) ?> ห้อง</span>
                    </li>
                    <li class="g-brd-bottom--dashed g-brd-gray-light-v3 pt-1 mb-3">
                        <span class="g-color-text g-font-size-12">พื้นที่ใช้สอย :</span>
                        <span class="float-right g-color-black"><?= h($asset['usefulspace']) ?> ตารางเมตร</span>
                    </li>
                    <li class="g-brd-bottom--dashed g-brd-gray-light-v3 pt-1 mb-3">
                        <span class="g-color-text g-font-size-12">ขนาดที่ดิน :</span>
                        <span class="float-right g-color-black"><?= h($asset['landsize_1']) ?> ไร่ | <?= h($asset['landsize_2']) ?> งาน | <?= h($asset['landsize_3']) ?> ตารางวา</span>
                    </li>
                </ul>

            </div>
            <span class="u-icon-v3 g-bg-primary g-mr-15 g-mb-15 cursor-pointer" data-toggle="modal" data-target="#exampleModalCenter">
                <i class="icon-communication-011 g-color-white u-line-icon-pro"></i>
            </span>
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">แผนที่</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                           <div id="map_modal" style="height: 400px;"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-md-6 g-mb-30">
            <?php foreach ($asset['asset_images'] as $item): ?>
                <?php if ($item['isdefault'] == 'Y') { ?>
                    <?= $this->Html->image($item['image']['url'], ['class' => 'w-100']) ?>
                <?php } ?>
            <?php endforeach; ?>
        </div>
    </div>
    <div class="g-bg-secondary g-px-30 g-py-20">
        <div class="row align-items-center">
            <div class="col-lg-6 g-mb-25 g-mb-0--lg">
                <!-- Listing - Share -->
                <div class="d-flex align-items-center">
                    <ul class="list-inline g-color-text g-font-weight-600 g-font-size-13 mb-0">
                        <li class="list-inline-item mr-0">ผู้ประกาศ : <span class="g-font-weight-400"><?= h($asset['user']['firstname'] . '  ' . $asset['user']['lastname']) ?></span></li>
                        <li class="list-inline-item g-mx-40">โทร : <span class="g-font-weight-400"><?= h($asset['user']['phone']) ?></span></li>
                        <li class="list-inline-item mr-0">อีเมล์ : <span class="g-font-weight-400"><?= h($asset['user']['email']) ?></span></li>
                    </ul>
                </div>

            </div>

            <div class="col-lg-6">
                <!-- Listing - Share -->
                <div class="d-flex align-items-center float-lg-right">
                    <ul class="list-inline g-color-text g-font-weight-600 g-font-size-13 mb-0">
                        <li class="list-inline-item mr-0" style="vertical-align: top;">รหัสประกาศ : <span class="g-font-weight-400"><?= $asset['code'] ?></span></li>
                        <li class="list-inline-item g-mx-40">
                            ประกาศเมื่อ : <span class="g-font-weight-400"><?= $asset['startdate'] ?></span><br/>
                            ปรับปรุงเมื่อ : <span class="g-font-weight-400"><?= setDateFormat($asset['modified']) ?></span>
                        </li>
                    </ul>
                </div>
                <!-- End Listing - Share -->
            </div>

        </div>
    </div>
    <div class="row g-pt-10">
        <div class="col-md-12 g-pb-30">
            <div class="g-pos-rel">
                <?php $row = round(sizeof($asset['asset_images']) / 6, 0, PHP_ROUND_HALF_UP); ?>
                <div class="js-carousel g-pt-6 g-mx-2"
                     data-infinite="true"
                     data-slides-show="6"
                     data-slides-scroll="1"
                     data-rows="<?= $row ?>"
                     data-responsive='[{
                     "breakpoint": 1200,
                     "settings": {
                     "slidesToShow": 5
                     }
                     }, {
                     "breakpoint": 992,
                     "settings": {
                     "slidesToShow": 4
                     }
                     }, {
                     "breakpoint": 768,
                     "settings": {
                     "slidesToShow": 3
                     }
                     }, {
                     "breakpoint": 576,
                     "settings": {
                     "slidesToShow": 2
                     }
                     }, {
                     "breakpoint": 446,
                     "settings": {
                     "slidesToShow": 2
                     }
                     }]'>
                         <?php foreach ($asset['asset_images'] as $item): ?>
                        <div class="js-slide g-px-3">
                            <a class="js-fancybox d-block" href="javascript:;"
                               data-fancybox="lightbox-gallery--01"
                               data-src="<?= $item['image']['url'] ?>"
                               data-speed="350"
                               data-caption="Lightbox Gallery">
                                <img class="img-fluid" src="<?= $item['image']['url'] ?>" alt="Image Description">
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <div class="col-lg-9 g-mb-70">
            <!-- Listing - Description -->
            <div class="g-brd-bottom g-brd-gray-light-v3 g-pb-30">
                <div class="row">
                    <div class="col-md-3 g-mb-30">
                        <h3 class="h6 g-font-weight-600 text-uppercase mb-0">รายละเอียด</h3>
                    </div>

                    <div class="col-md-9 g-mb-30">
                        <?php $description = ($asset['description'] !== '') ? str_replace(PHP_EOL, "<br>", $asset['description']) : 'ไม่มีรายละเอียดเพิ่มเติม...'; ?>
                        <?= $description ?>
                    </div>
                </div>
            </div>
            <!-- End Listing - Description -->

            <!-- Listing - Property Details -->
            <!-- <div class="g-brd-bottom g-brd-gray-light-v3 g-py-30 g-mt-30 g-mb-30">
                <div class="row">
                    <div class="col-md-3 g-mb-30">
                        <h3 class="h6 g-font-weight-600 text-uppercase mb-0">สิ่งอำนวยควมสะดวก</h3>
                    </div>

                    <div class="col-md-9 g-mb-30">
                        <div class="row">
                            <div class="col-md-12 g-mb-30 g-mb-0--md">
                                <div class="row">

                                    <?php foreach ($asset['asset_options'] as $item): ?>
                                        <div class="col-md-4">
                                            <?= h($item['option']['name']) ?>
                                        </div>
                                    <?php endforeach; ?>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="g-brd-bottom g-brd-gray-light-v3 g-py-10 g-mt-30 g-mb-10">
                <div class="row">
                    <div class="col-md-3 g-mb-30">
                        <h3 class="h6 g-font-weight-600 text-uppercase mb-0">ตำแหน่งที่ตั้ง</h3>
                    </div>

                    <div class="col-md-9 g-mb-30">
                        <div id="map" style="height: 300px;"></div>
                    </div>
                </div>
            </div>
            <div class="g-brd-bottom g-brd-gray-light-v3 g-py-10 g-mb-30">
                <form id="frm_message" method="">
                    <?= $this->Form->hidden('asset_id', ['value' => $asset['id']]) ?>
                    <?= $this->Form->hidden('from_user', ['value' => $this->request->getSession()->read('Authen.User.id')]) ?>
                    <div class="row">
                        <div class="col-md-3 g-mb-30">
                            <select class="form-control form-control-md rounded-0 g-mb-25" name="type" id="type">
                                <option value="contact">สอบถาม</option>
                                <option value="review">รีวิว</option>
                                <option value="comment">คอมเมนต์</option>
                                <option value="report">แจ้งประกาศไม่เหมาะสม</option>
                            </select>
                        </div>

                        <div class="col-md-9 g-mb-30">
                            <?php if ($this->request->getSession()->read('Authen.isactive') == 'Y') { ?>
                                <div class="form-group g-mb-25">
                                    <div class="form-check form-check-inline mb-0">
                                        <label class="form-check-label mr-2">
                                            <input class="form-check-input mr-1" type="radio" name="to" id="contact_to_owner" value="owner" checked="checked">ติดต่อเจ้าของประกาศ
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline mb-0">
                                        <label class="form-check-label mr-2">
                                            <input class="form-check-input mr-1" type="radio" name="to" id="contact_to_admin" value="admin">ติดต่อ Admin
                                        </label>
                                    </div>

                                </div>
                                <div class="form-group g-mb-10">
                                    <label for="description">ข้อความ</label>
                                    <textarea class="form-control rounded-0 form-control-md" name="msg" id="msg" rows="6"></textarea>
                                </div>
                                <div class="g-recaptcha" data-sitekey="<?= reCAPTCHA_SiteKey ?>"></div>
                                <button class="btn u-btn-teal rounded-0 g-px-25 g-py-5" type="button" role="button" id="bt_save">บันทึก</button>
                            <?php } else { ?>
                                <div class="form-group g-mb-25 text-center">
                                    <h4 class="text-danger">กรุณาเข้าสู่ระบบเพื่อใช้งานส่วนนี้</h4>
                                    <a href="<?= SITE_URL ?>login" class="btn btn-lg u-btn-primary rounded-0 mr-sm-1 mb-3 mb-lg-0" >เข้าสู่ระบบ</a>
                                </div>

                            <?php } ?>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="col-md-5 col-lg-3 g-mb-70">
            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <h2 class="h6 g-font-weight-600 mb-4">รายการสินทรัพย์แนะนำ</h2>
                        soon....
                </div>
            </div>
        </div>

    </div>
</div>
<?= $this->Html->script('map.js') ?>
<?= $this->Html->script('asset/view.js') ?>
<script>
    $(document).ready(function () {
        var latitude = '<?= $address['latitude'] ?>';
        var longitude = '<?= $address['longitude'] ?>';
        mapWithMarker('map', {lat: parseFloat(latitude), lng: parseFloat(longitude)});
        mapWithMarker('map_modal', {lat: parseFloat(latitude), lng: parseFloat(longitude)});
    });
</script>
