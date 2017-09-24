$(document).ready(function() {

	var burgerInput = $("#text_area");
	var burgerList = $("tbody");


	$(document).on("submit", "#burger_form", handleBurgerFormSubmit);
	$(document).on("submit", ".devour_btn", handleDevourBtn);

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

		var newTr = $("<tr>").attr('id', burgerData.id);
		newTr.append("<td>" + burgerData.burger_name + "</td>");
		newTr.append("<button class='devour_btn' type='submit' value='false'>Devour</button>");
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

	function handleDevourBtn(event) {
		event.preventDefault();

		if ($(event.target).val() == 'false') {

			$.ajax({
					method: "PUT",
					url: "/api/posts",
					data: {
						id: $(event.target).parent().attr('id'),
						devoured: true
			  		}
			    }).done(getBurgers);
		}
	}

});
