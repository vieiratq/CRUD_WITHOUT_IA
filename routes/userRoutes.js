const express = require("express");
const db = require("./databaseroutes")
const router = express.Router();
function ValidaLogin(req, res, next) {
    if (req.session.user)
        return next()
    else
        res.redirect("/")
}
router.get("/api/users", ValidaLogin, (req, res) => {
    const userId = req.session.user.id;
    db.query("SELECT username,id ,email, level, plan FROM users WHERE id = $1", [userId], (err, result) => {
        if (err) {
            return res.json({ success: false, message: "Erro ao buscar dados do usuário" })
        }
        const user = result.rows[0];
        if (!user) {
            req.session.destroy(() => {
                res.status(401).json({ success: false, message: "Usuário não encontrado, faça login novamente" });
                res.redirect("/");
            });
        }
        return res.json({ success: true, username: user.username, email: user.email, plan: user.plan, level: user.level, id: user.id });


    })
})


module.exports = router