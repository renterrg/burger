$(document).ready(function() {

	var burgerInput = $("#text_area");
	var burgerList = $("tbody");

	$(document).on("submit", "#burger_form", handleBurgerFormSubmit);

	function handleBurgerFormSubmit(event) {
		event.preventDefault();

		if(!burgerInput.val().trim().trim()) {
			return;
		}
		makeBurgerPost({
			burger_name: burgerInput.val().trim()
		});
	}

	function makeBurgerPost(burgerData) {
		$.post("/api/posts", burgerData)
			.then(getBurgers);
	}

	function createBurgerRow(burgerData) {
		var newTr = $("<tr>");
		var newDevourBtn = $("<div>");
		newTr.data("burger", burgerData);
		newTr.append("<td>" + burgerData.burger_name + "</td>");
		newDevourBtn.append("<button>");
		return newTr;
	}

	function getBurgers() {
		$.get("/api/posts", function(data){
			console.log(data);
			var rowsToAdd = [];
			for (var i = 0; i < data.length; i++) {
				rowsToAdd.push(createBurgerRow(data[i])); 
			}
			renderBurgerList(rowsToAdd);
			burgerInput.val("");
		});
	}

	function renderBurgerList(rows) {
		burgerList.children().not(":last").remove();
		if (rows.length) {
			burgerList.prepend(rows);
		};
	}

});