<section class="dzsparallaxer auto-init height-is-based-on-content use-loading" data-options='{direction: "reverse", settings_mode_oneelement_max_offset: "150"}' style="border-bottom: #145ebe solid 7px;">
    <!-- Parallax Image -->
    <div class="divimage dzsparallaxer--target w-100 u-bg-overlay g-bg-white-opacity-0_5--after" style="height: 110%; background-image: url(<?= SITE_URL ?>img/cover/home_cover.jpg);"></div>
    <!-- End Parallax Image -->

    <div class="container u-bg-overlay__inner g-pt-50 g-pb-10">
        <div class="row">
            <div class="col-md-10 col-12 offset-md-1">
                <h1 class="g-color-primary text-center g-font-weight-600 mx-auto g-mb-0"><span class="">แมพซี่ ดีที่สุด</span></h1>
                <h3 class="g-color-primary text-center g-font-weight-600 mx-auto g-mb-0"><span class="">ด้านการค้นหาอสังหาฯ ด้วยแผนที่</span></h3>

                <!-- Search Form -->
                <div class="g-pa-30">
                    <?= $this->element('menu_icon_header') ?>
                </div>
            </div>
        </div>
        
        <?= $this->element('banner/top') ?>
    </div>

</section>
<div id="ishome">
    <section>
        <div class="container g-pt-20 g-pb-10">
            <div class="row">
                <div class="col-md-12" id="">
                    <h3>อสังหาฯ ขายด่วนร้อนเงิน มาใหม่</h3>
                </div>
            </div>
            <get-assets
                :type = "'ขายด่วน'"
            ></get-assets>
            <!-- <div class="row" id="box_last_asset">
                
            </div> -->
        </div>
    </section>

    <section>
        <div class="container g-pt-20 g-pb-10">
            <div class="row">
                <div class="col-md-12" id="">
                    <h3>อสังหาฯ มือสองมาใหม่ล่าสุด</h3>
                </div>
            </div>
            <get-assets
                :type = "'มือสอง'"
            ></get-assets>
            <!-- <div class="row" id="box_last_second_asset">

            </div> -->
        </div>
    </section>

    <section>
        <div class="container g-pt-20 g-pb-10">
            <div class="row">
                <div class="col-md-12" id="">
                    <h3>อสังหาฯ โครงการใหม่ล่าสุด</h3>
                </div>
            </div>
            <get-assets
                :type = "'โครงการใหม่'"
            ></get-assets>
            <!-- <div class="row" id="box_last_newproject_asset">

            </div> -->
        </div>
    </section>
</div>
<br/><br/>
<section>
    <div class="container g-pt-20 g-pb-10">
        <div class="row">
            <div class="col-md-3 text-center">
                <?= $this->Html->image('icon/home.png', ['url' => ['controller' => 'property', 'action' => 'index', 'search_asset_type_id'=>'6640bc19-8d50-43a4-82b2-45f33741e58f', 'asset_type' => '6640bc19-8d50-43a4-82b2-45f33741e58f', 'is' => 'โครงการบ้าน'], 'class' => 'img-fluid', 'style' => 'width:30%;']) ?>
                <h5><?= $this->Html->link('รวมโครงการบ้าน', ['controller' => 'property', 'action' => 'index', 'search_asset_type_id'=>'6640bc19-8d50-43a4-82b2-45f33741e58f', 'asset_type' => '6640bc19-8d50-43a4-82b2-45f33741e58f', 'is' => 'โครงการบ้าน'], ['class' => 'a-href-color g-font-weight-600']) ?></h5>
                <p><?= $this->Html->link('เรารวบรวมโครงการที่อยู่อาศัย หรือเพื่อลงทุน จากทั่วประเทศ ให้คุณได้เลือกสรร', ['controller' => 'property', 'action' => 'index', 'search_asset_type_id'=>'6640bc19-8d50-43a4-82b2-45f33741e58f', 'asset_type' => '6640bc19-8d50-43a4-82b2-45f33741e58f', 'is' => 'โครงการบ้าน'], ['class' => 'a-href-color']) ?></p>
            </div>
            <div class="col-md-3 text-center">
                <?= $this->Html->image('icon/condominium.png', ['url' => ['controller' => 'property', 'action' => 'index', 'search_asset_type_id' => '09f96782-d729-435b-a5f5-c7f224b0ff1d', 'is' => 'โครงการคอนโด'], 'class' => 'img-fluid', 'style' => 'width:30%;']) ?>
                <h5><?= $this->Html->link('รวมโครงการคอนโด', ['controller' => 'property', 'action' => 'index', 'search_asset_type_id' => '09f96782-d729-435b-a5f5-c7f224b0ff1d', 'is' => 'โครงการคอนโด'], ['class' => 'a-href-color g-font-weight-600']) ?></h5>
                <p><?= $this->Html->link('คอนโดทำเลทอง หลากหลายรูปแบบ ให้คุณเลือกตามความต้องการและตรงใจของคุณ', ['controller' => 'property', 'action' => 'index', 'search_asset_type_id' => '09f96782-d729-435b-a5f5-c7f224b0ff1d', 'is' => 'โครงการคอนโด'], ['class' => 'a-href-color']) ?></p>
            </div>
            <div class="col-md-3 text-center">
                <?= $this->Html->image('icon/land.png', ['url' => ['controller' => 'property', 'action' => 'index', 'search_asset_type_id' => '16dc78c4-7c21-4d5e-8edc-0e8c78572575', 'is' => 'รวมที่ดิน'], 'class' => 'img-fluid', 'style' => 'width:30%;']) ?>
                <h5><?= $this->Html->link('รวมประกาศขายที่ดิน', ['controller' => 'property', 'action' => 'index', 'search_asset_type_id' => '16dc78c4-7c21-4d5e-8edc-0e8c78572575', 'is' => 'รวมที่ดิน'], ['class' => 'a-href-color g-font-weight-600']) ?></h5>
                <p><?= $this->Html->link('ที่ดินหลากหลายพื้นที่ หลากหลายขนาด ตามความต้องการของคุณ มีมาให้เลือก', ['controller' => 'property', 'action' => 'index', 'search_asset_type_id' => '16dc78c4-7c21-4d5e-8edc-0e8c78572575', 'is' => 'รวมที่ดิน'], ['class' => 'a-href-color']) ?></p>
            </div>
            <div class="col-md-3 text-center">
                <?= $this->Html->image('icon/cityscape.png', ['url' => ['controller' => 'property', 'action' => 'index',], 'class' => 'img-fluid', 'style' => 'width:30%;']) ?>
                <h5><?= $this->Html->link('รวมประกาศขาย', ['controller' => 'property', 'action' => 'index'], ['class' => 'a-href-color g-font-weight-600']) ?></h5>
                <p><?= $this->Html->link('เรารวบรวม ประกาศซื้อขาย บ้าน คอนโด ที่ดิน', ['controller' => 'property', 'action' => 'index'], ['class' => 'a-href-color']) ?></p>
            </div>
        </div>
    </div>
</section>

<style>
    .font-new-family {
        font-family: 'Fredoka One';
    }
    p.is-show-discount {
        background-color: #dd0000;
        padding: 0px 7px;
        border-radius: 3px;
        font-size: 12px;
        color: #fff;
    }
    p.is-show-new {
        background-color: #dd0000;
        padding: 3px 7px;
        border-radius: 3px;
        font-size: 10px;
        color: #fff;
    }
</style>

<?= ''//$this->Html->script('map.js') ?>
<?= ''//$this->Html->script('home.js') ?>
<?= ''//$this->Html->script('supporter.js') ?>
<?= $this->Html->script('home/main.js', ['type' => 'module']) ?>
<?= $this->Html->css('home/style.css') ?>
<?= ''//$this->Html->script('asset-option.js') ?>

<?= ''//$this->Html->script('home/search') ?>
<?= ''///$this->Html->script('asset-option.js')    ?>
