Vue.component ('howto-payment', {
    data: () => ({
        register: "<?=$this->Html->link('สมัครสมาชิก',['controller'=>'register'],['target'=>'_blank'])?>"
    }),
    template: `<div>
                <h4>ขั้นตอนการชำระเงิน/ลงโฆษณา</h4>
                    <ol class="g-pl-30">
                        <li>ลูกค้า <a href="#" target="_blank">สมัครสมาชิก</a> เว็บ mapcii.com</li>
                        <li>เลือกแพ็กเกจ และ ระยะเวลา การลงโฆษณา</li>
                        <li>ชำระเงินโดยการโอนเงินเข้าบัญชี ตามแพ็กเกจ/ระยะเวลา ที่ต้องการลง มาที่</li>
                        <li><?=$this->Html->link('แจ้งชำระเงิน',['action'=>'package_payment'],['target'=>'_blank'])?> พร้อมแนบหลักฐานการโอนเงิน</li>
                        <li>ทางทีมงานจะทำการตรวจสอบ เมื่อยอดชำระถูกต้องจะทำการกำหนดสิทธิ์ให้ลูกค้าสามารถลงโฆษณาได้ทันที</li>
                        <li>เริ่มลงโฆษณาโดยการ <?=$this->Html->link('เข้าสู่ระบบสมาชิก',['controller'=>'login'],['target'=>'_blank'])?> และลงโฆษณาตามแพ็กเกจที่เลือก</li>
                        <li>หากมีคำถาม <?=$this->Html->link('โปรดติดต่อ',['controller'=>'contact'],['target'=>'_blank'])?></p>
                    </ol>
                </div>`
})