<?= $this->Html->script('map.js') ?>


<div class="">
    <div class="row no-gutters">
        <div class="col-md-8 col-lg-8 col-12">
            <div id="map" style="height: 600px;"></div>
        </div>
        <div class="col-md-4 col-lg-4 col-12" id="div_assetlist" style="overflow: scroll;overflow-y: scroll;">
            <h4 class="text-center"><span>ยังไม่มีข้อมูล</span></h4>
        </div>
    </div>
</div>

<script>
    function setMapHeight() {
        var headerHeight = parseInt($('header[data-id="div_header"]').height());
        var footerHeight = parseInt($('#div_footer').height());
        // var bannerHeight = parseInt($('#div_banner_top').height());
        console.log('headerHeight:' + headerHeight);
        console.log('footerHeight:' + footerHeight);
        var screenSize = getWindowSize();
        var mapHeight = screenSize.h - headerHeight - footerHeight - 30;
        console.log('mapHeight:' + mapHeight);
        $('#map').height(mapHeight);
        $('#div_assetlist').height(mapHeight);

    }

    $(document).ready(function () {
        newMap('map');
        setMapHeight();
        //$('#map').height(600);
        $('#div_assetlist').scroll(function () {
            //$("span").css("display", "inline").fadeOut("slow");
        });

        var searchUrl = $.AssetCore.search.searchUrl();
        console.log(searchUrl);
        $.get(searchUrl).done(function (res) {
            res = JSON.parse(res);
            var assets = res.list;
            console.log(assets);
          $.AssetCore.map.printAsset('#div_assetlist',assets);

          $.each(assets, function (key, value) {
            assetMarker(value.latitude, value.longitude,value);
          });
          

        });



    });
</script>