import ReportModel from "../Model/ReportModel";
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
}