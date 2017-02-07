/* global $ */
$(function () {
  // ALL YOUR CODE GOES BELOW HERE //
  $.getJSON('./data/product.json', function(data){
    //start working here
    
    /********** Add all items to the page ******************/
    const prodArray = data.map(function(product, index, products){
      
      //create outer container div tag for whole product
      var $productWrapperDiv = $('<div>')
        .attr('class', 'row')
        .attr('id', 'product-wrapper-div')
        .css('margin-right', '40px');
        
      //create a div to hold the image
      var $imgDiv = $('<div>')
        .attr('id', 'img-div')
        .attr('class', 'col-md-2')
        .css('text-align', 'center');
        
      //get image thumbnail created   
      var imgPath = "./img/product/thumbs/" + product.image;
      
      var $thumbnailImg = $("<img>")
        .attr("src", imgPath)
        .attr('class', 'product')
        .css('max-width', '160px')
        .css('max-height', '160px')
        .css('width', 'auto')
        .css('height', 'auto');
      
      $imgDiv.append($thumbnailImg);
      
      //make a div to hold the description and specs of the product
      var $infoDiv = $('<div>')
        .attr('id', 'prod-info-div')
        .attr('class', 'col-md-8');
        
      //make a div for the product name and a div for the product specs
      var $descriptionDiv = $('<div>')
        .attr('id', 'description-div');
        
      var $specsDiv = $('<div>')
        .attr('id', 'specs-div'); 
        
      //create the name of product and the specs   
      var $h4 = $("<h4>")
        .text(product.desc);
        
      $h4.appendTo($descriptionDiv);
      
      $infoDiv.append($descriptionDiv);
      
        
      var $specsP = "";
      if(product.specs.length) {
        product.specs.forEach(function(str, index, strs){
          $specsP += "<p>" + str + "</p>";
        });
      } else {
        $specsP += "<p>" + "No Specifications Available" + "</p>";
      }
      
      $specsDiv.append($specsP);
      $infoDiv.append($specsDiv);
      
      
      //create a container to hold the price, color dropdown
      var $priceColorCartDiv = $('<div>')
        .attr('id', 'price-color-cart-div')
        .attr('class', 'col-md-2');
        
      var $priceDiv = $('<div>')
        .attr('id', 'price-div');
        
      var $priceHead = $('<h5>')
        .attr('class', 'product')
        .css('text-align', 'right')
        .text(product.price.toLocaleString('en-US', {style: "currency", currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2 }));
        
      var $cartDiv = $('<div>')
        .attr('id', 'cart-div');
        
      var $colorDDDiv = $('<div>')
        .attr('id', 'color-dropdown-div')
        .css('text-align', 'right');
      
      var $availColors = $('<select>')
        .attr('class', 'form')
        .attr('id', 'color-dropdown')
        .css('type', 'radio');
      
      $availColors.append($("<option>")
        .attr("value", 'no-color-selected')
        .attr("selected", "selected")
        .text('-- Select a Color --')
        .css('float', 'right'));
      
      if(product.availableColors.length) {
        product.availableColors.forEach(function(str, index, strs){
          $availColors.append($("<option>").attr("value", str).text(str));
        });
      } 
      
      var $inStockDiv = $('<div>')
      
      
      $priceDiv.append($priceHead);
      $colorDDDiv.append($availColors);
      
      $priceColorCartDiv.append($('<br>'));
      $priceColorCartDiv.append($colorDDDiv);
      $priceColorCartDiv.append($('<br>'));
      $priceColorCartDiv.append($priceDiv);
      $priceColorCartDiv.append($cartDiv);
      
      $productWrapperDiv.append($imgDiv);
      $productWrapperDiv.append($infoDiv);
      $productWrapperDiv.append($priceColorCartDiv);
      
      $('main').append($productWrapperDiv);
      $('main').append($('<hr>'));
      $('main').append($('<br>'));
      
      return $productWrapperDiv;
    });
    
    /********************** Make some event listeners ********************/
    
    //event listener for the search bar enter pressed
    $('#search-bar-input').on('keyup', function(event){
      if($('search-bar-input:focus') && (event.keyCode === 13)){
        //search thru the array prodArray
        //detatch each item that does not meet the description
        var searchFor = $(this).val();
        //search for products via selector
        //search thru all of them for the desired word in various properties
        //remove those that do not meet the description
        $('main').detach();
        prodArray.map(function(product, index, products){
          if(product) {
              //do something
            
          } 
        });
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
        .html('&times;');
        
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
        $('.modal').remove();
      });
      
      $('.modal').on('click', function(event){
        $('.modal').css('display', 'none');
        $('.modal').remove();
      });
      
      //console.log(newTarget);
      
      
      //TODO: need to get the x box to close the modal
      //TODO: maybe downsize the image for the modal
      //TODO: need to remove the modal after click outside of the box or click x box
      //Gradient header with CSS
      //name for company
      //many more events
      
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