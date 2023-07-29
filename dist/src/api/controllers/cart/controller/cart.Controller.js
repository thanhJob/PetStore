"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCart = exports.getCart = exports.createCart = exports.getCarts = void 0;
const service_1 = require("../service/service");
async function getCarts(req, res, next) {
    const carts = await (0, service_1.getAll)();
    res.status(200).json({
        status: "Successfully!",
        length: carts.length,
        data: carts,
    });
}
exports.getCarts = getCarts;
async function createCart(req, res, next) {
    const newCart = await (0, service_1.createNewCart)(req);
    res.status(201).json({
        status: "Successfully!",
        data: newCart,
    });
}
exports.createCart = createCart;
async function getCart(req, res, next) {
    try {
        const id = req.params.id;
        const cart = await (0, service_1.getId)(id);
        res.status(200).json({
            status: "Successfully!",
            data: cart,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.getCart = getCart;
async function updateCart(req, res, next) {
    try {
        const id = req.params.id;
        const cart = await (0, service_1.updateId)(id, req.body);
        res.status(203).json({
            status: "Successfully!",
            data: cart,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.updateCart = updateCart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9jb250cm9sbGVycy9jYXJ0L2NvbnRyb2xsZXIvY2FydC5Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLGdEQUE0RTtBQUVyRSxLQUFLLFVBQVUsUUFBUSxDQUM1QixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCO0lBRWxCLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBQSxnQkFBTSxHQUFFLENBQUM7SUFDN0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbkIsTUFBTSxFQUFFLGVBQWU7UUFDdkIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1FBQ3BCLElBQUksRUFBRSxLQUFLO0tBQ1osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVhELDRCQVdDO0FBRU0sS0FBSyxVQUFVLFVBQVUsQ0FDOUIsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQjtJQUVsQixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsdUJBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNuQixNQUFNLEVBQUUsZUFBZTtRQUN2QixJQUFJLEVBQUUsT0FBTztLQUNkLENBQUMsQ0FBQztBQUNMLENBQUM7QUFWRCxnQ0FVQztBQUVNLEtBQUssVUFBVSxPQUFPLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtJQUMzRSxJQUFJO1FBQ0YsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLGVBQUssRUFBQyxFQUFFLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixNQUFNLEVBQUUsZUFBZTtZQUN2QixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQVhELDBCQVdDO0FBRU0sS0FBSyxVQUFVLFVBQVUsQ0FDOUIsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQjtJQUVsQixJQUFJO1FBQ0YsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDekIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLGtCQUFRLEVBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixNQUFNLEVBQUUsZUFBZTtZQUN2QixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQWZELGdDQWVDIn0=