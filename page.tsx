"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PARTICIPANT",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "Center",
      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      fontFamily: "system-ui, sans-serif",
      color: "#f8fafc",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        padding: "32px",
        backgroundColor: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#818cf8", margin: "0 0 8px 0" }}>
            Join the Hackathon
          </h2>
          <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0 }}>
            Create your account to register teams and build projects
          </p>
        </div>

        {error && (
          <div style={{
            padding: "10px",
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid #ef4444",
            color: "#fca5a5",
            borderRadius: "8px",
            fontSize: "14px",
            textAlign: "center",
            marginBottom: "16px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", color: "#cbd5e1", marginBottom: "6px" }}>Full Name</label>
            <input
              type="text"
              required
              placeholder="Alex Paul"
              style={{
                width: "100%",
                padding: "10px 14px",
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
                boxSizing: "border-box",
                outline: "none"
              }}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", color: "#cbd5e1", marginBottom: "6px" }}>Email Address</label>
            <input
              type="email"
              required
              placeholder="alex@example.com"
              style={{
                width: "100%",
                padding: "10px 14px",
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
                boxSizing: "border-box",
                outline: "none"
              }}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", color: "#cbd5e1", marginBottom: "6px" }}>Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "10px 14px",
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
                boxSizing: "border-box",
                outline: "none"
              }}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", color: "#cbd5e1", marginBottom: "6px" }}>Account Role</label>
            <select
              style={{
                width: "100%",
                padding: "10px 14px",
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#fff",
                boxSizing: "border-box",
                outline: "none"
              }}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="PARTICIPANT">Participant (Hacker)</option>
              <option value="ORGANIZER">Organizer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              padding: "12px",
              background: "linear-gradient(to right, #6366f1, #a855f7)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px"
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "14px", color: "#94a3b8", marginTop: "20px" }}>
          Already registered?{" "}
          <Link href="/login" style={{ color: "#818cf8", textDecoration: "none", fontWeight: "500" }}>
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}