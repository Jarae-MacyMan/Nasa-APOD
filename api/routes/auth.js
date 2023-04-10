const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')

	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')

	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "https://nasa-apod-rho.vercel.app",
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')

	req.logout();
	res.redirect("https://nasa-apod-rho.vercel.app");
});

module.exports = router;
