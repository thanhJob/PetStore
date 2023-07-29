"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configLogger_1 = require("../configLogger");
const errorMiddleware = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Some thing when wrong!";
    const status = error.status;
    configLogger_1.logger.error(`[ERROR] - StatusCode: ${statusCode} - Msg: ${message} - Status: ${status}`);
    res.status(statusCode).json({
        status,
        message,
    });
};
exports.default = errorMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9lcnJvckhhbmRsZS9taWRkbGV3YXJlL2Vycm9yLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxrREFBeUM7QUFHekMsTUFBTSxlQUFlLEdBQUcsQ0FDdEIsS0FBcUIsRUFDckIsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQixFQUNsQixFQUFFO0lBQ0YsTUFBTSxVQUFVLEdBQVcsS0FBSyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUM7SUFDbkQsTUFBTSxPQUFPLEdBQVcsS0FBSyxDQUFDLE9BQU8sSUFBSSx3QkFBd0IsQ0FBQztJQUNsRSxNQUFNLE1BQU0sR0FBVyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBRXBDLHFCQUFNLENBQUMsS0FBSyxDQUNWLHlCQUF5QixVQUFVLFdBQVcsT0FBTyxjQUFjLE1BQU0sRUFBRSxDQUM1RSxDQUFDO0lBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUIsTUFBTTtRQUNOLE9BQU87S0FDUixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFDRixrQkFBZSxlQUFlLENBQUMifQ==