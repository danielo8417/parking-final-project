import React from "react";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_@.]{3,33}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,21}$/;

export const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [userS, setUserS] = useState("");
  const [validNameS, setValidNameS] = useState(false);
  const [userSFocus, setUserSFocus] = useState(false);

  const [mobile, setMobile] = useState("");
  const [validMobile, setValidMobile] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = USER_REGEX.test(userS);
    console.log(result);
    console.log(userS);
    setValidNameS(result);
  }, [userS]);

  useEffect(() => {
    console.log(mobile);
    setValidMobile(mobile);
  }, [mobile]);

    useEffect(() => {
    console.log(email);
    setValidEmail(email);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    console.log(result);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, userS, mobile, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Campo incorrecto");
      return;
    }

    const body = {
        "name": user,
        "surname": userS,
        "password": pwd,
        "email": email,
        "telephone": mobile
    }

    let response = await fetch(process.env.BACKEND_URL + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    let json = await response.json();
    console.log(json);
    console.log(user, userS, mobile, email, pwd);
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Succes!</h1>
          <p>
            <a href="/login">Login</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register Form</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Name:
              <span className={validName ? "valid" : "d-none"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "d-none" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <br />
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "d-none"
              }
            >
              <FontAwesomeIcon icon={faCircleInfo} />
              4 a 23 caracteres
              <br />
              Debe empezar con una letra.
              <br />
              Valido letras, numeros y guion bajo.
            </p>
            <br />

            <label htmlFor="surname">
              Surname:
              <span className={validNameS ? "valid" : "d-none"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validNameS || !userS ? "d-none" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <br />
            <input
              type="text"
              id="surname"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUserS(e.target.value)}
              aria-invalid={validNameS ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserSFocus(true)}
              onBlur={() => setUserSFocus(false)}
            />

            <p
              id="uidnote"
              className={
                userSFocus && user && !validNameS ? "instructions" : "d-none"
              }
            >
              <FontAwesomeIcon icon={faCircleInfo} />
              4 a 23 caracteres
              <br />
              Debe empezar con una letra.
              <br />
              Valido letras, numeros y guion bajo.
            </p>
            <br />

            <label htmlFor="mobile">
              Mobile:
              <span className={validMobile ? "valid" : "d-none"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMobile || !user ? "d-none" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <br />
            <input
              type="text"
              id="mobile"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setMobile(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setMobileFocus(true)}
              onBlur={() => setMobileFocus(false)}
            />
            <p
              id="uidnote"
              className={
                mobileFocus && mobile && !validMobile
                  ? "instructions"
                  : "d-none"
              }
            >
              <FontAwesomeIcon icon={faCircleInfo} />
              4 a 23 caracteres
              <br />
              Valido guion y mas - +.
            </p>
            <br />

            <label htmlFor="email">
              Email:
              <span className={validEmail ? "valid" : "d-none"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !user ? "d-none" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <br />
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />

            <br />
            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "d-none"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "d-none" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <br />
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "d-none"}
            >
              <FontAwesomeIcon icon={faCircleInfo} />
              Al menos 6 a 20 caracteres.
              <br />
              Debe de contener mayusculas, minisculas, y un numero obligatorio.{" "}
              <br />
            </p>
            <br />

            <label htmlFor="confirm_pwd">
              Confirm your password:
              <span className={validMatch && matchPwd ? "valid" : "d-none"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "d-none" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <br />
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />

            <p
              id="confirmnote"
              className={matchFocus && !validMatch ? "instructions" : "d-none"}
            >
              Debe ser igual al password.
            </p>
            <br />
            <br />
            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Ya estas registrado?
            <br />
            <span className="line">
              <a href="/login">Login</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};
