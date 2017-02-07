/* global $ */
$(function () {
  // ALL YOUR CODE GOES BELOW HERE //
  $.getJSON('./data/product.json', function(data){
    //start working here
    
    
    /********** Add all items to the page ******************/
    const prodArray = data.map(function(product, index, products){
      //create a layout for each product to have on the page
      
      var $div = $('<div>')
        .attr("class", "item-outer-div")
        .attr('class', 'product');
        
      var imgPath = "./img/product/thumbs/" + product.image;
      
      var $thumbnailImg = $("<img>")
        .attr("src", imgPath)
        .attr('class', 'product');
      
      var $descDiv = $('<div>')
      .attr('class', 'product');
        
      var $h4 = $("<h4>")
        .text(product.desc)
        .attr('class', 'product');
        
      var $price = $('<h5>')
      .attr('class', 'product')
        .text(product.price.toLocaleString('en-US', {style: "currency", currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2 }));
        
      var $availColors = $('<select>')
        .attr('class', 'product')
        .css('type', 'radio');
      
      $availColors.append($("<option>").attr("value", 'no-color-selected').attr("selected", "selected").text('-- Select a Color --'));
      
      if(product.availableColors.length) {
        product.availableColors.forEach(function(str, index, strs){
          $availColors.append($("<option>").attr("value", str).text(str));
        });
      } 
      
      var $specsP = "";
      if(product.specs.length) {
        product.specs.forEach(function(str, index, strs){
          $specsP += "<p>" + str + "</p>";
        });
      } else {
        $specsP += "<p>" + "No Specifications Available" + "</p>";
      }
      
      $descDiv.append($h4);
      $descDiv.append($specsP);
      $div.append($thumbnailImg);
      $div.append($descDiv);
      $div.append($availColors);
      $div.append($price);
      $div.appendTo('main');
      
      return $div;
      
    });
    
    /********************** Make some event listeners ********************/
    
    //event listener for the search bar enter pressed
    $('#search-bar-input').on('keyup', function(event){
      if($('search-bar-input:focus') && (event.keyCode === 13)){
        //search thru the array prodArray
        //detatch each item that does not meet the description
        
      }
    });
    
    //event listener for user clicking on the images for a larger view
    //this uses a modal that is created and can be closed when done
    //<!-- Trigger the Modal -->
// <img id="myImg" src="img_fjords.jpg" alt="Trolltunga, Norway" width="300" height="200">

// //<!-- The Modal -->
// <div id="myModal" class="modal">

//   //<!-- The Close Button -->
//   <span class="close" onclick="document.getElementById('myModal').style.display='none'">&times;</span>

//   //<!-- Modal Content (The Image) -->
//   <img class="modal-content" id="img01">

//   //<!-- Modal Caption (Image Text) -->
//   <div id="caption"></div>
// </div>
    $('img.product').on('click', function(event){
      //determine the target, use that to get the image name
      var newTarget = event.target.attributes[0].nodeValue.replace("thumbs/", "");
      
      //set up the modal and put it on the webpage
      var $modal = $('<div>')
        .attr('id', 'modalforImg')
        .attr('class', 'modal');
      
      var $span = $('<span>')
        .attr('class', 'close')
        .text('&times;');
        
      var $img = $('<img>')
        .attr('class', 'modal-content')
        .attr('id', 'modal-img')
        .attr('src', newTarget);
      
      $modal.append($span);
      $modal.append($img);
      $modal.appendTo('main');
      
      $('.modal').css('display', 'block');
    
      
      $('.close').on('click', function(event){
        $('.modal').css('display', 'none');
      });
      
      $('.modal').on('click', function(event){
        $('.modal').css('display', 'none');  
      });
      
      console.log(newTarget);
      
      
      //TODO: need to get the x box to close the modal
      //TODO: maybe downsize the image for the modal
      
    });
    
    
    
    
    
    
    
    
    
    /*********************** Search Function *************************/
    
  // $(document).keyup(function (event) {
  //   if ($("#search-bar-input:focus") && (event.keyCode === 13)) {
  //     alert('ya!');
  //   }
  // });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  });
  // ALL YOUR CODE GOES ABOVE HERE //
});