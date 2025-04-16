import { Key, Mail } from "lucide-react";
import { login } from "./actions";
import TopBar from "@/components/landing/TopBar";

export default function LoginPage() {
  return (
    <>
      <TopBar />
      <div className="hero bg-base-200 min-h-screen">
        <form>
          <div className="card w-96 bg-base-100 shadow-xl mx-auto -mt-64">
            <div className="card-body">
              <h2 className="card-title">Acessar Dashboard</h2>
              <div className="items-center mt-2">
                <label className="input input-bordered flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 opacity-70" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="grow"
                    required
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-2">
                  <Key className="w-5 h-5 opacity-70" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="grow"
                    required
                  />
                </label>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary w-full" formAction={login}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
