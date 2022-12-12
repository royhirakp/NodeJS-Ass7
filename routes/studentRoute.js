const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const User = require("../models/student")
mongoose.connect("mongodb://localhost/Ass7")
const router = express.Router()
// Router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


//1///****** */
router.get("/", async (req, res) => {
    // res.json({
    try {
        const user = await User.find();
        res.json(user)
    } catch (e) {
        res.status(400).json({
            status: "failed",
            messege: e.message
        })
    }
})
//************************ */
//2*****//with params
router.get("/:stuntID", async (req, res) => {
    try {
        const user = await User.find({ id: req.params.stuntID })     //CHANGE THE NAME   
        return res.json(user[0])
    } catch (e) {
        res.status(400).json({
            status: "invalid respond",
            messege: e.message
        })
    }
})
//*************************** */
// //Post
let studentID = 7;
router.post('/', async (req, res) => {
    try {
        studentID = studentID + 1; //7  
        const new_user = await User.create({
            id: studentID,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        })
        // console.log(new_user);
        res.json({
            id: studentID
        })
    } catch (e) {
        res.status(400).json({
            status: "invalid respond",
            messege: e.message
        })
    }
})

//PUT
router.put("/:id", async (req, res) => {
    try {
        const user = await User.find({ id: req.params.id })
        const update_stdnt = {
            id: req.params.id,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        }
        const user_update = await User.updateOne({ id: req.params.id }, { $set: update_stdnt })

        res.json({
            status: "sucess",
            users: user_update,
            id: user.id
        })
    } catch (e) {
        res.status(400).json({
            status: "invalid respond",
            messege: e.message
        })
    }
})
//DELETE
router.delete("/:Stdt_id", async (req, res) => {
    try {
        const user = await User.deleteOne({ id: req.params.Stdt_id })
        res.json({
            status: "sucess",
            users: user
        })
    } catch (e) {
        res.status(404).json({
            status: "invalid respond",
            messege: e.message
        })
    }
})

module.exports = router;
