import express from "express";
import {
  cancelChallan,
  chartData,
  createChallan,
  getAllChallan,
  getChallan,
  getOperatorComments,
  makeInvoice,
  searchClients,
  unverifiedChallans,
  updateChallan,
  verifyAmount,
} from "../controllers/challanController.js";
import { authorizeUser } from "../middleware/authMiddleware.js";
import { getAllValues } from "../controllers/adminController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllChallan)
  .post(authorizeUser("Admin", "Sales"), createChallan);
router.get("/chartData", chartData);

router.get(
  "/unverified",
  authorizeUser("Admin", "Back Office"),
  unverifiedChallans
);
router.get(
  "/operatorComments",
  authorizeUser("Admin", "Service Operator"),
  getOperatorComments
);
router.get("/clientName", searchClients);
router.get("/adminValues", getAllValues);
router.put("/verify/:id", authorizeUser("Admin", "Back Office"), verifyAmount);
router.put("/cancel/:id", authorizeUser("Admin"), cancelChallan);
router.put(
  "/makeInvoice/:id",
  authorizeUser("Admin", "Back Office"),
  makeInvoice
);
router
  .route("/:id")
  .put(authorizeUser("Admin", "Service Operator"), updateChallan)
  .get(
    authorizeUser("Admin", "Sales", "Back Office", "Service Operator"),
    getChallan
  );

export default router;
