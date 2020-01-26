<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?=COVER_TITLE_IMAGE?>);">
    <div class="g-pos-rel g-z-index-1">
        <!-- Breadcrumbs -->
        <div class="container-fluid g-py-50">
            <h1 class="h2 mb-0 g-color-primary">รายการประกาศ</h1>
        </div>
    </div>
</div>
<div class="container-fluid g-pb-100">
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
                        <th>#</th>
                        <th>หัวข้อประกาศ</th>
                        <th>วันที่</th>
                        <th>สถานะ</th>
                    </tr>
                </thead>

                <tbody>
                   
                </tbody>
            </table>
        </div>
    </div>
</div>
<script>var user_id = '<?=$user_id?>';</script>
<?=$this->Html->script('asset/list.js')?>