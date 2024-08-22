import React, { useState, useEffect } from 'react';
import axios from 'axios';

function example() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [update, setUpdate] = useState(null)

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://127.0.0.1:8080/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const addUser = () => {
        axios.post('http://127.0.0.1:8080/user', { name, email })
            .then(response => {
                console.log('User created', response.data);
                setUsers([...users, { name, email }]);
                setName('')
                setEmail('')
            })
            .catch(error => {
                console.error('There was an error creating the user!', error);
            });
    };

    const deleteUser = (id) => {
        axios.delete(`http://127.0.0.1:8080/user/${id}`)
            .then(response => {
                console.log('User deleted', response.data);
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the user!', error);
            });
    };

    const updateUser = (id) => {
        if (update) {
        axios.put(`http://127.0.0.1:8080/user/${update.id}`, {name, email})
            .then(response => {
                console.log('User update', response.data);
                setUpdate(users.map(user => user.id === update.id ? {...user, name, email}: user))
                fetchUsers()
                setUpdate(null)
                setName('')
                setEmail('')
            })
            .catch(error => {
                console.log("Update error", error)
            })
        }
    }

    const setHandleUpdate = (user) => {
        setUpdate(user)
        setName(user.name)
        setEmail(user.email)
    }

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                        <button onClick={() => setHandleUpdate(user)}>Edit</button>
                    </li>
                ))}
            </ul>
            <h2>{update ? 'Update user' : 'Delete user'}</h2>
            <input 
                type="text" 
                placeholder="Name" 
                value={name}
                onChange={e => setName(e.target.value)} 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={e => setEmail(e.target.value)} 
            />
            <button onClick={() => update ? updateUser(update.id) : addUser}>
                {update ? 'Update' : 'Add'}
            </button>
        </div>
    );
}

export default example;
