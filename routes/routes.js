var db = require('../models');
var axios = require('axios');
var cheerio = require('cheerio');

module.exports = function (app){

app.get('/scrape', function(req, res){
    axios.get('https://disneyparks.disney.go.com/blog/latest-stories/').then(function(response){
        var $ = cheerio.load(response.data);
        
        $('div.header-arrow').each(function(i, element){
            var results = {}
            
            results.title = $(this)
            .children('h5')
            .children('a')
            .attr('title');

            results.link = $(this)
            .children('h5')
            .children('a')
            .attr('href');

            db.Article.create(results).then(function(response){
                console.log('success');
                res.json(response);
            }).catch(function(err){
                console.log(err);
            });
        });
    });
});

app.get('/articles/:id', function(req, res){
    db.Article.findOne({_id: req.params.id}).
    populate('comment')
    .then(function(result){
        res.json(result)
    }).catch(function(err){
        console.log(err);
    });
});

app.get('/articles', function(req, res){
    db.Article.find({}).limit(10).then(function(articles){
        res.render('articles', 
        {data:articles})
    });
});



app.get('/', function(req, res){
    res.render('index');
});


}