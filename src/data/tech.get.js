import { technologyArray } from "./tech.data.js";

export const getTechnologyById =(techId) => technologyArray.find(element => element.id === techId);
export const getAllTechnologies =() => technologyArray;
export const getTechnologiesByCompanyId = ( companyId ) => true

export const addANewTechnology = (newTechnologyObj) => {
    console.log("Technology DATA: addANewTechnology:", newTechnologyObj);
    isNewTechnology(newTechnologyObj); 
    technologyArray.push(newTechnologyObj);
    console.log("Technology added!");
    return technologyArray.find(_=>_.id === newTechnologyObj.id);
  }
  function isNewTechnology(newTechnologyObj) {
    console.log("Checking: isNewTechnology");
    if(technologyArray.find(_=>_.id === newTechnologyObj.id || _.name === newTechnologyObj.name)) {
      console.log("No! couldn't add the Technology");
      throw new Error("Technology already existing!");
    }
    console.log("Yes!");
  }

  export const updateExistingCompany = (techObj) => {
    console.log("Tech DATA: updateTechnology:", techObj);
    if(isExistingTech(techObj)){
        let techIndex = technologyArray.findIndex(_ => _.id === techObj.id)
        technologyArray[techIndex] = techObj;
    } 
    console.log("Tech Updated!");
    return companyArray.find(_=>_.id === techObj.id);
  }
  function isExistingTech(techObj) {
    console.log("Checking: isNewTech");
    if(technologyArray.find(_=>_.id === techObj.id || _.name === techObj.name)) {
      console.log("update the Tech");
      return true;
    }
    throw new Error("Tech already existing!");
  }