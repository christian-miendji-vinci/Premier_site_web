import express from "express" ;

const router = express.Router() ;

/*GET users listing*/
router.get("/" , (_req , res) => {
  res.json({ users: [{name: "Miendji-Tchuini"}]  });
}) ;

export default router ;