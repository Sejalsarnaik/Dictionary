import React from 'react';
import Randomword from './Randomword';
import Searchword from './Searchword';


// this component will be basically homepage which divide the page into left and right parts
const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="left col-md-4 d-flex align-items-center justify-content-center">
          <div className="card bg-primary text-white p-3">
            <Randomword />
          </div>
        </div>
        <div className="right col-md-8 mt-5">
          <div className="mt-3 border border-primary p-3 bg-light">
            <Searchword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
