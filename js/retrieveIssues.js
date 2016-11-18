 
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }

function loadComment() {
    var username = 'whispyy';
    var reponame = 'API-git'
    var requri   = 'https://api.github.com/users/'+username;
    //var repouri  = 'https://api.github.com/users/'+username+'/repos';
    var issuesuri = 'https://api.github.com/repos/'+username+'/'+reponame+'/issues';
    
    requestJSON(requri, function(json) {
        // else we have a user and we display their info
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;
        
        if(fullname == undefined) { fullname = username; }


        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';


        var issues;
        $.getJSON(issuesuri, function(json){
          issues = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          if(issues.length == 0) { outhtml = outhtml + '<p>No Comments!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Comments:</strong></p> <ul>';
            $.each(issues, function(index) {
              outhtml = outhtml + '<li>user: '+issues[index].user.login+
                          '<br />title: '+issues[index].title+
              					  '<br /> comment: '+issues[index].body +
                          '<br /> url: '+issues[index].html_url+ '</li>';
            });
            outhtml = outhtml + '</ul></div>'; 
          }
          $('#comments').html(outhtml);
        } // end outputPageContent()
    }); // end requestJSON Ajax call
}