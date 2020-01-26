<div class="container g-pt-100 g-pb-20">
    <div class="row justify-content-between">
        <div class="col-lg-9 order-lg-2 g-mb-80">
            <div class="g-pl-20--lg">
                
                <div id="box_article">
                    
                </div>

                <nav id="stickyblock-end" class="text-center" aria-label="Page Navigation">
                    <ul class="list-inline">
                        <li class="list-inline-item float-left g-hidden-xs-down">
                            <a class="u-pagination-v1__item u-pagination-v1-4 g-brd-gray-light-v3 g-brd-primary--hover g-rounded-50 g-pa-7-16" href="#!" aria-label="Previous">
                                <span aria-hidden="true">
                                    <i class="fa fa-angle-left g-mr-5"></i> Previous
                                </span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a class="u-pagination-v1__item u-pagination-v1-4 u-pagination-v1-4--active g-rounded-50 g-pa-7-14" href="#!">1</a>
                        </li>
                        <li class="list-inline-item">
                            <a class="u-pagination-v1__item u-pagination-v1-4 g-rounded-50 g-pa-7-14" href="#!">2</a>
                        </li>
                        <li class="list-inline-item float-right g-hidden-xs-down">
                            <a class="u-pagination-v1__item u-pagination-v1-4 g-brd-gray-light-v3 g-brd-primary--hover g-rounded-50 g-pa-7-16" href="#!" aria-label="Next">
                                <span aria-hidden="true">
                                    Next <i class="fa fa-angle-right g-ml-5"></i>
                                </span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>

        <div class="col-lg-3 order-lg-1 g-brd-right--lg g-brd-gray-light-v4 g-mb-80">
            <div class="g-pr-20--lg">
                
                <div class="g-mb-50">
                    <img src='https://sv1.picz.in.th/images/2019/06/25/1Pkhtn.jpg' class='img-fluid w-100'/>
                </div>
               

                <hr class="g-brd-gray-light-v4 g-mt-50 mb-0">

                <div id="stickyblock-start" class="js-sticky-block g-sticky-block--lg g-pt-50" data-start-point="#stickyblock-start" data-end-point="#stickyblock-end">

                    <div class="g-mb-50">
                        <h3 class="h5 g-color-black g-font-weight-600 mb-4">Newsletter</h3>
                        <div class="input-group">
                            <span class="input-group-btn">
                                <button class="btn u-btn-primary g-rounded-left-50 g-py-13 g-px-20">
                                    <i class="icon-communication-062 u-line-icon-pro g-pos-rel g-top-1"></i>
                                </button>
                            </span>
                            <input class="form-control g-brd-primary g-placeholder-gray-dark-v5 border-left-0 g-rounded-right-50 g-px-15" type="email" placeholder="Enter your email ...">
                        </div>
                    </div>
                    <!-- End Newsletter -->
                </div>
            </div>
        </div>
    </div>
</div>
<?= $this->Html->script('article.js') ?>

<script type="text/javascript" language="javascript">
    $(document).ready(function () {

        $.get(apiurl + 'api-articles', {}, function (data) {
            var json = JSON.parse(data);
            console.log(json);
            $.each(json,function(key,article){
                var str = uiGenArticleBlock(article);
                $('#box_article').append(str);
            });
        });
    });
</script> 