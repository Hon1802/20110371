import React, { useState, useEffect } from 'react'
const PostModel = require('../models/MyPost');
const HomePage = () => {
    // { allPost }
    const [newCom, setNewCom] = useState({idCmt:'', contentCmt:''});
    const [allPost, setPostData] = useState([]);
    const [isComponentVisible, setComponentVisibility] = useState(false);
    const [newPost, setNewPost] = useState({inputId:'',inputName:'',inputTitle:'',inputData:''});
    useEffect(() => {
        let allBlogs = PostModel.getAllPost
        setPostData(allBlogs);
      }, []);

    const openComponent =()=>{
        setComponentVisibility(true);
    }
    const closeComponent = () => {
        setComponentVisibility(false);
      };
    const saveNewPost = () => {
        let newBlog = {
            id: newPost.inputId,
            name: newPost.inputName,
            titleBlog: newPost.inputTitle,
            dataBlog: newPost.inputData,
            comment: []
        }
        let objectToUpdate = PostModel.getMemberById(newPost.inputId);
        if (objectToUpdate) {
            window.alert('da ton tai');
        } else {
            PostModel.addBlog(newBlog);
            setPostData(PostModel.getAllPost);
            window.alert('them thanh cong Blog');
        }
        setComponentVisibility(false);
      };
    const handleInputIdChange = (e) => {
        const inputId = e.target.value;
        setNewPost({ ...newPost, inputId });
      };
    const handleInputNameChange = (e) => {
        const inputName = e.target.value;
        setNewPost({ ...newPost, inputName });
      };
    const handleInputTitleChange = (e) => {
        const inputTitle = e.target.value;
        setNewPost({ ...newPost, inputTitle });
      };
      const handleInputDataChange = (e) => {
        const inputData = e.target.value;
        setNewPost({ ...newPost, inputData });
      };
      const handleInputIdCmtChange = (e) => {
        const idCmt = e.target.value;
        setNewCom({ ...newCom, idCmt });
      };
      const handleInputContentCmtChange = (e) => {
        const contentCmt = e.target.value;
        setNewCom({ ...newCom, contentCmt });
      };
    const deletePostFunc = (idPost)=>{
        let indexToDelete = PostModel.getMemberById(idPost);
        // let allPost = PostModel.getAllPost()
        if (indexToDelete !== -1) {
            // Nếu tìm thấy đối tượng, xoá nó khỏi mảng
            let updatedMyPost = allPost.filter((post) => post.id !== idPost);
            console.log(updatedMyPost)
            PostModel.updateModel(updatedMyPost);
            console.log(PostModel.getAllPost)
            setPostData(updatedMyPost);
            window.alert('Xoá đối tượng thành công');
        } else {
            window.alert('Không tìm thấy đối tượng để xoá');
        }
    }
    const addNewComment =(idPost)=>{
        console.log(idPost)
        console.log(newCom)
        if (!newCom.idCmt){
            newCom.idCmt = idPost
        }
        let commentOb = {
            id: newCom.idCmt,
            cmt: newCom.contentCmt
        }
        let objectToUpdate = PostModel.getMemberById(idPost);
        if (objectToUpdate) {
            console.log(objectToUpdate)
            PostModel.addComment(objectToUpdate,commentOb);
            let temp = PostModel.getAllPost()
            console.log(temp)
            setPostData(PostModel.getAllPost());
            window.alert('comment thành công');
        } else {
            console.log('Không tìm thấy đối tượng để comment');
        }
    }
  return (
    <div>
      <div className="create-post">
        <span>Create new post</span>
        <div  style={{ width: '50%' }}>
          <button onClick={openComponent} className="btn btn-secondary" style={{ width: '100%', borderRadius: '10px' }}>
            Create
          </button>
          {isComponentVisible && (
                <div>
                {/* Đây là nơi bạn đặt thành phần bạn muốn hiển thị */}
                    <div >
                        <div class="form-outline">
                            <div class="input-field">
                                <span>ID</span>
                                <input type="text" name="inputId" id="inputId" class="form-control" 
                                    value={newPost.inputId}
                                    onChange={handleInputIdChange}
                                />
                            </div>
                            <div class="input-field">
                                <span>Name</span>
                                <input type="text" name="inputName" id="inputName" class="form-control" 
                                    value={newPost.inputName}
                                    onChange={handleInputNameChange}
                                />
                            </div>
                            <div class="input-field">
                                <span>Title Blog</span>
                                <input type="text" name="inputTitle" id="inputTitle" class="form-control"
                                    value={newPost.inputTitle}
                                    onChange={handleInputTitleChange} />
                            </div>
                            <div class="input-field">
                                <span>Data Blog</span>
                                <textarea class="form-control" name="inputData" id="inputData" rows="4"
                                    value={newPost.inputData}
                                    onChange={handleInputDataChange}
                                ></textarea>
                            </div>
                        </div>
                        <input type="hidden" name="objectId" value="{{id}}"></input>  
                        <div style={{display:'flex'}}>
                            <button onClick={closeComponent} style={{width: '150px', marginRight:'20px'}}>Close</button>  
                            <button onClick={saveNewPost} style={{width: '150px',}}>Save new post</button>  
                        </div>
                        {/* <button type="submit" class="btn btn-secondary" style={{width: '50%', border-radius: '10px', margin-left: '20%'}}>Create</button> */}
                    </div>
                    
                {/* Kết thúc nơi bạn đặt thành phần */}
                </div>
            )}
        </div>
      </div>
      <div>
            
      </div>
      <ul>
        {allPost.map((post) => (
          <li className="style-post" key={post.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 20px' }}>
              <h2 style={{ fontWeight: 500, fontSize: '20px' }}>{post.name}</h2>
              <h2 style={{ fontSize: '15px', fontWeight: 200 }}>ID: {post.id}</h2>
            </div>
            <div className="card">
              <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/184.webp" className="card-img-top" alt="Fissure in Sandstone" />
              <div className="card-body">
                <h5 className="card-title">{post.titleBlog}</h5>
                <p className="card-text">{post.dataBlog}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <form method="POST" action="/edit-post">
                    <input type="hidden" name="objectId" value={post.id} />
                    <button type="submit" className="btn btn-primary">Edit</button>
                  </form>

                  <div >
                    <input type="hidden" name="objectId" value={post.id} />
                    <button onClick={()=>deletePostFunc(post.id)} type="submit" className="delete-button btn btn-primary" style={{ backgroundColor: 'red' }}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="style-comment">
              <ul className="ul-comment">
                {post.comment.map((comment) => (
                  <li key={comment.id}>
                    <span className="col-2" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>{comment.id}</span>
                    <span className="col-9">{comment.cmt}</span>
                  </li>
                ))}
                <div>
                  <input type="hidden" name="objectId" value={post.id} />
                  <li style={{ justifyContent: 'space-between' }}>
                    <input className="col-2 form-control" type="text" style={{width:'150px'}} name="commentId" id="commentId" 
                    placeholder={post.id} 
                    value={newCom.idCmt}
                    onChange={handleInputIdCmtChange}
                    />
                    <input className="col-9 form-control" type="text" style={{width:'700px'}} name="commentText" 
                    id="commentText" 
                    value={newCom.contentCmt}
                    onChange={handleInputContentCmtChange}
                    />
                  </li>
                  <button onClick={()=>addNewComment(post.id)} className="btn btn-primary" style={{ marginTop: '10px' }}>Comment</button>
                </div>
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default HomePage