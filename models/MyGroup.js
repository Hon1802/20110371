
const myGroup = [
    { id: '20110371', name: 'Nguyen Van Hon' },
    { id: '20110415', name: 'Nguyen Luong Nguyen' },
    { id: '20110386', name: 'Vu Hoang Truc Vy' }
];

function getMemberById(id) {
  return myGroup.find(member => member.id === id);
}
function isMemberExist(id)
{
    return myGroup.some(member => member.id === id)
}
function addMember(body)
{
    return myGroup.push(body)
}

function getAllMember(body)
{
    return myGroup.map(member => member.name)
}

module.exports = {
    myGroup,
    getMemberById,
    isMemberExist,
    addMember,
    getAllMember
}