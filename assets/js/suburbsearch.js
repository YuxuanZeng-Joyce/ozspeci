var finalData;

function myFunction() {
  var val;
  val = document.getElementById("myDropdown")
  document.getElementById("myDropdown").classList.toggle("show");
}

function fetchSuburbsFromApi(){
$('#loading-image').show();
  
  $.ajax({
  type: "GET",
  url: "https://7c0qdup7cl.execute-api.ap-southeast-2.amazonaws.com/nearestSuburbStage",
  crossDomain: true,
  contentType: "application/json",
  success: function(data, status){
    finalData = data.data
    if (finalData == undefined){

     fetchSuburbsFromApi()
    }
    else{
    
      filterFunction(finalData)
    }
      $('#loading-image').hide();
  }
});
}

function filterFunction(finalData) {


  $.each(finalData,function(i,item){
    
  $("#myDropdown").append('<a id='+i+'>'+finalData[i].suburbname+'</a>')
  
  });

  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");

  
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}


function navigate(data) {
  data = data.split(' ').join('_')
  base_url = 'suburbwisespecies.html'
  new_url =  base_url + '?data=' + data;
  window.location.href = new_url;
}

$(document).ready(function() {
    $("#myDropdown a").click(function(index) {
        //Do stuff when click
        //console.log(index.currentTarget.outerText)
        navigate(index.currentTarget.outerText)
        //fetchSpeciesBySuburb(index.currentTarget.outerText)
    });
});





