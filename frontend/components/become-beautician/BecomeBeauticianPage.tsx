"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import {
  AvailabilityStep,
  BasicInformationStep,
  PortfolioStep,
  PreviewSubmitStep,
  PricingStep,
  ProfessionalIdentityStep,
  ServicesStep,
  VerificationTrustStep,
  WelcomeStep,
} from "@/components/become-beautician/StepSections";
import { initialState, steps } from "@/components/become-beautician/constants";
import type {
  FormState,
  ServiceRow,
} from "@/components/become-beautician/types";
import {
  formatStartingPrice,
  getStepError,
} from "@/components/become-beautician/utils";
import { FormCard, Stepper } from "@/components/become-beautician/WizardUI";

const LAST_STEP_INDEX = steps.length - 1;

function createServiceRow(): ServiceRow {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    price: "",
    duration: "",
  };
}

type SaveState = "idle" | "saving" | "saved";

export default function BecomeBeauticianPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<FormState>(initialState);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setSaveState("saving");
    const timer = window.setTimeout(() => {
      setSaveState("saved");
    }, 700);

    return () => {
      window.clearTimeout(timer);
    };
  }, [state]);

  const updateState = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setState((previous) => ({ ...previous, [key]: value }));
    setError("");
  };

  const toggleArrayValue = (
    key:
      "languages" | "servicesOffered" | "portfolioCategories" | "workingDays",
    value: string,
  ) => {
    setState((previous) => {
      const values = previous[key];
      const nextValues = values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];

      return { ...previous, [key]: nextValues };
    });
    setError("");
  };

  const mockUpload = (key: keyof FormState, fileName: string) => {
    updateState(key, fileName as FormState[typeof key]);
  };

  const mockAddPortfolio = () => {
    setState((previous) => ({
      ...previous,
      portfolioPhotos: [
        ...previous.portfolioPhotos,
        `portfolio-${previous.portfolioPhotos.length + 1}.jpg`,
      ],
    }));
    setError("");
  };

  const addPricingRow = () => {
    setState((previous) => ({
      ...previous,
      pricing: [...previous.pricing, createServiceRow()],
    }));
  };

  const removePricingRow = (id: string) => {
    setState((previous) => ({
      ...previous,
      pricing:
        previous.pricing.length > 1
          ? previous.pricing.filter((item) => item.id !== id)
          : previous.pricing,
    }));
  };

  const updatePricingRow = (
    id: string,
    key: keyof ServiceRow,
    value: string,
  ) => {
    setState((previous) => ({
      ...previous,
      pricing: previous.pricing.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    }));
    setError("");
  };

  const goToStep = (nextStep: number) => {
    setCurrentStep(Math.max(0, Math.min(nextStep, LAST_STEP_INDEX)));
    setError("");
  };

  const goToNextStep = () => {
    const stepError = getStepError(currentStep, state);

    if (stepError) {
      setError(stepError);
      return;
    }

    goToStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    goToStep(currentStep - 1);
  };

  const handleSkip = () => {
    if (currentStep < LAST_STEP_INDEX) {
      goToStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    const stepError = getStepError(currentStep, state);

    if (stepError) {
      setError(stepError);
      return;
    }

    setSubmitted(true);
    setSaveState("saved");
    setError("");
  };

  const progress = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#FFF9F6_0%,#FFF6F8_100%)] px-3 py-4 sm:px-5 sm:py-6 lg:px-6 lg:py-8">
      <div className="premium-float pointer-events-none absolute left-[-40px] top-0 h-80 w-80 rounded-full bg-[#FFECEF] blur-3xl" />
      <div
        className="premium-float pointer-events-none absolute right-[-120px] top-24 h-96 w-96 rounded-full bg-[#FCE5E9] blur-3xl"
        style={{ animationDelay: "1.2s" }}
      />
      <div
        className="premium-float pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#F7E6E1] blur-3xl"
        style={{ animationDelay: "2.1s" }}
      />

      <div className="premium-reveal-soft relative mx-auto max-w-[1040px] space-y-5 sm:space-y-6">
        <Stepper
          currentStep={currentStep}
          completion={progress}
          onBack={goToPreviousStep}
          onSkip={handleSkip}
        />

        <FormCard
          footer={
            !submitted && currentStep > 0 ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="premium-card inline-flex items-center gap-2 rounded-full border border-[#EAD8DD] bg-white/90 px-4 py-2 text-sm font-medium text-[#6A5560] shadow-sm">
                      <Sparkles className="h-4 w-4 text-[#C12C63]" />
                      {saveState === "saving"
                        ? "Saving draft..."
                        : saveState === "saved"
                          ? "Draft saved"
                          : "Draft idle"}
                    </div>
                    <div className="premium-card rounded-full bg-[#FFF3F6] px-4 py-2 text-sm font-medium text-[#8A1238]">
                      Starting price {formatStartingPrice(state.pricing)}
                    </div>
                  </div>

                  {error ? (
                    <div className="rounded-[14px] border border-[#F2CDD6] bg-[#FFF5F7] px-4 py-2 text-sm text-[#9C264C]">
                      {error}
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="premium-interactive inline-flex items-center justify-center rounded-[16px] border border-[#E9D6DB] bg-white px-5 py-3.5 text-sm font-semibold text-[#6C4A59] transition hover:border-[#D8B0BE] hover:bg-[#FFF9FA]"
                  >
                    Back
                  </button>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      className="premium-interactive inline-flex items-center justify-center rounded-[16px] border border-[#EAD8DD] bg-white px-5 py-3.5 text-sm font-semibold text-[#8A1238] transition hover:bg-[#FFF8FA]"
                    >
                      Save Draft
                    </button>

                    {currentStep === LAST_STEP_INDEX ? (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="premium-interactive inline-flex items-center justify-center rounded-[16px] bg-gradient-to-r from-[#8A1238] to-[#B73362] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(138,18,56,0.18)] transition hover:-translate-y-0.5"
                      >
                        Publish Profile
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={goToNextStep}
                        className="premium-interactive inline-flex items-center justify-center rounded-[16px] bg-gradient-to-r from-[#8A1238] to-[#B73362] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(138,18,56,0.18)] transition hover:-translate-y-0.5"
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : null
          }
        >
          {submitted ? (
            <div className="space-y-8">
              <div className="premium-card premium-reveal mx-auto max-w-[640px] rounded-[28px] border border-[#DCEEDB] bg-[linear-gradient(180deg,#FBFFFC_0%,#F3FFF8_100%)] p-8 text-center shadow-[0_20px_46px_rgba(35,146,90,0.08)]">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9F9EF] text-[#23925A]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#6E8F78]">
                  Profile Submitted
                </p>
                <h2 className="mt-2 text-[2rem] leading-tight text-[#28533A] [font-family:var(--font-playfair-nav,Georgia)]">
                  Your RoopSetu profile is ready for review
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#5F7B69]">
                  You are one step closer to receiving premium beauty bookings
                  from nearby clients.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    className="premium-interactive inline-flex items-center justify-center rounded-[16px] bg-gradient-to-r from-[#8A1238] to-[#C12C63] px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_34px_rgba(138,18,56,0.18)]"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    type="button"
                    className="premium-interactive inline-flex items-center justify-center rounded-[16px] border border-[#ECD9DF] bg-white px-5 py-4 text-sm font-semibold text-[#7A5161]"
                  >
                    Share Profile
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {currentStep === 0 ? (
                <WelcomeStep onStart={goToNextStep} />
              ) : null}
              {currentStep === 1 ? (
                <BasicInformationStep
                  state={state}
                  updateState={updateState}
                  mockUpload={mockUpload}
                />
              ) : null}
              {currentStep === 2 ? (
                <ProfessionalIdentityStep
                  state={state}
                  updateState={updateState}
                />
              ) : null}
              {currentStep === 3 ? (
                <ServicesStep
                  state={state}
                  toggleArrayValue={toggleArrayValue}
                />
              ) : null}
              {currentStep === 4 ? (
                <PortfolioStep
                  state={state}
                  toggleArrayValue={toggleArrayValue}
                  mockAddPortfolio={mockAddPortfolio}
                />
              ) : null}
              {currentStep === 5 ? (
                <PricingStep
                  pricing={state.pricing}
                  onAdd={addPricingRow}
                  onRemove={removePricingRow}
                  onChange={updatePricingRow}
                />
              ) : null}
              {currentStep === 6 ? (
                <AvailabilityStep
                  state={state}
                  updateState={updateState}
                  toggleArrayValue={toggleArrayValue}
                />
              ) : null}
              {currentStep === 7 ? (
                <VerificationTrustStep
                  state={state}
                  updateState={updateState}
                  toggleArrayValue={toggleArrayValue}
                  mockUpload={mockUpload}
                />
              ) : null}
              {currentStep === 8 ? <PreviewSubmitStep state={state} /> : null}
            </>
          )}
        </FormCard>
      </div>
    </main>
  );
}
