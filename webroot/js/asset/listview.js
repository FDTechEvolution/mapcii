function appendAssetList(data){
    var body = '<article class="row no-gutters g-mb-30">';
    body += ' <div class="col-lg-5 g-bg-img-hero " style="background-image: url('+data.url+');"></div>';
    body += '<div class="col-lg-7">';
    body += '   <div class="g-brd-around g-brd-top-none g-brd-gray-light-v3 g-bg-white">';
    body += '       <ul class="d-flex list-inline g-brd-y g-brd-gray-light-v3 mb-0">';
    body += '           <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-17 mr-0">';
    body += '               <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i>'+data.bedroom+' นอน';
    body += '           </li>';
    body += '           <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-17 mr-0">';
    body += '               <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i>'+data.bathroom+' น้ำ';
    body += '           </li>';
    body += '           <li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-17 mr-0">';
    body += '               <i class="align-middle g-color-text mr-1 icon-real-estate-047 u-line-icon-pro"></i>'+Number(data.usefulspace).toLocaleString('en')+' ตรม.';
    body += '           </li>';
    body += '       </ul>';
    body += '       <div class="g-pa-15">';
    body += '           <h3 class="g-font-weight-600 g-font-size-16"><a href="'+siteurl+'assets/view?id='+data.id+'" target="_blank">'+data.name+'</a></h3>';
    body += '           <p class="g-font-size-13 mb-4">'+data.address+'</p>';
    body += '           <p class="g-color-text g-font-weight-500 g-font-size-13 mb-1">ผู้ประกาศ: Real Estate State</p>';
    body += '           <p class="g-color-text g-font-weight-500 g-font-size-13 mb-0">ประกาศเมื่อ: <span class="g-color-text g-font-weight-400">2 days ago</span></p>';
    body += '       </div>';
    body += '       <ul class="d-flex list-inline align-items-center g-brd-top g-brd-gray-light-v3 mb-0">';
    body += '           <li class="list-inline-item col-10 g-font-weight-600 g-font-size-17 text-left g-px-10 g-py-13 mr-0">'+Number(data.price).toLocaleString('en')+' บาท</li>';
    body += '           <li class="list-inline-item col-2 g-px-0 mr-0">';
    body += '               <a class="d-block g-brd-x g-brd-gray-light-v3 g-color-text g-color-primary--hover g-font-weight-500 g-font-size-17 text-center g-text-underline--none--hover g-py-13" href="javascript:void(0);" data-toggle="tooltip" data-placement="top" title="" data-original-title="Save to Wishlist">';
    body += '                    <i class="icon-medical-022 u-line-icon-pro"></i>';
    body += '               </a>';
    body += '           </li>';
    body += '       </ul>';
    body += '   </div>';
    body += '</div>';
    body += '</article>';
    body += '';
    body += '';
    
    $('#div_asset_list').append(body);
    
}
