// Write your "actions" router here!
const express = require('express')
const actionModel = require('./actions-model')
const {validateActionID} = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next)=>{
    actionModel.get()
    .then(act =>{
        res.json(act)
    })
    .catch(err=>{
        next(err)
    })
})

router.get('/:id', (req, res, next)=>{
    const id = req.params.id
    if(!id){
        res.status(404).json()
    }else{
        actionModel.get(id)
    .then(act =>{
        res.json(act)
    })
    .catch(err=>{
        next(err)
    })
    }
})

router.post('/', (req, res, next)=>{
    actionModel.insert(req.body)
    .then(thing =>{
        res.json(thing)
    })
})

router.put('/:id', (req, res, next)=>{
    actionModel.update(req.params.id, req.body)
    .then(thing =>{
        res.json(thing)
    })
})

router.delete('/:id', async (req, res, next)=>{
    const possaction = await actionModel.get(req.params.id)
    if (!possaction){
        res.status(404).json({
            message: "no action found"
        })
    } else {
        const deleteStuff = await actionModel.remove(possaction.id)
        res.status(200).json(deleteStuff)
    }
    
})


module.exports = router