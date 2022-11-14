import axios from '../hoc/axios';

const API = {
    getTrainings: () =>
        axios({
            url: `trainings/`,
            method: 'GET',
        }),

    getHazards: () =>
        axios({
            url: `hazards/`,
            method: 'GET',
        }),

    getGriviences: () =>
        axios({
            url: `grievances/`,
            method: 'GET',
        }),


    getGriviences: (id) =>
        axios({
            url: `questions/${id}`,
            method: 'GET',
        }),


    getEmployees: () =>
        axios({
            url: `employee/`,
            method: 'GET',
        }),



    addQuestion: (data) =>
        axios({
            url: `questions/`,
            method: 'post',
            data
        }),

    addTraining: (data) =>
        axios({
            url: `trainings/`,
            method: 'post',
            data
        }),


    assignTraining: (data) =>
        axios({
            url: `employee/assign_training/`,
            method: 'post',
            data
        }),



};

export default API;
