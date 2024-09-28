import { employeeArray } from "./employee.data.js";

export const getAllEmployees = () => employeeArray;
export const getEmployeeById  = (empId) => employeeArray.find(employee => employee.id === empId);
export const getEmployeesByCompanyId = (companyId) => employeeArray.filter(anEmployee => companyId === anEmployee.companyId);
export const getEmployeesByTechnologyId = ( technologyId ) => employeeArray.filter(anEmployee => anEmployee.technologyIds.find(element => element === technologyId));
export const addANewEmployee = (empObj,pubsub) => {
    isNewEmp(empObj);
    empObj.id = generateId('E', employeeArray);
    empObj.companyId = "";
    employeeArray.push(empObj);
    pubsub.publish('EMP_ADDED', empObj);
    return empObj
  }
  function isNewEmp(newEmpObj) {
    if (employeeArray.find(_ => _.firstName === newEmpObj.firstName && _.lastName === newEmpObj.lastName)) {
      throw new Error("Employee already exists!");
    }
  }
  function generateId(strParam, dataArray) {
    return strParam + (Math.max(...dataArray.map(_ => parseInt(_.id.substr(1)))) + 1)
  }