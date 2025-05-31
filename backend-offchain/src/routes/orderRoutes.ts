import { Router } from "express";
import { updateCertificate, certifyCertificate, createCertificate, getAllCertificates } from "../controllers/orderControllers";

const router = Router()

//CRUD for certificates
router.get("/all", getAllCertificates)
router.post("/create", createCertificate)
router.put("/update/:id", updateCertificate)
router.put("/certify/:id", certifyCertificate)
router.delete("/delete/:id", createCertificate)
// router.post()

export default router