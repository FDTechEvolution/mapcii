
<script>
    window.fbAsyncInit = function () {
        FB.init({
            appId: '445868615942274',
            cookie: true,
            xfbml: true,
            version: 'v3.2'
        });

        FB.AppEvents.logPageView();
        FB.logout(function (response) {
            // user is now logged out
        });
    };

    


    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $(document).ready(function(){
        
        
        window.location = siteurl;
    });

</script>

<div id="fb-root"></div>