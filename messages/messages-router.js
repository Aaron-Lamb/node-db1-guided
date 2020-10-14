const express = require("express")
const db = require("../data/config")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try{
        const messages = await db.select('*').from("messages");
        return res.status(200).json(messages);
    } catch(error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    try{
        const [message] = await db.select('*').from('messages').where("id", req.params.id).limit(1);
        return res.status(200).json(message);
    } catch(error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try{
        const payload = {
            title: req.body.title,
            contents: req.body.contents
        }
        if(!payload.title || !payload.contents) {
            return res.status(400).json({
                errorMessage: "Needs title or content"
            })
        } 

        const [id] = await db.insert(payload).into('messages')
        const message = await db.first('*').from('messages').where('id', id) ;
        return res.status(201).json(message)

    } catch(error){
        next(error)
    }
})

router.put("/:id", (req, res, next) => {

})

router.delete("/:id", (req, res, next) => {

})

module.exports = router