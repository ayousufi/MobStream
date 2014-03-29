window.addEventListener('load', function(){

}, false);

function CustomPrompt(){
    this.render = function(){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('roomsdialogbox');
        var dialoghead = document.getElementById('dialogboxhead');
        var dialogbody = document.getElementById('roomsdialogboxbody');
        var dialogfoot = document.getElementById('dialogboxfoot');
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (200 * .5)+"px";
        dialogbox.style.top = "50px";
        dialoghead.innerHTML = "<span class='dialoghead'>Select a chatroom: </span>";
        dialogbody.innerHTML = '<div id="roomsListWrapper"><ul id="roomsList"></ul></div>';
        dialogfoot.innerHTML = '<button id="cancel" onclick="Prompt.cancel()">Cancel</button>';
        $('#roomsdialogbox').fadeIn();
        $('#dialogoverlay').fadeIn();
        $('*').keyup(function(event){
            if(event.keyCode == 27)
                $("#cancel").click();
        });
    }
    this.cancel = function(){
        $('#roomsdialogbox').fadeOut();
        $('#dialogoverlay').fadeOut();
    }
}
var Prompt = new CustomPrompt();