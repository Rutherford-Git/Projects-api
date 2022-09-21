// add middlewares here related to actions
const actionModel = require('./actions-model')
const projectModel = require('../projects/projects-model')

async function validateActionId(req, res, next) {
          const actionID = await actionModel.get(req.params.id)
          if (!actionID){
              res.status(400).json({
                  message: "action not found"
              })
          }else{
              next()
          }
    }

async function validateActionProject_id(req, res, next) {
        const { id } = req.body;
        if (!id || !id.trim()){
            next({
                status: 400,
                message: "missing required project id field"
            })
        }else{
            req.project_id = project_id.trim()
            next()
        }
    }

    async function validateID(req, res, next) {
        const { id } = req.body;
        const allID =  await projectModel.get(req.params.id);
        
        if (id !== allID){
            next({
                status: 400,
                message: "no matching project id field"
            })
        }else{
            req.project_id = project_id.trim()
            next()
        }
    }

    function validateActionNotes(req, res, next) {
        const { notes } = req.body;
                if (!notes || !notes.trim()){
                    next({
                        status: 400,
                        message: "missing required notes field"
                    })
                }else{
                    req.notes = notes.trim()
                    next()
                }
            }
        
        function validateActiondescip(req, res, next) {
            const { description } = req.body;
                    if (!description || !description.trim()){
                        next({
                            status: 400,
                            message: "missing required desciption field"
                        })
                    }else{
                        req.description = description.trim()
                        next()
                    }
                }
        
        function isActionCompleted(req, res, next){
            const {completed} = req.body;
            if (completed === undefined){
                next({
                    status: 400,
                    message: "missing required completion field"
                })
            }else{
                req.completed = completed
                next()
            }
        }

module.exports = {
    validateActionId,
    isActionCompleted,
    validateActionNotes,
    validateActiondescip,
    validateActionProject_id,
    validateID
}