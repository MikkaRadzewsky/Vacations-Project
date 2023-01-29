import express, { request, response } from "express";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import vacationsController from "./6-controllers/vacations-controller";
import authController from "./6-controllers/auth-controller";
import expressFileUpload from "express-fileupload";
import path from "path";
import sanitize from "./2-utils/sanitize";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";


const server = express();

server.use(cors()); 
server.use(express.json());
server.use("/api/", expressRateLimit({
    max: 50,
    windowMs: 1000, 
    message: "Are you a hacker?" 
}));
server.use(helmet({
    crossOriginResourcePolicy: false,
}));
// server.use(cors({ origin: appConfig.frontendUrl }));
server.use(express.static(path.join(__dirname, "./_front-end")));
server.use(expressFileUpload());
server.use("/api", vacationsController);
server.use("/api", authController);
server.use("*" , (request, response) => {
    response.sendFile(path.join(__dirname, "./_front-end/index.html"))
});
// server.use("*", routeNotFound);
server.use(sanitize);
server.use(catchAll);

const port = process.env.PORT || 3001 ;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));

