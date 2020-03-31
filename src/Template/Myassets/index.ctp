<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?=COVER_TITLE_IMAGE?>);">
    <div class="g-pos-rel g-z-index-1">
        <!-- Breadcrumbs -->
        <div class="container-fluid g-py-50">
            <h1 class="h2 mb-0 g-color-primary">รายการประกาศ</h1>
        </div>
    </div>
</div>
<div id="assets-list" class="container-fluid g-pb-100">
    <div class="g-pa-5">
        <div class="row">
            <div class="col-md-12">
                <?=$this->Html->link('เพิ่ม',['action'=>'add'],['class'=>BT_ADD_CLASS])?>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-hover" id="tb_list_asset">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th>หัวข้อประกาศ</th>
                        <th class="text-center">วันที่</th>
                        <th class="text-center">สถานะ</th>
                        <th class="text-center">โฆษณา</th>
                    </tr>
                </thead>
                <tbody v-if="assetAds" class="g-mb-20">
                    <tr is="asset-ads-table"
                        v-for="(assetad, index) in assetAds"
                        :asset-ads = "assetad"
                        :index = "index"
                    >
                    </tr>
                </tbody>
                <tbody>
                    <tr is="asset-list-table"
                        v-for="(asset, index) in assets"
                        :asset = "asset"
                        :index = "index"
                    >
                    </tr>
                </tbody>
            </table>
        </div>
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
</div>

<style>
    .modal-dialog {
        max-width: 60%;
    }
    .u-label-secondary {
        background-color: #555;
        border-radius: 5px;
    }
    .u-label-success {
        border-radius: 5px;
    }
</style>

<?=$this->Html->script('asset/component/package-payment.js')?>
<?=$this->Html->script('asset/main.js')?>