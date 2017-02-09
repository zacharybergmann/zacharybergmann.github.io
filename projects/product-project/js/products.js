/* global $ */

$(function () {
  // ALL YOUR CODE GOES BELOW HERE //
  $.getJSON('./data/product.json', function(data){
    //start working here
    
    /********************************** Global Variables *********************************************/
    
    var prodsObjs;
    var curFiltersApplied = [];
    var curFirmFilters = [];
    
    
    /********************************** createProducts function **************************************/ 
    
    function filterProdsOnScreen(arr, prop, value){
      if(typeof value === 'number'){
        return arr.filter(function(curObj){return curObj[prop] < value;});
      }  
      return arr.map(function(curObj){
        var arrOfObjsWFilter = [];
        curObj[prop].split(" ").forEach(function(word){
          if(word.toLowerCase() === value.toLowerCase()) arrOfObjsWFilter.push(curObj);
        });
        return _.uniq(arrOfObjsWFilter);
      }).reduce(function(prevResult, curVal){return prevResult.concat(curVal)}, []);
    }
    
    
    function createProducts(jsonParsedData, arrFilterVals){
      //hold an object static and loop thru the filters
      //if a match, return that object to output array
      prodsObjs = jsonParsedData.map(function(prod, ind, prods){
        if(arrFilterVals === undefined || arrFilterVals.length === 0) return prod;  //prod is truthy
        return arrFilterVals.reduce(function(prevResult, curVal, index){
          var re = new RegExp(curVal.toLowerCase(), 'gi');
          return (prod.desc.toLowerCase().match(re) !== null || prod.type.toLowerCase().match(re) !== null) && prevResult !== 0 ? prod : 0;
        }, 1);
      }).filter(function(curValue){return curValue !== 0});
      
      
      var prodsInHTML = prodsObjs.map(function(product, index, products) {
        
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
        
        
        //create a container to hold the price, color dropdown, qty dropdown, in stock, and add to cart button
        var $priceColorCartDiv = $('<div>')
          .attr('id', 'price-color-cart-div')
          .attr('class', 'col-md-2');
          
        //make the price section of $priceColorCartDiv
          
        var $priceDiv = $('<div>')
          .attr('id', 'price-div')
          .css('margin-top', '10px')
          .css('margin-bottom', '40px');
          
        var $priceHead = $('<h5>')
          .attr('class', 'product')
          .css('text-align', 'right')
          .text(product.price.toLocaleString('en-US', {style: "currency", currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2 }));
          
        //make the cart section of $priceColorCartDiv
          
        var $cartDiv = $('<div>')
          .attr('id', 'cart-div')
          .css('margin-top', '10px')
          .css('margin-bottom', '10px');
          
        
        var $cartButton = $('<button>')
          .attr('id', 'cart-button')
          .attr('class', 'btn btn-default')
          .append($('<span>')
            .css('class', 'glyphicon glyphicon-align-left')
            .css('aria-hidden', 'true')
        );
        
        //$cartDiv.append($cartButton);
        
        
        
        
        
          
        //Make the color dropdown for the product  
          
        var $colorDDDiv = $('<div>')
          .attr('id', 'color-dropdown-div')
          .css('text-align', 'right')
          .css('margin-top', '10px')
          .css('margin-bottom', '10px');
        
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
        
        //Make the Qty dropdown for the product
        
        var $qtyDiv = $('<div>')
          .attr('id', 'qty-div')
          .css('text-align', 'right')
          .css('margin-top', '10px')
          .css('margin-bottom', '10px');
        
        
        
        var $qtyDesired = $('<select>')
          .attr('class', 'form')
          .attr('id', 'qty-dropdown')
          .css('type', 'radio');
        
        $qtyDesired.append($("<option>")
          .attr("value", 'no-color-selected')
          .attr("selected", "selected")
          .text('--Qty--')
          .css('float', 'right'));
        
        var arrOfQtys = [1, 2, 3, 4, 5];
        
        
        arrOfQtys.forEach(function(num, index, nums){
          $qtyDesired.append($("<option>").attr("value", num).text(num));
        });
        
        //make a quantity in stock p tag for the product
        
        var $qtyAvail = $('<div>')
          .attr('id', 'qty-avail-div')
          .html("<p style='text-align: right'>" + product.stock + " in stock!" + "<p>");
          
        
        
        
        
        
        
        
        
        
        var $inStockDiv = $('<div>')
        
        
        $priceDiv.append($priceHead);
        $colorDDDiv.append($availColors);
        $qtyDiv.append($qtyDesired);
        
        $priceColorCartDiv.append($priceDiv);
        $priceColorCartDiv.append($colorDDDiv);
        $priceColorCartDiv.append($cartDiv);
        $priceColorCartDiv.append($qtyDiv);
        $priceColorCartDiv.append($qtyAvail);
        $priceColorCartDiv.append($cartDiv);
        
        $productWrapperDiv.append($imgDiv);
        $productWrapperDiv.append($infoDiv);
        $productWrapperDiv.append($priceColorCartDiv);
        
        
        
        return $productWrapperDiv;
          
      });
      renderProducts(prodsInHTML, '#product-contents-section');
      return prodsInHTML;  
    }
    
    
    
    
    function renderProducts(arr, selector) {
      arr.forEach(function(prodHTML){
        $(selector).append(prodHTML);
        $(selector).append($('<hr>'));
        $(selector).append($('<br>'));
      });
      return 1;
    }
    
    createProducts(data);
    
    
    
    /**************************************** Search Function *******************************************/
    
    //case user clicks to Search! button
    $('#search-button').on('click', function(event){
      var searchFor = $('#search-bar-input').val();
      curFiltersApplied = searchFor.split(" ");
      $('#product-contents-section').empty();
      createProducts(data, curFiltersApplied);
    });
    
    
    //case user hits enter when the Search bar in focus
    $('#search-bar-input').on('keyup', function(event){
      if($('search-bar-input:focus') && (event.keyCode === 13)){
        //search thru the array prodArray
        //detatch each item that does not meet the description
        var searchFor = $(this).val();
        curFiltersApplied = searchFor.split(" ");
        $('#product-contents-section').empty();
        createProducts(data, curFiltersApplied);
      }
    });
    
    
    
    /******************************** Filter Results Event Handlers *************************************/
    
    $('#samsung-checkbox').on('click', function(event){
      //if checkbox is now checked, push that filter value to the array of filter, then call the main fxn
      //if checkbox now unchecked, remove that filter from the array and call the main fxn
      $('#product-contents-section').empty();
      if($('#samsung-checkbox').is(':checked')){
        createProducts(filterProdsOnScreen(prodsObjs, 'desc', 'samsung'));
      } else {
        createProducts(data, curFiltersApplied);
      }
    });
    
    $('#apple-checkbox').on('click', function(event){
      $('#product-contents-section').empty();
      if($('#apple-checkbox').is(':checked')){
        createProducts(filterProdsOnScreen(prodsObjs, 'desc', 'apple'));
      } else {
        createProducts(data, curFiltersApplied);
      }
    });
    
    $('#phone-checkbox').on('click', function(event){
      $('#product-contents-section').empty();
      if($('#phone-checkbox').is(':checked')){
        createProducts(filterProdsOnScreen(prodsObjs, 'type', 'phone'));
      } else {
        createProducts(data, curFiltersApplied);
      }
    });
    
    $('#case-checkbox').on('click', function(event){
      $('#product-contents-section').empty();
      if($('#case-checkbox').is(':checked')){
        createProducts(filterProdsOnScreen(prodsObjs, 'type', 'case'));
      } else {
        createProducts(data, curFiltersApplied);
      }
    });
    
    $('#under-50-checkbox').on('click', function(event){
      $('#product-contents-section').empty();
      if($('#under-50-checkbox').is(':checked')){
        createProducts(filterProdsOnScreen(prodsObjs, 'price', 50));
      } else {
        createProducts(data, curFiltersApplied);
      }
    });
    
    $('#under-100-checkbox').on('click', function(event){
      $('#product-contents-section').empty();
      if($('#under-100-checkbox').is(':checked')){
        createProducts(filterProdsOnScreen(prodsObjs, 'price', 100));
      } else {
        createProducts(data, curFiltersApplied);
      }
    });
    
    $('#under-200-checkbox').on('click', function(event){
      $('#product-contents-section').empty();
      if($('#under-200-checkbox').is(':checked')){
        createProducts(filterProdsOnScreen(prodsObjs, 'price', 200));
      } else {
        createProducts(data, curFiltersApplied);
      }
    });
    
    $('#under-500-checkbox').on('click', function(event){
      $('#product-contents-section').empty();
      if($('#under-500-checkbox').is(':checked')){
        createProducts(filterProdsOnScreen(prodsObjs, 'price', 500));
      } else {
        createProducts(data, curFiltersApplied);
      }
    });
    
    $('#under-600-checkbox').on('click', function(event){
      $('#product-contents-section').empty();
      if($('#under-600-checkbox').is(':checked')){
        createProducts(filterProdsOnScreen(prodsObjs, 'price', 600));
      } else {
        createProducts(data, curFiltersApplied);
      }
    });
    
    $('#case-checkbox').on('click', function(event){
      $('#product-contents-section').empty();
      if($('#case-checkbox').is(':checked')){
        createProducts(filterProdsOnScreen(prodsObjs, 'type', 'case'));
      } else {
        createProducts(data, curFiltersApplied);
      }
    });
    
    
    
    
    
    $('#clear-filter-button').on('click', function(event){
      curFiltersApplied = [];
      $('#search-bar-input').val("");
      $('#product-contents-section').empty();
      $('main input').attr('checked', false);
      createProducts(data);
    });
    
    
    
    
    /*************************************** Modal for products ***********************************************/
    
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
      $modal.appendTo('#product-contents-section');
      
      $('.modal').css('display', 'block');
    
      
      $('.close').on('click', function(event){
        $('.modal').css('display', 'none');
        $('.modal').remove();
      });
      
      $('.modal').on('click', function(event){
        $('.modal').css('display', 'none');
        $('.modal').remove();
      });
      
    });
    
    
    
    
    
    
  });
  // ALL YOUR CODE GOES ABOVE HERE //
});
