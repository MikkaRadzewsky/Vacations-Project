import express, { request, response } from "express";
import cors from "cors";
// import appConfig from "./2-utils/app-config-dev";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import vacationsController from "./6-controllers/vacations-controller";
import authController from "./6-controllers/auth-controller";
import expressFileUpload from "express-fileupload";
import path from "path";

global.config = require(process.env.NODE_ENV === "production" ? "./2-utils/app-config-prod" : "./2-utils/app-config-dev");

const server = express();

server.use(cors()); 
server.use(express.json());
server.use(express.static(path.join(__dirname, "../../Frontend")));
server.use(expressFileUpload());
server.use("/api", vacationsController);
server.use("/api", authController);
server.use("*" , (request, response) => {
    response.sendFile(path.join(__dirname, "../../Frontend/public/index.html"))
});
server.use("*", routeNotFound);
server.use(catchAll);

const port = process.env.PORT || 3000 ;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));

