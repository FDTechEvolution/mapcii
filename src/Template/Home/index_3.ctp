
<section class="dzsparallaxer auto-init height-is-based-on-content use-loading" data-options='{direction: "reverse", settings_mode_oneelement_max_offset: "150"}' style="border-bottom: #145ebe solid 7px;">
    <!-- Parallax Image -->
    <div class="divimage dzsparallaxer--target w-100 u-bg-overlay g-bg-white-opacity-0_5--after" style="height: 110%; background-image: url(<?= SITE_URL ?>img/cover/home_cover.jpg);"></div>
    <!-- End Parallax Image -->

    <div class="container u-bg-overlay__inner g-pt-50 g-pb-10">
        <div class="row">
            <div class="col-md-10 col-12 offset-md-1">
                <h1 class="g-color-primary text-center g-font-weight-600 mx-auto g-mb-0"><span class="">แมพซี่ ดีที่สุด</span></h1>
                <h3 class="g-color-primary text-center g-font-weight-600 mx-auto g-mb-0"><span class="">ค้นหาอสังหาฯ ด้วยแผนที่</span></h3>

                <!-- Search Form -->
                <div class="g-pa-30">
                    <?=$this->element('search_form_v1')?>
                </div>
            </div>
        </div>


        <?= $this->element('banner/top') ?>
    </div>

</section>
<section>
    <div class="container g-pt-20 g-pb-10">
        <div class="row">
            <div class="col-md-12" id="">
                <h3>อสังหาฯ ขายด่วนร้อนเงิน มาใหม่</h3>
            </div>
        </div>
        <div class="row" id="box_last_asset">
            <div class="col-md-3" id="supporter-hom-01">
                <article>
                    <img class="img-fluid w-100" src="https://sv1.picz.in.th/images/2019/10/09/cCcCvD.jpg" alt="">
                    <div class="g-brd-around g-brd-top-none g-brd-gray-light-v3 g-bg-white">
                        <ul class="d-flex list-inline g-brd-y g-brd-gray-light-v3 mb-0">
                            <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-10 mr-0">            
                                <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i> 3
                            </li>
                            <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-10 mr-0">            
                                <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i> 2
                            </li>
                            <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-10 mr-0">            
                                <i class="align-middle g-color-text mr-1 icon-real-estate-047 u-line-icon-pro"></i> 134.00
                            </li>
                        </ul>

                        <div class="g-pa-10"> 
                            <h3 class="g-font-weight-600 g-font-size-16">฿10,900,000</h3>
                            <p>
                                <a href="http://127.0.0.1:8888/Dropbox/mapcii_frontend/property/view?id=8edda77d-1b8f-426e-af98-e4c67752bcbe">บ้านเดี่ยว 2 ชั้น 59.1 ตรว. หมู่บ้านนาราโฮม ซ.11 ถ.กาญจ...</a>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</section>
<section>
    <div class="container g-pt-20 g-pb-10">
        <div class="row">
            <div class="col-md-7 " id="" data-id="box_article">
                <div class="g-pa-20 g-mt-3 g-color-white g-bg-primary text-center" style="height: 100%">

                    <h1>ทุกคำถาม มีคำตอบ</h1>
                    <h4>อ่านบทความข่าว ที่เรารวบรวมมาให้คุณได้ที่นี่</h4>
                    <?=$this->Html->image('icon/home-tool.png',['class'=>'img-fluid w-100'])?>
                </div>
            </div>

            <div class="col-md-5">
               
                    <img src="https://sv1.picz.in.th/images/2019/06/25/1Pkhtn.jpg" class="img-fluid w-100">
               
            </div>
        </div>
    </div>
</section>

<section>
    <div class="container g-pt-20 g-pb-10">
        <div class="row">
            <div class="col-md-12" id="">
                <h3>อสังหาฯ มือสองมาใหม่ล่าสุด</h3>
            </div>
        </div>
        <div class="row" id="box_last_second_asset">
            
        </div>
    </div>
</section>

<section>
    <div class="container g-pt-20 g-pb-10">
        <div class="row">
            <div class="col-md-12" id="">
                <h3>โครงการใหม่ล่าสุด</h3>
            </div>
        </div>
        <div class="row" id="box_last_newproject_asset">
            
        </div>
    </div>
</section>

<section>
    <div class="container g-pt-20 g-pb-10">
        <div class="row">
            <div class="col-md-3 text-center">
                <?=$this->Html->image('icon/home.png',['class'=>'img-fluid','style'=>'width:30%;'])?>
                <h5>รวมโครงการบ้าน</h5>
                <p>เรารวบรวมโครงการที่อยู่อาศัย หรือเพื่อลงทุน จากทั่วประเทศ ให้คุณได้เลือกสรร</p>
            </div>
            <div class="col-md-3 text-center">
                <?=$this->Html->image('icon/condominium.png',['class'=>'img-fluid','style'=>'width:30%;'])?>
                <h5>รวมโครงการคอนโด</h5>
                <p>คอนโดทำเลทอง หลากหลายรูปแบบ ให้คุณเลือกตามความต้องการและตรงใจของคุณ</p>
            </div>
            <div class="col-md-3 text-center">
                <?=$this->Html->image('icon/cityscape.png',['class'=>'img-fluid','style'=>'width:30%;'])?>
                <h5>รวมประกาศขาย/เช่า</h5>
                <p>เรารวบรวม ประกาศซื้อขาย บ้าน คอนโด ที่ดิน รวมถึง ประกาศให้เช่า </p>
            </div>
            <div class="col-md-3 text-center">
                <?=$this->Html->image('icon/land.png',['class'=>'img-fluid','style'=>'width:30%;'])?>
                <h5>รวมประกาศขายที่ดิน</h5>
                <p>ที่ดินหลากหลายพื้นที่ หลากหลายขนาด ตามความต้องการของคุณ มีมาให้เลือก</p>
            </div>
        </div>
    </div>
</section>

<section>
    <div class="row" style="border-bottom: #9E9E9E solid 3px;">
        <div class="col-md-12 g-py-5">

        </div>
    </div>
</section>

<?= $this->Html->script('map.js') ?>
<?= $this->Html->script('home.js') ?>
<?= $this->Html->script('supporter.js') ?>
<?= ''//$this->Html->script('asset-option.js') ?>

<?= ''//$this->Html->script('home/search') ?>
<?= ''///$this->Html->script('asset-option.js')    ?>
