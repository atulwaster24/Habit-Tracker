import express from 'express';
import { addHabit, deleteHabit, getHabits, updateStatus, details, updateDayStatus } from './app.controller.js';

export const router = express.Router();


router.get('/detail/:id', details);
router.get('/', getHabits);
router.get('/delete/:id', deleteHabit);
router.post('/', addHabit);
router.get('/update/:data_id/:day_id/:status', updateDayStatus)
router.get('/update-status/:id/:status', updateStatus);