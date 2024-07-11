import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
  const location = useLocation();
  const { firstName, lastName, email } = location.state || {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  return (
    <div className="profile">
      <h2>Profile Page</h2>
      <p><strong>First Name:</strong> {firstName}</p>
      <p><strong>Last Name:</strong> {lastName}</p>
      <p><strong>Email:</strong> {email}</p>
    </div>
  );
};

export default Profile;
