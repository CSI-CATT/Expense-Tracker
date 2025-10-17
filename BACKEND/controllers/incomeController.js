const { get } = require('mongoose');
const incomeModel = require('../models/income-model');
const xlsx = require('xlsx');
const path = require('path'); // Add this at the top
const fs = require('fs');

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

module.exports.downloadIncomeExcel = async(req,res)=>{
  //Make Your Route Here 
    try {
        const userId = req.user.id;

        // Fetch all income records for the logged-in user
        const incomes = await incomeModel.find({ userId }).sort({ date: -1 });

        if (!incomes || incomes.length === 0) {
        return res.status(404).json({ message: "No income records found to download" });
        }

        // Format the data in json for Excel
        const incomeData = incomes.map((item, index) => ({
        "Sr No": index + 1,
        "Source": item.source,
        "Amount (₹)": item.amount,
        "Date": new Date(item.date).toLocaleDateString(),
        "Created At": new Date(item.createdAt).toLocaleString()
        }));

        // Create a worksheet and workbook in-memory
        const worksheet = xlsx.utils.json_to_sheet(incomeData);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Income Details");

        // Convert workbook to a buffer
        const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // Set headers to prompt download
        res.setHeader(
        "Content-Disposition",
        "attachment; filename=income_details.xlsx"
        );
        res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        // Send the buffer directly as response
        return res.send(buffer);

    } catch (error) {
        console.error("Error generating income Excel:", error);
        return res.status(500).json({ message: `Server Error: ${error.message}` });
    }
}
