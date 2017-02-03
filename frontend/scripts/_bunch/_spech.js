//Created by Mega-Mind.Info

function sayIt(query, language) {
  var q = new SpeechSynthesisUtterance(query);
  q.lang = language;
  q.rate = 0.9;
  q.volume = 1.7;
  q.pitch = 1;
  speechSynthesis.speak(q);
}

if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'test': function() {
      document.getElementById('answer').innerHTML = 'It is working! ';
    },
     'hello': function() {
      alert('Hi');
    },
     'what is *info': function(info) {
      var found = false;
           var searchWiki = info;
           var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchWiki + "&format=json&callback=?";
            
            $.ajax({
                type: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(data){
                
                        document.getElementById('pictures').innerHTML = '';
                        document.getElementById('picturesGIF').innerHTML = '';
                        document.getElementById('song').innerHTML = '';
                
 //for (var i = 0; i < 2; i++) {
 for (var i = data[1].length - 1; i >= 0; i--) {
                    $('#answer').prepend("<div class='info'><a href='#'>" +  data[1][i] + "</a><br><p class='aboutInfo'>" +  data[2][i] + "</p></div><br>");
                   found = true;
                }
                
                
                    if(found === false){
                    document.getElementById('answer').innerHTML = 'Sorry, I can find anything about ' + info;           
                    }
            },
                error: function(errorMessage){
                alert("Error!");
            }        
            })

    },
    'who is *name': function(name){
      var found = false;
           var searchWiki = name;
           var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchWiki + "&format=json&callback=?";
            
            $.ajax({
                type: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(data){
                
                        document.getElementById('pictures').innerHTML = '';
                        document.getElementById('picturesGIF').innerHTML = '';
                        document.getElementById('song').innerHTML = '';
                
 //for (var i = 0; i < 2; i++) {
 for (var i = data[1].length - 1; i >= 0; i--) {
                    $('#answer').prepend("<div class='info'><a href='#'>" +  data[1][i] + "</a><br><p class='aboutInfo'>" +  data[2][i] + "</p></div><br>");
                   found = true;
                }
                
                
                    if(found === false){
                    //document.getElementById('answer').innerHTML = 'Sorry, I can find anything about ' + name;             
                    window.open( 'https://www.google.com/search?q='+ name +'&rct=j');
                    } 
            },
                error: function(errorMessage){
                alert("Error!");
            }        
            })
    
    },
    'read what is *info': function(info){

          var found = false;
           var searchWiki = info;
           var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchWiki + "&format=json&callback=?";
            
            $.ajax({
                type: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(data){
                
                        document.getElementById('song').innerHTML = '';
                
 //for (var i = 0; i < 2; i++) {
 for (var i = data[1].length - 1; i >= 0; i--) {
                   found = true;
                }
                sayIt( data[2][0], 'en-US');
                
                
                
                    if(found === false){
                    document.getElementById('answer').innerHTML = 'Sorry, I can find anything about ' + info;           
                    }
            },
                error: function(errorMessage){
                alert("Error!");
            }        
            })
    
    },
    'read for me what is *info': function(info){

          var found = false;
           var searchWiki = info;
           var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchWiki + "&format=json&callback=?";
            
            $.ajax({
                type: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(data){
                
                        document.getElementById('song').innerHTML = '';
                
 //for (var i = 0; i < 2; i++) {
 for (var i = data[1].length - 1; i >= 0; i--) {
                   found = true;
                }
                
                sayIt( data[2][0], 'en-US');
                
                
                
                    if(found === false){
                    document.getElementById('answer').innerHTML = 'Sorry, I can find anything about ' + info;           
                    }
            },
                error: function(errorMessage){
                alert("Error!");
            }        
            })
    
    },
    'tell me what is *info': function(info){

          var found = false;
           var searchWiki = info;
           var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchWiki + "&format=json&callback=?";
            
            $.ajax({
                type: "GET",
                url: url,
                contentType: "application/json; charset=utf-8",
                async: false,
                dataType: "json",
                success: function(data){
                
                        document.getElementById('song').innerHTML = '';
                
 //for (var i = 0; i < 2; i++) {
 for (var i = data[1].length - 1; i >= 0; i--) {
                   found = true;
                }
                
                sayIt( data[2][0], 'en-US');
                
                
                
                    if(found === false){
                    document.getElementById('answer').innerHTML = 'Sorry, I can find anything about ' + info;           
                    }
            },
                error: function(errorMessage){
                alert("Error!");
            }        
            })
    
    },
    
    'pause': function(){
    pause();
    },
    'show me *picture': function(picture){
    
  var placeHolder = $('#pictures');
  getPics(picture); 


  function getPics(groupID) {
    var url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' + groupID + '&tagmode=any&format=json&jsoncallback=?';
    var answer;
    var d = $.ajax({
      url: url,
      type: 'get',
      crossDomain: true,
      dataType: 'jsonp',
      success: function(response) {
     // console.log(response);
      for (var i = 0; i < 12; i++) {
        var answer;
        answer = response;
        //console.log(answer);
        
        document.getElementById('answer').innerHTML = '';
        document.getElementById('song').innerHTML = '';
        document.getElementById('people').innerHTML = '';
        
        var item2Append = $('<a target="_blank" href="'+ answer.items[i].link +'"></a>');
        item2Append.append('<img style=" height: 128px; width: 200px; float: left; margin-left: 4px; margin-top: 3px;" title="'+ answer.items[i].title +'" src="'+ answer.items[i].media.m +'">');
        placeHolder.append(item2Append);
        }

      },
      error: function(error) {
        console.log('Ошибка');
      }
    });
  }
  
    var placeHolder2 = $('#picturesGIF');
  var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+ picture +"&api_key=dc6zaTOxFJmzC&limit=24"); //GIF
xhr.done(function (data) {  
    $.each(data.data, function () {
        console.log(this);
        var item2Append = $('<a target="_blank" href="'+ this.embed_url +'"></a>');
        item2Append.append('<img style=" height: 128px; width: 200px; float: left; margin-left: 4px; margin-top: 3px;" title="'+ this.trending_datetime +'" src="'+ this.images.fixed_height.url +'">');
        placeHolder2.append(item2Append);
    })
});
        
    
    },
      'play *song': function(song){
      var audio = new Audio();
      
            document.getElementById('answer').innerHTML = '';
        document.getElementById('feed').innerHTML = '';
        document.getElementById('pictures').innerHTML = '';
        document.getElementById('picturesGIF').innerHTML = '';
        document.getElementById('people').innerHTML = '';

    function searchTracks(query) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'track'
            },
            success: function (response) {
                if (response.tracks.items.length) {
                    var track = response.tracks.items[0];
                    audio.src = track.preview_url;
                    
                    audio.play();
                    communicateAction('<div>Playing ' + track.name + ' by ' + track.artists[0].name + '</div><Br><img width="250" src="' + track.album.images[1].url + '"><br><br>');
                }
            }
        });
    }

    function playSong(songName, artistName) {
        var query = songName;
        if (artistName) {
            query += ' artist:' + artistName;
        }

        searchTracks(query);
    }
    
    

    function communicateAction(text) {
        var rec = document.getElementById('song');
        rec.innerHTML += '<div class="action">' + text + '</div>';
    }

    function recognized(text) {
        var rec = document.getElementById('song');
        rec.innerHTML += '<div class="recognized"><div>' + text + '</div></div>';
    }

    

        //document.getElementById('songOff').innerHTML = '<br><br><a href="#" onclick="pauseSong()">Turn of the song</a>';
    
    playSong(song);
    
    function pauseSong() {
    audio.pause();
    }
    
    
      },
      
    'How much is *number *action *secondnumber': function(number, action, secondnumber) {
            var operation =
            {
                "+": function (a, b) { return a + b; }
            };
            var a = number;
            var b = secondnumber;
            var action = "+";
            var result = operation[action](a, b);
            console.log(result);  
    },
    'random people': function() {
    
     var placeHolder = $('#people');
     
      var min = 1;
            var initial = Math.round(Math.random() * 250000000);
            while(initial < 1){
                var initial = Math.round(Math.random() * 250000000);
            }

     
  getVKposts(initial); 
  getVKposts(initial + 10); 
  getVKposts(initial + 200); 
  getVKposts(initial + 3000); 
  getVKposts(initial + 1000); 
  getVKposts(initial + 20); 
  getVKposts(initial + 6000); 
  getVKposts(initial + 130); 
  getVKposts(initial + 2450); 
  getVKposts(initial + 30000); 
  getVKposts(initial + 7); 
  getVKposts(initial + 213); 
  getVKposts(initial + 310); 
  getVKposts(initial - 10000);
  getVKposts(initial - 9000);
  getVKposts(initial - 8000);
  getVKposts(initial - 7000);
  getVKposts(initial - 6000);
  getVKposts(initial - 5000);
  getVKposts(initial - 4000);
  getVKposts(initial - 3000);
  getVKposts(initial - 2000);
  getVKposts(initial - 1000);
  getVKposts(initial + 210);
  getVKposts(initial + 220);
  getVKposts(initial + 230);
  getVKposts(initial + 240);
  getVKposts(initial + 250);
  getVKposts(initial + 260);
  getVKposts(initial + 270);
  getVKposts(initial + 280);

 //Id людей 
  
        document.getElementById('answer').innerHTML = '';
        document.getElementById('song').innerHTML = '';
        document.getElementById('pictures').innerHTML = '';
        

  function getVKposts(groupID) {
    var url = 'https://api.vk.com/method/users.get?user_ids=' + groupID + '&fields=photo_200,city,contacts&name_case=Nom&v=5.60';
    var answer;
    var d = $.ajax({
      url: url,
      type: 'get',
      crossDomain: true,
      dataType: 'jsonp',
      success: function(response) {
        var answer;
        answer = response;
        console.log(answer.response[0]);
       // answer.forEach(function() {
          var item2Append = $('<div class= "blog-post"></div><br><br>');
          //console.log(answer.response[0].city.title);
                    if (
            (typeof(answer.response[0].city.title) !== 'undefined')  &&
            (typeof(answer.response[0].photo_200) !== 'undefined')
          ) {
           item2Append.append('<div class="blog-header">@' + answer.response[0].id + ' VK<br><br>'+ answer.response[0].first_name +' '+ answer.response[0].last_name +'</div><img class="blog-img" src="' + answer.response[0].photo_200 + '"><br><div class="blog-text">' + answer.response[0].city.title + '</div>');
          }
          



          placeHolder.append(item2Append);
        //});
      },
      error: function(error) {
        console.log('Ошибка');
      }
    });
  }
    
    },
    'open the feed': function(){
            document.getElementById('answer').innerHTML = '';
        document.getElementById('song').innerHTML = '';
        document.getElementById('pictures').innerHTML = '';
        document.getElementById('people').innerHTML = '';
        document.getElementById('news').innerHTML = '';
    
        $(document).ready(function(){
    
    $('#feed').FeedEk({
      FeedUrl : 'https://www.buzzfeed.com/index.xml',
      MaxCount: 30,
      //ShowPubDate: false,
    });
  
});
    },
        'I am bored': function(){
            document.getElementById('answer').innerHTML = '';
        document.getElementById('song').innerHTML = '';
        document.getElementById('pictures').innerHTML = '';
        document.getElementById('people').innerHTML = '';
    
        $(document).ready(function(){
    
    $('#feed').FeedEk({
      FeedUrl : 'https://www.buzzfeed.com/index.xml',
      MaxCount: 30,
      //ShowPubDate: false,
    });
  
});
    },
    'open the news': function(){
    
                document.getElementById('answer').innerHTML = '';
        document.getElementById('song').innerHTML = '';
        document.getElementById('pictures').innerHTML = '';
        document.getElementById('people').innerHTML = '';
        document.getElementById('feed').innerHTML = '';
    
        $(document).ready(function(){
    
    $('#news').FeedEk({
      FeedUrl : 'http://feeds.reuters.com/Reuters/worldNews?format=xml',
      MaxCount: 15,
      //ShowPubDate: false,
    });
  
});
    }, 
    'where is *place': function(place){
    window.open( 'https://www.google.com/maps/place/' + place);
    },
    'search in google *search': function(search){
    window.open( 'https://www.google.com/?#q=' + search);
    },
    'search on google *search': function(search){
    window.open( 'https://www.google.com/?#q=' + search);
    },
    'search on facebook *search': function(search){
    window.open('https://www.facebook.com/search/top/?init=quick&q=' + search);
    },
    'search in facebook *search': function(search){
    window.open('https://www.facebook.com/search/top/?init=quick&q=' + search);
    },
    'open *search map': function(search){
    window.open( 'https://www.google.com/maps/place/' + search);
    },
    'find this in google *search': function(search){
    window.open( 'https://www.google.com/?#q=' + search);
    },
    'find this on google *search': function(search){
    window.open( 'https://www.google.com/?#q=' + search);
    },
    'tell me about yourself': function(){
     sayIt('Well I am intelligent personal assistant and knowledge navigator! ', 'en-US');
    },
    'who are you': function(){
     sayIt('Well I am intelligent personal assistant and knowledge navigator! ', 'en-US');
    },
    'Tell *firstName that *text': function(firstName, text){
       setTimeout(sayIt(firstName + '   I was asked to tell you  that   ' + text, 'en-US'), 1000);
    },
    'what time it is': function(){
    var time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric",  minute: "numeric"});
    sayIt('It is  ' + time, 'en-US')
    },
    'tell me time': function(){
    var time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric",  minute: "numeric"});
    sayIt('It is  ' + time, 'en-US')
    },
    'who created you': function(){
    sayIt('I was created by  arthur james ', 'en-US')
    },
    'who is your creator': function(){
    sayIt('I was created by  arthur james ', 'en-US')
    },
    'pause speaking': function(){
    pause();
    },
    'turn off': function(){
    pause();
    },
    'stop': function(){
    pause();
    },
    'Open full song *name': function(name){
    window.open( 'http://www.deezer.com/search/' + name);
    },
    'full song *name': function(name){
    window.open( 'http://www.deezer.com/search/' + name);
    },
    'music for party': function(){
    document.getElementById('feed').innerHTML = '<iframe width="853" height="480" src="https://www.youtube.com/embed/SMs0GnYze34?list=PL5D7fjEEs5yeDL2KZ7517GK5gPR9Kb7vb" frameborder="0" allowfullscreen></iframe>';
    },
    'music for work': function(){
    document.getElementById('feed').innerHTML = '<iframe width="853" height="480" src="https://www.youtube.com/embed/l2RFAw1zqJE?rel=0" frameborder="0" allowfullscreen></iframe><br><br><iframe width="853" height="480" src="https://www.youtube.com/embed/oZ1CE1qAjA8?rel=0" frameborder="0" allowfullscreen></iframe>';
    },
    'music for kids': function(){
    document.getElementById('feed').innerHTML = '<iframe width="853" height="480" src="https://www.youtube.com/embed/ufyrxaQRZrg?rel=0" frameborder="0" allowfullscreen></iframe>';
    },
    'open facebook messages': function(){
    window.open( 'https://www.messenger.com/');
    },
    'Write down *speaking': function(speaking){
    document.getElementById('text').innerHTML = speaking + '<br><br>';
    },
    'Write this down *speaking': function(speaking){
    document.getElementById('text').innerHTML = speaking;
    },
    'reload': function(){
    location.reload();
    },
    'search on youtube *search': function(search){
    window.open( 'https://www.youtube.com/results?search_query=' + search);
    },
    'open skype': function(){
    window.open( 'skype:','_parent');
    },
    'turn on skype': function(){
    window.open( 'skype:','_parent');
    },
    'call *nickname skype': function(nickname){
    window.open( 'skype:'+nickname+'?call','_parent');
    },
    'open gmail': function(){
    window.open( 'http://mail.google.com');
    },
    'open medium': function(){
    window.open( 'http://medium.com');
    },
    'open amazon': function(){
    window.open( 'http://amazon.com');
    },
    'search on amazon *product': function(product){
    window.open( 'https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=' + product);
    },
        'open files': function(){
    window.open( 'file:///C:/Users');
    },
    'open mail ru': function(){
    window.open( 'http://mail.ru');
    },
    'open youtube': function(){
    window.open( 'http://youtube.com');
    },
     'open facebook': function(){
    window.open( 'http://facebook.com');
    },
    'open netflix': function(){
    window.open('http://www.netflix.com/');
    },
     'open google': function(){
    window.open( 'http://google.com');
    },
    'open dropbox': function(){
    window.open('https://www.dropbox.com/');
    },
    'open vk': function(){
    window.open( 'http://vk.com');
    },
    'how to *action': function(action){
    window.open('http://www.wikihow.com/wikiHowTo?search=' + action);
    },
    'tell me the weather': function(){
    window.open( 'https://weather.com/');
    },
    'open instagram': function(){
    window.open( 'https://instagram.com/');
    }, 
    'search for *something': function(something){
    window.open( 'https://twitter.com/search?q=' + something);
    },
    'open my facebook page': function(){
    window.open( 'https://www.facebook.com/me');
    },
    'open my facebook ': function(){
    window.open( 'https://www.facebook.com/me');
    },
    'open the bible': function(){
    window.open( 'https://www.biblegateway.com/');
    },
    'open bible': function(){
    window.open( 'https://www.biblegateway.com/');
    },
    'open the Bible at *book chapter *chapter verse *verse': function(book, chapter, verse){
    window.open( 'https://www.biblegateway.com/passage/?search=' + book +' '+ chapter +':'+ verse + '&version=NIV');
    },
    'open tumblr': function(){
    window.open( 'https://www.tumblr.com/');
    },
    'open twitter': function(){
    window.open( 'https://www.twitter.com/');
    },
    'open yandex': function(){
    window.open( 'https://www.yandex.com/');
    },
    'repeat after me *text': function(text){
    sayIt(text, 'en-US');
    },
    'repeat this *text': function(text){
    sayIt(text, 'en-US');
    },
    'do you understand what I am saying': function(){
    sayIt('Oh yes I DO  ', 'en-US');
    },
    'translate this to russian *text': function(text){
    window.open( 'https://translate.google.com/#auto/ru/' +text);
    },
    'translate to russian *text': function(text){
    window.open( 'https://translate.google.com/#en/ru/' +text);
    },
    'what do I have to do today': function(){
    sayIt('I will open calendar for you  ', 'en-US');
    window.open( 'https://calendar.google.com/calendar/');
    },
    'open calendar': function(){
    sayIt('okay ', 'en-US');
    window.open( 'https://calendar.google.com/calendar/');
    },
    'where should I go': function(){
    window.open( 'https://www.google.com.ua/webhp?#q=restaurant&rflfq=1');
    },
    'the capital of *country': function(country){
    window.open( 'https://www.google.com/search?q=what is the capital of '+ country +'&rct=j');
    },
    'who created *something': function(something){
    window.open( 'https://www.google.com/search?q=creator of'+ something +'&rct=j');
    },
    'open my deezer': function(){
    window.open( 'http://www.deezer.com/loved');
    },
    'open AliExpress': function(){
    window.open( 'http://aliexpress.com');
    },
    'open vk messages': function(){
    window.open( 'https://vk.com/im');
    },
    'tell me a joke': function(){
    document.getElementById('emotion').innerHTML = 'Bill gates farted on an Apple store, later he commented  but its their fault for not having Windows.';
    sayIt(' Bill gates farted on an Apple store, later he commented  but its their fault for not having Windows.', 'en-US');
    },
    'when was *something': function(something){
    window.open( 'https://www.google.com/search?q=dates '+ something +'&rct=j');
    },
    'what do you mean': function(){
    document.getElementById('emotion').innerHTML = 'Sorry that got confusing! Can you ask a specific question please?';
    sayIt(' Sorry that got confusing! Can you ask a specific question please?', 'en-US');
    },
    'open translater': function(){
    window.open( 'https://translate.google.com/');
    },
    'your name': function(){
    sayIt('You can call me  Mega Mind   Assistant ', 'en-US');
    },
    'tell me your name': function(){
    sayIt('You can call me  Mega Mind   Assistant ', 'en-US');
    },
    'Do you know Siri': function(){
    document.getElementById('emotion').innerHTML = "I know her, but I don't KNOW her know her. ";
    sayIt(" I know her, but I don't know her   know her.", 'en-US');
    },
    'good morning': function(){
    var time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric",  minute: "numeric"});
    sayIt(" Good morning! It is  " + time + "  If you want me to open the weather for you, just ask me   'tell me the weather'. Have a good day!" , 'en-US');
    document.getElementById('emotion').innerHTML = "Good morning! It is  " + time + ". If you want me to open the weather for you, just ask me tell me the weather Have a good day! ";
    },
    'how are you': function(){
    document.getElementById('emotion').innerHTML = "I am good thank you! I am fully ready to help you today! 😏";
    sayIt(" I am good thank you,  I am fully ready to help you today!", 'en-US');
    },
    'what do you like': function(){
    document.getElementById('emotion').innerHTML = "I like to help people! 🙆";
    sayIt(" I like to help people!", 'en-US');
    },
    'Are you *something': function(something){
    document.getElementById('emotion').innerHTML = "I don't even know, how do you think? 😆";
    sayIt(" I don't even know, how do you think?", 'en-US');
    },
    'what can you do': function(){
    document.getElementById('emotion').innerHTML = " I can do a lot of things! You can check list with my commands!";
    sayIt(" I can do a lot of things! You can check list with my commands!  I like to help people!", 'en-US');
    },
    'what do you think about *something': function(something){
    document.getElementById('emotion').innerHTML = "Hmm, interesting! Let's see what other people think about this! 🙈 🙉";
    sayIt("Interesting! Let's see what other people think about this!", 'en-US');
    window.open('https://www.buzzfeed.com/search?q='+ something);
    },
    'Do you like *thing': function(thing){
    document.getElementById('emotion').innerHTML = "Well I don't have favourite things! The only think I like to do is helping you! 😉";
    sayIt("Well I don't have favourite things! The only think I like to do is helping to you!", 'en-US');
    },
    'do you believe in God': function(){
    document.getElementById('emotion').innerHTML = "Yes I do, you can even ask me to open the bible for you!";
    sayIt("Yes I do, you can even ask me to open the bible for you!", 'en-US');
    }, 
    'find a similar picture': function(){
        var url=prompt("Give me a link to the picture","URL");
        window.open( 'http://images.google.com/searchbyimage?image_url=' + url);
    },
    'find similar pictures': function(){
        var url=prompt("Give me a link to the picture","URL");
        window.open( 'http://images.google.com/searchbyimage?image_url=' + url);
    },
    'what music is that': function(){
    window.open('http://www.midomi.com/');
    },
    'what song is that': function(){
    window.open('http://www.midomi.com/');
    }
    
    //raitings
    //search cheap tickets and hotels
    //where should I buy
    
    
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
  
  function pause(){
  annyang.abort();
  document.getElementById('mic').innerHTML = '<button class="mic" onclick="resume()" id="speak">Resume  <i style="font-size: 1.4em; padding: 5px 5px 5px 5px;" class="fa fa-microphone"></i></button>';
  }
  function resume() {
  annyang.start();
 document.getElementById('mic').innerHTML = '<button class="mic" onclick="pause()" id="speak">Pause Speaking  <i style="font-size: 1.4em; padding: 5px 5px 5px 5px;" class="fa fa-microphone"></i></button>';
  }
        
  // Mega Mind created 2016 19.11.2016 
}