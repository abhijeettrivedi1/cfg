import React from 'react';
import './Feedback.css';

const Feedback = () =>  (
        <div>
            <h1>Feedback</h1>
            <div className="form-box">
                <div className="textup">
                    <i className="fa fa-solid fa-clock"></i> It only takes a minute!!
                </div>
                <form>
                    <label htmlFor="uname">
                        <i className="fa fa-solid fa-user"></i> Name
                    </label>
                    <input type="text" id="uname" name="uname" required />

                    <label htmlFor="email">
                        <i className="fa fa-solid fa-envelope"></i> Email Address
                    </label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="phone">
                        <i className="fa-solid fa-phone"></i> Phone No
                    </label>
                    <input type="tel" id="phone" name="phone" required />

                    <label>
                        <i className="fa-solid fa-face-smile"></i> Do you satisfy with our service?
                    </label>
                    <div className="radio-group">
                        <input type="radio" id="yes" name="satisfy" value="yes" defaultChecked />
                        <label htmlFor="yes">Yes</label>

                        <input type="radio" id="no" name="satisfy" value="no" />
                        <label htmlFor="no">No</label>
                    </div>

                    <label htmlFor="msg">
                        <i className="fa-solid fa-comments" style={{ marginRight: '3px' }}></i> Write your Suggestions:
                    </label>
                    <textarea id="msg" name="msg" rows="4" cols="10" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );


export default Feedback;
