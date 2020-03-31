<section>
    <div class="container g-pl-0 g-pr-0 g-pt-20 g-pb-10">
        <div class="row">
            <div class="col-md-12">
                <?= $this->element('banner/top') ?>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h1 class="h2 mb-0 prompt-600 g-color-primary">บทความ/ข่าว</h1>
            </div>
            <div class="col-md-9">
                <div class="container g-pl-0 g-pr-0">
                    <div class="row g-mb-20">
                        <div class="col-md-4">
                            <article>
                                <?php
                                $sanookNew = $sanookNews[0];
                                $des = explode('&nbsp;&nbsp;', $sanookNew['description']);
                                $des = $des[1];
                                $url = explode('|', $sanookNew['url']);
                                $url = $url[1];
                                ?>
                                <img src="<?= $sanookNew['image'] ?>" class="img-fluid w-100"/>
                                <strong><a href="<?= $url ?>" target="_blank"><?= h($sanookNew['title']) ?></a></strong>
                                <p><?= $des ?></p>
                            </article>
                        </div>
                        <div class="col-md-8">

                            <?php $sanookNew = $sanookNews[1]; ?>
                            <?php
                            $url = explode('|', $sanookNew['url']);
                            $url = $url[1];
                            ?>
                            <article class="text-center g-color-white g-overflow-hidden">
                                <div class="u-block-hover--scale g-min-height-300 g-flex-middle g-bg-cover g-bg-size-cover g-bg-bluegray-opacity-0_3--after g-transition-0_5" data-bg-img-src="<?= $sanookNew['image'] ?>">
                                    <div class="g-flex-middle-item g-pos-rel g-z-index-1 g-py-50 g-px-20">
                                        <h4 class="text-uppercase"><?= h($sanookNew['title']) ?></h4>
                                        <hr class="g-brd-3 g-brd-white g-width-30 g-my-20">
                                        <a class="btn btn-md u-btn-outline-white g-font-weight-600 g-font-size-11 text-uppercase" href="<?= $url ?>" target="_blank">อ่านต่อ</a>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div class="row">
                        <?php unset($sanookNews[0]);
                        unset($sanookNews[1]); ?>
                        <?php foreach ($sanookNews as $key => $bkkNew): ?>
                            <?php
                           
                            $url = explode('|', $bkkNew['url']);
                            $url = $url[1];
                            ?>
                            <div class="col-md-4 g-mb-20">

                                <article><a href="<?= $bkkNew['url'] ?>" target="_blank">
                                        <img src="<?= $bkkNew['image'] ?>" class="img-fluid w-100"/>
                                        <strong><?= ($bkkNew['title']) ?></strong>
                                    </a>
                                </article>
                            </div>
                            <?php
                            if ($key == 8) {
                                break;
                            }
                            ?>
<?php endforeach; ?>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <?= $this->element('banner/side_r') ?>
                <!-- <div class="g-mb-20">
                    <img src="https://sv1.picz.in.th/images/2019/06/25/1Pkhtn.jpg" class="img-fluid w-100">
                </div>
                <div class="g-mb-20">
                    <img src="https://sv1.picz.in.th/images/2019/06/25/1Pkhtn.jpg" class="img-fluid w-100">
                </div> -->
            </div>
        </div>
    </div>
</section>