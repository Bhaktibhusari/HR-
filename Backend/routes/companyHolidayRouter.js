let express = require("express");
let router = express.Router();
let companyHolidayController = require("../controllers/companyHolidayController");

router.get('/', companyHolidayController.getCompanyHolidayList);

router.get('/', companyHolidayController.getCompanyHoliday);

router.post('/', companyHolidayController.createCompanyHoliday);

router.patch('/:id', companyHolidayController.updateCompanyHoliday);

router.delete('/:id', companyHolidayController.deleteCompanyHoliday);



module.exports = router;