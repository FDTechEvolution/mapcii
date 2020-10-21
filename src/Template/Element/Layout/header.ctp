<header id="js-header" class="u-header u-header--sticky-top u-header--toggle-section u-header--change-appearance u-shadow-v19 g-brd-bottom g-brd-gray-light-v4" data-id="div_header">
    <div class="u-header__section g-bg-white-opacity-0_8 g-transition-0_3">
        <nav class="js-mega-menu navbar navbar-expand-lg g-pa-0">
            <div class="container">
                <a class="navbar-brand g-pl-15" href="<?= SITE_URL ?>">
                    <?= $this->Html->image('logo.png', ['class' => 'g-width-110']) ?>
                </a>

                <button class="navbar-toggler navbar-toggler-right btn g-line-height-1 g-brd-none g-pos-abs g-top-10 g-right-0 g-pa-0 g-mt-2" type="button"
                        aria-label="Toggle navigation"
                        aria-expanded="false"
                        aria-controls="navBar"
                        data-toggle="collapse"
                        data-target="#navBar">
                    <span class="hamburger hamburger--slider g-px-15">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </span>
                </button>

                <?php
                $linkClass = 'nav-link rounded g-color-primary--hover g-bg-transparent g-bg-main--hover g-font-weight-600 g-font-size-14 g-py-10';
                $linkClassActive = 'nav-link rounded g-color-primary g-bg-transparent g-bg-main--hover g-font-weight-600 g-font-size-14 g-py-10';
                $controllerName = strtolower($this->request->getParam('controller'));
                $issales = strtolower($this->request->getQuery('issales'));
                $isrent = strtolower($this->request->getQuery('isrent'));
                //echo $issales;
                $actionName = strtolower($this->request->getParam('action'));
                ?>
                <div id="navBar" class="collapse navbar-collapse align-items-center flex-sm-row">
                    <ul class="navbar-nav ml-auto g-pb-30 g-pb-0--lg">
                        <li class="nav-item g-mx-10 g-mx-1--lg g-mb-5 g-mb-0--lg">
                            <?= $this->Html->link('อสังหาขายด่วน', ['controller' => 'property', 'action' => 'index','issales'=>'Y'], ['class' => ($controllerName=='property' && $issales=='y')?$linkClassActive:$linkClass]) ?>
                        </li>
                        <li class="nav-item g-mx-10 g-mx-1--lg g-mb-5 g-mb-0--lg">
                            <?= $this->Html->link('อสังหามือสอง', ['controller' => 'property', 'action' => 'index','isrent'=>'Y'], ['class' => ($controllerName=='property' && $isrent=='y')?$linkClassActive:$linkClass]) ?>
                        </li>
                        <li class="nav-item g-mx-10 g-mx-1--lg g-mb-5 g-mb-0--lg">
                            <?= $this->Html->link('โครงการใหม่', ['controller' => 'property', 'action' => 'new-project', 'isnewproject'=>'Y'], ['class' => ($controllerName=='property' && $actionName=='newproject')?$linkClassActive:$linkClass]) ?>
                        </li>
                        <li class="nav-item g-mx-10 g-mx-1--lg g-mb-5 g-mb-0--lg">
                            <?= $this->Html->link('บทความ/ข่าว', ['controller'=>'article'], ['class' => ($controllerName=='article')?$linkClassActive:$linkClass]) ?>
                        </li>
                        <!--
                        <li class="nav-item g-mx-10 g-mx-1--lg g-mb-5 g-mb-0--lg">
                            <?= $this->Html->link('ลงโฆษณา', ['controller'=>'advertisements','action'=>'balance'], ['class' => ($controllerName=='advertisements')?$linkClassActive:$linkClass]) ?>
                        </li>
                        -->
                        <li class="nav-item g-mx-10 g-mx-1--lg g-mb-5 g-mb-0--lg">
                            <?= $this->Html->link('ลงประกาศฟรี', ['controller' => 'myassets'], ['class' => ($controllerName=='myassets')?$linkClassActive:$linkClass]) ?>
                        </li>
                        <?php if (is_null($this->request->getSession()->read('Authen.isactive')) || $this->request->getSession()->read('Authen.isactive') == 'N') { ?>
                            <li class="nav-item g-mx-10 g-mx-1--lg g-mb-5 g-mb-0--lg">
                                <?= $this->Html->link('เข้าสู่ระบบ', ['controller' => 'login'], ['class' => ($controllerName=='login')?$linkClassActive:$linkClass]) ?>
                            </li>
                        <?php } else { ?>
                            <li class="nav-item g-ml-10--lg g-mb-5 g-mb-0--lg" style="display: -webkit-inline-box;">
                                <i class="fa fa-star" style="margin-top: 14px; margin-right: -5px; color: #c3c300;"></i><?= $this->Html->link('ลงโฆษณา', ['controller'=>'advertisements','action'=>'balance'], ['class' => ($controllerName=='advertisements')?$linkClassActive:$linkClass]) ?>
                            </li>
                            <li class="nav-item hs-has-sub-menu  g-mr-10--lg g-mx-15--xl" data-animation-in="fadeIn" data-animation-out="fadeOut">
                                <a id="nav-link--features" class="nav-link g-pl-0 g-py-10 g-px-14 g-font-weight-600 g-font-size-15" href="#!" aria-haspopup="true" aria-expanded="false" aria-controls="nav-submenu--features"><?= $this->Html->image('mapcii_avatar.png', ['class' => 'g-width-25 bg-white rounded-circle border border-info mr-1']) ?> <?= $this->request->getSession()->read('Authen.User.firstname') ?></a>
                                <ul class="hs-sub-menu list-unstyled u-shadow-v11 g-brd-top g-brd-primary g-brd-top-2 g-min-width-220 g-mt-18 g-mt-8--lg--scrolling" id="nav-submenu--features" aria-labelledby="nav-link--features">
                                    <!-- Features - Headers -->
                                    <li class="dropdown-item ">
                                        <?= $this->Html->link('ข้อมูลส่วนตัวของฉัน', ['controller' => 'account'], ['class' => 'nav-link']) ?>
                                    </li>
                                    <li class="dropdown-item ">
                                         <?= $this->Html->link('ประกาศฟรีของฉัน', ['controller' => 'myassets'], ['class' => 'nav-link']) ?>
                                    </li>
                                    <li class="dropdown-item ">
                                        <?= $this->Html->link('รายการสินทรัพย์ที่ชอบ', ['controller' => 'account','action'=>'asset-fav'], ['class' => 'nav-link']) ?>
                                    </li>
                                    <li class="dropdown-item ">
                                         <?= $this->Html->link('รายการลงโฆษณา', ['controller' => 'account', 'action' => 'package'], ['class' => 'nav-link']) ?>
                                    </li>
                                    <li class="dropdown-item ">
                                         <?= $this->Html->link('ออกจากระบบ', ['controller' => 'logout'], ['class' => 'nav-link']) ?>
                                    </li>
                                    
                                </ul>
                            </li>

                        <?php } ?>

                    </ul>
                </div>
            </div>
        </nav>
    </div>
</header>