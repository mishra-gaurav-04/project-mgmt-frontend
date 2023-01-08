import mgmt from '../assets/project-mgmt.jpg';

export default function headers() {
  return (
   <nav className='navbar bg-light mb-4 p-0'>
    <div className="container">
        <a className='navbar-brand' href="/">
            <div className="d-flex">
                <img src={mgmt} alt="logo" className='mr-2'/>
                <div>Project Management </div>
            </div>
        </a>
    </div>
   </nav>
  );
};
