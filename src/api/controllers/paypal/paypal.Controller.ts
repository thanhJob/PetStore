import { Request, Response, NextFunction } from "express";
import paypal from "paypal-rest-sdk";

export async function paypalFunction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
      "Abmyx3U1L7Bq9MqhpVL5hZoN_IqBSie1ZjYy-cdJFkMYfHvXD1KmC50q-xNZXF875J5DFCmaxZde-rKR",
    client_secret:
      "ENgss7DMM8gLNQ-hbPx5gcZvzyV5jLB_nPytkI_FFiaGLWKBeKFI2LaIQy8zIpxYMgqUMmmN8wSzqinA",
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

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      // const linksPayment = Object.values(payment)[6];
      // if (linksPayment.find((value: any) => value.rel === "approval_url")) {
      //   const href = linksPayment.find(
      //     (value: any) =>
      //       value.href ===
      //       "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-763154438U652862B"
      //   );
      console.log(payment);
    }
  });
}
