var transList = [];
var transaction = {}
var transCounter = 0;
var total = 0;

// function Transaction(id, source, category, inflow, outflow) {
// 	this.id = id;
// 	this.source = source;
// 	this.category = category;
// 	this.inflow = inflow;
// 	this.ouflow = outflow;
// }

// create new transaction and push to array on button click
function pushTrans() {
	transList.push({
		id: transList.length, 
		source: $("#source").val(), 
		category:$("#category").val(),
		inflow: parseFloat($("#inflow").val()), 
		outflow: parseFloat($("#outflow").val())
	});
}

// display all transactions onto dom
function displayTrans() {
	$("<div class='transaction' data-index-value='" + transCounter + "'> </div>").appendTo(".transactionList");
	$("<p>Source: <span id='sourceSpan'>" + transList[transCounter].source + "</span></p>").appendTo(".transaction:last-child");
	$("<p>Category: <span id='categorySpan'>" + transList[transCounter].category + "</span></p>").appendTo(".transaction:last-child");
	if($("#inflow").val().length > 0) {
		$("<p>Inflow: $<span id='inflowSpan'>" + transList[transCounter].inflow + "</span></p>").appendTo(".transaction:last-child");
	}
	if($("#outflow").val().length > 0) {
		$("<p>Outflow: -$<span id='outflowSpan'>" + transList[transCounter].outflow + "</span></p>").appendTo(".transaction:last-child");
	}
}

function calcTotal() {
		for (var i=0; i < transList.length; i++) {
			if (!isNaN(transList[i].inflow)) {
				total = total + transList[i].inflow;
			} else {
				total = total - transList[i].outflow;
			}
		}
		$(".total-balance").html("<p>Total: $<span id='total'>" + total + "</span></p>");
}

function createTrans() {
	pushTrans();
	displayTrans();
	calcTotal();
}




function newTrans() {
	
	var total = 0;
	var source = $("#source").val();
	var category = $("#category").val();
	var inflow = parseFloat($("#inflow").val());
	var outflow = parseFloat($("#outflow").val());
	
	// function pushTrans() {
	// 	transList.push({id: transCounter, source: source, inflow: inflow, outflow: outflow});
	// };
	
	// function displayTrans() {
		
	// 	var divHTML = "<div class='transaction' data-index-value='" + transCounter + "'><p></p></div>"
		
	// 	var sourceHTML = "Source: <span id='sourceSpan'>" + transList[transCounter].source + "</span>";
		
	// 	var categoryHTML = "Category: <span id='categorySpan'>" + category + "</span>";
		
	// 	var inflowHTML = "Inflow: $<span id='inflowSpan'>" + transList[transCounter].inflow + "</span>";
		
	// 	var outflowHTML = "Outflow: -$<span id='outflowSpan'>" + transList[transCounter].outflow + "</span>";
		
		
	
	// 	if (!isNaN(inflow) || !isNaN(outflow)) {
	// 		$(".transactionList").append(divHTML);
	// 		$(".transaction:last-child p").append(sourceHTML);
	// 		$(".transaction:last-child p").append(categoryHTML);
	// 		if(!isNaN(transList[transCounter].inflow)) {
	// 			$(".transaction:last-child p").append(inflowHTML);
	// 		} else {
	// 				$(".transaction:last-child p").append(outflowHTML);
	// 		};
	// 	}
	// }
		
		
	
	// function calcTotal() {
	// 	for (var i=0; i < transList.length; i++) {
	// 		if (!isNaN(transList[i].inflow)) {
	// 			total = total + transList[i].inflow;
	// 		} else {
	// 			total = total - transList[i].outflow;
	// 		}
	// 	}
	// 	$(".total-balance").html("<p>Total: $<span id='total'>" + total + "</span></p>");
	// }
	
	
	
	// pushTrans();
	// displayTrans();
	// calcTotal();
	transCounter++;
	$("#transForm")[0].reset();

	//adds an editButton on .transaction that is clicked. Also removes edit button when another .transaction is clicked.
	function addEditButton() {
		$(".editButton").remove();
		$(".transaction.highlight").removeClass('highlight');
		$(this).addClass('highlight');
		$(this).append("<input type='button' class='editButton' value='edit' />");
	}

	function addDeleteButton() {
		$(".deleteButton").remove();
		$(this).append("<input type='button' class='deleteButton' value='delete' />");
	}

	function saveEdit() {
		function saveSource() {
			var dataIndex = $("#changeSource").closest(".transaction").attr('data-index-value');
			var newSource = $("#changeSource").val();
			transList[dataIndex].source = newSource;
			$("[data-index-value='" + dataIndex + "'").find("p #sourceSpan").html(newSource);
			
		}
		function saveCategory() {
			var dataIndex = $("#changeCategory").closest(".transaction").attr('data-index-value');
			var newCategory = $("#changeCategory").val();
			transList[dataIndex].category = newCategory;
			$("[data-index-value='" + dataIndex + "'").find("p #categorySpan").html(newCategory);
		}
		function saveInflow() {
			if($("#inflowSpan").length) {
				var dataIndex = $("#changeInflow").closest(".transaction").attr('data-index-value');
				var oldInflow = transList[dataIndex].inflow;
				var newInflow = parseFloat($('#changeInflow').val());
				transList[dataIndex].inflow = newInflow;
				total = ($("#total").html() - oldInflow) + newInflow;
				$("[data-index-value='" + dataIndex + "'").find("p #inflowSpan").html(newInflow);
				$(".total-balance").html("<p>Total: $<span id='total'>" + total + "</span></p>");
			}
		}
		function saveOutflow() {
			if($("#outflowSpan").length) {
				var dataIndex = $("#changeOutflow").closest(".transaction").attr('data-index-value');
				var oldOutflow = transList[dataIndex].outflow;
				var newOutflow = parseFloat($('#changeOutflow').val());
				transList[dataIndex].outflow = newOutflow;
				total = (parseFloat($("#total").html()) + parseFloat(oldOutflow)) - parseFloat(newOutflow);
				$("[data-index-value='" + dataIndex + "'").find("p #outflowSpan").html(newOutflow);
				$(".total-balance").html("<p>Total: $<span id='total'>" + total + "</span></p>");
			}
		}

		

		saveSource();
		saveCategory();
		saveInflow();
		saveOutflow();
		$("#saveEdit").remove();
		$("#cancelEdit").remove();
	}

	function loadEdit() {
		$("#saveEdit").remove();
		function sourceEdit() {
			$(".editButton").parent().find('p #sourceSpan').html("<input type='text' placeholder='source' id='changeSource' />")
		}
		function categoryEdit() {
			$(".editButton").parent().find('p #categorySpan').html("<input type='text' placeholder='category' id='changeCategory' />")
		}
		function inflowEdit() {
			$(".editButton").parent().find('p #inflowSpan').html("<input type='text' placeholder='inflow' id='changeInflow' />");
		}
		function outflowEdit() {
			$(".editButton").parent().find('p #outflowSpan').html("<input type='text' placeholder='outflow' id='changeOutflow' />");
		}
		function showButtons() {
			$(".editButton").parent().append("<input type='button' value='save' id='saveEdit' />"
			 + "<input type='button' value='cancel' id='cancelEdit' />");

		}		

		showButtons();
		sourceEdit();
		categoryEdit();
		inflowEdit();
		outflowEdit();	
	}

	function deleteTransaction() {
		$('.deleteButton').parent().remove();
	}

	function deleteTransactionObject() {
		var dataIndex = $(".deleteButton").closest(".transaction").attr('data-index-value');
		transList.splice(dataIndex, 1);
	}

	function cancelEdit() {
		$("#sourceSpan").html(source);
		$("#categorySpan").html(category);
		$("#inflowSpan").html(inflow);
		$("#outflowSpan").html(outflow);
		$("#saveEdit").remove();
		$("#cancelEdit").remove();
	}

	$("body").on('click', '.transaction', addEditButton);
	$("body").on('click', '.transaction', addDeleteButton);

	//finds the data-index-value of the editButton's parent element
	$("body").on('click', '.editButton', loadEdit);

	$("body").on('click', '#saveEdit', saveEdit);

	$("body").on('click', '.deleteButton', deleteTransaction);
	$("body").on('click', '.deleteButton', deleteTransactionObject);

	$("body").on('click', '#cancelEdit', cancelEdit);
	
};


$("#saveButton").click(function() {
	createTrans();
	newTrans();
	
})

$("#closeButton").click(function() {
	newTrans();
	$("#transForm").hide();
})

$("#addTransaction").click(function() {
	$("#transForm").show();
})

// $(document).ready(function() {
// 	$("#transForm").hide();
// })





