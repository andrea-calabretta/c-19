//Importiamo le librerie necessarie alla generazione i dati delle persone fittizie
const { fake } = require('faker');
var faker = require('faker');
var fs = require('fs');
const { exit } = require('process');

// scegliamo di generare contenuti in lingua inglese 
faker.locale = "en";

//stringa che ospiterà le queries
var str= "";

var covid = [
  'positivo',
  'negativo'
]
//inizializziamo un array che ci serve per l'algoritmo pseudocasuale per la generazione del grafo
var array = []

//Il numero di nodi del grafo viene stabilito come parametro in ingresso (process.argv[0] = node, process.arv[1] = 01_generator.js, process.argv[2]= 100 per es.)
var totale = process.argv[2];
var flag = 1;

//ciclo for per generare le queries
for (var i=0;i<totale; i++){  
  flag = 1;
  var firstname = faker.name.firstName();
  var lastName = faker.name.lastName();
  var country = faker.address.country(); 
  var age = Math.floor(Math.random()*75)+15; 
  
  //genero la stringa e tolgo la parte in eccesso
  var date = faker.date.past().toString();
  date = date.substring(0, 15);
  //date = Fri Aug 12 2020

  console.log ("stringa: ", date);

  var weekday = date.substring(0,3);
  console.log("Weekday = ", weekday);

  var month = date.substring (4,7);
  console.log("month = ", month);

  var day = date.substring (8,10);
  console.log("day = ", day);

  var year = date.substring(11, 16);
  console.log("year = ", year);

  if (firstname.includes("'") || lastName.includes("'")) flag = 0 ;
  var random = Math.floor(Math.random()*2 +1) -1;
  if (i==0){
    str = 'CREATE ';
  } 
  if (flag == 1){
    str += '(' + firstname.toLowerCase() + "_" + lastName.toLowerCase() + ':CPerson {name: "'  + firstname + ' ' + lastName + '", chatid: "-", covid: "' + covid[random] +'", year: "' + year + '", month: "' + month + '", day: "' + day + '", weekday: "' + weekday + '", country: "'+ country + '", age: "' + age + '"}),' +'\n';
    array.push(firstname.toLowerCase() + '_' + lastName.toLowerCase())
  }  
}



var array2=[];
var array3=[];

//Facciamo una copia dell'array dentro l'array3
for (var i of array){
  array3.push(i);
}

console.log("Array1: \n")
for(var i = 0; i < array.length ; i++){     
  console.log(array[i]) 
}

/*
Al fine di evitare che i nodi si mettano in contatto con sé stessi, selezioniamo casualmente dei nodi dall'array iniziale e li
inseriamo nell'array2 e contemporaneamente li rimuoviamo dall'array di partenza 
array[] : inzialmente composto da tutti i nodi, alla fine verrà svuotato
array2[] : composto da alcuni nodi selezionati casualmente nell'array[]
array3[]: composto da i nodi iniziali meno quelli selezionati

Alla fine collegheremo i nodi dell'array2 con i nodi dell'array3 
 */
label:
while (array.length >1) 
{
  if (array.length <2 ) continue label;

  var src = Math.floor(Math.random()*array.length +1) -1;
  console.log("src: ", src);

  var node = array.splice(src, 1);
  array2.push(node);
  //Ogni persona ha un numero random di contatti compresi tra 5 e 9
  var edges = Math.floor(Math.random()*5 )+5;
  console.log("edges: ", edges);

  for (var i = 0; i<edges; i++)
  {
    var dest = Math.floor(Math.random()*array.length +1) -1;
    if (array[dest] == undefined){
      break;
    }
    str += '(' + node + ')-[:CONTACT]->(' + array[dest] + '),'+ '\n';
    //console.log(str);
    var removed = array.splice(dest, 1);
    console.log("removed: ", removed );
    console.log("remaining: ", array.length);
  }
} 

console.log(str);

//togliamo dall'array3 i nodi presenti nell'array2

  for (i=0; i< array3.length; i++){
    for(j =0; j < array2.length; j++){
      if(array3[i] == array2[j] ) array3.splice(i, 1)
    }
  }


  console.log("Array1: \n")
  for(var i = 0; i < array.length ; i++){     
    console.log(array[i]) 
  }

  console.log("Array2: \n")
  for(var i = 0; i < array2.length ; i++){     
    console.log(array2[i]) 
  }

  console.log("Array3: \n")
  for(var i = 0; i < array3.length ; i++){     
    console.log(array3[i]) 
  }

//colleghiamo i nodi dell'array2[] con alcuni nodi dell'array3[] in modo pseudocasuale
  label2:
while (array3.length >1) 
{
  if (array3.length <2 ) continue label2;

  var src = Math.floor(Math.random()*array3.length +1) -1;
  console.log("src: ", src);

  var node = array3.splice(src, 1);
  var edges = Math.floor(Math.random()*5 )+5;
  console.log("edges: ", edges);

  for (var i = 0; i<edges; i++)
  {
    var dest = Math.floor(Math.random()*array3.length +1) -1;
    if (array3[dest] == undefined){
      break;
    }
    str += '(' + node + ')-[:CONTACT]->(' + array3[dest] + '),'+ '\n';
    var removed = array3.splice(dest, 1);
    console.log("removed: ", removed );
    console.log("remaining: ", array3.length);
  }
} 

//con il seguente comando eliminiamo la virgola a fine riga della stringa contente le queries
str = str.substring(0, str.length - 2);

//scriviamo le queries su file
fs.writeFile('queries_neo4j.txt', str, function(err){
  if(err) { return console.log(err); } console.log('The file was saved');
});
