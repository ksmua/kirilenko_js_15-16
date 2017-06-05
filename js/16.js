'use strict;'
//onclick
$(function(){
	var testData = [];
	var test = function(){
		this.questionNum = questionNum;
		this.question= question;
		this.ansver1= ansver1;
		this.ansver2= ansver2;
		this.right= right;
	};
	var rowsCount = 2;
	// var testtmpl = {
	// 	questionNum: 0,
	// 	question: "",
	// 	ansver1: "",
	// 	ansver2: "",
	// 	right: [],
	// };

	$('#addtest').click(function(){
		$('#tb').removeClass("hide");
		$('#control').removeClass("hide");
		$('#addtest').addClass("hide");
	});
	
	$('#addansw').click(function(){
		var rowsCount = document.getElementById("tb").rows.length;
		if (rowsCount < 9){
			var allrows = document.getElementById("tb").getElementsByTagName("tr");
			console.log("allrows = ", allrows);
			var newquestion = allrows[rowsCount-1].cloneNode(true);
			newquestion.getElementsByTagName("td")[0].getElementsByTagName("input")[0].setAttribute("id", "answer" + rowsCount);
			newquestion.getElementsByTagName("td")[0].getElementsByTagName("input")[0].setAttribute("name", "answer" + rowsCount);
			newquestion.getElementsByTagName("td")[1].getElementsByTagName("input")[0].setAttribute("name", "ifright" + rowsCount);
			console.log("-------------------------------");
			console.log("newquestion_= ", newquestion);
			$('#tb').append(newquestion);
		} else {
			alert("No more 8 answers is avaliable");
		}
	});
	
	$('#next').click(function(){
		alert("next");
		if (rowsCount){
			saveQuestions(rowsCount);
		}else{
			saveQuestions(2);
		}
	});

	function saveQuestions (num) {
		//var table = document.getElementById("tb");
		var checkbox = true;
		if(checkbox){
			var testCheckbox = function(){

			};
		}
		//var curentTestItem.__poto__ = testtmpl;
		console.log( document.getElementById("question").value );
		for (i = 0; i < num; i++){
			console.log(document.getElementsById("answer" + (i + 1)) );
			//alert( input.checked )
		}
	}
	// якщо є хоча б 2 відповіді і відмічено хоча б один чекбокс активуємо кнопку "наступне запитання/далі"
	// при натискані якої запис(обєкт) зберігається в масив
	// при натисканні на завершити - зберігаємо масив до локалсторедж
});
//document.getElementById('b2').disabled = true;
//.removeClass("
//localStorage.setItem('test', JSON.stringify(testData));
//var testList = JSON.parse(localStorage.getItem('test'));