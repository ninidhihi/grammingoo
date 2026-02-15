import React, { useState } from 'react';
import './Feedback.css';
import StarRating from './StarRating';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [visitType, setVisitType] = useState('dine-in');
  const [followUp, setFollowUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      rating,
      comments,
      name,
      email,
      date,
      visitType,
    });
    setRating(0);
    setComments('');
    setName('');
    setEmail('');
    setDate('');
    setVisitType('dine-in');
  };

  return (
    <div className="feedback-container">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="label">rating: </label>
          <StarRating />
        </div>
        <div className="form-field">
          <label className="label">comments: </label>
          <textarea className="textarea" placeholder='enter your comments... ' value={comments} onChange={(e) => setComments(e.target.value)} />
        </div>
        <div className="form-field">
          <label className="label">name: </label>
          <input type="text" placeholder='enter your name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-field">
          <label className="label">email: </label>
          <input type="email" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className="btn" type="submit">submit feedback</button>
      </form>
    </div>
  );
}

export default Feedback;