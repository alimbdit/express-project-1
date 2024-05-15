"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use(express_1.default.text());
// * router
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);
userRouter.post('/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "user is created successfully!",
        data: user
    });
});
courseRouter.post('/create-course', (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "course is created successfully!",
        data: course
    });
});
// &  middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
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
app.get('/', logger, (req, res, next) => {
    try {
        console.log(req.query);
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
});
app.post('/', logger, (req, res) => {
    console.log(req.body);
    // res.send('Getting data')
    res.json({
        message: "successfully receive."
    });
});
//~ for wrong route error handling this route should be the last route and should stay before the global error handler. 
// ^ if needed can be used next:NextFunction -------> (req: Request, res: Response, next:NextFunction)
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route is not found."
    });
});
// ! global error handler
app.use((error, req, res, next) => {
    // console.log(error)
    if (error) {
        res.status(400).json({
            success: false,
            message: "something went wrong!"
        });
    }
});
exports.default = app;
