// add middlewares here related to actions
const actionModel = require('./actions-model')

async function validateActionId(req, res, next) {
      try{
          const actionID = await actionModel.get(req.params.id)
          if (!actionID){
              res.status(400).json({
                  message: "action not found"
              })
          }else{
              req.actionModel = actionID;
              next()
          }
      }catch (err){
          res.status(500).json({
              message: "error finding action"
          })
      }
}

module.exports = {
    validateActionId
}