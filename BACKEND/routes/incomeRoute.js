const express = require('express') 

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel,
    deleteAllIncome
} = require('../controllers/incomeController')

const {isLoggedIn} = require('../middlewares/isLoggedIn')
const router = express.Router()

router.post('/addincome',isLoggedIn,addIncome)
router.get('/getallincome',isLoggedIn,getAllIncome)
router.get('/downloadincomeexcel',isLoggedIn,downloadIncomeExcel)
router.delete('/deleteAllIncome',isLoggedIn, deleteAllIncome)
router.delete('/:id',isLoggedIn,deleteIncome)

module.exports = router;