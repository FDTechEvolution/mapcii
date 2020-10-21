<div class="g-bg-cover g-bg-pos-top-center g-bg-img-hero" style="background-image: url(<?= COVER_TITLE_IMAGE ?>);">
    <div class="g-pos-rel g-z-index-1">
        <div class="container-fluid g-py-50">
            
        </div>
    </div>
</div>
<div class="container" id="account">
    <div class="text-left"><h3>ข้อมูลส่วนตัว</h3></div>
    <div class="card p-4 bg-light-blue rounded">
        <div class="card-body row">
            <div class="col-6">
                <h5 class="mb-4">บัญทึกข้อมูลการติดต่อ เพื่อความสะดวกในการซื้อขาย</h5>
                <user-profile
                    :user-profile = 'userProfile'>
                </user-profile>
            </div>
            <div class="col-6">
                <user-display
                    :user-display = 'userProfile'
                    :loading = 'loading'>
                </user-display>
                <user-change-password/>
            </div>
        </div>
    </div>
</div>

<?= $this->Html->css('account/style.css') ?>
<?= $this->Html->script('account/main.js', ['type' => 'module'])?>