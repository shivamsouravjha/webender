import ReportModel from "../Model/reportModel.js";
import mongoose from 'mongoose';

export default class SourceRepository {
    async createReport(reportData) {
        try{            
            let resp = await ReportModel.insertMany(reportData); 
            console.log(resp)
            return resp
        } catch (error) {
            throw error
        }
    }
    async updateReport(reportData) {
        try{
            let reportID = reportData['_id']  
            let resp = await ReportModel.updateOne({_id:reportID},reportData); 
            console.log(reportData)
            return resp
        } catch (error) {
            throw error
        }
    }
    async fetchReport(reportID) {
        try{
            let resp = await ReportModel.findById(reportID); 
            return resp
        } catch (error) {
            throw error
        }
    }
}
