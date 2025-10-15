const path = require('path'); // Add this at the top
const { get } = require('mongoose');
const expenseModel = require('../models/expense-model')
const xlsx = require('xlsx');

module.exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || icon) {
            return res.status(401).send('All fields are required');
        }

        const ExpenseCreated = await expenseModel.create({
            userId,
            category,
            amount,
            icon,
            date: new Date(date)
        });

        return res.status(200).send(ExpenseCreated);
    } catch (error) {
        return res.status(500).send(`Server Error: ${error.message}`);
    }
};
module.exports.getAllExpense= async(req,res)=>{
   try {
     const userId = req.user.id
     const getAll = await expenseModel.find({userId}).sort({date:-1})
     if(!getAll) {return res.status(401).send("Error Occured")}
     else{
        res.send(getAll)
     }
   } catch (error) {
    res.status(401).send(`Server Error : ${error.message}`)
   }
}
module.exports.deleteExpense= async(req,res)=>{
    try {
        const deleteExpense = await expenseModel.findByIdAndDelete(req.params.id)
        if(!deleteExpense) {
            return res.status(402).send('Error Occured')
        }
        else{
            res.send('Expense Deleted')
        }
    } catch (error) {
        res.status(404).send(`Server Error : ${error.message}`)
    }
}

module.exports.downloadExpenseExcel = async(req,res)=>{
    try {
        const userId = req.user.id;

        // Fetch all expenses for the logged-in user
        const expenses = await expenseModel.find({ userId }).sort({ date: -1 });

        if (!expenses || expenses.length === 0) {
        return res.status(404).json({ message: "No expense records found to download" });
        }

        // Format the data for Excel
        const expenseData = expenses.map((item, index) => ({
        "Sr No": index + 1,
        "Category": item.category,
        "Amount (₹)": item.amount,
        "Date": new Date(item.date).toLocaleDateString(),
        "Created At": new Date(item.createdAt).toLocaleString(),
        }));

        // Create a worksheet and workbook
        const worksheet = xlsx.utils.json_to_sheet(expenseData);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Expense Details");

        // Convert workbook to buffer
        const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // Set headers and send the file
        res.setHeader("Content-Disposition", "attachment; filename=expense_details.xlsx");
        res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        return res.send(buffer);

    } catch (error) {
        console.error("Error generating expense Excel:", error);
        return res.status(500).json({ message: `Server Error: ${error.message}` });
    }
}