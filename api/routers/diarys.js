const { Router } = require('express')

const diarysController = require('../controllers/diarys');

const diarysRouter = Router();

diarysRouter.get('/', diarysController.index);
diarysRouter.get("/:id", diarysController.show);
diarysRouter.post("/", diarysController.create);
diarysRouter.post("/:id", diarysController.update);
diarysRouter.delete("/:id", diarysController.destroy);



module.exports = diarysRouter;