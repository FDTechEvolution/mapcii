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

            <div class="table-responsive">
  <table class="table" id="tb-fav">
    <thead>
      <tr>
        <th>#</th>
        <th>รูป</th>
        <th>สินทรัพย์</th>
        <th>ราคา</th>
      </tr>
    </thead>

    <tbody>
      
    </tbody>
  </table>
</div>

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
                            <?= $this->Html->link('<i class="mr-1 fa fa-caret-right"></i> รายการสินทรัพย์ที่ชอบ', ['action'=>'asset-fav'], ['escape' => false,'class'=>'g-color-primary--active']) ?>                     
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function(){
        $.get( apiurl+"api-assets/fav/"+user_id, function( data ) {
            var json = JSON.parse(data);
            console.log(json);
            $.each(json,function(key,asset){
                //asset = asset['asset'];
                $('#tb-fav > tbody').append('<tr><td></td><td><image src="'+asset.url+'" width="100"/></td><td>'+asset.name+'</td><td>'+Number(asset.price).toLocaleString('en')+'</td></tr>');
            });
        });
    });
</script>