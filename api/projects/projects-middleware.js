const projectModel = require("./projects-model");

async function validateProjectId(req, res, next) {
    const actionID = await projectModel.get(req.params.id);
    if (!actionID) {
        res.status(400).json({
            message: "project not found",
        });
    } else {
        next();
    }
}

function validateProjectName(req, res, next) {
    const { name } = req.body;
    if (!name || !name.trim()) {
        next({
            status: 400,
            message: "missing required name field",
        });
    } else {
        req.name = name.trim();
        next();
    }
}

function validateProjectDescription(req, res, next) {
    const { description } = req.body;
    if (!description || !description.trim()) {
        next({
            status: 400,
            message: "missing required desciption field",
        });
    } else {
        req.description = description.trim();
        next();
    }
}

function isCompleted(req, res, next) {
    const { completed } = req.body;
    if (completed === undefined) {
        next({
            status: 400,
            message: "missing required completion field",
        });
    } else {
        req.completed = completed;
        next();
    }
}

module.exports = {
    validateProjectId,
    validateProjectDescription,
    validateProjectName,
    isCompleted,
};
