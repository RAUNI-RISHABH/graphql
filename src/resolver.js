// 2. RESOLVER - src/resolver.js
// Import the data source and use it in the resolver
// import { welcomeMessage } from "./data/employee.data.js";
import { getAllCompanies, getCompanyById, addANewCompany } from "./data/company.get.js";
import { getAllEmployees, getEmployeeById, getEmployeesByCompanyId } from "./data/employee.get.js";
import { getAllTechnologies, getTechnologyById } from "./data/tech.get.js"
const { PubSub } = require('apollo-server-express');

// if from mongodb
const {
  // ... other imports from ./db/employee
  setDbCollections,
} = require("./db/employee");

// Provide resolver functions for our schema fields
// 3 initialize the apolloExpressServer(kind of binds schema and resolver to initiate apollo server)


let welcomeMessage = "Hello GraphQL world!"; 

const pubsub = new PubSub();
function genLucky() {
  const aLuckyNo = Math.round(Math.random() * 10)
  pubsub.publish('GET_LUCKY_NO', { getLuckyNo: aLuckyNo });
  setTimeout(genLucky, 1000);
  return aLuckyNo;
}
export const resolvers = {
    Query: {
      setupDB: () => true,
      employees: () => getAllEmployees(),
      technologies: () => getAllTechnologies(),
      companies: () => getAllCompanies(),
      message: () => welcomeMessage,
      calculator: () => 'Exercise 4: A simple calculator!',
      add: (parent, args, context, info) => args.a + args.b,
      employeeById: (parent, args, context, info) => getEmployeeById(args.id),
      companyById: (parent, args, context, info) => getCompanyById(args.id),
      technologyById: (parent, args, context, info) => getTechnologyById(args.id),
    },
     // Resolvers for NESTED details!!
  Employee: {
    avatarURL:(parent, args, context, info)=> getAvatarURL(parent.id),
    fullName: (parent, args, context, info) => parent.firstName + ' ' + parent.lastName,
     // NEW:: get a single Company for a given Employee! 
     company: (parent, args, context, info) => getCompanyById(parent.companyId),
     technology: (parent, args, context, info) => getTechnologyById(parent.technologyIds),
     body: (parent, args, context, info) => {       //resolver for body field
      const id = parent.id[parent.id.length - 1]; //manipulating id to give last digit.
      return axios    //GET request through axios call
        .get("https://jsonplaceholder.typicode.com/posts/" + id)
        .then((response) => {
          return response.data.body;
        });
    },
  },
  Company: {
    // NEW:: get the Employees array for a single Company!
    employees: (parent, args, context, info) => getEmployeesByCompanyId(parent.id)
  },

  // resolvers for mutation
  Mutation: {
    updateMessage : (parent, args, context, info) => {
      console.log('Mutation Request:: updateMessage');
      // updating the data variable with new args
      welcomeMessage = args.newMessage; 
      return `'message' field successfully updated with => ${welcomeMessage}`;
    },
    addCompany: (parent, args, context, info) => addANewCompany(args),
    addTechnology: (parent, args, context, info) => addANewTechnology(args),
    generateLuckyNumbers: (parent, args, context, info) => genLucky(),
    addEmployee: (parent, args, context, info) => addANewEmployee(args, pubsub),
  },
  Subscription: {
    getLuckyNo: {
      subscribe: () => pubsub.asyncIterator('GET_LUCKY_NO'),
    },
    employeeAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('EMP_ADDED'),
        (payload, variables) => {
          // based on some logic return true or false
          // incoming payload and incoming subscription field variables can be used to decide true or false.
          // for now, a very simple example:
          console.log("Inside employeeAdded subscription:: withFilter");
          const today = new Date(); 
          today.setHours(0,0,0,0);
          if (today.getDay() === 6 || today.getDay() === 7 ) {
            console.log("Not allowed on Week-ends");
            return false;
          } 
          console.log("Allowed on Week-days");
          return true;
        },
      ),
      // may be used for data transformation
      resolve: (payload) => {
        console.log("Subscription Resolved:: EMP_ADDED", payload);
        return payload;
      }
    }
  },
  };

  /*
Note − We can replace the company.json and employee.json with a RESTful API call,
to retrieve employee/company data or even a real database like MySQL or MongoDB. 
HENCE: GraphQL becomes a thin wrapper around our original application layer to improve performance.
*/
// complex resolvers
// fieldName: (parent, args, context, info) => { return result }
