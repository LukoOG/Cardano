import { Router } from "express";
import { createCertificate, getAllCertificates } from "../controllers/orderControllers";

const router = Router()

router.get("/all", getAllCertificates)
// router.post("/create", createOrder)
router.post("/create", createCertificate)
// router.post()

export default router