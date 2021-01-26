<style>
    .bg-white-op-7 {
        background-color: rgba(255,255,255,0.7);
    }
    .g-rad-3 {
        border-radius: 3px;
    }
    .a-href-color {
        color: #333;
    }
    .a-href-color:hover {
        color: #333;
        text-decoration: none;
    }
</style>

<div class="row bg-white-op-7 g-rad-3 g-px-30 g-pt-40 g-pb-80">
    <div class="col-md-3 text-center">
        <?= $this->Html->image('icon/home_icon_7.png', ['url' => ['controller' => 'property', 'action' => 'index', 'issales'=>'Y' ,'type'=>'อสังหา-ขายด่วน'], 'class' => 'img-fluid g-pb-0 g-mb-0']); ?>
        <h4 class="g-mt-minus-20"><?= $this->Html->link('อสังหาขายด่วน', ['controller' => 'property', 'action' => 'index', 'issales'=>'Y', 'type'=>'อสังหา-ขายด่วน'], ['class' => 'a-href-color']) ?></h4>
    </div>
    <div class="col-md-3 text-center">
        <?= $this->Html->image('icon/home_icon_8.png', ['url' => ['controller' => 'property', 'action' => 'index', 'type'=>'อสังหา-มือสอง'],'class' => 'img-fluid g-pb-0 g-mb-0']); ?>
        <h4 class="g-mt-minus-20"><?= $this->Html->link('อสังหามือสอง', ['controller' => 'property', 'action' => 'index', 'type'=>'อสังหา-มือสอง'], ['class' => 'a-href-color']) ?></h4>
    </div>
    <div class="col-md-3 text-center">
        <?= $this->Html->image('icon/home_icon_9.png', ['url' => ['controller' => 'property', 'action' => 'index', 'type'=>'อสังหา-โครงการใหม่'], 'class' => 'img-fluid g-pb-0 g-mb-0']); ?>
        <h4 class="g-mt-minus-20"><?= $this->Html->link('โครงการใหม่', ['controller' => 'property', 'action' => 'index', 'type'=>'อสังหา-โครงการใหม่'], ['class' => 'a-href-color']) ?></h4>
    </div>
    <div class="col-md-3 text-center">
        <?= $this->Html->image('icon/home_icon_5.png', ['url' => ['controller'=>'article'], 'class' => 'img-fluid g-pb-0 g-mb-0']); ?>
        <h4 class="g-mt-minus-20"><?= $this->Html->link('บทความ/ข่าว', ['controller'=>'article'], ['class' => 'a-href-color']) ?></h4>
    </div>
</div>