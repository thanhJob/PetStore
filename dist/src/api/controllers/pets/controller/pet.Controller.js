"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.updatePet = exports.getPet = exports.createPet = exports.getPets = exports.sortProduct = void 0;
// Import Service
const service_1 = require("../service/service");
function sortProduct(req, res, next) {
    req.query.sort = "-price";
    next();
}
exports.sortProduct = sortProduct;
async function getPets(req, res, next) {
    try {
        const pets = await (0, service_1.getAll)(req);
        if (!pets)
            throw new Error("Can't find. Try again!");
        res.status(200).json({
            status: "Successfully!",
            length: pets.length,
            data: pets,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.getPets = getPets;
async function createPet(req, res, next) {
    try {
        const newPet = await (0, service_1.createProduct)(req.body);
        res.status(201).json({
            status: "Successfully!",
            data: newPet,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.createPet = createPet;
async function getPet(req, res, next) {
    try {
        const currentID = req.params.id;
        const pet = await (0, service_1.getId)(currentID);
        res.status(200).json({
            status: "Successfully!",
            dataL: pet,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.getPet = getPet;
async function updatePet(req, res, next) {
    try {
        const currentId = req.params.id;
        const pet = await (0, service_1.updateId)(currentId, req.body);
        res.status(203).json({
            status: "Successfully!",
            dataL: pet,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.updatePet = updatePet;
async function deletePet(req, res, next) {
    try {
        const currentId = req.params.id;
        await (0, service_1.deleteId)(currentId);
        res.status(204).json({
            status: "Successfully!",
            dataL: null,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.deletePet = deletePet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGV0LkNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2NvbnRyb2xsZXJzL3BldHMvY29udHJvbGxlci9wZXQuQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpQkFBaUI7QUFDakIsZ0RBTTRCO0FBSTVCLFNBQWdCLFdBQVcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQ3pFLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztJQUMxQixJQUFJLEVBQUUsQ0FBQztBQUNULENBQUM7QUFIRCxrQ0FHQztBQUVNLEtBQUssVUFBVSxPQUFPLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtJQUMzRSxJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLGdCQUFNLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUk7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFFckQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7QUFDSCxDQUFDO0FBYkQsMEJBYUM7QUFFTSxLQUFLLFVBQVUsU0FBUyxDQUM3QixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCO0lBRWxCLElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsdUJBQWEsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsSUFBSSxFQUFFLE1BQU07U0FDYixDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUM7QUFkRCw4QkFjQztBQUVNLEtBQUssVUFBVSxNQUFNLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtJQUMxRSxJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDaEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFBLGVBQUssRUFBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixNQUFNLEVBQUUsZUFBZTtZQUN2QixLQUFLLEVBQUUsR0FBRztTQUNYLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQVhELHdCQVdDO0FBRU0sS0FBSyxVQUFVLFNBQVMsQ0FDN0IsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQjtJQUVsQixJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDaEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFBLGtCQUFRLEVBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixNQUFNLEVBQUUsZUFBZTtZQUN2QixLQUFLLEVBQUUsR0FBRztTQUNYLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQWZELDhCQWVDO0FBRU0sS0FBSyxVQUFVLFNBQVMsQ0FDN0IsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQjtJQUVsQixJQUFJO1FBQ0YsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDaEMsTUFBTSxJQUFBLGtCQUFRLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUM7QUFmRCw4QkFlQyJ9