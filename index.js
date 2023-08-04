import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import SettingsBill from "./settings-bill.js"
import moment from "moment";

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
    res.render("index", {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        totalColor: settingsBill.totalClassName()
      
    });

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
app.post("/action", function (req, res) {

    settingsBill.recordAction(req.body.actionType)

    res.redirect("/")
});

app.get("/actions", function (req, res) {
    res.render("actions", { 
        actions: settingsBill.actions(), 
        timeNow: settingsBill.actionType()
    })
});

app.get("/actions/:actionType", function (req, res) {
    const actionType = req.params.actionType;
   

    res.render("actions", { actions: settingsBill.actionsFor(actionType) })
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});