<div class="container g-pt-100 g-pb-20">
    <div class="row justify-content-between">
        <div class="col-12">
            <h2><?=$article['title']?></h2>
            <img src="<?=$article['image']['url']?>" class="img-fluid w-100"/>
        </div> 
        <div class="col-12">
            <?=$article['content']?>
        </div>
    </div>
</div>