import { Route, Routes } from 'react-router-dom';
// home and forms 
import Home from './components/Home'
import Signup from './components/Singup';
import Signin from './components/Signin';
import CompettitionAll from './components/CompetionAll';
// Admin part 
import Admin from './components/admin';
import AddEvent from './components/AddEvent';
import AddCompe from './components/AddCompetition';
import AddScore from './components/AddScore';
import Dashboard from './components/Dashboard';
import AddTeam from './components/AddTeam';
import AddAdmin from './components/AddAdmin';
import Register from './components/Register';
import Rank from './components/Rank';
import AllCompetitions from './components/AllCompotetion';
const App = () => {
    return (
        <div>
            <Routes>
                {/* home and forms  */}
                <Route path='/' Component={Home}/>
                <Route path='/allevents/:id' Component={CompettitionAll}/>
                <Route path='/allcompetitions/' Component={AllCompetitions}/>
                <Route path='/signup' Component={Signup}/>
                <Route path='/signin' Component={Signin}/>
                <Route path='/register/:name' Component={Register}/>
                <Route path='/rank/:name' Component={Rank}/>
                {/* admin part  */}
                <Route path='/admin' Component={Admin}/>
                <Route path='/dashboard' Component={Dashboard}/>
                <Route path='/addcompetition' Component={AddCompe}/>
                <Route path='/addevent' Component={AddEvent}/>
                <Route path='/addscore' Component={AddScore}/>
                <Route path='/AddTeam' Component={AddTeam}/>
                <Route path='/Addadmin' Component={AddAdmin}/>
            </Routes>
        </div>
    );
}

export default App;