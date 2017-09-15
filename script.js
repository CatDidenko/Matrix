 
/**
* This feature displays alternately filled cells of 
* the table to the page.
* @variable {number} dimension
*   the dimension of the matrix that the user enters
* @variable {number} counter
*   variable that is used to move through the coordinate array
*/
function drawTable(form) {

  dimension = document.getElementById('number').value;
  counter = 0;

  validateForm(dimension, form);
}


/**
* This function checks the dimension of the matrix that the user
* entered. If the number satisfies the conditions, the hideForm 
* function is called. Otherwise, a warning is displayed on the page.
* @parametr {number} dimension
*   the dimension of the matrix that the user enters
* @param {reference} form 
*   element reference
*/
function validateForm(dimension, form) {

  if (dimension % 1 == 0 && dimension > 0 && dimension <= 1000) {
      hideForm(dimension, form);
  } else {
      document.getElementById('number').value = "";
      alert('Enter a number in the range from 1 to 1000');
  }
}


/**
* This function draws a table structure. Depending on the dimension 
* that the user entered, it generates the number of rows and cells.
* @parametr {number} dimension
*   the dimension of the matrix that the user enters
* @variable {reference} table
*  	returns a reference to an element by its ID
* @variable {number} cols
*   table columns
* @variable {number} rows
*   table rows
* @return {reference} table
* returns a table with rows and cells
*/
function makeTable(dimension){

  var table = document.getElementById('myTable');

  for (var cols = 0; cols < dimension; cols++) {
    var tr = document.createElement('tr');
    table.appendChild(tr);

    for (var rows = 0; rows < dimension; rows++) {
      var td = document.createElement('td');
      tr.appendChild(td);
    }
  }
      return table;
}


/**
* This function hides the table when the button "Go" is clicked
* and calls the function fillTableCells
* @parametr {number} dimension
*   the dimension of the matrix that the user enters
* @param {reference} form 
*   element reference
* @variable {string} speed
*   the rate of appearance of the matrix of cells
* @variable {number} intervalId
*   timer identifier
*/
function hideForm(dimension, form) {

  var speed = setSpeed();
  if (speed == undefined) {
    speed = 1000;
  }

  console.log(speed);

  form.classList.add('hide');
  intervalId = setInterval(fillTableCells, speed);
  
}


/**
* This function sets the speed at which a new filled cell 
* appears on the page. Speed is set by the user when adding 
* a specific hash to the address bar.
* @variable {string} hash
*   hash that the user entered into the address bar
* @variable {string} speed
*   number which sets the speed
* @return {string} speed
*/
function setSpeed() {

  var hash = window.location.hash;
  var speed = hash.split("=")[1];

  return speed;
}


/**
* This function generates an array of values that will fill 
* the matrix. In the array of values, there are no numbers 
* that contain the number six. All values in the array range
* from the largest to the smaller.
* @param {number} dimension
*  the dimension of the matrix that the user enters
* @variable {number} index
*   a variable that is used to move through the array of numbers
* @variable {number} countOfCells
*  a variable that stores the number of cells for a given matrix
* @variable {array} numbers
*  empty array
* @return {array} numbers
*  an array that contains numbers without digits 6
*/
function arraySort(dimension) {

  var index = 0;
  var countOfCells = Math.pow(dimension, 2);
  var numbers = [];

  for(var i = countOfCells; i >= 1; i--) {
    numbers[index] = i;
    index++;
  }

  var i = numbers.length;

  top: while (i >= 1){
        if ( /6/.test(numbers[i]) ) {
          numbers.splice(i,1);
          numbers.unshift(Math.max.apply(null, numbers) + 1);
          continue top;
        }
          i--;
      }
  return numbers;
}


/**
* The function fills the array "matrix" in a spiral counterclockwise.
* @param {number} dimension
*  the dimension of the matrix that the user enters
* @variable {array} numbers
*  an array that contains numbers without digits 6
* @variable {array} indexArray
*  an array that contains coordinates of all cells
*  in order of their filling
* @variable {number} i
*  number of the col in matrix
* @variable {number} j
*  number of the row in matrix
* @variable {array} matrix
*  an array that will be filled with certain numbers in a spiral
* @variable {array} direction
*  array of matrix filling directions
* @variable {number} currenDirectionIndex
*  a variable, which is responsible for the movement of the array 
*  directions 
* @variable {array} args
*  an array that contains two arrays - matrix and indexArray
* @return {array} args
*  returns the filled array matrix and filled array indexArray
*/
function makeMatrix (dimension) {

  var numbers = arraySort(dimension);
  var indexArray = [];
  var i = 0;
  var j = 0;
  var matrix = [];

  for (var d = 0; d < dimension; d++) {
	  matrix[d] = [];
  }

  var direction = [[1,0], [0,1], [-1, 0], [0,-1]];
  var currentDirectionIndex = 0;
 
  for (var n = 0; n < numbers.length; n++) {

  	matrix[i][j] = numbers[n];
	  indexArray.push([i,j]);

    i+=direction[currentDirectionIndex][0];
    j+=direction[currentDirectionIndex][1];
    
      if (i >= dimension || j >= dimension || i < 0 || j < 0 || matrix[i][j] !== undefined) {
    	 
        i -= direction[currentDirectionIndex][0];
        j -= direction[currentDirectionIndex][1];
      
        currentDirectionIndex = (currentDirectionIndex + 1) % 4;
      
          i += direction[currentDirectionIndex][0];
          j += direction[currentDirectionIndex][1];

      } 
  }
    var args = [matrix, indexArray];

    return args;
}


/**
* Function prints cell values for a table in a spiral.
* @variable {array} indexArray
*  an array that contains coordinates of all cells
* @variable {number} i
*	number of the row in table
* @variable {number} j
*   number of the cell in table
* @variable {array} matrix
*  an array that contains certain numbers in a spiral
* @variable {reference} table
*  	returns a reference to an element by its ID
*/
function fillTableCells() {

  var indexArray = makeMatrix(dimension)[1];
  var i = indexArray[counter][0];
  var j = indexArray[counter][1];
  var matrix = makeMatrix(dimension)[0];
  var table = makeTable(dimension);


  table.rows[i].cells[j].innerHTML = matrix[i][j];
  table.rows[i].cells[j].classList.add('square');

  counter++;

    if ( counter === Math.pow(dimension, 2) ) {
      clearInterval(intervalId);
    }
}
