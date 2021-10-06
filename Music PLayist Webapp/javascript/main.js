//1. Search

var UI = {};

UI.pressEnter = function(){
    var search = document.querySelector('.js-search');
    search.addEventListener('keydown', function(e){
        if(e.key=='Enter') {
            var input = document.querySelector("input").value;
            var finalInput = input.replace(/\s/g, '+');
            document.querySelector('.js-search-results').innerHTML = ("");
            SoundCloudAPI.getTrack(finalInput);
        }
    });
}



UI.submitClick = function() {
    var search = document.querySelector('.js-submit');
    search.addEventListener('click', function(e){
        var input = document.querySelector("input").value;
        var finalInput = input.replace(/\s/g, '+');
        document.querySelector('.js-search-results').innerHTML = ("");
        SoundCloudAPI.getTrack(finalInput);
    });

}

// 2. Query Sound

var SoundCloudAPI = {}

SoundCloudAPI.init = function() {

    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
}

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue) {
    
    // find all sounds of requested Tracks
    SC.get('/tracks', {
        q: inputValue
    }).then(function(tracks) {
        console.log(tracks);
        SoundCloudAPI.renderTracks(tracks);
    });
}


// 3. Display the cards
SoundCloudAPI.renderTracks = function(tracks) {

    //Looping through all objects
    tracks.forEach(function(track){
        
        //card
        var card = document.createElement('div');
        card.classList.add('card');

        //image
        var imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        var image_img = document.createElement('img');
        image_img.classList.add('image_img');
        image_img.src = track.artwork_url || 'https://picsum.photos/100/100/?blur';

        imageDiv.appendChild(image_img);

        //content
        var content = document.createElement('div');
        content.classList.add('content');

        var header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = '<a href="'+track.permalink_url+'" target="_blank">'+ track.title +'</a>';

        //button
        var button = document.createElement('div');
        button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

        var icon = document.createElement('i');
        icon.classList.add('add', 'icon');

        var buttonText = document.createElement('span');
        buttonText.innerHTML = 'Add to playlist';
        
        //appendChild
        content.appendChild(header);

        button.appendChild(icon);
        button.appendChild(buttonText);

        button.addEventListener('click', function(){
            SoundCloudAPI.getEmbed(track.permalink_url);
        });

        card.appendChild(imageDiv);
        card.appendChild(content);
        card.appendChild(button);

        var searchResults = document.querySelector('.js-search-results');
        searchResults.appendChild(card);

    });

}


// 4. Add to playlist
SoundCloudAPI.getEmbed = function(trackURL) {

    SC.oEmbed(trackURL, {
        auto_play: true,
        show_user: false,
        sharing: false,
        show_comments: false,
    }).then(function(embed) {
        console.log('oEmbed response: ', embed);

        var sideBar = document.querySelector('.js-playlist');

        var box = document.createElement('div');
        box.innerHTML = embed.html;

        sideBar.insertBefore(box, sideBar.firstChild);
        Playlist.clearButtonRender();
        localStorage.setItem("key", sideBar.innerHTML);
    });

}

//Loading Sidebar Playlist
var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem("key");

var Playlist = {};

//Clear Playlist Button
Playlist.clearButtonRender = function() {
    var clearButton;
    clearButton = document.querySelector('.clear-button');
    if(clearButton==null){
        clearButton = document.createElement('aside');
        clearButton.classList.add('clear-button');
        clearButton.innerHTML = ("<a href=\"#\">Clear Playlist</a>")
        sideBar.appendChild(clearButton);
        Playlist.clearPlaylist();        
    }
    else return;
}

//Clear Playlist Function
Playlist.clearPlaylist = function() {
    var clearButton;
    clearButton = document.querySelector('.clear-button');
    if(clearButton!=null) {
        clearButton.addEventListener('click', function() {
            console.log(clearButton + " click");
            localStorage.clear();
            window.location.reload();
        });
    }

    else return;
}

//Rendering UI
UI.pressEnter();
UI.submitClick();
Playlist.clearPlaylist();

