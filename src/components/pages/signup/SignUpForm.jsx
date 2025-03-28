import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoChevronForward } from "react-icons/io5";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { useState } from "react";

export default function SignUpForm() {
  const navigate = useNavigate();

  // State pour les champs du formulaire
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
  });

  // Gestion des changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Si la requête réussit, redirigez l'utilisateur vers la page d'accueil
        navigate(`/home`);
      } else {
        // Gérez les erreurs (par exemple, afficher un message d'erreur)
        const errorData = await response.json();
        console.error("Erreur lors de l'inscription :", errorData);
        alert("Erreur lors de l'inscription : " + errorData.message);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur réseau : Veuillez réessayer plus tard.");
    }
  };

  return (
    <SignUpFormStyled action="submit" onSubmit={handleSubmit}>
      <div>
        <h1>Créer un compte</h1>
        <hr />
      </div>

      <div>
        {/* Champ Prénom */}
        <div className="input-with-icon">
          <BsPersonCircle className="icon" />
          <input
            type="text"
            name="firstname"
            placeholder="Prénom"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>

        {/* Champ Nom */}
        <div className="input-with-icon">
          <BsPersonCircle className="icon" />
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        {/* Champ Email */}
        <div className="input-with-icon">
          <AiOutlineMail className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Champ Téléphone */}
        <div className="input-with-icon">
          <AiOutlinePhone className="icon" />
          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Champ Mot de passe */}
        <div className="input-with-icon">
          <RiLockPasswordFill className="icon" />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="button-with-icon">
          <span type="submit">S'inscrire</span>
          <IoChevronForward className="icon" />
        </button>

        <p>
          Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </SignUpFormStyled>
  );
}

const SignUpFormStyled = styled.form`
  text-align: center;
  max-width: 500px;
  min-width: 400px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;

  hr {
    border: 1.5px solid #2087f1;
    margin: 40px 0;
  }

  h1 {
    color: white;
    font-size: 48px;
  }

  .input-with-icon {
    background-color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 18px 24px;
    margin: 18px 0;

    .icon {
      font-size: 15px;
      margin-right: 8px;
      color: #93a2b1;
    }

    input {
      border: none;
      font-size: 15px;
      color: #17161a;
      width: 100%;
    }

    &::placeholder {
      background: white;
      color: lightgrey;
    }
  }

  .button-with-icon {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    white-space: nowrap;
    text-decoration: none;
    line-height: 1;

    padding: 18px 24px;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 800;
    color: white;
    background-color: #2087f1;
    border: 1px solid #2087f1;

    &:hover:not(:disabled) {
      background-color: white;
      color: #2087f1;
      border: 1px solid #2087f1;
      transition: all 200ms ease-out;
    }

    &:active {
      color: white;
      background-color: #2087f1;
      border: 1px solid #2087f1;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      margin-left: 10px;
    }
  }
`;
