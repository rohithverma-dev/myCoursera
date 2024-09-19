import React, { useEffect } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../../../redux/actions/admin';
import toast from 'react-hot-toast';
import Loader from '../../Layout/Loader/Loader';
import './adminusers.css';

const Users = () => {
  // const users = [
  //     {
  //         _id:"aKAKBAKAKSBHKABCS",
  //         name:"rohit verma",
  //         role:"admin",
  //         subscription:{
  //             status:"active",
  //         },
  //         email:"rv171613@gmail.com",
  //     }
  // ]

  const { users, loading, error, message } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const updateHandler = userId => {
    console.log(userId);
    dispatch(updateUserRole(userId));
  };
  const deleteButtonHandler = userId => {
    console.log(userId);
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, message]);

  return (
    <div
      className="users-grid"
      style={{
        cursor: `url(${cursor}), default`,
      }}
    >
      {loading ? (
        <Loader color="#6B46C1" />
      ) : (
        <div className="users-box" style={{ overflowX: 'auto' }} >
          <h1 className="users-heading">All Users</h1>
          <div style={{ width: '100vw' }}>
            <table style={{ width: '100%', borderCollapse: 'separate' , borderSpacing:'0 20px' }}>
              <thead>
                <tr>
                  <th style={{ flex: 1.5 }}>Id</th>
                  <th style={{ flex: 1 }}>Name</th>
                  <th style={{ flex: 1 }}>Email</th>
                  <th style={{ flex: 1 }}>Role</th>
                  <th style={{ flex: 1 }}>Subscription</th>
                  <th style={{ flex: 1 }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {users &&
                  users.map(item => (
                    <Row
                      updateHandler={updateHandler}
                      deleteButtonHandler={deleteButtonHandler}
                      key={item._id}
                      item={item}
                      loading={loading}
                    />
                  ))}
              </tbody>
            </table>
            <h1
              style={{
                color: '#4A5568',
                textAlign: 'center',
                width: '100%',
                margin: '30px',
              }}
            >
              All available users in the database
            </h1>
          </div>
        </div>
      )}

      <Sidebar />
    </div>
  );
};

export default Users;

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
  return (
    <tr >
      <td>#{item._id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.role}</td>
      <td>
        {item.subscription && item.subscription.status === 'active'
          ? 'Active'
          : 'Not Active'}
      </td>

      <td >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/* <Button
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            Change Role
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button> */}

          <button
            className="users-button-lg"
            onClick={() => updateHandler(item._id)}
          >
            {loading ? <Loader color="#7442E9" /> : 'Change Role'}
          </button>

          <button
            className="users-button-lg"
            onClick={() => deleteButtonHandler(item._id)}
          >
            {loading ? <Loader color="#7442E9" /> : <RiDeleteBin7Fill />}
          </button>
        </div>
      </td>
    </tr>
  );
}
