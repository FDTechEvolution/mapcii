<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="container-fluid g-py-50">
            <h1 class="h2 mb-0 prompt-600">บัญชีของฉัน</h1>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-9 order-lg-2 g-mb-70">

        </div>
        <div class="col-md-5 col-lg-3 order-lg-1 g-mb-70">
            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <ul class="list-unstyled g-font-weight-500 mb-0">
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> แก้ไขข้อมูลส่วนตัว', ['action'=>'update'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> เปลี่ยนรหัสผ่าน', ['action'=>'change-password'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> รายการลงโฆษณา', ['action'=>'package'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> รายการลงประกาศฟรี', ['controller' => 'myassets'], ['escape' => false]) ?>                     
                        </li>
                        <li class="g-py-2">
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> รายการสินทรัพย์ที่ชอบ', ['action'=>'asset-fav'], ['escape' => false]) ?>                     
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>