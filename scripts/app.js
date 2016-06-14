// Loads the whole script when the document is ready.
$(document).ready(function(){
	var checkName = "checkItem";
	var checkClass = "checkClass";
	var itemClass = "item";
	var itemID = "item";
	var counter = 1;
	var currentID;
	var element = "<tr class='dataRow'><td class='dataItem'><img src='images/star1.png' width='15px' height='15px'/></td>"
					+ "<td class='dataItem'><input type = text class = 'item' id = '";
	var elementEnd = "'></td></tr>";
	
	// localStorage.clear() is used to clear all the browser data if required, which is optional
	//localStorage.clear();
	
	// getLocalStorage() gets the data stored in the browser after adding or editing.
	getLocalStorage();
	function getLocalStorage(){
		if(localStorage.getItem("notEmpty") == "true")
		{
			for(var i=1;i<localStorage.length;i++)
			{
				var toDoString = localStorage.getItem("item"+i);
				var x = element + "item" + i + elementEnd;
				$('.toDoItems').append(x);
				$('#item'+i).val(toDoString);
			}
			counter= i;
		}
	}
	
	// Adds the data to the browser and displays to the user when the user clicks the 'Add' button
	$('#add').click(function(){
			saveToLocalStorage();
	});
	
	/* Here I have given the user to tap anywhere on the page after editing which stores the data in the browser
	 * instead of making the user to click on a particular button after editing */
	$("#toDosDiv").on('focus','.item',function(){
		currentID = $(this).attr('id');
		$(this).on('blur', function() {
		localStorage.setItem($(this).attr('id'),$(this).val());
		});
		
	});
	
	/* Allows the user to store the data after pressing the enter key in case of iPads or tablets or laptops or desktops. */
	$('input').bind("enterKey", function(e){
		saveToLocalStorage();
	});
	
	$('input').keyup(function(e){
		if(e.keyCode == 13){
			$(this).trigger('enterKey');
		}
	});
	
	// This function below is called when the user enters the data and either clicks the 'Add' button or presses Enter key.
	function saveToLocalStorage(){
		var textValue = $('#newText').val();
		if(textValue.length <= 0){
			alert("Enter task");
		}
		else if(textValue.length > 0){
			itemID = itemID + counter;
			var x = element + itemID + elementEnd;		
			$('.toDoItems').append(x);
			$('#'+itemID).val(textValue);
		if(typeof(Storage) != "undefined"){
			var text = $('#newText').val();
			$('#newText').val('');
			localStorage.setItem("notEmpty", true);
			localStorage.setItem("item"+counter, text);			
		}
			else{
				alert("This browser does not support web storage.");
		}
			counter++;
		}
	}
	
});
