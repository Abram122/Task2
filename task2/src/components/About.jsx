import about1 from "./Images/iconamoon_search-duotone.png"
import about2 from "./Images/Group.png"
import about3 from "./Images/Group (1).png"
import { Link } from "react-router-dom"
const About = () => {
    return (
        <div className="container text-center mt-5">
            <div className="about">
            <p className="about-content">Welcome to College ! We're excited to participate in the prestigious College Competitions
                . Our college fosters a dynamic learning community where students explore passions, engage
                in innovative research, and develop critical thinking skills. Join us as we showcase our
                talent, dedication, and commitment to academic excellence.
                Explore our website to learn more about our programs, faculty, and student achievements.</p>
            <button className="btn-about"><a href="#competition" className="text-decoration-none text-light">Get Started </a></button> 
            </div>
            <div className="about2 mt-4  d-flex justify-content-center gap-3 flex-wrap">
                <div className="p-4 text-start d-flex about-div">
                    <div className="w-auto me-3">
                        <img src={about1} alt="" />
                    </div>
                    <div>
                    <h5>Find An Event</h5>
                    <p>Lorem ipsum dolor sit amet consectetur, </p>
                    <Link className="text-decoration-none">
                    <p className="about-text">GET STARTED</p>
                    </Link>
                    </div>
                </div>
                <div className="p-4 text-start d-flex about-div">
                    <div className="w-auto me-3">
                        <img src={about2} alt="" />
                    </div>
                    <div>
                    <h5>Make A Team</h5>
                    <p>Lorem ipsum dolor sit amet consectetur, </p>
                    <Link className="text-decoration-none">
                    <p className="about-text">GET STARTED</p>
                    </Link>
                    </div>
                </div>
                <div className="p-4 text-start d-flex about-div">
                    <div className="w-auto me-3">
                        <img src={about3} alt="" />
                    </div>
                    <div>
                    <h5>Compete With Others</h5>
                    <p>Lorem ipsum dolor sit amet consectetur, </p>
                    <Link className="text-decoration-none">
                    <p className="about-text">GET STARTED</p>
                    </Link>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default About;