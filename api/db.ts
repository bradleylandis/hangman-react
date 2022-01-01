import { connect } from "mongoose";

const connectionString: string = process.env.DB_CONNECTION_STRING;

export default connect(connectionString);
