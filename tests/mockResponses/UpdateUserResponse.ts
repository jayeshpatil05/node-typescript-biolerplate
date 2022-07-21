export default (userData) => {
    return  {
        "success": true,
        "message": "User udpated Successfully",
        "data": {
            "password": userData.password,
            "_id": userData._id,
            "email": userData.email,
            "name": userData.name,
            "__v": 0,
            "createdAt": "2022-07-21T13:43:27.873Z",
            "updatedAt": "2022-07-21T13:43:27.873Z"
        }
    }
}