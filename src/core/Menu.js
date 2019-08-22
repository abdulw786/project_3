import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import brand from './brand.jpg';
import './menu.css';


const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };
};

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary" >
                 <Link to="/" className="nav-item">
        <h1 className="nav-item1">Challenger
                </h1>
                    </Link>


            <li className="nav-item2">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home
                </Link>
            </li>

            <li className="nav-item2">
                <Link
                    className="nav-link"
                    style={isActive(history, "/users")}
                    to="/users"
                >
                    Users
                </Link>
            </li>

            <li className="nav-item2">
                <Link
                    to={`/post/create`}
                    style={isActive(history, `/post/create`)}
                    className="nav-link"
                >
                    Create Challenge
                </Link>
            </li>

            {!isAuthenticated() && (
                <>
                    <li className="nav-item2">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Sign In
                        </Link>
                    </li>
                    <li className="nav-item2">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Sign Up
                        </Link>
                    </li>
                </>
            )}

            {isAuthenticated() && isAuthenticated().user.role === "admin" && (
                <li className="nav-item2">
                    <Link
                        to={`/admin`}
                        style={isActive(history, `/admin`)}
                        className="nav-link"
                    >
                        Admin
                    </Link>
                </li>
            )}

            {isAuthenticated() && (
                <>
                    <li className="nav-item2">
                        <Link
                            to={`/findpeople`}
                            style={isActive(history, `/findpeople`)}
                            className="nav-link"
                        >
                            Find People
                        </Link>
                    </li>

                    <li className="nav-item2">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(
                                history,
                                `/user/${isAuthenticated().user._id}`
                            )}
                            className="nav-link"
                        >
                            {`${isAuthenticated().user.name}'s profile`}
                        </Link>
                    </li>

                    <li className="nav-item2">
                        <span
                            className="nav-link"
                            style={
                                (isActive(history, "/signup"),
                                { cursor: "pointer", color: "#fff" })
                            }
                            onClick={() => signout(() => history.push("/"))}
                        >
                            Sign Out
                        </span>
                    </li>
                </>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);