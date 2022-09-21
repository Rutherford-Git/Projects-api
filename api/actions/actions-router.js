// Write your "actions" router here!
const express = require('express')
const actionModel = require('./actions-model')
const {validateActionNotes, validateActiondescip, isActionCompleted} = require('./actions-middlware')

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

router.get('/:id', async (req, res, next)=>{
    const id = await actionModel.get(req.params.id) 
    if(!id){
        res.status(404).json({
            message: 'id error'
        })
    }else{
        actionModel.get(req.params.id)
        .then(act =>{
        res.json(act)
    })
    .catch(err=>{
        next(err)
    })
    }
})

router.post('/', validateActionNotes, validateActiondescip, (req, res, next)=>{
    if(req.body){
        actionModel.insert(req.body)
        .then(thing =>{
            res.json(thing)
        })
    }else{
       next(res.status(400).json()) 
    } 
})

router.put('/:id', validateActionNotes, validateActiondescip, isActionCompleted, (req, res, next)=>{
    actionModel.update(req.params.id, req.body)
    .then(thing =>{
        res.json(thing)
    })
    .catch(err=>{
        next(err)
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

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: "something bad happened",
      message: err.message,
      stack: err.stack
    })
  })


module.exports = router