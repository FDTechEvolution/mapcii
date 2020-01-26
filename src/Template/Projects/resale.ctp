
<?= $this->element('banner/top') ?>
<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="container g-pt-10">

            <h1 class="h2 mb-0 prompt-600 g-color-primary">อสังหาฯมือสอง</h1>
            <div class="row">
                <div class="col-md-12">
                    <?= $this->element('search_form_a') ?>
                </div>
            </div>
        </div>
    </div>

</div>
<div class="container">

    <div class="row justify-content-center g-pt-10">
        <div class="col-lg-9 order-lg-2 g-mb-70" id="div_assetlist"></div>

        <div class="col-md-5 col-lg-3 order-lg-1 g-mb-70">
            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <h2 class="h6 g-font-weight-600 mb-4">ประเภทอสังหาริมทรัพย์</h2>

                    <ul class="list-unstyled g-font-weight-500 mb-0" id="ul_asset_type">
                        
                        
                    </ul>
                </div>
            </div>
            <!-- End Property Type -->

            <!-- Recently Viewed -->
            <div class="g-bg-secondary g-pa-5 g-mb-30">
                <div class="g-bg-white g-pa-15">
                    <h2 class="h6 g-font-weight-600 mb-4">รายการแนะนำ</h2>


                </div>

            </div>
        </div>

    </div>
    <div class="row">
        <div class="col-md-12">

            <h3 class="h3 mb-0 prompt-600 g-color-primary">รีวิวโครงการ</h3>
        </div>
    </div>
</div>


<?= $this->Html->script('map.js') ?>
<?= $this->Html->script('asset-with-map.js') ?>
<?= $this->Html->script('asset.js') ?>
<script>
    var is_newproject = 'N';
    

    function getContent() {
        $('#page-load').show();
        var form_data = $('#frm_search').serializeArray();
        //console.log(form_data);
        var search_url = '', param = '', param_value = '', params = [];

        $.each(form_data, function (key, value) {
            //param_value = value.value;
            // param = value['name'].replace('[]','');
            param = value['name'].replace('[]', '');
            if (value['name'].endsWith('[]')) {

                if (!(param in params)) {
                    params[param] = [];

                }
                params[param].push(value.value);
                param = '';
            } else {
                params[param] = value.value;
            }
        });

        console.log(params);
        if (typeof params['asset_for'] !== 'undefined') {
            search_url += '&for=' + params['asset_for'];
        }
        if (typeof params['orderby'] !== 'undefined') {
            search_url += '&order=' + params['orderby'];
        }
        if (typeof params['price_start'] !== 'undefined') {
            search_url += '&price_start=' + params['price_start'];
        }
        if (typeof params['price_end'] !== 'undefined') {
            search_url += '&price_end=' + params['price_end'];
        }
        if (typeof params['search_text'] !== 'undefined') {
            search_url += '&search_text=' + params['search_text'];
        }
        if (typeof params['search_province_id'] !== 'undefined') {

            $.each(params['search_province_id'], function (key, value) {
                if (key === 0) {
                    param_value = value;
                } else {
                    param_value = param_value + ',' + value;
                }
            });
            search_url += '&province=' + param_value;
            param_value = '';
        }
        if (typeof params['search_asset_type_id'] !== 'undefined') {

            $.each(params['search_asset_type_id'], function (key, value) {
                if (key === 0) {
                    param_value = value;
                } else {
                    param_value = param_value + ',' + value;
                }
            });
            search_url += '&type=' + param_value;
            param_value = '';
        }
        //console.log(search_url);



        $.get(apiurl + 'api-assets/avaliable-asset?isnewproject='+is_newproject+'&' + search_url).done(function (res) {
            res = JSON.parse(res);
            console.log(res);
            var assets = res.list;
            $('#div_assetlist').empty();
            
            $.each(assets, function (key, value) {
                 $.AssetCore.general.printGrid('#div_assetlist',value);
            });

           
            $('#page-load').hide();
        });
    }

    $(document).ready(function () {
        $('#page-load').show();
        $.get(apiurl + 'api-assets/avaliable-asset?province=1&isnewproject='+is_newproject).done(function (res) {
            res = JSON.parse(res);
            var assets = res.list;
            $('#div_assetlist').empty();
            var lat, lng;
            $.each(assets, function (key, value) {
                if (key == 0) {
                    lat = value.latitude;
                    lng = value.longitude;
                }
                $.AssetCore.general.printGrid('#div_assetlist',value);
            });

            //setCenter(lat, lng);
            $('a[data-action="favorite"]').on('click', function (e) {

                var id = $(this).attr('data-id');
                //alert(id);
            });
            $('#page-load').hide();
        });
        
        var config = {apiurl:apiurl + 'api-assets/type',siteurl:siteurl,is_newproject:is_newproject};
        $.AssetCore.widget.printAssetTypeBar('#ul_asset_type',config);

        $("form").submit(function (event) {
            getContent();
            return false;
        });

    });
</script>