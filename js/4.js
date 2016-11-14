var API = 'https://api.github.com/',
    REPOS_PER_PAGE = 3,
    currentPage = 1;

showResult();

//-------- ajax result-------

function getAjaxResult(callback, option) {
  $.ajax({
    url: API + 'users/octocat/repos?page='+ option.page +'&per_page='+ option.perPage,
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
function showResult(){

  var option = {
    page: currentPage,
    perPage: REPOS_PER_PAGE
  };

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

//-------- scroll --------

$(window).scroll(function() {

  if  ($(window).scrollTop() == $(document).height() - $(window).height()) {

    currentPage++;
    showResult();
  }
});