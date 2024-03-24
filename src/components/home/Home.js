import React from 'react';
import './Home.css'

const BharathInterData = {
  welcomeMessage: 'Welcome to Bharath Inter Dashboard',
  about:
    'Bharath Inter is a leading educational institution committed to providing high-quality education...',
  internships: [
    {
      title: 'Web Development Internship',
      description:
        'Explore the world of web development with our virtual internship program. Learn HTML, CSS, and JavaScript to build interactive and responsive websites.',
    },
    {
      title: 'MERN Stack Internship',
      description:
        'Dive into the MERN (MongoDB, Express.js, React, Node.js) stack and enhance your skills in building full-stack web applications.',
    },
    {
      title: 'MEAN Stack Internship',
      description:
        'Master the MEAN (MongoDB, Express.js, Angular, Node.js) stack and develop dynamic and scalable web applications.',
    },
    {
      title: 'Data Science Internship',
      description:
        'Embark on a journey into the world of data science. Learn data analysis, machine learning, and gain insights from real-world datasets.',
    },
    {
      title: 'Machine Learning Internship',
      description:
      'Discover the principles of machine learning through our internship. Build and train models for various applications.',
    },
],
imageUrl: 'https://media.licdn.com/dms/image/D560BAQFV0JYJ33yONg/company-logo_200_200/0/1691701552297/bharat_intern_logo?e=2147483647&v=beta&t=-sDv95pGdL1U0O5_PI5teiuiB8D1SVcyswsXm3CE7RU',
};

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <img
        src={BharathInterData.imageUrl}
        alt="Bharath Inter"
        className="image"
        />
        <h1 className="welcome-message">{BharathInterData.welcomeMessage}</h1>
        <p className="about">{BharathInterData.about}</p>
        <div className="internships-container">
          {BharathInterData.internships.map((internship, index) => (
            <div key={index} className="internship-card">
              <h2 className="internship-title">{internship.title}</h2>
              <p className="internship-description">{internship.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
