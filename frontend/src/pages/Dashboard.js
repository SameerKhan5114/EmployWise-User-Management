import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/users?page=1', { headers: { Authorization: `Bearer ${token}` } });
      setUsers(data);
    } catch (error) {
      alert('Failed to fetch users');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser({
      id: user.id || user._id,
      first_name: user.firstName || '',
      last_name: user.lastName || '',
      email: user.email || '',
    });
    setShow(true);
  };
  

  const handleUpdate = async () => {
    if (!selectedUser?.id) {
      alert("Error: User ID is missing!");
      return;
    }
    
    try {
      await axios.put(`http://localhost:5000/api/users/${selectedUser.id}`, selectedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShow(false);
      fetchUsers();
    } catch (error) {
      alert('Update failed');
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchUsers();
    } catch (error) {
      alert('Delete failed');
    }
  };

  return (
    <Container>
      <h2 className="my-4">User Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id || user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(user)}>Edit</Button>
                <Button variant="danger" className="ms-2" onClick={() => handleDelete(user.id || user._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={selectedUser?.firstName} onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={selectedUser?.lastName} onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={selectedUser?.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;