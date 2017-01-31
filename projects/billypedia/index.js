/* global $ _ opspark */
$(document).ready(function() {
    $.getJSON('data.json', function (data) {
        // YOUR CODE BELOW HERE //
        
        // uncomment this to inspect all available data; delete when done //
        // console.log(data);
        
        // EXAMPLE: Looping over top rated recordings; replace with your code //
        
        
        //Creating list items and return in array
        let topRated = _.map(data.discography.topRated, function(album, index, albums){
            return $('<li>')
                .text(album.title)
                .css('list-style', 'none')
                .css('padding', '3px 3px 3px 0px');
        });
        
        //iterate thru list items array and add to the DOM
        _.each(topRated, function(li, index, lis) {
            $('#list-top-rated').append(li);
        });
        
        //Fix the 40px Chrom padding-left issue and add id
        $('ul').attr('id', 'z-top-rated').css('padding-left', '5px');
        
        
        //now lets handle general recordings
        //first, create the section tag
        const $sectionGenRecs = $('<section>')
            .attr('id', 'section-recordings');
            
        //next make a ul tag to go inside the section tag    
        const $ulGenRecs = $('<ul>')
            .attr('id', 'list-recordings')
            .css('padding-left', '5px');
        
        //put the ul tag inside the section tag    
        $sectionGenRecs.append($ulGenRecs);
        
        //make all of the styled li from the general recordings info, put in an array
        const $arrayGenRecLi = _.map(data.discography.recordings, function(album, index, albums){
            return $('<li>')
                .css('list-style', 'none')
                .attr('class', 'recording')
                .css('padding-bottom', '10px')
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
                );    
        });
        
        //add all of the general recordings to the ul
        _.each($arrayGenRecLi, function(albumObj, index, albumObjs){
            $ulGenRecs.append(albumObj);
        });
        
        //put the section into place in the DOM
        $('#sidebar').append($sectionGenRecs);
        
        
        //Image for Top Rated
        
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
        
        
        
        
        
        
        
        
        // YOUR CODE ABOVE HERE //
    })
    .fail(function() { console.log('getJSON on discography failed!'); });
});


