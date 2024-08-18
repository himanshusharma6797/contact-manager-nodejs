import express from "express"
import Controllers from "../controllers/contactController.mjs"
import validateToken from "../middleware/validateTokenHandler.mjs"

const router = express.Router()

// to set protected rout for all we can use this
router.use(validateToken)

router.route("/").get(Controllers.getAllContacts).post(Controllers.createContact)

router.route("/:id").get(Controllers.getContact).put(Controllers.updateContact).delete(Controllers.deleteContact)

// to make the code shorter we can use the multiple http methode in a single route
// router.route("/").post(Controllers.createContact)

// router.route("/:id").put(Controllers.updateContact)

// router.route("/:id").delete(Controllers.deleteContact)

export default router