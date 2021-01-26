<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?=COVER_TITLE_IMAGE?>);">
    <div class="g-pos-rel g-z-index-1">
        <!-- Breadcrumbs -->
        <div class="container g-pt-40">
            
        </div>
    </div>
</div>
<div id="assets-list" class="container g-pb-100">
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
                    }else{ ?>
                        <h3 class="h3 mb-0 g-color-primary g-mr-20">รายการประกาศฟรีของฉัน</h3>
                <?php
                    }
                ?>
            </div>
            <div class="col-md-4">
                <?=$this->Html->link('<i class="far fa-plus-square"></i> เพิ่มประกาศ',['action'=>'add'],['class'=>"btn btn-outline-primary mb-0", 'style' => 'margin-bottom: -25px !important;', 'escape' => false])?>
            </div>
            <div class="col-md-8 text-right align-text-bottom pt-4 mb-2">
                <small>
                    <i class="fas fa-edit text-success"></i> = แก้ไขประกาศ , <i class="fas fa-redo-alt text-info"></i> = ต่ออายุประกาศ <u>(อายุ < 7 วัน)</u> , <i class="fas fa-level-up-alt text-primary"></i> = เลื่อนประกาศขึ้นอันดับแรก <u>(วันละ 1 ครั้ง)</u> , <i class="fas fa-times text-danger"></i> = ปิดประกาศ
                </small>
            </div>
        </div>
        <asset-list-table
            :assets = "this.$store.getters.assetLists"
            :images = "this.$store.getters.imageLists"
        ></asset-list-table>
    </div>

    <div class="modal fade" id="modalPackage" role="dialog">
        <div class="modal-dialog modal-banner">
        
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-window-close g-font-size-20 g-color-red"></i></button>
                </div>
                
                <div class="modal-body">
                    <package-payment
                        :new-project = "isNewProject"
                        :sales = "isSales"
                        :rent = "isRent"
                        :asset-name = "assetName"
                        :asset-id = 'assetId'
                    >
                    </package-payment>
                </div>
                <div class="modal-footer">
                    
                </div>
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

<?= $this->Html->css('myassets/style.css') ?>
<?=$this->Html->script('asset/component/package-payment.js')?>
<?=$this->Html->script('asset/main.js', ['type' => 'module'])?>