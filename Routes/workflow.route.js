import {Router} from 'express';
import {workflowController} from '../controller/workflow.controller.js';

const workflowRouter = Router();

workflowRouter.post('/', workflowController);

export default workflowRouter;