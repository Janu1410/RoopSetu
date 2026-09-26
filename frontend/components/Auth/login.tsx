"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  completeProfile,
  sendOtp,
  storeAuthSession,
  verifyOtp,
  type AuthUser,
  type UserRole,
} from "@/lib/auth";
import HeroDesktopShell from "@/components/home/HeroDesktopShell";

type LoginProps = {
  onClose?: () => void;
  onSuccess?: (user: AuthUser) => void | Promise<void>;
  embedded?: boolean;
};

type LoginStage = "email" | "otp" | "profile" | "success";

const roleOptions: Array<{ label: string; value: UserRole }> = [
  { label: "Client", value: "CLIENT" },
  { label: "Beautician", value: "BEAUTICIAN" },
];

const authHighlights = [
  "Verified beauty professionals",
  "Fast OTP-based sign in",
  "Book and manage services with ease",
];

type FormShellVariant = "mobile" | "desktop";

type SharedFormShellProps = {
  variant: "mobile" | "desktop" | "embedded";
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  heading: string;
  hint: string;
  onClose?: () => void;
  children: ReactNode;
};

function SharedFormShell({
  variant,
  onSubmit,
  heading,
  hint,
  onClose,
  children,
}: SharedFormShellProps) {
  const isDesktop = variant === "desktop";
  const isEmbedded = variant === "embedded";

  let formClassName = "register-card lg:hidden";
  if (isDesktop) {
    formClassName =
      "border border-[#F0E0DE] bg-white p-3 shadow-[0_14px_40px_-28px_rgba(90,0,31,0.45)]";
  } else if (isEmbedded) {
    formClassName = "w-full flex flex-col gap-2";
  }

  const headingEyebrowClassName = isDesktop
    ? "text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#AA7B8A]"
    : "";
  const hintClassName =
    isDesktop || isEmbedded
      ? "mt-1 text-[0.96rem] leading-6 text-[#6F5661]"
      : "auth-subtle-copy";
  const closeButtonClassName =
    isDesktop || isEmbedded
      ? "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#EBD8DD] text-[#8A1238] transition-colors hover:bg-[#FFF5F8]"
      : "register-close";

  return (
    <form className={formClassName} onSubmit={onSubmit}>
      <div
        className={
          isDesktop || isEmbedded
            ? "mb-6 flex items-start justify-between gap-4"
            : "register-head"
        }
      >
        <div>
          {isDesktop ? (
            <p className={headingEyebrowClassName}>{heading}</p>
          ) : null}
          <h2
            className={
              isDesktop || isEmbedded
                ? "mt-1 text-3xl font-semibold text-[#3B2732]"
                : undefined
            }
          >
            {heading}
          </h2>
          <p className={hintClassName}>{hint}</p>
        </div>

        {onClose ? (
          <button
            type="button"
            className={closeButtonClassName}
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : null}
      </div>

      {children}
    </form>
  );
}

export default function Login({
  onClose,
  onSuccess,
  embedded = false,
}: LoginProps) {
  const router = useRouter();
  const [stage, setStage] = useState<LoginStage>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isEmailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase()),
    [email],
  );

  const handleError = (unknownError: unknown, fallbackMessage: string) => {
    if (unknownError instanceof Error && unknownError.message.trim()) {
      setError(unknownError.message);
      return;
    }

    setError(fallbackMessage);
  };

  const requestOtp = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const response = await sendOtp(normalizedEmail);

    setEmail(normalizedEmail);
    setSuccessMessage(response.message || "OTP sent to your email.");
    setStage("otp");
  };

  const handleSendOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!isEmailValid) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await requestOtp();
    } catch (unknownError) {
      handleError(unknownError, "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!otp.trim()) {
      setError("Enter the OTP sent to your email.");
      return;
    }

    if (!/^\d{6}$/.test(otp.trim())) {
      setError("Enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await verifyOtp(email, otp.trim());

      if ("token" in response && response.token) {
        storeAuthSession(response.token, response.user);
        setSuccessMessage("Login successful.");
        setStage("success");

        if (onSuccess) {
          await onSuccess(response.user);
        } else {
          router.push("/");
          router.refresh();
        }

        return;
      }

      setSuccessMessage(response.message || "OTP verified successfully.");
      setStage("profile");
    } catch (unknownError) {
      handleError(unknownError, "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      setError("Fill in first name, last name, and phone number.");
      return;
    }

    if (!role) {
      setError("Select whether you are a client or beautician.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const response = await completeProfile({
        email,
        role,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
      });

      storeAuthSession(response.token, response.user);
      setSuccessMessage(response.message || "Profile created successfully.");
      setStage("success");

      if (onSuccess) {
        await onSuccess(response.user);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (unknownError) {
      handleError(unknownError, "Profile creation failed.");
    } finally {
      setLoading(false);
    }
  };

  const renderStageHint = () => {
    if (!embedded) {
      if (stage === "profile") {
        return "Complete your details to finish creating your account.";
      }

      if (stage === "success") {
        return "Signed in successfully.";
      }

      if (stage === "otp") {
        return `OTP sent to ${email}. Enter it below to continue.`;
      }

      return "Use your email to sign in securely. We will send a one-time code to verify your account.";
    }

    if (stage === "otp") {
      return `OTP sent to ${email}. Enter it below to verify your login.`;
    }

    if (stage === "profile") {
      return "This email is new. Complete your signup details below and we will create your profile.";
    }

    if (stage === "success") {
      return "You are all set. Redirecting to your RoopSetu experience.";
    }

    return "Enter your email to continue. We will send a one-time code to verify your account.";
  };

  const pageTitle =
    stage === "profile"
      ? "Sign Up"
      : stage === "success"
        ? "Welcome to RoopSetu"
        : "Sign In";

  const formSubmitHandler =
    stage === "email"
      ? handleSendOtp
      : stage === "otp"
        ? handleVerifyOtp
        : stage === "profile"
          ? handleCompleteProfile
          : (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  const stageHint = renderStageHint();

  const desktopHeroTitle =
    pageTitle === "Sign Up" ? (
      <>
        Create Your{" "}
        <span className="relative inline-block">
          Perfect Beauty Profile
          <span className="absolute -bottom-2 left-0 h-[4px] w-full rounded-full bg-[#D45B80]" />
        </span>
      </>
    ) : (
      <>
        Book Your{" "}
        <span className="relative inline-block">
          Perfect Beautician
          <span className="absolute -bottom-2 left-0 h-[4px] w-full rounded-full bg-[#D45B80]" />
        </span>
      </>
    );

  const desktopHeroDescription = (
    <p>
      {stage === "otp"
        ? "Your verification code is the last step before you continue to trusted beauty services."
        : stage === "profile"
          ? "Add your details once and start exploring bridal makeup, mehndi, skincare, and salon-at-home experiences."
          : stage === "success"
            ? "Your account is ready and your next beauty session is just a few clicks away."
            : "Sign in with a quick OTP flow and discover verified beauticians, premium services, and a smoother booking journey."}
    </p>
  );

  const renderFormContent = () => (
    <>
      {stage === "email" ? (
        <label className="register-field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={loading}
          />
        </label>
      ) : null}

      {stage === "otp" ? (
        <>
          <label className="register-field">
            <span>Email</span>
            <input value={email} disabled />
          </label>
          <label className="register-field">
            <span>OTP</span>
            <input
              name="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              pattern="[0-9]{6}"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, ""))
              }
              disabled={loading}
            />
          </label>
        </>
      ) : null}

      {stage === "profile" ? (
        <div className="register-grid signup-grid">
          <div className="register-field register-field--full">
            <span>Email</span>
            <input value={email} disabled />
          </div>

          <div className="register-field register-field--full">
            <span>Role</span>
            <div className="role-select-grid">
              {roleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`role-chip ${role === option.value ? "is-active" : ""}`}
                  onClick={() => setRole(option.value)}
                  disabled={loading}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <label className="register-field">
            <span>First Name</span>
            <input
              name="firstName"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Enter first name"
              disabled={loading}
            />
          </label>

          <label className="register-field">
            <span>Last Name</span>
            <input
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Enter last name"
              disabled={loading}
            />
          </label>

          <label className="register-field register-field--full">
            <span>Phone</span>
            <input
              name="phone"
              autoComplete="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
              }
              placeholder="Enter phone number"
              inputMode="tel"
              disabled={loading}
            />
          </label>
        </div>
      ) : null}

      {successMessage ? (
        <p className="auth-feedback auth-feedback--success">{successMessage}</p>
      ) : null}

      {error ? (
        <p className="auth-feedback auth-feedback--error">{error}</p>
      ) : null}

      {stage !== "success" ? (
        <button type="submit" className="register-btn" disabled={loading}>
          {loading
            ? stage === "email"
              ? "Sending OTP..."
              : stage === "otp"
                ? "Verifying OTP..."
                : "Creating Account..."
            : stage === "email"
              ? "Continue"
              : stage === "otp"
                ? "Verify OTP"
                : "Create Account"}
        </button>
      ) : null}

      {stage === "otp" ? (
        <>
          <button
            type="button"
            className="register-btn register-btn--secondary"
            onClick={() => {
              setOtp("");
              setStage("email");
              setSuccessMessage("");
              setError("");
            }}
            disabled={loading}
          >
            Change Email
          </button>
          <button
            type="button"
            className="register-btn register-btn--secondary"
            onClick={async () => {
              setError("");
              setSuccessMessage("");
              setLoading(true);

              try {
                await requestOtp();
              } catch (unknownError) {
                handleError(unknownError, "Failed to resend OTP.");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            Resend OTP
          </button>
        </>
      ) : null}

      {stage === "success" ? (
        <button
          type="button"
          className="register-btn"
          onClick={() => {
            if (onClose) {
              onClose();
            } else {
              router.push("/");
            }
          }}
        >
          Continue
        </button>
      ) : null}
    </>
  );

  return (
    <section
      className={
        embedded
          ? "register-card-wrap"
          : "register-card-wrap register-card-wrap--page"
      }
    >
      {!embedded ? (
        <>
          <div className="lg:hidden">
            <div className="auth-mobile-intro">
              <div className="flex justify-center pb-2">
                <Image
                  src="/roopsetu-logo.png"
                  alt="RoopSetu logo"
                  width={278}
                  height={96}
                  className="h-auto w-[210px] object-contain"
                  priority
                />
              </div>
              <p>
                Secure beauty bookings start with a quick email verification.
              </p>
            </div>
          </div>

          <HeroDesktopShell
            title={desktopHeroTitle}
            description={desktopHeroDescription}
          >
            <SharedFormShell
              variant="desktop"
              onSubmit={formSubmitHandler}
              heading={pageTitle}
              hint={stageHint}
              onClose={onClose}
            >
              {renderFormContent()}
            </SharedFormShell>

            <div className="mt-5 flex flex-wrap gap-2">
              {authHighlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-2 rounded-full border border-[#EDD6DA] bg-white px-3.5 py-1.5 text-sm font-medium text-[#475569]"
                >
                  <span className="h-2 w-2 rounded-full bg-[#D45B80]" />
                  <span>{highlight}</span>
                </span>
              ))}
            </div>

            <div className="auth-step-strip mt-5">
              <span className={stage === "email" ? "is-active" : "is-complete"}>
                Email
              </span>
              <span
                className={
                  stage === "otp"
                    ? "is-active"
                    : stage === "email"
                      ? ""
                      : "is-complete"
                }
              >
                Verify
              </span>
              <span
                className={
                  stage === "profile"
                    ? "is-active"
                    : stage === "success"
                      ? "is-complete"
                      : ""
                }
              >
                Profile
              </span>
            </div>
          </HeroDesktopShell>
        </>
      ) : null}

      <div className={embedded ? "embedded-login-form grid gap-4" : ""}>
        <SharedFormShell
          variant={embedded ? "embedded" : "mobile"}
          onSubmit={formSubmitHandler}
          heading={pageTitle}
          hint={stageHint}
          onClose={onClose}
        >
          {renderFormContent()}
        </SharedFormShell>
      </div>
    </section>
  );
}
