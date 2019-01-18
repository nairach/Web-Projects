function Calc(){}

//returns html string for displaying calculation page on the client
Calc.prototype.render = function(){
	var str = `
			<html>
				<body>
					<div style = "text-align:center; margin:0px auto; display:block;">
						<h1>Summation and Factorial Calculator</h1>
		 				<h2>Naimisha Rachakonda</h2>
						<input type="text" id="seed" placeholder="Seed(n)" />
						<select id="selectionField">
							<option value="factorial"> n-Factorial</option>
							<option value="sum"> Summation</option>
						</select>
						<input type="button" class="button" onClick="getCalc()" value="Calculate!"/>
						<input type="button" class="button" onClick="displayCalc()" value="Refresh!"/> <div id="calc_output"></div>
					</div>
				</body>
			</html>`;

	return str;
}

//calculate factorial of a given seed (integer)
Calc.prototype.computeFactorial = function(seed){
	var factorial = 1;
    var i = seed;
    for (i = seed; i >= 1; i--) 
    {
      factorial = factorial * i;
    }
    return factorial;
}

//calculate summation of a given seed (integer)
Calc.prototype.computeSum = function(seed){
	var sum = 0;
    var i = 1;
    for( i = 1; i <= seed; i++)
    {
      sum = sum + i;
    }
    return sum;
}

module.exports = Calc;