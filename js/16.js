'use strict;'
//Якщо в масив відповідей входить більше однієї відповіді - генеруємо обєкт класу ТестЧекбокс
//інакше генеруємо обєкт класу ТестРадіо

$(function(){
	var questionNum = 1;
	var rowsCount = 3;
	var tests = [];

	function Test (questionNum, question, variants, rightAnswers){
		this.questionNum = questionNum;
		this.question = question;		
		this.variants = variants;
		this.rightAnswers = rightAnswers;
	};
	
	function TestCheckbox () {
		this.selectType = "checkbox";
	}
	function TestRadio () {
		this.selectType = "radio";
	}

	TestCheckbox.prototype = new Test;
	TestRadio.prototype = new Test;
	
	$('#next').click(function () {
		if(testOK()){
			saveTest();
			questionNum++;
		} else {
			alert("Test not ready");
		}
	});

	function testOK () {
		function checkVariantsSelected () {
			var selected = false;
			var allVariats = document.querySelectorAll('#tb tr td input');
			for (i = 0; i < allVariats.length; i++){
				if (allVariats[i].checked){
					selected = true;
				}
			}
			return selected;
		}

		function checkFieldsNotEmpty () {
			var notEmpty = false;
			var allFilds = document.querySelectorAll('#tb tr td input[type="text"]');
			for (i = 0; i < allFilds.length; i++){
				if (allFilds[i].value != ''){
					notEmpty = true;
				}
			}
			return notEmpty;
		}
		
		return ( checkFieldsNotEmpty() &&  checkVariantsSelected())	
	}

	function saveTest () {
		var checkbox = document.getElementById("switcher").checked;
			function SetDataTest (newtest){
				newtest.questionNum = questionNum;
				newtest.question = document.getElementById("question").value;
				newtest.variants = getVariants();
				newtest.rightAnswers = getRightsAnswers();
			}
		if(checkbox){
			var newtest = new TestCheckbox;
		} else {
			var newtest = new TestRadio;
		}
		SetDataTest(newtest);
		tests.push(newtest);
		clear();
	}

	function clear () {
		var allCheckboxes = document.querySelectorAll('#tb tr td input[name="thisRight"]');
		for (var i = 0; i < allCheckboxes.length; i++) {
			allCheckboxes[i].checked = false;
		}

		var allFilds = document.querySelectorAll('#tb tr td input[type="text"]');
		for (var i = 0; i < allFilds.length; i++){
			allFilds[i].value = '';
		}

		var table = document.getElementById("tb");
		var allrows = document.getElementById("tb").getElementsByTagName("tr");
		
		for (var i = allrows.length-1; i > 2; i--){
			if (allrows[i].rowIndex > 2){
				table.deleteRow(i);
			}
		}
		rowsCount = 3;
	}

	function getVariants () {
		var variants = [];
		for (i = 1; i < rowsCount; i++){
			var id = "answer" + i;
			var answer = document.getElementById(id).value;
			variants.push( answer );
		}
		return variants;
	}

	function getRightsAnswers () {
		var allCheckboxes = document.querySelectorAll('#tb tr td [name="thisRight"]'); //'#tb tr td input[type="radio"]'
		var rights = [];
		for (var i = 0; i < allCheckboxes.length; i++){
			rights.push(allCheckboxes[i].checked);
		}
		return rights;
	}
	


	$('#addtest').click(function () {
		$('#tb').removeClass("hide");
		$('#control').removeClass("hide");
		$('#addtest').addClass("hide");
	});
	
	$('#addansw').click(function(){
		if (rowsCount < 9){
			var allrows = document.getElementById("tb").getElementsByTagName("tr");
			var newquestion = allrows[rowsCount-1].cloneNode(true);
			newquestion.getElementsByTagName("td")[0].getElementsByTagName("input")[0].setAttribute("id", "answer" + rowsCount);
			newquestion.getElementsByTagName("td")[0].getElementsByTagName("input")[0].setAttribute("name", "answer" + rowsCount);
			newquestion.getElementsByTagName("td")[1].getElementsByTagName("input")[0].setAttribute("name", "thisRight");
			$('#tb').append(newquestion);
			rowsCount++;
		} else {
			alert("No more 8 variants is avaliable");
		}
	});

	$('#switcher').click(function(){
		if (this.checked){
			changeAllChekbox();
			$('#label').text("UnCheck this if only one valid variant is ");
		} else {
			changeAllRadio();
			$('#label').text("Check this if right variants more then 1 ");
		}
	});

	function changeAllRadio () {
		var allCheckboxes = document.querySelectorAll('#tb tr td input[type="checkbox"]');
		for (var i = 0; i < allCheckboxes.length; i++){
			$(allCheckboxes[i]).replaceWith('<input type="radio" name="thisRight">');
		}
	}
	
	function changeAllChekbox () {
		var allRadio = document.querySelectorAll('#tb tr td input[type="radio"]');
		for (var i = 0; i < allRadio.length; i++){
			$(allRadio[i]).replaceWith('<input type="checkbox" name="thisRight">');
		}
	}
	
	$('#finish').click(function () {
		localStorage.setItem('testArr', JSON.stringify(tests));
		var testList = JSON.parse(localStorage.getItem('testArr'));
		console.log(testList);
		console.log("question 1: ", testList[0].question);
	});
});