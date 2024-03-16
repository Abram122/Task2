import { Link, useNavigate } from 'react-router-dom';
import formimg from './Images/Form.png'
import { useState } from 'react';
import axios from 'axios';
const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [status, setStatus] = useState('team')
    const [nameError, setNameError] = useState('User Name is required')
    const [emailError, setEmailError] = useState('Email is required')
    const [passwordError, setPasswordError] = useState('Password is required')
    const [conError, setConError] = useState('')
    const nameregex = /^[a-zA-Z0-9]+$/;
    const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    const navigate = useNavigate('signin')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/adduser', {
            name, email, password , status
        }).then((res) => {
            if (name == '') {
                setNameError('User Name is required')
            } else if (nameregex.test(name)) {
                setNameError('')
            } else {
                setNameError('Invalid First Name')
            }
            if (email == '') {
                setEmailError('Email is required')
            } else if (emailregex.test(email)) {
                setEmailError('')
            } else {
                setEmailError('Invalid Email')
            }
            
            if (password == '') {
                setPasswordError('Password is required')
            } else if (passwordregex.test(password)) {
                setPasswordError('')
            } else {
                setPasswordError('Weak Password')
            }
            if (confirm != password) {
                setConError('Password Not Match')
            } else {
                setConError('')
            }
            if(!nameError && !emailError && !passwordError && !conError ){
                alert(res.data)
                navigate('/signin')
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="signup container-fluid ">
            <div className="row h-100 align-content-center">
                <div className="col-lg-6  flex-column justify-content-center align-items-center form-img h-100 d-lg-flex d-md-none d-sm-none d-none">
                    <div className='img'>
                        <img src={formimg} alt="" />
                        <h2 className='fw-light mt-3 text-light'>Compete With Your Friends</h2>
                    </div>
                </div>
                <div className='col-lg-6 form-data h-100 d-flex flex-column justify-content-center ps-5 pe-5'>
                    <h1>Make An Account</h1>
                    <form action="" className='form'>
                        <div className='form-group'>
                            <label className='form-label'>User Name</label>
                            <input type="text" className='form-control' onChange={(e) => {
                                setName(e.target.value)
                            }} />
                            <p className='text-danger'>{nameError}</p>
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>E-Mail</label>
                            <input type="email" className='form-control' onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                            <p className='text-danger'>{emailError}</p>
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Password</label>
                            <input type="password" className='form-control' onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                            <p className='text-danger'>{passwordError}</p>
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Confirm Password</label>
                            <input type="password" className='form-control' onChange={(e) => {
                                setConfirm(e.target.value)
                            }} />
                            <p className='text-danger'>{conError}</p>
                        </div>
                        <div className='d-flex justify-content-between w-50'>
                        <div className='form-group'>
                            <label className='form-label'>Team</label>
                            <input type="radio" value={"team"} name="status" checked  className='form-check-input ms-3' onChange={(e)=>{
                                setStatus(e.target.value)
                            }}/>
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Indivdual</label>
                            <input type="radio" value={"individual"} name="status" className='form-check-input ms-3' onChange={(e)=>{
                                setStatus(e.target.value)
                            }}/>
                        </div>
                        </div>
                        <div className='mt-3'>
                            <Link to={'/signin'} className='text-decoration-none'>Already Have An Account</Link>
                        </div>
                        <div className='text-center mt-3'>
                            <button className='button-submit w-100' onClick={handleSubmit}>Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;