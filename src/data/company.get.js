import {companyArray} from './company.data.js'

export const getAllCompanies = () => companyArray;
export const getCompanyById = (companyId) => companyArray.find(aCompany => companyId === aCompany.id)
export const getCompaniesByTechnologyId = (technologyId) => companyArray.filter(aCompany => aCompany.technologyIds.find(element => element === technologyId));
export const getACompanyByEmployeeId = ( empId ) => companyArray.find(aCompany => aCompany.employees.find(element => element === empId));

export const addANewCompany = (newCompanyObj) => {
    console.log("COMPANY DATA: addANewCompany:", newCompanyObj);
    isNewCompany(newCompanyObj); 
    companyArray.push(newCompanyObj);
    console.log("Company added!");
    return companyArray.find(_=>_.id === newCompanyObj.id);
  }
  function isNewCompany(newCompanyObj) {
    console.log("Checking: isNewCompany");
    if(companyArray.find(_=>_.id === newCompanyObj.id || _.name === newCompanyObj.name)) {
      console.log("No! couldn't add the company");
      throw new Error("Company already existing!");
    }
    console.log("Yes!");
  }

export const updateExistingCompany = (companyObj) => {
    console.log("COMPANY DATA: updateCompany:", companyObj);
    if(isExistingCompany(companyObj)){
        let companyIndex = companyArray.findIndex(_ => _.id === companyObj.id)
        companyArray[companyIndex] = companyObj;
    } 
    console.log("Company Updated!");
    return companyArray.find(_=>_.id === companyObj.id);
  }
  function isExistingCompany(CompanyObj) {
    console.log("Checking: isNewCompany");
    if(companyArray.find(_=>_.id === companyObj.id || _.name === companyObj.name)) {
      console.log("update the company");
      return true;
    }
    throw new Error("Company already existing!");
  }