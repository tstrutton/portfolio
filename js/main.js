var work;
var rootUrl = 'http://localhost/portfolio2/';

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    var url = rootUrl+'js/work.json';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                work = JSON.parse(xmlhttp.responseText);
                loadContent();
                // console.table(work);
            } else if (xmlhttp.status == 400) {
                console.log('There was an error 400');
            } else {
                console.log('something else other than 200 was returned');
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

loadXMLDoc();

function loadContent(){

    var portfolio = document.querySelector('#portfolio');

    for (var i = 0; i < work.length; i++) {
        if(work[i].enabled != false){
    	   portfolio.innerHTML += '<a id="'+i+'"><img src="work/'+work[i].mainphoto+'" alt="'+work[i].title+'"></a>';
        }
    }

    var portfoliolinks = document.querySelectorAll('#portfolio a');
    var workdetail = document.querySelector('#workdetail');
    // console.log(portfoliolinks);

    for (var i = 0; i < portfoliolinks.length; i++) {
        portfoliolinks[i].addEventListener('click', function(){
            portfolio.classList.toggle('hidden');
            workdetail.classList.toggle('hidden');
            var id = this.id;
            // console.log(id);
            workdetail.innerHTML = "<p id='back'>X</p><div class='slideshow' id='slideshow'></div><div id='detailtxt'><h2>"+work[id].title+"</h2><p id='client'>"+work[id].client+"</p><p>"+work[id].blurb+"</p></div>";

        var detailtxt = document.querySelector('#detailtxt');
        
        if(work[id].github != ""){
            console.log(detailtxt);
            detailtxt.innerHTML += "<a href='"+work[id].github+"' target='_blank' id='github'>View on github</a>";
        }

            var back = document.querySelector('#back').addEventListener('click', function(){
                portfolio.classList.toggle('hidden');
                workdetail.classList.toggle('hidden');
            });
            for (var ii = 0; ii < work[id].photos.length; ii++) {
                // console.log(work[id].photos[ii]);
                var slideshow = document.querySelector('#slideshow');
                slideshow.innerHTML += '<div><img src="work/'+work[id].photos[ii]+'" alt="'+work[id].title+'"></div>';
            }
            $('.slideshow').slick({
                dots:true,
                arrows:false,
                // autoplay:true,
                adaptiveHeight:true,
                draggable:true,
                fade:true
            });
        });
    }
}



