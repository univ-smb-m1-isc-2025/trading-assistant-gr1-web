import {useState} from "react";

export default function LoginPage() {
  // state
  const [inputEmail, setInputEmail] = useState('');

  // comportement
  const handleSubmit = (evt) => {
    evt.preventDefault()
    alert(`Bonjour ${inputEmail}`)
    setInputEmail("")
  }

  const handleChange = (evt) => {
    setInputEmail(evt.target.value)
  }

  // render
  return <div>
    <h1>Connexion</h1>

    <form action="submit" onSubmit={handleSubmit}>

      <input
        value={inputEmail}
        onChange={handleChange}
        type="text"
        placeholder="Email"
      />

      <input
        type="password"
        placeholder="Password"
        required
      />

      <button type="submit">Login</button>
    </form>

  </div>
}
