<?= $this->Form->create('image', ['id' => 'frm_image']) ?>
<div class="row">
    <div class="col-md-8">
        <div class="row" id="div_list_asset_image">
            
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group g-mb-25">
            <input type="file" class="form-control-file" id="image_file" name="image_file" accept="image/x-png,image/gif,image/jpeg" aria-describedby="fileHelp">
            <small id="fileHelp" class="form-text text-muted">ขนาดที่แนะนำคือ 800X500 px</small>
            <button class="btn btn-md u-btn-teal g-mr-10 g-mb-15" type="button" id="bt_uploadimage">อัพโหลดรูปภาพ</button>
        </div>
        <?= $this->Html->image('400x250.jpg', ['class' => 'img-fluid w-100']) ?>
    </div>

</div>
<?= $this->Form->end() ?>
<?= $this->Html->script('asset/asset-image.js') ?>