import {companyArray} from '../data/company.data.js';
import {employeeArray} from '../data/employee.data.js';
import {technologyArray} from '../data/tech.data.js';
import {getCompanyModel as CompanyModel,getEmployeeModel as EmployeeModel,getTechnologyModel as TechnologyModel} from './connection.js';
// const { mongo } = require('mongoose');
export const setDbCollections = async () => {
  const empModel = await EmployeeModel();
  const techModel = await TechnologyModel();
  const cmpModel = await CompanyModel();
  await empModel.deleteMany({});
  await cmpModel.deleteMany({});
  await techModel.deleteMany({});
  const insertedEmp = await empModel.insertMany(
    employeeArray
  );
  const insertedCompany = await cmpModel.insertMany(
    companyArray
  );
  const insertedTechnology = await techModel.insertMany(
    technologyArray
  );
  if (
    insertedEmp.length > 0 &&
    insertedTechnology.length > 0 &&
    insertedCompany.length > 0
  ) {
    return `Database setup is done:
            employeeDocumentsCount:${insertedEmp.length}
             companyDocumentsCount:${insertedCompany.length}
              technologyDocumentsCount:${insertedTechnology.length}
            `;
  } else {
    return "No data Inserted";
  }
};
