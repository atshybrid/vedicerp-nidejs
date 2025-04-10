const Router = require("express").Router;
const controller = require("./company.controller");

const {
  validateAdmin,
  validateUser,
} = require("../../../middlewares/authorization");

const router = Router({ mergeParams: true });

router.get("/", validateAdmin, controller.listCompanys);
router.get("/:company_id", validateAdmin, controller.getCompany);
router.post("/", validateAdmin, controller.createCompany);
router.post("/bank_account", validateAdmin, controller.addBankAccount);
router.post("/expense", validateUser, controller.createCompanyExpense);
router.put(
  "/bank_account/:bank_account_id",
  validateAdmin,
  controller.updateBankAccount
);
router.put("/:company_id", validateAdmin, controller.updateCompany);
router.delete("/:company_id", validateAdmin, controller.deleteCompany);

module.exports = router;
