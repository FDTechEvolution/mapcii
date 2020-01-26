<section class="g-mt-20 g-pt-10 g-bg-primary" style="border-top: #9E9E9E solid 4px;bottom:0;">
    <footer class="container" id="div_footer">
        <div class="row">
            <div class="col-md-12 text-center">
                <ul class="list-inline mb-1 g-font-size-13">
                    <?php $footerLinkClass = 'u-link-v5 g-color-white'; ?>
                    <li class="list-inline-item mx-3">
                        <?= $this->Html->link('ข้อตกลงและเงื่อนไข', ['controller' => 'home'], ['class' => $footerLinkClass]) ?>
                    </li>
                    <li class="list-inline-item mx-3">
                        <?= $this->Html->link('นโยบายความเป็นส่วนตัว', ['controller' => 'sales'], ['class' => $footerLinkClass]) ?>
                    </li>
                    <li class="list-inline-item mx-3">
                        <?= $this->Html->link('เกี่ยวกับเรา', ['controller' => 'rent'], ['class' => $footerLinkClass]) ?>
                    </li>

                    <li class="list-inline-item mx-3">
                        <?= $this->Html->link('ติดต่อเรา', ['controller' => 'contact'], ['class' => $footerLinkClass]) ?>
                    </li>
                </ul>
                <span class="d-block g-color-text g-font-size-13 mb-4">&#169; MapCii. All Rights Reserved. 2019</span>
            </div>


        </div>
    </footer>
</section>
