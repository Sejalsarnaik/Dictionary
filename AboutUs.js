import React from "react";
import image1 from "./database.jpg";
import image2 from "./word.png";
import image3 from "./pronaunciation.jpg";

//this component is about us page i have created link for about in navbar
const AboutUs = () => {
  return (
    <div className="container bg-warning">
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <h1 className="display-4 text-center">About Us</h1>
          <p className="text-center text-bg-danger">Welcome to our Dictionary App!</p>

          {/* who we are */}
          <blockquote className="blockquote text-center">
            <h3>Who We Are</h3>
          </blockquote>
          <p className="text-justify text-white">
            At Dictionary App, we are passionate about words and language. Our
            team of dedicated linguists and developers work tirelessly to bring
            you a comprehensive and user-friendly dictionary app that helps you
            explore the vast world of language.
          </p>

          {/* what we offer */}
          <blockquote className="blockquote text-center">
            <h3>What We Offer</h3>
          </blockquote>
          <div className="d-flex flex-row justify-content-between">
            <div className="card mr-3" style={{ width: "13rem" }}>
              <img src={image1} className="card-img-top img-fluid" alt="Card 1" />
              <div className="card-body class">
                <p className="card-text">
                  Our dictionary app contains an extensive collection of words,
                  from everyday vocabulary to specialized terms across various
                  fields and disciplines.
                </p>
              </div>
            </div>

            <div className="card mr-3" style={{ width: "13rem" }}>
              <img src={image2} className="card-img-top img-fluid" alt="Card 2" />
              <div className="card-body">
                <p className="card-text">
                  Learn a new word every day with our "Word of the Day" feature, expanding your language knowledge bit by bit.
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "13rem" }}>
              <img src={image3} className="card-img-top img-fluid" alt="Card 3" />
              <div className="card-body">
                <p className="card-text">
                  Listen to the correct pronunciation of words, ensuring you say them accurately.It is Definatly going to be helpful to get the actual pronaunciation of word.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
