const myPost = [
    { id:'20110371', name: 'Nguyen Van Hon', titleBlog: 'title', dataBlog: 'this is my post', comment: [] },
    { id: '20110415', name: 'Nguyen Luong Nguyen', titleBlog: 'title', dataBlog: 'this is my post', comment: []},
    { id: '20110386', name: 'Vu Hoang Truc Vy', titleBlog: 'title', dataBlog: 'this is my post', comment: [] }
];
function getAllPost()
{
    return myPost;
}

function getMemberById(id) {
    return myPost.find(member => member.id === id);
  }

function updateModel(updateModel) {
    myPost.length = 0; 
    Array.prototype.push.apply(myPost, updateModel);
    return myPost;
}
function addComment(object, newComment) {
    return object.comment.push(newComment);
}
function addBlog(newBlog) {
    return myPost.push(newBlog);
}
function editBlog(object, id) {
    const blogUpdate = getMemberById(id);
    blogUpdate.id = object.id;
    blogUpdate.name = object.name;
    blogUpdate.titleBlog = object.titleBlog;
    blogUpdate.dataBlog = object.dataBlog;
    return myPost;
}

module.exports = {
    myPost,
    getAllPost,
    getMemberById,
    updateModel,
    addComment,
    addBlog, 
    editBlog
}