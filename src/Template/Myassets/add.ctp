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
<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <!-- Breadcrumbs -->
        <div class="container-fluid g-py-50" style="padding-bottom: 65px !important;">
            <ul class="u-list-inline g-font-weight-500 mb-2">
                <li class="list-inline-item g-mr-5">
                    <?= $this->Html->link('รายการประกาศ', ['controller' => 'myassets'], ['class' => 'u-link-v5 g-color-gray-dark-v5 g-color-main--hover']) ?>
                    <i class="g-color-gray-light-v2 g-ml-5 fa fa-angle-right"></i>
                </li>

                <li class="list-inline-item g-color-primary">
                    <span>เพิ่มประกาศ</span>
                </li>
            </ul>
            <h1 class="h2 mb-0 prompt-600">เพิ่มประกาศ</h1>
        </div>
    </div>
</div>
<div class="container-fluid g-pb-100" id="assets-list">
    <?= $this->element('alert') ?>
    <asset-index></asset-index>
</div>

<?= $this->Html->css('myassets/style.css') ?>

<?= $this->Html->script('asset/validation.js') ?>
<?= $this->Html->script('asset-option.js') ?>
<?= $this->Html->script('address-option.js') ?>
<?= $this->Html->script('asset/main.js', ['type' => 'module']) ?>
