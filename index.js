var numberofBoxes = document.querySelectorAll(".inboxcontents").length;
for(var i = 0;numberofBoxes > i; i++)
{
    document.querySelectorAll(".inboxcontents")[i].addEventListener("click", function (){
        count(this.querySelector(".titletag").textContent);
        var counted = parseInt(this.querySelector(".detailtag-counted").textContent) +1;
        this.querySelector(".detailtag-counted").textContent=counted;
    });
}
function count(item)
{
    var counter = sessionStorage.getItem(item);
    counter++;
    sessionStorage.setItem(item, counter);

}
document.querySelector("#zaehlen").addEventListener("click", function(){
    var totalcount = 0;
    var resulttext = ""; 
    var verh = 0;
    var resultArray=[];
  

    //Content der Boxen auszählen
    for(var i = 0;numberofBoxes > i; i++)
        {
            var inboxcontents =  document.querySelectorAll(".inboxcontents")[i];
            var titletag = inboxcontents.querySelector(".titletag").textContent;
            var content = parseInt(inboxcontents.querySelector(".detailtag-counted").textContent) ;
          
            if(content === null )
            {
                content = 0;
            }
            totalcount= totalcount+parseInt(content);
            resultArray.push({name: titletag, value: content});
        
        }
        //Ergebnisse sortieren
        resultArray.sort(function(a, b) {
            return b.value - a.value;
        });
        var i = 0;
        //verhältnis rechnen und in HTML output schreiben
        for(var entry in resultArray)    
        {
            if(i<3)
            {
                resulttext = resulttext + "<p class='resultlist-item' style='font-weight:bold'>"+resultArray[entry].name + ": "+ resultArray[entry].value + "</p>";
            }
            else
            {
                resulttext = resulttext + "<p class='resultlist-item'>"+resultArray[entry].name + ": "+ resultArray[entry].value + "</p>";
            }
            i++;

        }

        var resultlist = document.querySelector("#resultlist");

        resultlist.innerHTML=resulttext;
        
        toggleOverlay();
});
document.querySelector("#delete").addEventListener("click", function(){
    sessionStorage.clear();
    setCounterNumbers();

});

window.addEventListener("load", setCounterNumbers);

function setCounterNumbers(){
    for(var i = 0;numberofBoxes > i; i++)
        {
            var inboxcontents =  document.querySelectorAll(".inboxcontents")[i];
            var titletag = inboxcontents.querySelector(".titletag").textContent;
            var content = sessionStorage.getItem(titletag);
           if(content === null)
           {
            content = 0;
           }
            var anzahlObjekt =  inboxcontents.querySelector(".detailtag-counted").textContent = content;
           anzahlObjekt.textContent = 3;
        }
}

function toggleOverlay() {
  const overlay = document.getElementById("result");
  overlay.classList.toggle("visible");
}

function sortArray(){
    var test = [0, 1, 2, 3, 4, 5];
    for(var key in resultArray)    
    {
        verh = resultArray[key]*100/totalcount;
        verh = Math.round(verh);
        resulttext = resulttext + "<p>"+key+ ": "+ verh + "%</p>";
        console.log(key);
    }
}


