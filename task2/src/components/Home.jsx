import About from "./About";
import Competion from "./Competinon";
import Landing from "./Landing";

const Home = () => {
    return (
        <div className="Home">
            <Landing/>
            <About/>
            <Competion/>
        </div>
    );
}

export default Home;