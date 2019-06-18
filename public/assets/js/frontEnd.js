$(document).ready(function(){
    $('#scraper').click(function(event){
        event.preventDefault();
        $.get('/scrape', {
            type: 'GET'
        })
        .then(function(result){
            window.location.href="/articles";
        })
    });

    $('#viewArticles').click(function(event){
        event.preventDefault();
        $.get('/articles',{
            type: 'GET'
        });
    });

    $(document).on("click", ".btn-info", function() {
        $("#comment").empty();
        let thisId = $(this).attr("id");
      
        $.ajax({
          method: "GET",
          url: "/articles/" + thisId
        })
          .then(function(data) {
            console.log(data);
            // The title of the article
            $("#comment").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#comment").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#comment").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#comment").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      
            // If there's a note in the article
            if (data.comment) {
              // Place the title of the note in the title input
              $("#titleinput").val(data.comment.title);
              // Place the body of the note in the body textarea
              $("#bodyinput").val(data.comment.body);
            }
          });
      });
})