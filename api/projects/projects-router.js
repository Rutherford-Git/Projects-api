// Write your "projects" router here!
const express = require('express')
const projectModel = require('./projects-model')



const router = express.Router()

router.get('/', (req, res, next)=>{
    projectModel.get()
    .then(work => {
        res.json(work)
    })
    .catch(err =>{
       next(err)
        })
})

router.get('/:id', (req, res, next)=>{
    projectModel.get(req.params.id)
    .then(work => {
        res.json(work)
    })
    .catch(err =>{
       next(err)
        })
})

router.get('/', (req, res, next)=>{
    
})

router.put('/:id', (req, res, next)=>{
    
})

router.delete('/:id', (req, res, next)=>{
    
})

router.get('/:id', (req, res, next)=>{
    
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      customMessage: "something bad happened",
      message: err.message,
      stack: err.stack
    })
  })

module.exports = router