import "./Auth.css";

export const Auth = () => {
  return (
    <div className="body">
      <div className="form-container">
        <form>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" />
          <label htmlFor="mail">Mail</label>
          <input id="mail" type="email" />
          <label htmlFor="password">Password</label>
          <input id="password" type="password" />

          <button className="login-button" type="submit">
            送信
          </button>
        </form>
      </div>
    </div>
  );
};
