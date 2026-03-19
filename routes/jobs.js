const express = require('express');
const router = express.Router();
const { getAllJobs, getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobs');


router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJobs).patch(updateJob).delete(deleteJob);   

module.exports = router;

