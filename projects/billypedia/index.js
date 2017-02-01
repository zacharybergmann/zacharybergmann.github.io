/* global $ _ opspark */
$(document).ready(function() {
    $.getJSON('data.json', function (data) {
        // YOUR CODE BELOW HERE //
        
        // uncomment this to inspect all available data; delete when done //
        // console.log(data);
        
        // EXAMPLE: Looping over top rated recordings; replace with your code //
        
        /********************Adding Top Recordings to the sidebar***********************/
        //Creating list items and return in array
        let topRated = _.map(data.discography.topRated, function(album, index, albums){
            return $('<li>')
                .text(album.title)
                .css('list-style', 'none')
                .css('padding', '3px 3px 3px 0px')
                .appendTo('#list-top-rated');
        });
        
        
        //Fix the 40px Chrom padding-left issue and add id
        $('ul').css('padding-left', '5px');
        
        
/***************Add an album image to the sidebar for the top rated Billy albums***********/
        //////////////////////////
        $('<img>')
            .attr('id', 'top-rated-image')
            .attr('src', './images/album/voice-in-the-night.jpg')
            .prependTo('#list-top-rated');
            
        
        
        /**************Create the list of general recordings in the sidebar************/
        //first, create the section tag
        const $sectionGenRecs = $('<section>')
            .attr('id', 'section-recordings');
            
        //next make a ul tag to go inside the section tag and append it   
        const $ulGenRecs = $('<ul>')
            .attr('id', 'list-recordings')
            .css('padding-left', '5px')
            .appendTo($sectionGenRecs);
        
        
        //make all of the styled li from the general recordings info, put in an array
        _.map(data.discography.recordings, function(album, index, albums){
            return $('<li>')
                .css('list-style', 'none')
                .attr('class', 'recording')
                .css('padding-bottom', '10px')
                .css('width', '200px')
                .append($('<div>')
                    .attr('class', 'title')
                    .text(function(){return "Title: " + album.title;})
                    .css('color', '#3223B8')
                ).append($('<div>')
                    .attr('class', 'artist')
                    .text(function(){return "Artist: " + album.artist;})
                    .css('color', '#3223B8')
                ).append($('<div>')
                    .attr('class', 'release')
                    .text(function(){return "Release: " + album.release;})
                    .css('color', '#3223B8')
                ).append($('<div>')
                    .attr('class', 'year')
                    .text(function(){return "Year: " + album.year;})
                    .css('color', '#3223B8')
                ).appendTo($ulGenRecs);    
        });
        
        //put the section into place in the DOM
        $('#sidebar').append($sectionGenRecs);
        

/*****Add an image for the Top Rated albums, change with click on new title***************/
        
        //Create a div tag for image for Top Rated
        const $divImg = $('<div>')
            .attr('id', 'image-container-recording')
            .attr('class', 'image-container');
        
        //Create a image tag for the Top Rated Image
        const $imgTag = $('<img>')
            .attr('id', 'recording-image')
            .attr('class', 'image')
            .attr('src', 'images/album/eastern-rebellion.jpg');
            
        //put the img tag inside the div tag    
        $divImg.append($imgTag);
        
        //put the image on the page below the top rated header
        $('#section-recordings').prepend($divImg);
        
        
/***********Make the Billy main image change to the next image on every click*************/
        
        //make click event handler on main billy image and have it rotate thru the images
        $('#image-billy').on('click', function(event){
            $('#image-billy')
                .attr('width', '200px')
                .attr('height', '200px');
            
            let currentImageNum = $('#image-billy')[0].currentSrc.split('/billypedia')[1].split("-")[1].split(".")[0];
            currentImageNum < 3 ? currentImageNum++ : currentImageNum = 0;
            let newFileExt = "./images/billy/billy-" + currentImageNum + ".jpg";
 
            return $('#image-billy')
                .attr('src', newFileExt)
                .fadeIn('slow');
        });
        
/*******Every time that a general record is clicked, change the image to record clicked**************/
        //maybe also add mouseover for all lis in both recording sections
        //how to create finger instead of I for mouse to show clickable
        $('#list-recordings li').on('click', function(event){
            let albumFileName = $(event.currentTarget)[0]
                .innerHTML.split('Title: ')[1]
                .split('</div>')[0]
                .toLowerCase()
                .replace("'", "")
                .replace(/\s+/gi, "-") + ".jpg";
            let fullFilePath = './images/album/' + albumFileName;    
            $('#recording-image').attr('src', fullFilePath);    
        });
        
        
/*************Every time that a top record is clicked, change the image to record clicked************/
        $('#list-top-rated li').on('click', function(event){
            let albumFileName = $(event.currentTarget)[0]
                .innerHTML
                .toLowerCase()
                .replace("'", "")
                .replace(/\s+/gi, "-") + ".jpg";
            let fullFilePath = './images/album/' + albumFileName;    
            $('#top-rated-image').attr('src', fullFilePath);
        });
        
        
        // YOUR CODE ABOVE HERE //
    })
    .fail(function() { console.log('getJSON on discography failed!'); });
});


