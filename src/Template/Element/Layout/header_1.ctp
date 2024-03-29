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
                $linkClass = 'nav-link rounded g-color-primary--hover g-bg-transparent g-bg-main--hover g-font-weight-600 g-font-size-15 g-py-10';
                $linkClassActive = 'd-inline-block rounded g-brd-around g-brd-2 g-brd-primary';
                ?>
                <div id="navBar" class="collapse navbar-collapse align-items-center flex-sm-row">
                    <ul class="navbar-nav ml-auto g-pb-30 g-pb-0--lg">
                        <li class="nav-item g-mx-10 g-mx-3--lg g-mb-5 g-mb-0--lg">
                            <?= $this->Html->link('อสังหาฯมือสอง', ['controller' => 'projects', 'action' => 'resale'], ['class' => $linkClass]) ?>
                        </li>
                        <li class="nav-item g-mx-10 g-mx-3--lg g-mb-5 g-mb-0--lg">
                            <?= $this->Html->link('โครงการใหม่', ['controller' => 'projects', 'action' => 'newly'], ['class' => $linkClass]) ?>
                        </li>
                        <li class="nav-item g-mx-10 g-mx-3--lg g-mb-5 g-mb-0--lg">
                            <?= $this->Html->link('บทความ/ข่าว', ['controller'=>'article'], ['class' => $linkClass]) ?>
                        </li>
                        <li class="nav-item g-mx-10 g-mx-3--lg g-mb-5 g-mb-0--lg">
                            <?= $this->Html->link('ลงโฆษณา', [], ['class' => $linkClass]) ?>
                        </li>
                        <li class="nav-item g-mx-10 g-mx-3--lg g-mb-5 g-mb-0--lg">
                            <?= $this->Html->link('ลงประกาศ', ['controller' => 'myassets'], ['class' => $linkClass]) ?>
                        </li>
                        <?php if ($this->request->getSession()->read('Authen.isactive') == 'N') { ?>
                            <li class="nav-item g-mx-10 g-mx-3--lg g-mb-5 g-mb-0--lg">
                                <?= $this->Html->link('เข้าสู่ระบบ', ['controller' => 'login'], ['class' => $linkClass]) ?>
                            </li>
                        <?php } else { ?>
                            <li class="nav-item hs-has-sub-menu  g-mx-10--lg g-mx-15--xl" data-animation-in="fadeIn" data-animation-out="fadeOut">
                                <a id="nav-link--features" class="nav-link g-py-10 g-px-14 g-font-weight-600 g-font-size-15" href="#!" aria-haspopup="true" aria-expanded="false" aria-controls="nav-submenu--features">ข้อมูลส่วนตัว</a>
                                <ul class="hs-sub-menu list-unstyled u-shadow-v11 g-brd-top g-brd-primary g-brd-top-2 g-min-width-220 g-mt-18 g-mt-8--lg--scrolling" id="nav-submenu--features" aria-labelledby="nav-link--features">
                                    <!-- Features - Headers -->
                                    <li class="dropdown-item ">
                                        <?= $this->Html->link('บัญชีผู้ใช้', ['controller' => 'account'], ['class' => 'nav-link']) ?>
                                    </li>
                                    <li class="dropdown-item ">
                                         <?= $this->Html->link('รายการประกาศ', ['controller' => 'myassets'], ['class' => 'nav-link']) ?>
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