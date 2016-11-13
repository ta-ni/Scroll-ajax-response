var api = 'https://api.github.com/',
    option = {
      page: 1,
      perPage: 3
    };


showResult(option);
scrollalert();


//-------- ajax result-------

function getAjaxResult(callback, option) {
  $.ajax({
    url: api + 'users/octocat/repos?page='+ option.page +'&per_page='+ option.perPage,
    method: 'GET',
    beforeSend: function() { $('#loader').show();
    },
    success: callback,
    error: function () {
      alert('Error');
    }
  });
}

//-------- callback -----------
function showResult(option){
  getAjaxResult(function (result) {

    $('#loader').hide();

    var html = [];
    var repo, text;

    for(var i = 0; i < result.length; i++){

      repo = $('<div class="user-info" />');
      text = $('<p class="user-text" />');

      text
          .append($('<a href="'+ result[i].owner.html_url + '" class="user-login">' + result[i].owner.login +'</a><span> / </span>'))
          .append($('<a href="'+ result[i].html_url + '" class="user-repository">' + result[i].name +'</a>'));

      if(!(result[i].description === null)) {
        text
            .append($('<p class="user-description">' + result[i].description +'</p>'));
      }

      repo
          .append(text)
          .append($('<img src="'+ result[i].owner.avatar_url + '" class="user-avatar">'));

      html.push(repo);
    }

    $('#content').append(html);
  }, option);
}

console.log($('#scrollBox').scrollTop);


//-------- scroll --------

function scrollalert (){

  var scrollBox = $('#scrollBox'),
      scrolltop = $(scrollBox).context.scrollingElement.scrollTop,
      scrollheight = $(scrollBox).context.scrollingElement.scrollHeight,
      windowheight = $(scrollBox).context.scrollingElement.clientHeight,
      scrolloffset= 35;

  if( scrolltop >= ( scrollheight - ( windowheight + scrolloffset )) ) {
    option.page++;
    showResult(option);
  }
  setTimeout('scrollalert();', 1500);
}
