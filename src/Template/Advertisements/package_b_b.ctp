<section class="dzsparallaxer auto-init height-is-based-on-content use-loading mode-scroll loaded dzsprx-readyall g-overflow-hidden" data-options="{direction: 'reverse', settings_mode_oneelement_max_offset: '150'}">
    <!-- Parallax Image -->
    <div style="height: 200%; background-image: url(&quot;../../assets/img/bg/pattern6-2.png&quot;); transform: translate3d(0px, -103.491px, 0px);" class="divimage dzsparallaxer--target w-100 g-bg-repeat g-bg-gray-light-v4"></div>
    <!-- End Parallax Image -->

    <div class="container g-z-index-1 g-py-30">
        <h1 class="g-font-weight-300 g-letter-spacing-1 g-mb-15">ค่าบริการลงโฆษณา Banner B</h1>

        <div class="lead g-font-weight-400 g-line-height-2 g-letter-spacing-0_5">
           
        </div>
    </div>
</section>

<section class="g-py-10 g-mb-40">
    <div class="container g-pb-100">
        <div class="row">
            <div class="col-md-4 g-mt-20">
                <h4>แมพซี่ดอทคอม (mapcii.com)</h4>
                <p class="lead" style="text-indent: 30px;">ช่วยเพิ่มยอดขายให้กับธุรกิจของคุณ ด้วยการโฆษณาผ่าน Banner ทำให้โฆษณาของคุณโดดเด่นและเป็นที่จดจำของลูกค้าได้โดยง่าย แค่ปลายนิ้ว</p>
            </div>
            <div class="col-md-8 g-mt-20">
                <div class="row">
                    <div class="col-md-7">
                        <?= $this->Html->image('simple_banner_B.jpg', ['class' => 'img-fluid g-mb-20']) ?>
                    </div>
                    <div class="col-md-5 align-self-center">
                        <h3 class="text-center">Banner <span class="g-color-red">B</span></h3>
                    </div>
                </div>

                <table class="table g-mb-20" style="border-bottom: 1px solid #ddd;">
                    <thead>
                        <tr class="g-bg-primary g-color-white">
                            <th style="width: 13%;">Package</th>
                            <th style="width: 15%;">หน้าที่แสดง</th>
                            <th class="text-center" style="width: 18%;">ราคา 1 เดือน</th>
                            <th class="text-center" style="width: 19%;">ราคา 1 ปี</th>
                            <th style="width: 35%;">การแสดงผล</th>
                        </tr>
                    </thead>
                    <tbody class="g-font-size-14">
                        <tr>
                            <td>Banner B</td>
                            <td>- หน้าค้นหา</td>
                            <td class="text-center">499 บาท</td>
                            <td class="text-center">4,999<br/><span class="g-font-size-12">(ประหยัด 989 บาท)</span></td>
                            <td class="g-color-red g-font-size-12">1. เป็นการสุ่มแสดง Banner ตอนเริ่มต้น จากนั้นจะแสดง Banner ต่อไปแบบเรียลำดับ<br/>2. สามารถลง Banner และแก้ไขได้ด้วยตนเอง ตลอด 24 ชั่วโมง</td>
                        </tr>
                    </tbody>
                </table>

                <h4>ขั้นตอนการชำระเงิน/ลงโฆษณา</h4>
                <ol class="g-pl-30">
                    <li>ลูกค้า <?=$this->Html->link('สมัครสมาชิก',['controller'=>'register'],['target'=>'_blank'])?> เว็บ mapcii.com</li>
                    <li>เลือกแพ็กเกจ และ ระยะเวลา การลงโฆษณา</li>
                    <li>ชำระเงินโดยการโอนเงินเข้าบัญชี ตามแพ็กเกจ/ระยะเวลา ที่ต้องการลง มาที่</li>
                    <li><?=$this->Html->link('แจ้งชำระเงิน',['action'=>'package_payment'],['target'=>'_blank'])?> พร้อมแนบหลักฐานการโอนเงิน</li>
                    <li>ทางทีมงานจะทำการตรวจสอบ เมื่อยอดชำระถูกต้องจะทำการกำหนดสิทธิ์ให้ลูกค้าสามารถลงโฆษณาได้ทันที</li>
                    <li>เริ่มลงโฆษณาโดยการ <?=$this->Html->link('เข้าสู่ระบบสมาชิก',['controller'=>'login'],['target'=>'_blank'])?> และลงโฆษณาตามแพ็กเกจที่เลือก</li>
                    <li>หากมีคำถาม <?=$this->Html->link('โปรดติดต่อ',['controller'=>'contact'],['target'=>'_blank'])?></p>
                </ol>
            </div>
        </div>
    </div>
</section>