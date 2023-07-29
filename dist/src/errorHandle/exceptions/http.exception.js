"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpsException extends Error {
    path;
    value;
    status;
    message;
    statusCode;
    isOperational;
    constructor(statusCode, message, path, value, isOperational = true) {
        super(message);
        this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
        this.statusCode = statusCode;
        this.message = message;
        this.path = path;
        this.value = value;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.default = HttpsException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5leGNlcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZXJyb3JIYW5kbGUvZXhjZXB0aW9ucy9odHRwLmV4Y2VwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sY0FBZSxTQUFRLEtBQUs7SUFDekIsSUFBSSxDQUFTO0lBQ2IsS0FBSyxDQUFTO0lBQ2QsTUFBTSxDQUFTO0lBQ2YsT0FBTyxDQUFTO0lBQ2hCLFVBQVUsQ0FBUztJQUNuQixhQUFhLENBQVU7SUFDOUIsWUFDRSxVQUFrQixFQUNsQixPQUFlLEVBQ2YsSUFBWSxFQUNaLEtBQWEsRUFDYixhQUFhLEdBQUcsSUFBSTtRQUVwQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNqRSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUVuQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBRUQsa0JBQWUsY0FBYyxDQUFDIn0=