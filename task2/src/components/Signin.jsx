import { Link ,useNavigate } from 'react-router-dom';
import formimg from './Images/Form.png'
import { useState } from 'react';
import axios from 'axios';
const Signin = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [emailError, setEmailError] = useState('Email is required')
    const [passwordError, setPasswordError] = useState('Password is required')
    const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    const navigate = useNavigate('/')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/login', {
            email, password
        }).then((res) => {
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
            if( !emailError && !passwordError ){
                localStorage.setItem('userName',res.data.user.name)
                localStorage.setItem('userEmail',res.data.user.email)
                navigate('/')
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="Signin container-fluid ">
            <div className="row h-100 align-content-center">
                <div className="col-lg-6  flex-column justify-content-center align-items-center form-img h-100 d-lg-flex d-md-none d-sm-none d-none">
                        <div className='img'>
                            <img src={formimg} alt="" />
                            <h2 className='fw-light mt-3 text-light'>Compete With Your Friends</h2>
                        </div>
                </div>
                <div className='col-lg-6 form-data h-100 d-flex flex-column justify-content-center ps-5 pe-5'>
                    <h1>Login To Your Account</h1>
                    <form action="" className='form'>
                        <div className='form-group'>
                            <label className='form-label'>E-Mail</label>
                            <input type="email" className='form-control' onChange={(e)=>{
                                setEmail(e.target.value)
                            }}/>
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Password</label>
                            <input type="password" className='form-control' onChange={(e)=>{
                                setPassword(e.target.value)
                            }}/>
                        </div>
                        <div className='mt-3'>
                            <Link to={'/signup'} className='text-decoration-none'>Don't Have An Account</Link>
                        </div>
                        <div className='text-center mt-3'>
                            <button className=' button-submit w-100' onClick={handleSubmit}>Sign up</button>
                        </div>
                    </form>
                </div>  
            </div>
        </div>
    );
}

export default Signin;