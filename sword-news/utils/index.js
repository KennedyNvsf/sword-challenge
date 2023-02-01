import axios from 'axios';
import jwt_decode from "jwt-decode";


export const createOrGetUser = async (response, addUser) => {

  localStorage.setItem("user", JSON.stringify(response.profileObj));
  const decoded = jwt_decode(response.credential);
  const {name, picture, sub} = decoded;
  
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
    userRole: 'user'

  }
  
  addUser(user);
  await axios.post(`http://localhost:3000/api/auth`, user);
  
};

export const createOrGetAdmin = async (response, addUser) => {

  localStorage.setItem("user", JSON.stringify(response.profileObj));
  const decoded = jwt_decode(response.credential);
  const {name, picture, sub} = decoded;
  
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
    userRole: 'administrator'

  }
  
  addUser(user);
  await axios.post(`http://localhost:3000/api/auth`, user);
  
};