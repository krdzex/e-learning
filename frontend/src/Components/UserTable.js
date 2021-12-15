import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, listUsers } from '../ApiService/userApi';
import authHelper from '../Auth/authHelper';

const UserTable = () => {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    useEffect(() => {
        (async function () {
            let users = await listUsers()
            let filtered = users.filter(user => user._id !== authHelper.isAuthentcated()._id)
            setUsers(filtered)
            setFilteredUsers(filtered)
        }())
    }, [])

    const onDeleteClick = async (id) => {
        let result = await deleteUser(id, { admin: true });
        console.log(result)
    }


    const values = useSelector(state => state.filterUserReducer);

    useEffect(() => {
        let usersCopy = users.slice();
        if (values.role === "All" || values.role === "") {
            usersCopy = users.slice();
        } else {
            const newUsers = usersCopy.filter(user => user.role === values.role)
            usersCopy = newUsers
        }

        if (values.firstName !== "") {
            switch (values.firstName) {
                case "A-Z": {
                    usersCopy.sort((a, b) => a.firstName.localeCompare(b.firstName))
                    break
                }
                case "Z-A": {
                    usersCopy.sort((a, b) => a.firstName.localeCompare(b.firstName)).reverse()
                    break
                }
                default: {
                    return ""
                }
            }
        } else if (values.lastName !== "") {
            switch (values.lastName) {
                case "A-Z": {
                    usersCopy.sort((a, b) => a.lastName.localeCompare(b.lastName))
                    break
                }
                case "Z-A": {
                    usersCopy.sort((a, b) => a.lastName.localeCompare(b.lastName)).reverse()
                    break
                }
                default: {
                    return ""
                }
            }
        }
        setFilteredUsers(usersCopy)
    }, [values, users])
    return (
        <div className="table">
            <table>
                <tbody>
                    {filteredUsers.map((user, id) => (
                        <tr key={id}>
                            <td>
                                <img src={process.env.PUBLIC_URL + `/images/${user.img}`} alt="img" />
                            </td>
                            <td>
                                {user.firstName}
                            </td>
                            <td>
                                {user.lastName}
                            </td>
                            <td>
                                {user.email}
                            </td>
                            <td>
                                {user.role === "false" ? "No role" : user.role}
                            </td>
                            <td>
                                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                    <Link to={`/user/${user._id}`}><Icon icon="ci:edit" className="realIcon" style={{ color: "blue" }} /></Link>
                                    <Icon icon="fluent:delete-48-filled" className="realIcon" style={{ color: "red" }} onClick={() => onDeleteClick(user._id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;