const dotenv = require('dotenv');
const path = require('path');
if (process.env.NODE_ENV !== "development") {
    process.env.NODE_ENV = "production"
}

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});
process.isDevelopment = !(process.isProduction = (process.env.NODE_ENV === "production"));
