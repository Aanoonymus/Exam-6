import React, { useLayoutEffect, useState } from "react";
import "./Home.scss";
import { Container } from "../../utils";
import { instance } from "../../api";
import { Link } from "react-router-dom";
import { truncate } from "../../helpers/truncate";

import Logo from "../../assets/Ellipse 1.png";

const token = localStorage.getItem("token").split(".")[1];
const tokenatob = JSON.parse(atob(token));
const tokenid = tokenatob.id;

const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState("");

  useLayoutEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await instance("/api/posts");
        setCards(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      console.log(cards);
    };
    fetchCards();

    const renderUserProfile = async () => {
      try {
        const response = await instance.get(`/api/users/${tokenid}`);
        setProfile(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    renderUserProfile();
  }, []);

  return (
    <Container>
      <div className="hero"></div>
      <h1 className="home-title">All articles</h1>
      <div className="home-cards-wrapper">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          cards.map((card) => (
            <Link
              to={`product-view/${card._id}`}
              className="home-card"
              key={card._id}
            >
              <img className="home-card-image" src={card.image} alt="" />
              <h2 className="home-card-title">{truncate(card.title, 30)}</h2>
              <p className="home-card-description">
                {truncate(card.description, 45)}
              </p>
              <div className="user-info">
                <img src={Logo} alt="" />
                <div>
                  <p className="user-info-name">
                    {profile.firstname} {profile.lastname}
                  </p>
                  <p className="sidebar-author">Author</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </Container>
  );
};

export default Home;
