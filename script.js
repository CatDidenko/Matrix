  
  var filteredNumbers = [];
  var matrix = [];
  var indexMassive = [];
  var counter = 0;
  var table = document.getElementById('myTable');
 

  function hide(form) {

  	dimension = document.getElementById('number').value;

	if (dimension > 0 && dimension <= 1000) {

	  form.classList.add('hide');

	  getFilteredArray(dimension);
	  makeMatrix(dimension, filteredNumbers);

	  for (var cols = 0; cols < dimension; cols++) {
		    var tr = document.createElement('tr');
		    table.appendChild(tr);

	  for (var rows = 0; rows < dimension; rows++) {
		    var td = document.createElement('td');
		    tr.appendChild(td);
	      }
	  }

	   intervalId = setInterval(addNewCell, 1000);

	} else {

		document.getElementById('number').value = "";
		alert('Enter a number in the range from 1 to 1000');
	}
}


  function getFilteredArray(dimension) {

  var index = 0;
  var offset = 1;
  var countOfCells = Math.pow(dimension, 2);

  for(var i = countOfCells; i >= 1; i--) {
    filteredNumbers[index] = i;

  if (/6/.test(i)){

  	if(/6/.test( countOfCells + offset)) {
    	 ++offset;
    }
   	 filteredNumbers.unshift(countOfCells + offset);
    	offset++;
		}
		index++;
	}
}


  function makeMatrix (dimension, filteredNumbers) {

  var i = 0;
  var j = 0;

  for (var d = 0; d<dimension; d++) {
	  matrix[d] = [];
   }

  var direction = [[1,0], [0,1], [-1, 0], [0,-1]];
  var currentDirectionIndex = 0;
 
  for (var n = 0; n < filteredNumbers.length; n++) {

  	matrix[i][j] = filteredNumbers[n];
	indexMassive.push([i,j]);

    i+=direction[currentDirectionIndex][0];
    j+=direction[currentDirectionIndex][1];
    
    if (i >= dimension || j >= dimension || i < 0 || j < 0 || matrix[i][j] !== undefined) {
    	 
      i -= direction[currentDirectionIndex][0];
      j -= direction[currentDirectionIndex][1];
      
       currentDirectionIndex = (currentDirectionIndex + 1) % 4
      
       i += direction[currentDirectionIndex][0];
       j += direction[currentDirectionIndex][1];
      } 
    }
  }

  function addNewCell() {

	i = indexMassive[counter][0];
  	j = indexMassive[counter][1];

	table.rows[i].cells[j].innerHTML = matrix[i][j];
	table.rows[i].cells[j].classList.add('square');
    counter++;

  	if ( counter === Math.pow(dimension, 2) ) {
    clearInterval(intervalId);
    }
  }
