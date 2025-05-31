import { Router } from "express";
import { getOrder, createCertificate } from "../controllers/orderControllers";

const router = Router()

router.get("/:id", getOrder)
// router.post("/create", createOrder)
router.post("/create", createCertificate)
// router.post()

export default router