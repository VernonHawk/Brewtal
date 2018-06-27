window.fbAsyncInit = function() {
  FB.init({
    appId            : '351026272095577',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.0'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function fb_share() {
  fb_login();
}

function fb_login() {
  FB.login(function(response){
    console.log(response.status);
    // FB.api('/me/feed', 'post', {message: 'test'}, function(response) {
    //   console.log(response);
    // });
    FB.ui({
      method: 'feed',
      link: 'https://developers.facebook.com/docs/',
      caption: 'An example caption',
    }, function(response){});
  }, {scope: 'publish_pages,manage_pages'});
}


