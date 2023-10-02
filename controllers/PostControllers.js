const PostModel = require('../models/MyPost');

function getIndex(req, res) {
    const allPost = PostModel.getAllPost()
    // Sử dụng map để trích xuất tất cả giá trị trong thuộc tính 'comment'
    const allComments = allPost.map(post => post.comment);
    // Sử dụng flat() để nối các mảng con thành một mảng duy nhất
    const flattenedComments = allComments.flat();
    // Hiển thị mảng các giá trị trong thuộc tính 'comment'
    res.render('home',{ title: 'Home Page', allPost } );
}
function deleteIndex(req, res) {
    const objectIdToDelete = req.body.objectId;
    
// Tìm vị trí của đối tượng có ID trùng khớp
    const indexToDelete = PostModel.getMemberById(objectIdToDelete);
    const allPost = PostModel.getAllPost()
    if (indexToDelete !== -1) {
        // Nếu tìm thấy đối tượng, xoá nó khỏi mảng
        const updatedMyPost = allPost.filter((post) => post.id !== objectIdToDelete);
        PostModel.updateModel(updatedMyPost);
        console.log('Xoá đối tượng thành công');
    } else {
        console.log('Không tìm thấy đối tượng để xoá');
    }
    res.redirect('/post/');
  }

function addComment(req, res) {
    const objectIdToComment = req.body.objectId ;
    const IdComment = req.body.commentId ? req.body.commentId : (req.body.objectId);
    const textComment = req.body.commentText;
    console.log(objectIdToComment, IdComment, textComment)
    const commentOb = {
        id: IdComment,
        cmt: textComment
    }
// // Tìm vị trí của đối tượng có ID trùng khớp
    const objectToUpdate = PostModel.getMemberById(objectIdToComment);
    if (objectToUpdate) {
        console.log(objectToUpdate)
        PostModel.addComment(objectToUpdate,commentOb);
        console.log('comment thành công');
    } else {
        console.log('Không tìm thấy đối tượng để comment');
    }
    res.redirect('/post/');
  }

function createPost(req, res) {
    res.render('create',{ title: 'Create Post Page' } );
}
function editPost(req, res) {
    const objectId = req.body.objectId;
    const indexObject = PostModel.getMemberById(objectId);
    console.log(indexObject)
    res.render('edit',{ title: 'Edit Post Page', indexObject } );
}


function createPostDetail(req, res) {
    const objectId = req.body.inputId;
    const Name = req.body.inputName;
    const inputTitle = req.body.inputTitle;
    const inputData = req.body.inputData;
    const newBlog = {
        id: objectId,
        name: Name,
        titleBlog: inputTitle,
        dataBlog: inputData,
        comment: []
    }
// // Tìm vị trí của đối tượng có ID trùng khớp
    const objectToUpdate = PostModel.getMemberById(objectId);
    if (objectToUpdate) {
        console.log('da ton tai thành công');
    } else {
        PostModel.addBlog(newBlog);
        console.log('add thanh cong comment');
    }
    res.redirect('/post/');
  }

function editPostDetail(req, res) {
    const objectId = req.body.objectId;
    const Name = req.body.inputName;
    const inputTitle = req.body.inputTitle;
    const inputData = req.body.inputData;
    const newBlog = {
        id: objectId,
        name: Name,
        titleBlog: inputTitle,
        dataBlog: inputData,
        comment: []
    }
    console.log(newBlog)
    const objectToUpdate = PostModel.getMemberById(objectId);
    if (objectToUpdate) {
        PostModel.editBlog(newBlog, objectId);
    } else {
        console.log('khong thanh cong ');
    }
    res.redirect('/post/');
  }
module.exports ={
    getIndex,
    deleteIndex,
    addComment,
    createPost,
    createPostDetail, 
    editPost,
    editPostDetail
}