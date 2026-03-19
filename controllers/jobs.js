const JOB = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors')

const { get } = require("mongoose")

const getAllJobs = async (req, res) => {
    const jobs = await JOB.find({ createdBy: req.user.userId }).sort('createAt');
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getJobs = async (req, res) => {
    console.log(req);
    const { user: { userId }, params: { id: jobId } } = req;

    const job = await JOB.findOne({ _id: jobId, createdBy: userId })

    if (!job) {
        throw new NotFoundError('Job not found');
    }
    res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await JOB.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });

}

const updateJob = async (req, res) => {
    const { body: { company, position }, user: { userId }, params: { id: jobId } } = req;
    if(company === ''|| position === ''){
        throw new BadRequestError('Company or Position fields cannot be empty');
    }
    const job = await JOB.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true });
    if (!job) {
        throw new NotFoundError('Job not found');
    }
    res.status(StatusCodes.OK).json({ job });

}
const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;

    const job = await JOB.findOneAndRemove({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new NotFoundError('Job not found');
    }
    res.status(StatusCodes.OK).json({ msg: 'Job removed' });
}
module.exports = {
    getAllJobs,
    getJobs,
    createJob,
    updateJob,
    deleteJob
}       