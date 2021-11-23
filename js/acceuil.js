
// declaration les variables qui sont fréquement utilisés

var c=0;
var firstArray=[];
var prinArray=[];
var container=[];
var apprenantArray=[];
var learner=document.querySelector(".container-learners");
var a="";
var b="";
var date;

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//  ici la fonction qui ajoute un apprenant 

function addLearner(){
    let nameValue=document.getElementById("nameValue");
    let sujetValue=document.getElementById("sujetValue");

        learner.innerHTML +=` <div class="part2" id="learner${c}">
    <input type="text" placeholder=" name" class="name${c}" value=${nameValue.value} />
    <input type="text" placeholder=" sujet de veille" class="sujet${c}" value=${sujetValue.value} />
    <button OnClick="removeLearner(${c})" ><i class="far fa-window-close"></i></button>
  </div>`;
  apprenantArray=[nameValue.value,sujetValue.value];
  firstArray.push(apprenantArray);
  console.log(firstArray);
   nameValue.value="";
   sujetValue.value="";
    c++;
}

// fonction pour supprimer un apprenant

function removeLearner(c){
    
    a=document.querySelector('.name'+c).value;
    b=document.querySelector('.sujet'+c).value;
    container.push([a,b]);

    console.log(firstArray.indexOf(container));

    firstArray.splice(firstArray.indexOf(container),1);
    
    var myElement=document.getElementById("learner"+c);
    myElement.remove();
    console.log(firstArray);
}

// cette fonction sert à télecharger la liste des apprenants sous forme exel


function downloadList(){
     //define the heading for each row of the data  
    var csv = 'Nom ,Sujet de vielle,date\n';  
    //merge the data with CSV  
    var result;
    var localStorageArray =localStorage.getItem('principaleArray');
    localStorageArray=JSON.parse(localStorageArray);

   date=document.querySelector("#date").value;

   var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   var dayName;
   
   result=new Date(date);

   result.setDate(result.getDate() -1);

   console.log(result);

    for (var i = 0; i < localStorageArray.length; i++) {

          result.setDate(result.getDate() + 1);

         dayName = days[result.getDay()];
         console.log(dayName);

         if(dayName=="Saturday"){
            result.setDate(result.getDate() + 2);

         }
         else if(dayName=="Sunday"){
            result.setDate(result.getDate() + 1);
         }
        localStorageArray[i].push(result.getDate()+"/"+result.getMonth()+"/"+result.getFullYear());

    }


    localStorageArray.forEach(function(row) {  
            csv += row.join(',');  
            csv += "\n";  
    });  

    console.log(date.value);
   
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
    hiddenElement.target = '_blank';  
      
    //provide the name for the CSV file to be downloaded  
    hiddenElement.download = 'Organisation des sujets de veilles.csv';  
    hiddenElement.click();  
     
}

// cette fonction sert à vider la page

function clearList(){
  localStorage.removeItem('principaleArray');
  document.getElementById('content').remove();
  document.getElementById('container-learners').remove();
  document.getElementById('date').remove();
  // document.getElementById('result').remove();
}

// fonction a pour commencer le tirage au sort

function startSpinner(){


  if(firstArray.length==0){
    modal.style.display = "none";

  }else{
        
       container=firstArray[Math.floor(Math.random()*firstArray.length)];
    
      //  document.querySelector(".result").innerHTML =`
      //  <p id="result >${container[0]}</p>
      //  `;
    
    
       document.querySelector(".space-learner").innerHTML =container[0];
    
       modal.style.display = "block";
       
        prinArray.push(container);
       
        document.querySelector("#content").innerHTML +=`
        <p class="resultat-de-sort" >${prinArray.indexOf(container)+1} : ${container[0]}</p>
        `;
       
        firstArray.splice(firstArray.indexOf(container),1);
        localStorage.setItem('principaleArray',JSON.stringify(prinArray));
  }
}

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

 








