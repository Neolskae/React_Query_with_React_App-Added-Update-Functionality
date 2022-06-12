import React from 'react'
import 'boxicons';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getUsers, deleteUser, updateUser, updateEdit } from './helper';
import { useForm } from 'react-hook-form';

export default function Users() {

    const { status, data, isFetching } = useQuery('users', getUsers)
    const { register, handleSubmit, resetField } = useForm();

    const queryClient = useQueryClient();

    const deleteMutation = useMutation(deleteUser, {
        onSuccess: () => queryClient.invalidateQueries('users')
    })

    async function deleteClick(e) {
        console.log("deleteClick");
        if (e.target.dataset.id) {
            await deleteMutation.mutate(e.target.dataset.id);
            console.log("Data Deleted Successfully...!");
        }
    }

    const updateMutation = useMutation(updateUser, {
        onSuccess: () => queryClient.invalidateQueries('users')
    })

    async function updateClick(e) {
        console.log("updateClick");

        const name = document.getElementById('name-input').value;
        const email = document.getElementById('email-input').value;

        console.log("1 Name is", name);
        console.log("1 Email is", email);

        let array = {
            id: e.target.dataset.id,
            name,
            email
        }

        if (e.target.dataset.id) {
            await updateMutation.mutate(array);
            console.log("Data Updated Successfully...!");
        }
    }

    const changeEditMutation = useMutation(updateEdit, {
        onSuccess: () => queryClient.invalidateQueries('users')
    })

    async function updateEditClick(e) {
        console.log("updateEditClick")
        console.log(e.target.dataset.id)


        if (e.target.dataset.id) {
            await changeEditMutation.mutate(e.target.dataset.id);
            console.log("Status Changed Successfully...!");
        }
    }

    return (
        <div className="users grid grid-cols-3 justify-center gap-20">
            {
                isFetching ? <div>Background Updating...</div> : <></>
            }
            {
                (status === "success") ? data.map((v, i) => <UserComponent key={i} data={v} deleteClick={deleteClick} updateClick={updateClick} updateEditClick={updateEditClick}></UserComponent>) : <></>
            }
        </div>
    )
}


function UserComponent({ data, handlerClick, updateClick, updateEditClick, deleteClick }) {
    if (!data) return <></>;
    let flag = data.status === "active" ? 'bg-green-300' : 'bg-gray-300';

    let content = null;
    if (data.isEdit === "no") {
        content = <NotEditButton data={data} updateEditClick={updateEditClick} deleteClick={deleteClick} />
    } else {
        content = <EditButton data={data} updateClick={updateClick} updateEditClick={updateEditClick} />
    }


    return (
        <div data-id={data.id} onClick={handlerClick} className="relative profile py-10 px-5 flex flex-col justify-center items-center text-center gap-4 ">
            <div className="img relative profile">
                <img src={data.imgUrl} className="w-24" alt="" />
                <h5 className={`status ${flag}`}></h5>
            </div>


            {/* <div data-id={data.id} className='w-full h-full absolute'></div> */}
            {content}

        </div>
    )
}

function NotEditButton({ data, updateEditClick, deleteClick }) {
    return (
        <div>
            <div className="details text-gray-600">
                <h1 className='text-md'>{data.name}</h1>
                <h5 className='text-xs'>{data.email}</h5>
            </div>
            <button className='py-2 pt-10' ><box-icon data-id={data.id} onClick={updateEditClick} color="rgb(0 0 0)" name='edit-alt'></box-icon></button>
            <button className='py-2' data-id={data.id} ><box-icon data-id={data.id} onClick={deleteClick} color="rgb(248 113 113)" name='trash'></box-icon></button>

        </div>
    )
}

function EditButton({ data, updateClick, updateEditClick }) {
    return (
        <div>
            <div className="details text-gray-600">
                <input className="border-2 border-slate-900 text-md block" type="text" placeholder={data.name} id="name-input" />
                <input className="border-2 border-slate-900 mt-3 text-md block" type="text" placeholder={data.email} id="email-input" />
            </div>
            <button className='py-2 pt-10' ><box-icon onClick={updateEditClick} data-id={data.id} color="rgb(0 0 0)" name='x'></box-icon></button>
            <button className='py-2' ><box-icon onClick={updateClick} data-id={data.id} color="rgb(248 113 113)" name='check'></box-icon></button>
        </div>
    )
}
