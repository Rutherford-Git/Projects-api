// Write your "projects" router here!
const express = require('express')
const { validateProjectName, validateProjectdescip, isCompleted } = require('./projects-middleware')
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

router.get('/:id', async (req, res, next)=>{
    const id = await projectModel.get(req.params.id)
    if(!id){
        res.status(404).json({
            message: 'id error'
        })
    }else{
        projectModel.get(req.params.id)
        .then(work => {
            res.json(work)
        })
        .catch(err =>{
           next(err)
            })
    }
})

router.post('/', validateProjectName, validateProjectdescip, (req, res, next)=>{
    if(req.body){
        projectModel.insert(req.body)
        .then(thing =>{
            res.json(thing)
        })
        .catch(err=>{
            next(err)
            })
        }
})

router.put('/:id',validateProjectName, validateProjectdescip, isCompleted,  async (req, res, next)=>{
    projectModel.update(req.params.id, req.body)
    .then(thing =>{
        res.json(thing)
    })
})

router.delete('/:id', async (req, res, next)=>{
    const possaction = await projectModel.get(req.params.id)
    if (!possaction){
        res.status(404).json({
            message: "no project found"
        })
    } else {
        const deleteStuff = await projectModel.remove(possaction.id)
        res.status(200).json(deleteStuff)
    }
})

router.get('/:id/actions', async (req, res, next)=>{
    const id = await projectModel.getProjectActions(req.params.id)
    if(!id){
        res.status(404).json({
            message: 'id error'
        })
    }else{
        projectModel.getProjectActions(req.params.id)
        .then(work => {
            res.json(work)
        })
        .catch(err =>{
           next(err)
            })
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