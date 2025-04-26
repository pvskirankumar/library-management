import { Form, useActionData } from "react-router-dom";
import { GoogleAuthPage } from "../pages/GoogleAuthPage";

export const AuthForm = () => {
  const data = useActionData();

  return (
    <div className="h-56 m-auto">
      <dialog open>
        <Form method="post">
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && <p className="text-red-800 dark:text-red-600">{data.message}</p>}
          <p>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </p>
          <span className="actions">
            {<GoogleAuthPage />}
            <button type="submit">Login</button>
          </span>
        </Form>
      </dialog>
    </div>
  );
};

export default AuthForm;