function postJSON(url, data) {
  $.ajax({
    type: "POST",
    url: url,
    data: data,
    contentType: "application/json",
    dataType: "json",
    success: function(data){alert(data);}
  })
  .done(function( data ) {
    console.log( data );
  });
}

function postIssue(){
	var uploadURL ="https://api.github.com/repos/whispyy/API-git/issues";
	console.log(uploadURL);
	var data = 
	JSON.stringify(
	  {
      	title: "Testing post an issue", 
      	body: "Test to post an issue using ajax",
      	assignees: [{}]
      }
    );

    postJSON(uploadURL, data);
}

$(function(){
  $('#send').on('click', function(e){
    e.preventDefault();
    postIssue();
  })
});