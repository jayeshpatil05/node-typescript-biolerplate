export default (userData,id) => {
    return  {
        "success": true,
        "message": "User created Successfully",
        "data": [
            {
                "password": userData.password,
                "_id": id,
                "email": userData.email,
                "name": userData.name,
                "__v": 0,
                "createdAt": "2022-07-21T13:20:16.933Z",
                "updatedAt": "2022-07-21T13:20:16.933Z"
            }
        ]
    }
}