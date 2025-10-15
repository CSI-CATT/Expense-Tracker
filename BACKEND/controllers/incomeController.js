const { get } = require('mongoose');
const incomeModel = require('../models/income-model');
const xlsx = require('xlsx');
const path = require('path'); // Add this at the top

module.exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || icon) {
            return res.status(401).send('All fields are required');
        }

        const incomeCreated = await incomeModel.create({
            userId,
            source,
            amount,
            icon,
            date: new Date(date)
        });

        return res.status(200).json(incomeCreated);
    } catch (error) {
        return res.status(500).send(`Server Error: ${error.message}`);
    }
};
module.exports.getAllIncome= async(req,res)=>{
   try {
     const userId = req.user.id
     const getAll = await incomeModel.find({userId}).sort({date:-1})
     if(!getAll) {return res.status(401).send("Error Occured")}
     else{
        res.send(getAll)
     }
   } catch (error) {
    res.status(401).send(`Server Error : ${error.message}`)
   }
}
module.exports.deleteIncome= async(req,res)=>{
   try {
        const userId = req.user.id;
        const incomeId = req.params.id;

        if(!userId){
            return res.status(401).json({ message: "Unauthorized: User ID not found" });
        }

        if(!incomeId){
            return res.status(400).json({ message: "Bad Request: Income ID is required" });
        }

        // Find the income and ensure it belongs to the logged-in user
        const incomeToDelete = await incomeModel.findOne({ _id: incomeId, userId });

        if (!incomeToDelete) {
            return res.status(404).json({ message: "Income not found or you don't have permission to delete it" });
        }

        await incomeModel.deleteOne({ _id: incomeId });
        return res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Server Error: ${error.message}` });
    }
}


module.exports.deleteAllIncome = async (req, res) => {
    try {
        const userId = req.user.id;

        if(!userId){
            return res.status(401).json({ message: "Unauthorized: User ID not found" });
        }

        // Delete all income records for this user
        const result = await incomeModel.deleteMany({ userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No incomes found to delete" });
        }

        return res.status(200).json({ message: `${result.deletedCount} incomes deleted successfully` });
    } catch (error) {
        return res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

module.exports.downloadIncomeExcel = async(res,req)=>{
  //Make Your Route Here 
}
