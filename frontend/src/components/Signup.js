import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import '../media/css/Signup.css'

// Basic Button Component
function Button({ children, className, type = "button", disabled, onClick }) {
  return (
    <button
      className={`custom-button ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Basic Input Component
function Input({ id, type = "text", value, onChange, placeholder, required }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="custom-input"
    />
  );
}

// Basic Label Component
function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="custom-label">
      {children}
    </label>
  );
}

// Basic Card Component
function Card({ children, className }) {
  return (
    <div className={`custom-card ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return <div className="custom-card-header">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="custom-card-title">{children}</h2>;
}

function CardDescription({ children }) {
  return <p className="custom-card-description">{children}</p>;
}

function CardContent({ children }) {
  return <div className="custom-card-content">{children}</div>;
}

function CardFooter({ children }) {
  return <div className="custom-card-footer">{children}</div>;
}

// Basic Alert Component
function Alert({ children, variant = "destructive" }) {
  const variantStyles = {
    destructive: "custom-alert-destructive",
  };

  return (
    <div className={`custom-alert ${variantStyles[variant]}`}>
      {children}
    </div>
  );
}

function AlertTitle({ children }) {
  return <h3 className="custom-alert-title">{children}</h3>;
}

function AlertDescription({ children }) {
  return <p>{children}</p>;
}

// Basic Toast Hook
function useToast() {
  const toast = ({ title, description, duration = 3000 }) => {
    alert(`${title}: ${description}`);
  };

  return { toast };
}

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      toast({
        title: "Account created",
        description: "You've successfully signed up!",
        duration: 5000,
      });
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="custom-signup-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="custom-signup-card">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create your account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup}>
              <div className="custom-grid">
                <div className="custom-input-group">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="custom-input-group">
                  <Label htmlFor="password1">Password</Label>
                  <Input
                    id="password1"
                    type="password"
                    placeholder="Enter your password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    required
                  />
                </div>
                <div className="custom-input-group">
                  <Label htmlFor="password2">Confirm Password</Label>
                  <Input
                    id="password2"
                    type="password"
                    placeholder="Confirm your password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                  />
                </div>
              </div>
              {error && (
                <Alert className="custom-alert-destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button className="custom-submit-button" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="custom-loader" />
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="custom-footer-text">
              Already have an account?{" "}
              <a href="/login" className="custom-link">
                Log in
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
