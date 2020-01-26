function uiGenArticleBlock(article){
    var str = '<article class="g-mb-100">';
    str +='                <div class="g-mb-30">';
    str +='                    <img class="img-fluid w-100 g-mb-25" src="'+article['image']['url']+'" alt="">';
    str +='                    <h2 class="h4 g-color-black g-font-weight-600 mb-3">';
    str +='                        <a class="u-link-v5 g-color-black g-color-primary--hover" href="#!"></a>';
    str +='                    </h2>';
    str +='                    <p class="g-color-gray-dark-v4 g-line-height-1_8">'+article['short_content']+'</p>';
    str +='                    <a class="g-font-size-13" href="'+siteurl+'article/read/'+article['id']+'">อ่านต่อ...</a>';
    str +='                </div>';
    str +='                </article>';
    return str;
    
}

