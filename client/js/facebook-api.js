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

// Post a BASE64 Encoded PNG Image to facebook
function PostImageToFacebook(authToken, base64img) {
    
    try {
        blob = dataURItoBlob(base64img);
    } catch (e) {
        console.log(e);
    }

    var fd = new FormData();
    fd.append("access_token", authToken);
    fd.append("source", blob);
    fd.append("message", "Photo Text");
    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + authToken,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success " + data);
                $("#poster").html("Posted Canvas Successfully");
            },
            error: function (shr, status, data) {
                console.log("error " + data + " Status " + shr.status);
            },
            complete: function () {
                console.log("Posted to facebook");
            }
        });

    } catch (e) {
        console.log(e);
    }
}

// Convert a data URI to blob
// function dataURItoBlob(dataURI) {
//     var byteString = atob(dataURI.split(',')[1]);
//     var ab = new ArrayBuffer(byteString.length);
//     var ia = new Uint8Array(ab);
//     for (var i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], {
//         type: 'image/png'
//     });
// }
function dataURItoBlob(base64img) {
    var byteString = atob(base64img);
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {
        type: 'image/png'
    });
}

function fb_share() {
  fb_login();
}

function fb_login() {
  FB.login(function(response){
    console.log('Response status: '+response.status);
    if (response.authResponse) {
      var access_token = FB.getAuthResponse()['accessToken'];
      PostImageToFacebook(access_token, "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQQEBkSGScXFycyJh8mMi4mJiYmLj41NTU1NT5EQUFBQUFBRERERERERERERERERERERERERERERERERERERET/2wBDARUZGSAcICYYGCY2JiAmNkQ2Kys2REREQjVCRERERERERERERERERERERERERERERERERERERERERERERERERET/wAARCABAAKADASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAwQFAgABBv/EADIQAAEDAwIDBwMEAgMAAAAAAAEAAgMEESESMQUTQSIyUXGBkbEUYaEGNEJyI4IzwdH/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQQFAgP/xAAfEQEBAQEAAgMAAwAAAAAAAAAAARECITESIkETYaH/2gAMAwEAAhEDEQA/AGnQQQv5crnEjvaBge+6aqqCCnjEo1uadiCP/EpxGExTvv1OoeqeEunh1n7nDfdBIaNTgOhKPXU7aaUxtJIFt0emrmMDWGJjiP5EZTlfWshmLDE15sMuGUHxq9AubBeJzh0PMl1HZuUChFjY7rxOcRh5cuobOyk0H0KLHA+QXaMeOwXQRiR4aduvkET6t7jawLOjLYQDkgfGLuGPHcISqct0LRyxhxu8OIwLd0+6QqIxFI5g2G3kglrUcbpXBjBdx2AWVY4HC0yGUuGoXGjr5oJ9RRTUwDpW2B2yP+kuqXFWFriebzLud2L938+imoLy22J7wXNFwFhUqPMfqUE1cmqmmbE0FpPqlUGaGeSqeGVDdbLGxLL580Pi9PK1/MOY9m2/j9kjJVSym73E+qq8NqjOx8M2WhpNz4IIoNjcLUkrpXanm58VhcgkqvTRmGmLh3iC78YUhMGtmc3SXYItsED9Qwz0wce80B1/lSEwK2ZrQ0OwBbYJdB9NTyCKQOOw38k1/lD9DbNac62tA7PjdIIsdRJELNOPDcIG2n6lr2DDGlpF+niT90pPIJHlw26eQXSTvkFnHHhsEJAgqXBP3P8AqVNRIKh9O7XGbO2QarP+eT+7vlBXr3l7i52STcrxBeVCicCwt63U9etcWm4NigLNTOiFzkIKI+Z8gs43CGgnOgp4H8uZziR3tAFh77+yaq+HU9PGJRre07EEenRJ8ShdFUPvs4lw9U+JQ3htn7uu1v3yq8zzMX7b9OpfftGaA5wHQlMV9M2mmMbSSABuj0teyMNjMLHEY1EZ+E9xGuZDMWOiY8gDtOGfhRJM9pvXXyzHya4C5sFyb4fFzJNR2bldMooRY2K5N8Qi5cmobOylEFVGjppJRqaMeJwPcrqaMSyBrttz5DJRfrZHOtYFh2jti32VltW31yFJTSRDU4Y8Rke4QVY5ToGDlDsuOp7XkWAt3T7/AAptVEIZXMGw28jkI547+XhIW44nSuDGC7jsAsK5+noGmQyl41C4DOvmrfVyax55TamgnpQHTN0g4GQfhKqtxlha8nncy7ndi/c/PopKc3ZpX1CI2J7wXNFwFhUaPMfqV4W5HHM24nLxNVNO2JoLSfVKqZdc2Z4DoKiWrkayobrZY2JZfPnZC4zTStk5hzHs238fskJauaU3e8n1wq3C6s1DHwT9poaTqPgqEs6+v+tiy8X+SZn7EMGxuFuWV8ztbzd3ihrl5rBJVqeMw05cO8QXfjCkpg1sxGkuwRbYL1Yh2oYZqcOPeADr/KlJgVszRpDsAW2CXQW6aUQytecgb+RwU5eYSaG6WNOdbGgdnxupqNFUyxCzHWB6bj2KstnrnfM9/wBnWn6tj2DsxtLS2/QZuT9zukqmQSyFzdth5DAXSVMko0uOPAYHsEFDnnPKcq36f/df6uUlGp6mSmfzIjZ1rXsD8q31NljGjVd+4l/u/wCUutPeZHF7sucST5lZUwfUKhROBYW9bpBetcWm4Niq9mx583Los1M6IXOQgrb5nyCzjcIamb+oufj/2Q==");
    }
    // if (response.authResponse) {
    //     var access_token =   FB.getAuthResponse()['accessToken'];
    //     FB.api('/me/photos?access_token='+access_token, 'post', { url: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=350', access_token: access_token }, function(response) {
    //         if (!response || response.error) {
    //             alert('Error occured: ' + JSON.stringify(response.error));
    //         } else {
    //             alert('Post ID: ' + response);
    //         }
    //     });
    // } else {
    //     console.log('User cancelled login or did not fully authorize.');
    // }
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


