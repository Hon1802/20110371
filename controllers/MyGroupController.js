const MyGroupModel = require('../models/MyGroup');

function getIndex(req, res) {
    if(req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(MyGroupModel));
    }
}

function getMSSV(req, res) {
    const { MSSV, id } = req.params;
    if (id) {
        console.log(MSSV, id)
        const student = MyGroupModel.getMemberById(id);
        if (student) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(student));
        } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not valid');
        }
    }
}

function postMSSV(req, res) {
    const { MSSV, id } = req.params;
    let body = {
        id: id
    };
    const isMemberExist = MyGroupModel.isMemberExist(body.id);
    if (isMemberExist) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Not valid');
    } else {
        MyGroupModel.addMember(body)
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(body));
    }
}

function getMessage(req, res) {
    const { id } = req.params;
    if (id ) {
        try{
            const student = MyGroupModel.getMemberById(id);
            if (student) {
                console.log('value id' ,id)
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<html>
                            <body>
                                <ul>
                                    <li>${student.name}</li>
                                </ul>
                            </body>
                        </html>`);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not valid');
            }
        }catch(e)
        {
            res.status(400).send('Not valid');
        }
    } else 
    {
        console.log('eee')
        const studentList = MyGroupModel.getAllMember();
        res.writeHead(200, 
            { 
                'Content-Type': 'text/html' 
            });
        res.end(`<html>
                    <body>
                        <ul>${studentList}</ul>
                    </body>
                </html>`);
    }

}

module.exports = {
  getIndex,
  getMSSV,
  postMSSV,
  getMessage,
}
