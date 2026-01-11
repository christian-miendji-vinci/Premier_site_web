import cors from "cors";
import express , {ErrorRequestHandler} from "express" ;
import usersRouter from "./src/routes/users" ;


const app = express() ;

const corsOptions = {
    origin: [/^http:\/\/localhost/,"http//amazing.you.com"],
};

app.use(cors(corsOptions)) ;

app.use((_req , _res , next)=> {
  console.log(
    "Time: ",
    new Date().toLocaleString("fr-Fr", { timeZone: "Europe/Brussels"})
  );
  next() ;
});

app.use(express.json()) ;
app.use(express.urlencoded({ extended: false})) ;

app.use("/users", usersRouter) ;

const errorHandler: ErrorRequestHandler = (err , _req , res ,_next) => {
    console.error(err.stack);
    return res.status(500).send("Something broke") ;
};

app.use(errorHandler) ;
export default app ;