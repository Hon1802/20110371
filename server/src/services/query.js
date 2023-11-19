const PAGE_NUMBER = 1;
const PAGE_LIMIT =0;
const getPagination = async(query)=>{
    const page = Math.abs(query.page) || PAGE_NUMBER;
    const limit = Math.abs(query.limit) || PAGE_LIMIT;
    const skip = (page-1)*limit;
    return{
        skip,
        limit
    };
}
module.exports={
    getPagination
};