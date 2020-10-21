<h4>ลงโฆษณา</h4>
<ul>
    <li><a href="#">ลงโฆษณา Banner A / B</a></li>
    <li><?= $this->Html->link('ลงโฆษณาประกาศ (AD)', ['controller'=>'myassets','action'=>'add'], ['class' => '']) ?></li>
</ul>
<hr/>
<h4>ซื้อสิทธิ์ลงโฆษณา</h4>
<ul>
    <li><?= $this->Html->link('ซื้อโฆษณา Banner A', ['controller'=>'advertisements','action'=>'packageBannerA'], ['class' => '']) ?></li>
    <li><?= $this->Html->link('ซื้อโฆษณา Banner B', ['controller'=>'advertisements','action'=>'packageBannerB'], ['class' => '']) ?></li>
    <li><?= $this->Html->link('ซื้อโฆษณาประกาศ (AD)', ['controller'=>'advertisements','action'=>'packageAd'], ['class' => '']) ?></li>
</ul>