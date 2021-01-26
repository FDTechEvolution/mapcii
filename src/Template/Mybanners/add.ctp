<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?=COVER_TITLE_IMAGE?>);">
    <div class="g-pos-rel g-z-index-1">
        <!-- Breadcrumbs -->
        <div class="container g-pt-40 pb-4">
            <h1 class="h2 mb-4 g-color-primary g-mr-20">เพิ่มแบนเนอร์</h1>
        </div>
    </div>
</div>
<div id="banner" class="container g-pb-100">
    <div class="g-pa-5">
        <div class="row">
            <div class="col-md-12 mb-0">
                <?php
                    if($this->request->getSession()->read('Authen.User.islocked') == 'Y') {
                        echo "<script>
                        $(window).on('load',function(){
                            $('#blockModal').modal({show: true, backdrop: 'static', keyboard: false})
                        })
                        </script>";
                    }
                ?>
            </div>
            <div class="col-md-12 text-center mt-4">
                <banner-add></banner-add>
            </div>
        </div>
    </div>

    <div class="modal fade" id="blockModal" role="dialog">
        <div class="modal-dialog modal-blocked">
        
            <div class="modal-content">
                <div class="modal-header" style="margin: 0 auto;">
                    <i class="fa fa-lock text-danger" style="font-size: 60px"></i>
                </div>
                <div class="modal-body text-center">
                    <p class="mb-1">คุณถูกบล๊อค จนถึงวันที่ <?php echo DATE_FORMAT(date_create($this->request->getSession()->read('Authen.User.locktime')),"d/m/Y") ?></p>
                    <p>หากมีข้อสงสัย กรุณาติดต่อสอบถาม...</p>
                </div>
                <div class="modal-footer">
                    <?= $this->Html->link('<i class="fa fa-home"></i> กลับหน้าหลัก', ['controller' => 'home'], ['class' => 'btn btn-primary', 'escape' => false]) ?>
                </div>
            </div>
        
        </div>
    </div>
</div>

<style>
    .modal-dialog {
        max-width: 60%;
    }
    .modal-dialog.modal-blocked {
        width: 30%;
    }
    .u-label-secondary {
        background-color: #555;
        border-radius: 5px;
    }
    .u-label-success {
        border-radius: 5px;
    }
</style>

<script>
    
</script>

<?= $this->Html->css('mybanners/style.css') ?>
<?= $this->Html->script('banner/main.js', ['type' => 'module']) ?>