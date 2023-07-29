"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileMe = exports.removeActive = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const service_1 = require("../service/service");
async function getUsers(req, res, next) {
    try {
        const users = await (0, service_1.getAll)();
        res.status(200).json({
            status: "Successfully!",
            length: users.length,
            data: users,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.getUsers = getUsers;
async function getUser(req, res, next) {
    try {
        const id = req.params.id;
        const user = await (0, service_1.getId)(id);
        res.status(200).json({
            status: "Successfully!",
            dataL: user,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.getUser = getUser;
async function updateUser(req, res, next) {
    try {
        const id = req.params.id;
        const user = await (0, service_1.updateId)(id, req.body);
        res.status(203).json({
            status: "Successfully!",
            dataL: user,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.updateUser = updateUser;
async function deleteUser(req, res, next) {
    try {
        const id = req.params.id;
        const user = await (0, service_1.deleteId)(id);
        res.status(204).json({
            status: "Successfully!",
            dataL: null,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.deleteUser = deleteUser;
async function removeActive(req, res, next) {
    try {
        const user = await (0, service_1.activeUser)(req);
        res.status(204).json({
            status: "Successfully!",
            dataL: null,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.removeActive = removeActive;
async function updateProfileMe(req, res, next) {
    try {
        const currentUser = await (0, service_1.updateProfile)(req);
        res.status(203).json({
            status: "Successfully!",
            data: currentUser,
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.updateProfileMe = updateProfileMe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwaS9jb250cm9sbGVycy91c2VyL2NvbnRyb2xsZXIvdXNlci5Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUtBLGdEQU80QjtBQUVyQixLQUFLLFVBQVUsUUFBUSxDQUM1QixHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCO0lBRWxCLElBQUk7UUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUEsZ0JBQU0sR0FBRSxDQUFDO1FBRTdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtZQUNwQixJQUFJLEVBQUUsS0FBSztTQUNaLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQWhCRCw0QkFnQkM7QUFDTSxLQUFLLFVBQVUsT0FBTyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7SUFDM0UsSUFBSTtRQUNGLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxlQUFLLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUM7QUFYRCwwQkFXQztBQUVNLEtBQUssVUFBVSxVQUFVLENBQzlCLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0I7SUFFbEIsSUFBSTtRQUNGLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxrQkFBUSxFQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUM7QUFmRCxnQ0FlQztBQUVNLEtBQUssVUFBVSxVQUFVLENBQzlCLEdBQVksRUFDWixHQUFhLEVBQ2IsSUFBa0I7SUFFbEIsSUFBSTtRQUNGLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxrQkFBUSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7QUFDSCxDQUFDO0FBZkQsZ0NBZUM7QUFFTSxLQUFLLFVBQVUsWUFBWSxDQUNoQyxHQUFZLEVBQ1osR0FBYSxFQUNiLElBQWtCO0lBRWxCLElBQUk7UUFDRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsb0JBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixNQUFNLEVBQUUsZUFBZTtZQUN2QixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztLQUNKO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQztBQWRELG9DQWNDO0FBRU0sS0FBSyxVQUFVLGVBQWUsQ0FDbkMsR0FBWSxFQUNaLEdBQWEsRUFDYixJQUFrQjtJQUVsQixJQUFJO1FBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLHVCQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsSUFBSSxFQUFFLFdBQVc7U0FDbEIsQ0FBQyxDQUFDO0tBQ0o7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7QUFDSCxDQUFDO0FBZEQsMENBY0MifQ==