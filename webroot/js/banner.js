function top_banner() {

}

function asset_map_banner() {
    var body = '';
    body += '<article class="row no-gutters g-mb-5 g-mt-5 u-block-hover">';
    body += '   <div class="col-md-12">';
    body += '       <figure class="u-bg-overlay">';
    body += '           <image src="' + apiurl + 'img/ex/720x480/ex-1.jpg"  class="w-100"/>';
    body += '       </figure>';
    body += '       <span class="g-pos-abs g-top-20 g-left-20">';
    body += '           <a class="btn u-btn-primary rounded-0" href="#!">โฆษณา</a>';
    body += '       </span>';
    body += '   </div>';
    body += '</article>';

    $('#div_assetlist').append(body);
}
