"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paypalFunction = void 0;
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
async function paypalFunction(req, res, next) {
    paypal_rest_sdk_1.default.configure({
        mode: "sandbox",
        client_id: "Abmyx3U1L7Bq9MqhpVL5hZoN_IqBSie1ZjYy-cdJFkMYfHvXD1KmC50q-xNZXF875J5DFCmaxZde-rKR",
        client_secret: "ENgss7DMM8gLNQ-hbPx5gcZvzyV5jLB_nPytkI_FFiaGLWKBeKFI2LaIQy8zIpxYMgqUMmmN8wSzqinA",
    });
    const create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: "http://localhost:5000/success",
            cancel_url: "http://localhost:5000/cancel",
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: "item",
                            sku: "001",
                            price: "25.00",
                            currency: "USD",
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: "USD",
                    total: "25.00",
                },
                description: "Test payment function description -_-",
            },
        ],
    };
    paypal_rest_sdk_1.default.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        }
        else {
            const linksPayment = Object.values(payment)[6];
            if (linksPayment.find((value) => value.rel === "approval_url")) {
                const href = linksPayment.find((value) => value.href ==
                    "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-763154438U652862B");
            }
        }
    });
}
exports.paypalFunction = paypalFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5cGFsLkNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2NvbnRyb2xsZXJzL3BheXBhbC9wYXlwYWwuQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxzRUFBcUM7QUFFOUIsS0FBSyxVQUFVLGNBQWMsQ0FDbEMsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQjtJQUVsQix5QkFBTSxDQUFDLFNBQVMsQ0FBQztRQUNmLElBQUksRUFBRSxTQUFTO1FBQ2YsU0FBUyxFQUNQLGtGQUFrRjtRQUNwRixhQUFhLEVBQ1gsa0ZBQWtGO0tBQ3JGLENBQUMsQ0FBQztJQUVILE1BQU0sbUJBQW1CLEdBQUc7UUFDMUIsTUFBTSxFQUFFLE1BQU07UUFDZCxLQUFLLEVBQUU7WUFDTCxjQUFjLEVBQUUsUUFBUTtTQUN6QjtRQUNELGFBQWEsRUFBRTtZQUNiLFVBQVUsRUFBRSwrQkFBK0I7WUFDM0MsVUFBVSxFQUFFLDhCQUE4QjtTQUMzQztRQUNELFlBQVksRUFBRTtZQUNaO2dCQUNFLFNBQVMsRUFBRTtvQkFDVCxLQUFLLEVBQUU7d0JBQ0w7NEJBQ0UsSUFBSSxFQUFFLE1BQU07NEJBQ1osR0FBRyxFQUFFLEtBQUs7NEJBQ1YsS0FBSyxFQUFFLE9BQU87NEJBQ2QsUUFBUSxFQUFFLEtBQUs7NEJBQ2YsUUFBUSxFQUFFLENBQUM7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLFFBQVEsRUFBRSxLQUFLO29CQUNmLEtBQUssRUFBRSxPQUFPO2lCQUNmO2dCQUNELFdBQVcsRUFBRSx1Q0FBdUM7YUFDckQ7U0FDRjtLQUNGLENBQUM7SUFFRix5QkFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxLQUFLLEVBQUUsT0FBTztRQUNqRSxJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sS0FBSyxDQUFDO1NBQ2I7YUFBTTtZQUNMLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0MsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLGNBQWMsQ0FBQyxFQUFFO2dCQUNuRSxNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUM1QixDQUFDLEtBQVUsRUFBRSxFQUFFLENBQ2IsS0FBSyxDQUFDLElBQUk7b0JBQ1YsZ0dBQWdHLENBQ25HLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBMURELHdDQTBEQyJ9