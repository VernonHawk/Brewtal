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
    console.log('Response status: '+response.status);
    if (response.authResponse) {
        var access_token =   FB.getAuthResponse()['accessToken'];
        FB.api('/me/photos?access_token='+access_token, 'post', { url: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=350', access_token: access_token }, function(response) {
            if (!response || response.error) {
                alert('Error occured: ' + JSON.stringify(response.error));
            } else {
                alert('Post ID: ' + response);
            }
        });
    } else {
        console.log('User cancelled login or did not fully authorize.');
    }
    // FB.ui({
    //   method: 'feed',
    //   //link: 'brewtal link goes here',
    //   //redirect_uri: 'google.com',
    //   caption: 'Test FB API AAAA!!!!',
    //   name: 'AAAA!!!!',
    //   description: 'AAAAAA!!!!!1111',
    //   picture: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=350',
    //   description: 'This is a dog.'
    // }, function(response){});

  }, {scope:'manage_pages,publish_pages,publish_to_groups'});
}


