import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";

interface IUser {
  displayName: string;
  email: string;
  password: string;
}

export const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user: IUser = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const resp = await createUser(user);

  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu cadastro e compartilhe as suas histórias</p>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            placeholder="Digite seu nome"
            value={displayName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDisplayName(e.target.value)
            }
            required
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Digite sua senha"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
        </label>
        <label>
          <span>Confirmação Senha:</span>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Digite sua senha novamente"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            required
          />
        </label>
        {!loading && <input type="submit" value="Criar" className="btn" />}
        {loading && (
          <input type="submit" value="Aguarde..." disabled className="btn" />
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};
