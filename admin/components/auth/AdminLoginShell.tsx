"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin, storeAdminSession, getStoredAdminToken } from "@/lib/admin-auth";

export default function AdminLoginShell() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getStoredAdminToken()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Enter your admin email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginAdmin(email.trim(), password);
      storeAdminSession(response.token, response.user);
      router.push("/dashboard");
      router.refresh();
    } catch (unknownError) {
      if (unknownError instanceof Error) {
        setError(unknownError.message);
      } else {
        setError("Unable to sign in right now.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-shell">
      <section className="admin-login-layout">
        <aside className="admin-brand-panel">
          <div className="admin-brand-inner">
            <p className="admin-kicker">Admin Dashboard</p>
            <h2>Keep RoopSetu running smoothly.</h2>
            <p className="admin-brand-copy">
              Check onboarding, bookings, and day-to-day activity from one
              simple place.
            </p>
          </div>
        </aside>

        <section className="admin-form-panel">
          <div className="admin-form-content premium-reveal">
            <span className="admin-form-badge">RoopSetu Admin</span>
            <div className="admin-form-head">
              <h1>Sign in</h1>
              <p>Use your work account to open the admin dashboard.</p>
            </div>

            <form className="admin-form-grid" onSubmit={handleSubmit}>
              <label className="admin-field">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@roopsetu.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={loading}
                />
              </label>

              <label className="admin-field">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={loading}
                />
              </label>

              <div className="admin-form-row">
                <label className="admin-check">
                  <input type="checkbox" name="remember" />
                  <span>Remember me</span>
                </label>

                <a href="#" className="admin-link">
                  Forgot password?
                </a>
              </div>

              {error ? <p className="admin-form-error">{error}</p> : null}

              <button
                type="submit"
                className="admin-submit-btn premium-interactive"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="admin-form-note">
              This area is only for the RoopSetu team.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
