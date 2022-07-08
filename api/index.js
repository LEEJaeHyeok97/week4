import { Router } from "express";
//import models, { Student } from "../models" // models 의 파일 실행
//import models, { Emails } from "../models" // models 의 파일 실행
import Posts from "./posts";





const app = Router();

app.use("/posts", Posts);



export default app;