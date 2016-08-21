// $(function() {
//     alert('DOM is ready');
// });

// $.fn.toggle = function(boolean) {
//   this.forEach(function(item) {
//     item.hidden = boolean;
//   });
// };

// $('.button').toggle(false);

var app = app || {};

(function(body){
    'use strict';

    app = {
        
        edit: function() {
            alert('init')
        },

        ajax: function() {
            
            fetch('user.json')
              .then(function(response) {
                return response.json();
               })
              .then(function(user) {
                console.log(user);
              })
              .catch(alert);

        },
        
        init: function() {
            
            document.getElementsByTagName("BODY")[0].innerHTML = template('demo-template', {
                "year": "1999",
                "title": "title title",
                "status": "status asd",
                "overview": "overviewa asd",
                "seasons": [
                    {
                        "season": 8,
                        "episodes": [{
                            "season": 8,
                            "episode": 1,
                            "number": 1,
                            "tvdb_id": 4917009,
                            "title": "The Locomotion Interruption",
                            "overview": "",
                            "first_aired": 1411441200,
                            "first_aired_iso": "2014-09-22T20:00:00-04:00",
                            "first_aired_utc": 1411430400,
                            "url": "http://trakt.tv/show/the-big-bang-theory/season/8/episode/1",
                            "screen": "http://slurm.trakt.us/images/fanart/34-940.69.jpg",
                            "images": {
                                "screen": "http://slurm.trakt.us/images/fanart/34-940.69.jpg"
                            },
                            "ratings": {
                                "percentage": 92,
                                "votes": 20,
                                "loved": 19,
                                "hated": 1
                            }
                        },
                        {
                            "season": 8,
                            "episode": 2,
                            "number": 2,
                            "tvdb_id": 4917010,
                            "title": "TBA",
                            "overview": "",
                            "first_aired": 1411441200,
                            "first_aired_iso": "2014-09-22T20:00:00-04:00",
                            "first_aired_utc": 1411430400,
                            "url": "http://trakt.tv/show/the-big-bang-theory/season/8/episode/2",
                            "screen": "http://slurm.trakt.us/images/fanart/34-940.69.jpg",
                            "images": {
                                "screen": "http://slurm.trakt.us/images/fanart/34-940.69.jpg"
                            },
                            "ratings": {
                                "percentage": 85,
                                "votes": 4,
                                "loved": 3,
                                "hated": 1
                            }
                        }]
                    }
                ]
            });

        }

    };

})(document.body);