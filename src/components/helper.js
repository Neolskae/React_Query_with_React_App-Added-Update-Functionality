
export const getUsers = async () => {
    const data = await fetch(`http://localhost:8080/users`);
    return data.json();
}

// post request
export const createUser = async (postData) => {
    if (!postData) return Promise.reject("PostData is not Provided...!");

    const data = await fetch(`http://localhost:8080/users`, {
        method : "POST",
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify(postData)
        }
    );

    return data.json();

}

// delete request
export const deleteUser = async (userId) => {
    if(!userId) return Promise.reject("userId is not Provided...!");

    const data = await fetch(`http://localhost:8080/users/${userId}`, {
         method: 'DELETE'
    });
    return data;
}

// update request
export const updateUser = async (array) => {
    if (!array) return Promise.reject("UserId is not Provided...!");

    let userData = null;

    await fetch(`http://localhost:8080/users/${array.id}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            userData = data;
        })

    console.log("Name is", array.name)
    console.log("Email is", array.email)

    let newUser = {
        "name": array.name,
        "email": array.email,
        "imgUrl": userData.imgUrl,
        "status": userData.status,
        "id": array.id,
        "isEdit": "no"
    }


    console.log("New User is", newUser)

    const data = await fetch(`http://localhost:8080/users/${array.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    }
    );

    return data.json();
}

export const updateEdit = async (userId) => {
    if (!userId) return Promise.reject("UserId is not Provided...!");

    let userData = null;

    await fetch(`http://localhost:8080/users/${userId}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            userData = data;
        })

    let isEdit = null;
    if(userData.isEdit==="no"){
        isEdit = "yes"
    }else{
        isEdit ="no"
    }

    let newUser = {
        "id": userData.id,
        "name": userData.name,
        "email": userData.email,
        "imgUrl": userData.imgUrl,
        "isEdit": isEdit,
        "status": userData.status,
    }

    console.log("New User is", newUser)

    const data = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    }
    );
    
    return data.json();
}
