import express, { NextFunction, Request, Response } from "express";
const app = express();



// parser
app.use(express.json());
app.use(express.text());


// * router

const userRouter = express.Router();
const courseRouter = express.Router();


app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);


userRouter.post('/create-user', (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "user is created successfully!",
    data: user
  })
})

courseRouter.post('/create-course', (req: Request, res: Response) => {
  const course = req.body;
  console.log(course)
  res.json({
    success: true,
    message: "course is created successfully!",
    data: course
  })
})




// &  middleware

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next()
}


// ^ params
// app.get('/:id/:subId', (req: Request, res: Response) => {
//   console.log(req.params)
//   res.send('Hello devvvvvvv!')
// })


// ^ query
// app.get('/', logger, (req: Request, res: Response) => {
//   console.log(req.query)
//   res.send('Hello developers!')
// })

// ~error handler
app.get('/', logger, (req: Request, res: Response, next: NextFunction) => {

  try {
    console.log(req.query)
    // res.send('Hello developers!')
    res.send(something);
  }
  catch (error) {
    console.log(error);

    // & for handling error globally
    next(error);

    // res.status(400).json({
    //   success: false,
    //   message: 'failed to get data.'
    // })
  }


})

app.post('/', logger, (req: Request, res: Response) => {
  console.log(req.body);
  // res.send('Getting data')
  res.json({
    message: "successfully receive."
  })

})




//~ for wrong route error handling this route should be the last route and should stay before the global error handler. 
// ^ if needed can be used next:NextFunction -------> (req: Request, res: Response, next:NextFunction)

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route is not found."
  })
})




// ! global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // console.log(error)
  if (error) {
    res.status(400).json({
      success: false,
      message: "something went wrong!"
    })
  }
})


export default app;