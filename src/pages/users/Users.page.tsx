import { useEffect, useState } from "react"
import { createRandomUser } from "../../shared/utils"
import { IUser } from "../../shared/models"
import { Modal } from "../../shared/components/modal";
import { USER_DEFAULT_VALUE } from "../../features/user";
import { UsersForm } from "../../features/user/components";
import { faker } from "@faker-js/faker";

export const UsersPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [user, setUser] = useState<IUser>(USER_DEFAULT_VALUE);

    const handleClickAdd = () => {
        setIsModalOpen(true);
        setModalTitle("Create new User");
        setUser(USER_DEFAULT_VALUE);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleClickEdit = (user: IUser) => {
        setModalTitle("Update User")
        setIsModalOpen(true);
        setUser(user);
    }

    const onSuccess = (value: IUser) => {
        if(value.id) {
            setUsers(users.map((user) => {
                if(user.id === value.id) {
                    return value
                }
                return user
            }))
        } else {
            setUsers([
                ...users,
                {
                    ...value,
                    id: faker.string.uuid()
    
                }
            ]);
        }
        setIsModalOpen(false);
        alert("Saved!")
    }

    const handleUserDelete = (userId: string) => {
        if(confirm("Confirm Delete")) {
            const res = users.filter((user) => user.id !== userId);
            setUsers(res);
        }
    }
    
    // generate fake data
    useEffect(() => {
        const arr = [];
        for(let i=0; i<5; i++) {
            const user = createRandomUser();
            arr.push(user);
        }

        setUsers(arr);
    }, [])
    
    return (
        <div className="p-5">
            <div className="mb-5 flex item-center justify-between">
                <h2 className="text-2xl font-semibold">Users</h2>
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={handleClickAdd}   
                    data-modal-target="crud-modal" data-modal-toggle="crud-modal" 
                >
                    Add
                </button>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs uppercase bg-gray-200 text-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Birth Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Language
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Language
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr className="bg-white border-b" key={user.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        { user.name }
                                    </th>
                                    <td className="px-6 py-4">
                                        { user.username }
                                    </td>
                                    <td className="px-6 py-4">
                                        { user.birthDate }
                                    </td>
                                    <td className="px-6 py-4">
                                        { user.country ?? "-" }
                                    </td>
                                    <td className="px-6 py-4">
                                        { user.language ?? "-" }
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" onClick={() => handleClickEdit(user)} className="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        <a href="#" onClick={() => handleUserDelete(user.id as string)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                isModalOpen && (
                    <Modal 
                        modalId={"crud-modal"}
                        title={modalTitle}
                        onClose={handleCloseModal}
                    >
                        <UsersForm
                            defaultValues={user}
                            onSuccess={onSuccess} 
                        />
                    </Modal>
                )
            }
        </div>
    )
}