// 3. SCHEMA - src/schema.js
// Construct a schema, using GraphQL schema language
// Here we will make Employee schema using the TypeSystem data-types

//   # This "Employee" type defines the queryable fields 
//   # for every employee present in our data source.  
//   type Employee {
//     id: ID!
//     firstName: String
//     lastName: String
//     jobLevel: Int
//   }
//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each.
//   # In this case, the "employees" query returns 
//   # an array of zero or more Employees (defined above).
//   type Query {
//     employees: [Employee]
//     message: String
//   }
// `;
export const typeDefs =`
  # Comments in GraphQL strings start with the hash (#) symbol.
  # This "Employee" type defines the queryable fields for every employee present in our data source.
    type Company {
      id: ID!
      name: String
      description: String
      # new
      employees: [Employee]
      technology: [Technology]
    }
  type Employee {
    id: ID!
    firstName: String
    lastName: String
    # new
    fullName: String
    avatarURL: String
    body:String
    jobLevel: Int
   # companyId: String
    company: Company
    # technologyIds: [String]
    technologies: [Technology]
  }

  type Technology {
  id: ID!
  name: String
  description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. 
  # In this case, the "employees" query returns an array of zero or more Employees (defined above).
  type Query {
    setupDB: String
    employees: [Employee]
    technologies: [Technology]
    companies: [Company]
    message: String
    calculator: String
    add(a: Float!, b: Float!): Float
    employeeById (id:ID!): Employee
    companyById (id:ID!): Company
    technologyById(id:ID!): Technology
  }

  type Mutation {
    updateMessage (newMessage: String!): String!,
    # new
    addCompany(id:String!, name:String!, description: String): Company!,
    addTechnology (id:String! name:String! description: String): Technology!,
    updateTechnology (id:String! name:String! description: String): Technology!,
    updateCompany (id:String! name:String! description: String): Company!,
    addEmployee(firstName:String! lastName:String! jobLevel:Int!) : Employee!
  }
  type Subscription {
    employeeAdded: Employee
  }
`;
