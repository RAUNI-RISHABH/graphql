import * as mongoose from 'mongoose'
// mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;
const URL = "mongodb://localhost:27017/TEC_GQL_DB";
const collectionModels = {};
const EmployeeSchema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  jobLevel: { type: Number, required: true },
  fullName: { type: String },
  companyId: String,
  technologyIds: { type: [String], default: [] },
});
////COMPANY SCHEMA ////
const CompanySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});
////TECHNOLOGY SCHEMA ////
const TechnologySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});
export const getEmployeeModel = async ()=>{
  try {
    const db = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (db) {
      //console.log("Database connected..");
      return db.model("Employee", EmployeeSchema);
      
    }
    return collectionModels;
  } catch (err) {
    const error = new Error("Could not connect to database");
    error.status = 500;
    throw error;
  }
}
export const getTechnologyModel = async () => {
  try {
    const db = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (db) {
      //console.log("Database connected..");
      return db.model("Technology", TechnologySchema);
    }
    return collectionModels;
  } catch (err) {
    const error = new Error("Could not connect to database");
    error.status = 500;
    throw error;
  }
};
export const getCompanyModel = async () => {
  try {
    const db = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (db) {
      //console.log("Database connected..");
      return db.model("Company", CompanySchema);
    }
    return collectionModels;
  } catch (err) {
    const error = new Error("Could not connect to database");
    error.status = 500;
    throw error;
  }
};
