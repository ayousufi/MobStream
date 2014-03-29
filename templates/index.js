window.addEventListener('load', function(){
    $('*').hide().fadeIn(750);
    $('#dialogbox').hide();
    $('#dialogoverlay').hide();
    var joinmobForm = document.getElementById('joinForm');
    joinmobForm.addEventListener('submit', showMobs, false);
}, false);



function showMobs(e){
    e.preventDefault();
    Prompt.render();
    getmobs();
    setInterval(function(){getMobs()}, 1000);
}

function getMobs(){
    // create a request object
    var request = new XMLHttpRequest();
    // specify the HTTP method, URL, and asynchronous flag
    request.open('GET', '/mobs.json', true);

    // add an event handler
    request.addEventListener('load', function(e){
        if (request.status == 200) {
            var content = request.responseText;
            var data = JSON.parse(content);  
            
            var ul = document.getElementById('mobsList');

            $(ul).empty();
            var lis = ul.getElementsByTagName('li');
            var lisLength = lis.length;

            for(var i = lis.length; i < data.length; i++){
                var li = document.createElement('li');

                li.innerHTML = '<div class="mobListing"><a href="/' + data[i].mob + '"">' + data[i].mob + '</a></div>';

                $(li).appendTo($(ul)).hide();
            }

            var ul = document.getElementById('mobsList');
            var items = $('li').get();
            items.sort(function(a,b){
                var keyA = $(a).text().substr(6);
                var keyB = $(b).text().substr(6);
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            });
            $.each(items, function(i, li){
                $(ul).append(li);
            });

            var lis = ul.getElementsByTagName('li');
            for(var i = 0; i < lis.length; i++){
                $(lis[i]).show();
            }

            if(ul.getElementsByTagName('li').length == 0){
                var li = document.createElement('li');

                li.innerHTML = '<div class="mobListing">There are currently no active mobs.</div>'

                $(li).appendTo($(ul)).fadeIn();
            }

        }
    }, false);

    // start the request, optionally with a request body for POST requests
    request.send(null);
}

function CustomPrompt(){
    this.render = function(){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        var dialoghead = document.getElementById('dialogboxhead');
        var dialogbody = document.getElementById('dialogboxbody');
        var dialogfoot = document.getElementById('dialogboxfoot');
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (200 * .5)+"px";
        dialogbox.style.top = "50px";
        dialoghead.innerHTML = "<span class='dialoghead'>Select a mob: </span>";
        dialogbody.innerHTML = '<div id="mobsListWrapper"><ul id="mobsList"></ul></div>';
        dialogfoot.innerHTML = '<button id="cancel" onclick="Prompt.cancel()">Cancel</button>';
        $('#dialogbox').fadeIn();
        $('#dialogoverlay').fadeIn();
        $('*').keyup(function(event){
            if(event.keyCode == 27)
                $("#cancel").click();
        });
    }
    this.cancel = function(){
        $('#dialogbox').fadeOut();
        $('#dialogoverlay').fadeOut();
    }
}
var Prompt = new CustomPrompt();