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
                .css('cursor', 'pointer')
                .css('border', '3px outset gold')
                .appendTo('#list-top-rated');
        });
        
        
        //Fix the 40px Chrom padding-left issue and add id
        $('ul').css('padding-left', '5px');
        
        
/***************Add an album image to the sidebar for the top rated Billy albums***********/
        //////////////////////////
        $('<img>')
            .attr('id', 'top-rated-image')
            .attr('src', './images/album/voice-in-the-night.jpg')
            .css('border', '2px solid black')
            .prependTo('#list-top-rated');
            
            
            
/************** Style the section containing Billy top rated albums *********************/
        $('#section-top-rated')
            .css('margin-top', '60px')
            .css('background-color', '#fff377')
            .css('border', '10px outset #fdce1d')
            .css('padding-top', '10px')
            .css('margin-bottom', '0px')
            .css('text-align', 'center');
            
        $('#header-top-rated')
            .css('text-align', 'center');
            
        
        
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
                .css('padding-bottom', '15px')
                .css('cursor', 'pointer')
                .css('width', '210px')
                .append($('<div>')
                    .attr('class', 'title')
                    .text(function(){return "Title: " + album.title;})
                    .css('color', 'black')
                ).append($('<div>')
                    .attr('class', 'artist')
                    .text(function(){return "Artist: " + album.artist;})
                    .css('color', 'black')
                ).append($('<div>')
                    .attr('class', 'release')
                    .text(function(){return "Release: " + album.release;})
                    .css('color', 'black')
                ).append($('<div>')
                    .attr('class', 'year')
                    .text(function(){return "Year: " + album.year;})
                    .css('color', 'black')
                ).appendTo($ulGenRecs);    
        });
        
        //put the section into place in the DOM
        $('#sidebar').append($sectionGenRecs);
        

/*****Add an image for the General Recordings albums, change with click on new title***************/
        
        //Create a div tag for image for General Recordings
        const $divImg = $('<div>')
            .attr('id', 'image-container-recording')
            .attr('class', 'image-container');
        
        //Create a image tag for the General Recordings Image
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
        
/*************Make the buttons depress upon mousedown, up on mouseup **************************/
        $('#list-top-rated li').on('mousedown', function(event){
            $(event.currentTarget)
                .css('border', '3px inset gold');
        });
        
        $('#list-top-rated li').on('mouseup', function(event){
            $(event.currentTarget)
                .css('border', '3px outset gold');
        });
        
        
/******************** Edit section and add header to the general recordings section ****************************/
        $('#section-recordings')
            .css('margin-top', '30px')
            .css('border', '10px outset #c20f0f')
            .css('text-align', 'center')
            .css('background-color', '#e33f3f');
        
        var genRecsHeader = $('<header>')
            .attr('id', 'header-general-recordings')
            .text('General Recordings')
            .css('margin-top', '10px')
            .css('margin-bottom', '20px');
            
         $('#section-recordings').prepend(genRecsHeader);  
         
         
         
/******************** Make general recording li all outset *************************************/
        $('#list-recordings li')
            .css('border', '3px outset #d42222');
            
            
/******************* Add event handlers for the li items in general recordings ****************/
        $('#list-recordings li').on('mousedown', function(event){
            $(event.currentTarget)
                .css('border', '3px inset #d42222');
        });
        
        $('#list-recordings li').on('mouseup', function(event){
            $(event.currentTarget)
                .css('border', '3px outset #d42222');
        });
        
        
/******************** Create Billy's rider section in the page via a function and add *****************/
        // var createTable = function(people){
        //     var createRow = function(person){
        //         var $row = $("<tr>");
        //         var $nameFirst = $("<td>").text(person.nameFirst);
        //         var $nameLast = $("<td>").text(person.nameLast);
        //         $row.append($nameFirst);
        //         $row.append($nameLast);
        //         return $row;
        //     }
        //     var $table = $("<table>");
        //     var $rows = people.map(createRow);
        //     $table.append($rows);
        //     return $table;
        // };
        // let people = [{nameFirst: "John", nameLast: "Doe"}, {nameFirst: "Dick", nameLast: "Jones"}]
        // createTable(people).appendTo("body");
        
        
        
        // YOUR CODE ABOVE HERE //
    })
    .fail(function() { console.log('getJSON on discography failed!'); });
});


