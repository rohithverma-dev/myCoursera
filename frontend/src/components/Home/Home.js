import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom';
import vg from '../../assets/images/bg.png';


const Home = () => {
    return <section className="home">
        <div className="container">
            <div className='stack' >
                <div className="vstack">
                    <h1 className="custom-heading-2xl">  LEARN FROM THE EXPERTS  </h1>
                    <p className="custom-text-2xl"> Find Valuable Content At Reasonable  </p>
                    <Link to="/courses">
                        <button className='button-lg' > Explore Now </button>
                    </Link>
                </div>
                <img className="vector-graphics" src={vg} alt="Vector Graphics" />
            </div>
        </div>

    </section>
}

export default Home
