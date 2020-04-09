/**
 * HSCore -
 *
 * @author HtmlStream
 * @version 1.0
 */
;
(function ($) {

    'use strict';
    var apiUrl = apiurl;
    var siteUrl = siteurl;

    $.AssetCore = {

        /**
         *
         *
         * @param
         *
         * @return
         */
        init: function () {
            //console.log('AssetCore init');

            $(document).ready(function (e) {


            });

            $(window).on('load', function (e) {

            });

        },
        ads: {
            
        },

        /**
         *
         *
         * @var
         */
        search: {

            makeUrlParam: function (form_data) {
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

                //console.log(params);
                if (typeof params['isrent'] !== 'undefined') {
                    search_url += '&isrent=' + params['isrent'];
                }
                if (typeof params['issales'] !== 'undefined') {
                    search_url += '&issales=' + params['issales'];
                }
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
                // console.log(param_value);

                return search_url;
            },
            readUrlParam: function () {
                var vars = [], hash,datas=[];
                var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
                for (var i = 0; i < hashes.length; i++)
                {
                    hash = hashes[i].split('=');
                    vars.push(hash[0]);
                    vars[hash[0]] = hash[1];
                }
                datas[0]=vars;
                datas[1]=window.location.href.slice(window.location.href.indexOf('?') + 1);
                return datas;

            },
            searchUrl: function () {
                var datas = this.readUrlParam();
                console.log(datas);
                return apiUrl + 'api-assets/avaliable-asset?'+datas[1];
            }
        },

        /**
         *
         *
         * @var
         */
        map: {

            bgImage: function (collection) {


            },

            printAsset: function (objId, assets) {
                $(objId).empty();
                var body = '';
                $.each(assets, function (key, value) {

                    body += '<article class="row no-gutters g-mb-0">';
                    body += '   <div class="col-lg-4 g-bg-img-hero g-brd-around g-brd-top-none g-brd-gray-light-v3" style="background-image: url(' + value.url + ');"></div>';
                    body += '       <div class="col-lg-8">';
                    body += '           <div class="g-brd-around g-brd-top-none g-brd-gray-light-v3 g-bg-white">';
                    body += '               <div class="g-pa-5">';
                    body += '                   <div class="row">';
                    body += '                       <div class="col-12">';
                    body += '                           <a href="' + siteUrl + 'property/view?id=' + value.id + '"><h3 class="g-font-weight-600 g-font-size-12 g-color-black">' + value.name + '</h3></a>';
                    body += '                       </div>';
                    body += '                       <div class="col-6 g-font-size-13">';
                    body += '                           <i class="icon-hotel-restaurant-053 u-line-icon-pro"></i> ' + value.bathroom;
                    body += '                           <i class="icon-hotel-restaurant-125 u-line-icon-pro ml-2"></i> ' + value.bedroom;
                    body += '                       </div>';
                    body += '                       <div class="col-6 text-right g-font-size-13">';
                    body += '                           <span class="g-font-weight-600">฿' + Number(value.price).toLocaleString('en') + '</span> | ';
                    body += '                           <a href="javascript:void(0)" data-action="favorite" data-id="' + value.id + '"><i class="fa fa-heart"></i></a>';
                    body += '                       </div>';

                    body += '                   </div>';
                    body += '               </div>';
                    body += '           </div>';
                    body += '       </div>';
                    body += '   </div>';
                    body += '</article>';
                });

                $(objId).append(body);
                this.mapBanner();
            },
            mapBanner: function () {
                var body = '';
                body += '<article class="row no-gutters g-mb-5 g-mt-5 u-block-hover">';
                body += '   <div class="col-md-12">';
                body += '       <figure class="u-bg-overlay">';
                body += '           <image src="https://sv1.picz.in.th/images/2019/06/25/1Pw2Hz.jpg"  class="w-100"/>';
                body += '       </figure>';
                body += '       <span class="g-pos-abs g-top-20 g-left-20">';
                body += '           <a class="btn u-btn-primary rounded-0" href="#!">โฆษณา</a>';
                body += '       </span>';
                body += '   </div>';
                body += '</article>';

                $('#div_assetlist').append(body);
            }

        },
        general: {
            printGrid: function (objId, assetData) {
                var body = '';
                body += '<article class="row no-gutters g-mb-15">';
                body += '        <div class="col-lg-5 g-bg-img-hero g-min-height-200" style="background-image: url(' + assetData.url + ');"></div>';

                body += '        <div class="col-lg-7">';
                body += '            <div class="g-brd-around g-brd-top-none g-brd-gray-light-v3 g-bg-white">';
                body += '                <ul class="d-flex list-inline g-brd-y g-brd-gray-light-v3 mb-0">';
                body += '                    <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-10 mr-0">';
                body += '                        <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i>' + assetData.bedroom + ' ห้องนอน';
                body += '                    </li>';
                body += '                    <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-10 mr-0">';
                body += '                        <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i>' + assetData.bathroom + ' ห้องน้ำ';
                body += '                    </li>';
                body += '                    <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-10 mr-0">';
                body += '                        <i class="align-middle g-color-text mr-1 icon-real-estate-047 u-line-icon-pro"></i>';
                body += '                        963 sqft';
                body += '                    </li>';
                body += '                </ul>';
                body += '                <div class="g-pa-10">';
                body += '                    <strong class="g-color-primary--hover">' + assetData.name + '</strong>';
                body += '                    <p class="g-font-size-13 mb-0"><i>' + assetData.address + '</i></p>';
                //body += '                    <p class="g-color-text g-font-weight-500 g-font-size-13 mb-1">Agency: <a class="g-color-text g-color-primary--hover g-font-weight-400 g-text-underline--none--hover" href="#">Real Estate State</a></p>';
                //body += '                    <p class="g-color-text g-font-weight-500 g-font-size-13 mb-0">Posted: <span class="g-color-text g-font-weight-400">2 days ago</span></p>';
                body += '                </div>';
                body += '                <ul class="d-flex list-inline align-items-center g-brd-top g-brd-gray-light-v3 mb-0">';
                body += '                    <li class="list-inline-item col-10 g-font-weight-600 g-font-size-17 text-center g-color-red g-px-0 g-py-7 mr-0">' + Number(assetData.price).toLocaleString('en') + ' บาท</li>';
                body += '                    <li class="list-inline-item col-2 g-px-0 mr-0">';
                body += '                        <a class="d-block g-brd-x g-brd-gray-light-v3 g-color-text g-color-primary--hover g-font-weight-500 g-font-size-17 text-center g-text-underline--none--hover g-py-7" href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add to Compare">';
                body += '                            <i class="icon-medical-022 u-line-icon-pro"></i>';
                body += '                        </a>';
                body += '                    </li>';

                body += '                </ul>';
                body += '            </div>';
                body += '            <a class="btn btn-block g-brd-top-none g-brd-gray-light-v3 g-brd-primary--hover g-color-main g-color-white--hover g-bg-secondary g-bg-primary--hover g-font-weight-600 rounded-0 g-px-10 g-py-10" href="' + siteurl + 'assets/view?id=' + assetData.id + '">';
                body += '                ดูรายละเอียด';
                body += '                <i class="align-middle ml-2 fa fa-angle-right"></i>';
                body += '            </a>';
                body += '        </div>';
                body += '    </article>';
                $(objId).append(body);
            },

        },
        widget: {
            printAssetTypeBar: function (objId, config) {

                $(document).ready(function () {

                    $.get(config.apiurl).done(function (res) {
                        res = JSON.parse(res);
                        var types = res.types;
                        //console.log(types);
                        var body = '';
                        $.each(types, function (key, value) {
                            body = '<li class="g-py-2">';
                            body += '<a href="' + config.siteurl + 'property?title=' + value.name + '&asset_type=' + value.id + '"><i class="mr-1 fa fa-caret-right"></i> ' + value.name + '</a>';
                            body += '</li>';
                            //body += '';

                            $(objId).append(body);
                        });
                    });
                });
            }
        }



    };

    //$.HSCore.init();

})(jQuery);