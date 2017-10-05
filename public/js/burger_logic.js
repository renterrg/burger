$(document).ready(function() {

	var burgerInput = $("#text_area");
	var burgerList = $("#burger_body");
	var newTr;


	$(document).on("submit", "#burger_form", handleBurgerFormSubmit);
	$(document).on("click", ".devour_btn", handleDevourBtn);

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


		newTr = $("<tr id='burger-form-row'>").attr('id', burgerData.id);
		newTr.append("<td class='burger_item'>" + burgerData.burger_name + "</td>");
		newTr.append("<input type='button' class='devour_btn' value='Devour' name='devour'></input>");
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

		burgerList.empty();
		burgerList.children().not(":last").remove();
		if (rows.length) {
			burgerList.prepend(rows);
		};
	}

	function handleDevourBtn(event) {
		event.preventDefault();


			$.ajax({
					method: "PUT",
					url: "/api/posts",
					data: {
						id: $(event.target).parent().attr('id'),
						devoured: true
					},
					success: function() {
						var parent = $(event.target).parent();
						var newList = parent[0].innerText;

						console.log(newList);

						var newDevTr = $("<tr>")
						newDevTr.append('<td>' + newList + '</td>');
						newDevTr.appendTo('#devoured_body');
						parent.remove();
					}
				});
	}

});
