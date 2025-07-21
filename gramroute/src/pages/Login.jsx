import { useState } from "react";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      {isLogin ? (
        <div className="min-h-screen flex flex-col items-center mt-20">
          <h1 className="text-2xl font-bold text-center mb-6">
            Login to Gram Route
          </h1>

          <form className="space-y-4">
            <div>
              <label className="block text=sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Your Email"
              />
            </div>

            <div>
              <label className="block text=sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Your Password"
              />
            </div>

            <button
            	type="submit"
							className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium"	
							>
								Sign In
							</button>
          </form>

					<div className="mt-4 text-center">
						<button onClick={() => setIsLogin(false)}
							className="text-blue-600 hover:text-blue-800 text-sm">
								Don't have an account? Sign In
						</button>
					</div>
        </div>
      ) :
				<div className="min-h-screen flex flex-col mt-20 items-center">
					<h1 className="text-2xl font-bold text-center mb-6">
						Register
					</h1>
					<form className="space-y-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email
						</label>
					</form>
					<button onClick={(e) => setIsLogin(true)}>Have an Account?</button>
				</div>
			}
    </>
  );
}

export default Login;
