$(document).ready(function(){
    $('#scraper').click(function(event){
        event.preventDefault();
        $.get('/scrape', {
            type: 'GET'
        }).then(function(response){
            
        })
    })
})