import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import SettingsBill from "./settings-bill.js"

const app = express();
const settingsBill = SettingsBill();
const exphbs = engine({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts'
});

app.engine('handlebars', exphbs);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get("/", function (req, res) {
    res.render("index", {settings: settingsBill.getSettings()});

});
app.post("/settings", function (req, res) {
   console.log(req.body);

   settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel,
   });
   console.log(settingsBill.getSettings());

   res.redirect("/")
});
app.post("/action ", function (req, res) {

});
app.get("/actions ", function (req, res) {

});
app.get("/actions/:type ", function (req, res) {

});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});