import React from "react";
import { Link } from 'react-router-dom';
import './home.scss'

export default class Home extends React.Component {
  render() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/board">Board</Link>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
            
            
        </div>
    );
  }
}