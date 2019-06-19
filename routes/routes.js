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

            db.article.create(results)
            .then(function(response){
                console.log('success');
                res.json(response);
            }).catch(function(err){
                console.log(err);
            });
        });
    });
});

app.get('/articles/:id', function(req, res){
    db.article.findOne({_id: req.params.id}).
    populate('comment')
    .then(function(result){
        res.json(result)
    }).catch(function(err){
        console.log(err);
    });
});

app.get('/articles', function(req, res){
    db.article.find({}).limit(10).then(function(articles){
        res.render('articles', 
        {data:articles})
    });
});

app.post('/comment/:id', function(req, res){
    db.comment.create(req.body)
    .then(function(dbComment){
        return db.Article.findOneAndUpdate({_id:req.params.id}, {comment: dbComment._id}, {new: true})
    }).then(function(success){
        console.log(success)
        res.json(success);
    }).catch(function(err){
        res.json(err);
    })
})

app.get('/', function(req, res){
    res.render('index');
});

// app.delete('/article/delete/:id', function(req, res){
//     db.Article.deleteOne({_id:req.params.id}).then(function(deleted){
    //     console.log('deleted')
    //     res.send('deleted')
// })
// })

app.get("/favicon.ico", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/favicon/favicon.ico"));
});

}