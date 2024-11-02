const Category = require("../models/category.model");
module.exports.getCategory = async (parentId) => {
    const getSubCategory = async (parentId) => {
        const subs = await Category.find({
            parent_id: parentId,
            deleted: false
        })

        let allSub = [...subs];
        for(const sub of subs){
            const child = await getSubCategory(sub.id);
            allSub = allSub.concat(child);
        }
        return allSub;
    }
    return await getSubCategory(parentId);
}

