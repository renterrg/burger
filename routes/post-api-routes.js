var db = require("../models");

module.exports = function(app) {

	app.post("/api/posts", function(req, res){
		db.Burger.create(req.body).then(function(dbBurger){
			res.json(dbBurger);
		});
	});

	app.get("/api/posts", function(req, res){
		db.Burger.findAll().then(function(dbBurger){
			res.json(dbBurger);
		});
	});

	app.get("/api/posts/:id", function(req, res){
		db.Burger.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(dbBurger){
			res.json(dbBurger);
		});
	});

	app.put("/api/posts", function(req, res) {
	    db.Burger.update({
	      devoured: req.body.devoured
	      }, {
	        where: {
	          id: req.body.id
	        }
	    }).then(function(dbBurger) {
	      res.json(dbBurger);
	    });
  	});
}
