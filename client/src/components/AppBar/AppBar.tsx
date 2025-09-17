import {Link} from 'react-router-dom'


const AppBar = () => {
    return (
        <div className="bg-slate-500 p-4">
            <Link to="/" className="text-3xl font-medium text-green-400">Music</Link>
        </div>
    );
};

export default AppBar;