"use client";

import type { ReactNode } from "react";
import {
  Award,
  Camera,
  Clock3,
  FileBadge,
  ImagePlus,
  Link2,
  MapPin,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  categoryOptions,
  languageOptions,
  portfolioCategoryOptions,
  serviceRadiusOptions,
  workingDayOptions,
} from "@/components/become-beautician/constants";
import {
  CheckboxChip,
  FieldGroup,
  PricingTable,
  SectionIntro,
  SelectBox,
  TextArea,
  TextInput,
  ToggleCard,
  UploadBox,
} from "@/components/become-beautician/WizardUI";
import type {
  FormState,
  ServiceRow,
} from "@/components/become-beautician/types";
import { formatStartingPrice } from "@/components/become-beautician/utils";

type UpdateState = <K extends keyof FormState>(
  key: K,
  value: FormState[K],
) => void;

type ToggleArrayValue = (
  key: "languages" | "servicesOffered" | "portfolioCategories" | "workingDays",
  value: string,
) => void;

const trustFacts = [
  "3-5 minute setup",
  "Get discovered nearby",
  "Receive bookings",
  "Grow your business",
];

function StepBody({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={
        wide
          ? "mx-auto max-w-[920px] space-y-6 sm:space-y-8"
          : "mx-auto max-w-[820px] space-y-6 sm:space-y-8"
      }
    >
      {children}
    </div>
  );
}

export function WelcomeStep({ onStart }: { onStart: () => void }) {
  return (
    <StepBody wide>
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8">
        <div>
          <SectionIntro
            title="Become a RoopSetu Partner"
            description="Create your professional profile and start receiving bookings from nearby clients."
          />

          <div className="mt-6 grid gap-3 sm:mt-7 sm:gap-3.5">
            {trustFacts.map((fact) => (
              <div
                key={fact}
                className="flex items-center gap-3 rounded-[18px] border border-[#F1DDE2] bg-white/90 px-4 py-3 text-[0.92rem] font-medium text-[#6D5561] shadow-[0_10px_20px_rgba(90,0,31,0.04)] sm:py-3.5 sm:text-[1rem]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF0F5] text-[#B73A67]">
                  <Sparkles className="h-4 w-4" />
                </span>
                {fact}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onStart}
            className="mt-8 inline-flex w-full items-center justify-center rounded-[16px] bg-gradient-to-r from-[#8A1238] to-[#C12C63] px-7 py-4 text-[0.95rem] font-semibold text-white shadow-[0_20px_36px_rgba(138,18,56,0.2)] transition hover:-translate-y-0.5 sm:mt-9 sm:w-auto sm:text-[1rem]"
          >
            Start Profile Setup
          </button>
        </div>

        <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(160deg,#FFF5F8_0%,#FDE9EF_55%,#F8DDD9_100%)] p-5 shadow-[0_20px_40px_rgba(90,0,31,0.08)] sm:rounded-[28px] sm:p-7 sm:shadow-[0_28px_60px_rgba(90,0,31,0.08)]">
          <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-white/60 blur-3xl" />
          <div className="relative space-y-6">
            <div className="max-w-sm">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#B06E83]">
                Premium Profile Setup
              </p>
              <h3 className="mt-3 text-[1.65rem] leading-tight text-[#5A001F] [font-family:var(--font-playfair-nav,Georgia)] sm:text-[2rem]">
                Join RoopSetu and grow your beauty business
              </h3>
              <p className="mt-3 text-[0.94rem] leading-6 text-[#7B6872] sm:text-[1rem] sm:leading-7">
                One polished onboarding flow designed to help beauticians look
                trusted, premium, and ready for bookings.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[20px] bg-white/90 p-4 shadow-[0_12px_24px_rgba(90,0,31,0.05)]">
                <p className="text-2xl font-semibold text-[#8A1238]">10k+</p>
                <p className="mt-2 text-[0.9rem] text-[#77646D] sm:text-[0.98rem]">
                  Monthly client searches
                </p>
              </div>
              <div className="rounded-[20px] bg-white/90 p-4 shadow-[0_12px_24px_rgba(90,0,31,0.05)]">
                <p className="text-2xl font-semibold text-[#8A1238]">4.8/5</p>
                <p className="mt-2 text-[0.9rem] text-[#77646D] sm:text-[0.98rem]">
                  Average profile trust score
                </p>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#2E111C] px-5 py-6 text-white shadow-[0_24px_40px_rgba(46,17,28,0.24)]">
              <p className="text-[0.9rem] font-medium text-white/75 sm:text-[0.98rem]">
                Estimated setup time
              </p>
              <p className="mt-2 text-3xl font-semibold">3-5 Minutes</p>
            </div>
          </div>
        </div>
      </div>
    </StepBody>
  );
}

export function BasicInformationStep({
  state,
  updateState,
  mockUpload,
}: {
  state: FormState;
  updateState: UpdateState;
  mockUpload: (key: keyof FormState, fileName: string) => void;
}) {
  return (
    <StepBody>
      <SectionIntro
        title="Let's start with the basics"
        description="Add your basic details to get started."
      />

      <div className="mx-auto max-w-[220px] sm:max-w-[240px]">
        <button
          type="button"
          onClick={() => mockUpload("profilePhoto", "priya-profile.jpg")}
          className="group w-full"
        >
          <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(160deg,#FDE3EB_0%,#F7DDE2_100%)] shadow-[0_18px_32px_rgba(90,0,31,0.1)] sm:h-32 sm:w-32">
            <div className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#C22D63] text-white shadow-lg">
              <Camera className="h-4 w-4" />
            </div>
            <span className="text-[0.88rem] font-semibold text-[#8A1238] sm:text-sm">
              {state.profilePhoto ? "Photo Added" : "Upload Photo"}
            </span>
          </div>
          <p className="mt-3 text-center text-[0.92rem] font-medium text-[#7E6872] sm:text-[1rem]">
            Upload Profile Photo
          </p>
        </button>
      </div>

      <div className="grid gap-4">
        <TextInput
          label="Full Name"
          value={state.fullName}
          onChange={(event) => updateState("fullName", event.target.value)}
          icon={<UserRound className="h-4 w-4" />}
        />
        <TextInput
          label="Phone Number"
          value={state.phone}
          onChange={(event) => updateState("phone", event.target.value)}
          icon={<Phone className="h-4 w-4" />}
        />
        <SelectBox
          value={state.city}
          onChange={(value) => updateState("city", value)}
          label="City"
          placeholder="Select city"
          options={["Vadodara", "Ahmedabad", "Surat", "Rajkot"]}
        />
      </div>
    </StepBody>
  );
}

export function ProfessionalIdentityStep({
  state,
  updateState,
}: {
  state: FormState;
  updateState: UpdateState;
}) {
  return (
    <StepBody>
      <SectionIntro
        title="Tell us about yourself"
        description="Share your professional identity with clients."
      />

      <div className="grid gap-4">
        <TextInput
          label="Professional Title"
          value={state.primaryCategory}
          onChange={(event) =>
            updateState("primaryCategory", event.target.value)
          }
          icon={<Scissors className="h-4 w-4" />}
        />
        <TextArea
          label="Bio"
          value={state.about}
          onChange={(event) => updateState("about", event.target.value)}
          maxLength={300}
        />
        <div className="-mt-1 text-right text-sm text-[#A08691]">
          {state.about.length}/300
        </div>
      </div>
    </StepBody>
  );
}

export function ServicesStep({
  state,
  toggleArrayValue,
}: {
  state: FormState;
  toggleArrayValue: ToggleArrayValue;
}) {
  return (
    <StepBody>
      <SectionIntro
        title="Select your services"
        description="Choose the services you offer to clients."
      />

      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
        {categoryOptions.map((service) => (
          <CheckboxChip
            key={service}
            label={service}
            checked={state.servicesOffered.includes(service)}
            onToggle={() => toggleArrayValue("servicesOffered", service)}
          />
        ))}
      </div>
    </StepBody>
  );
}

export function PortfolioStep({
  state,
  toggleArrayValue,
  mockAddPortfolio,
}: {
  state: FormState;
  toggleArrayValue: ToggleArrayValue;
  mockAddPortfolio: () => void;
}) {
  return (
    <StepBody>
      <SectionIntro
        title="Showcase your work"
        description="Add photos of your best work."
      />

      <div className="flex flex-wrap gap-2">
        {["Photos", "Instagram"].map((item, index) => (
          <div
            key={item}
            className={`rounded-full px-4 py-2.5 text-[0.88rem] font-semibold sm:text-[0.98rem] ${
              index === 0
                ? "bg-[#8A1238] text-white"
                : "border border-[#F0DDE2] bg-white text-[#7A626D]"
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <FieldGroup label="Portfolio Categories">
        <div className="flex flex-wrap gap-3">
          {portfolioCategoryOptions.map((category) => (
            <CheckboxChip
              key={category}
              label={category}
              checked={state.portfolioCategories.includes(category)}
              onToggle={() => toggleArrayValue("portfolioCategories", category)}
            />
          ))}
        </div>
      </FieldGroup>

      <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
        {state.portfolioPhotos.map((photo, index) => (
          <div
            key={`${photo}-${index}`}
            className="overflow-hidden rounded-[18px] border border-[#F0DDE2] bg-[linear-gradient(160deg,#A94468_0%,#E5A8B8_100%)] shadow-[0_12px_24px_rgba(90,0,31,0.08)]"
          >
            <div className="flex h-28 items-center justify-center text-white">
              <ImagePlus className="h-7 w-7" />
            </div>
            <div className="bg-white px-3 py-2 text-xs font-semibold text-[#654652]">
              <span className="text-[0.92rem]">{photo}</span>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={mockAddPortfolio}
          className="flex min-h-[132px] items-center justify-center rounded-[18px] border border-dashed border-[#DEB2C1] bg-[#FFF8FA] text-[0.95rem] font-semibold text-[#8A1238] sm:min-h-[142px] sm:text-[1rem]"
        >
          + Add More
        </button>
      </div>
    </StepBody>
  );
}

export function PricingStep({
  pricing,
  onAdd,
  onRemove,
  onChange,
}: {
  pricing: ServiceRow[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, key: keyof ServiceRow, value: string) => void;
}) {
  return (
    <StepBody>
      <SectionIntro
        title="Set your prices"
        description="Add starting price for your services."
      />

      <PricingTable
        pricing={pricing}
        onAdd={onAdd}
        onRemove={onRemove}
        onChange={onChange}
      />
    </StepBody>
  );
}

export function AvailabilityStep({
  state,
  updateState,
  toggleArrayValue,
}: {
  state: FormState;
  updateState: UpdateState;
  toggleArrayValue: ToggleArrayValue;
}) {
  const toggleServiceLocation = (mode: "home" | "salon") => {
    const hasHome =
      state.serviceLocation === "At Client Home" ||
      state.serviceLocation === "Both";
    const hasSalon =
      state.serviceLocation === "At My Salon" ||
      state.serviceLocation === "Both";

    if (mode === "home") {
      if (hasHome && hasSalon) {
        updateState("serviceLocation", "At My Salon");
        return;
      }

      if (hasHome) {
        updateState("serviceLocation", "At Client Home");
        return;
      }

      updateState("serviceLocation", hasSalon ? "Both" : "At Client Home");
      return;
    }

    if (hasHome && hasSalon) {
      updateState("serviceLocation", "At Client Home");
      return;
    }

    if (hasSalon) {
      updateState("serviceLocation", "At My Salon");
      return;
    }

    updateState("serviceLocation", hasHome ? "Both" : "At My Salon");
  };

  return (
    <StepBody>
      <SectionIntro
        title="Set your availability"
        description="When are you available for bookings?"
      />

      <FieldGroup label="Days">
        <div className="flex flex-wrap gap-2">
          {workingDayOptions.map((day) => (
            <CheckboxChip
              key={day}
              label={day}
              checked={state.workingDays.includes(day)}
              onToggle={() => toggleArrayValue("workingDays", day)}
            />
          ))}
        </div>
      </FieldGroup>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          type="time"
          label="Start Time"
          value={state.startTime}
          onChange={(event) => updateState("startTime", event.target.value)}
          icon={<Clock3 className="h-4 w-4" />}
        />
        <TextInput
          type="time"
          label="End Time"
          value={state.endTime}
          onChange={(event) => updateState("endTime", event.target.value)}
          icon={<Clock3 className="h-4 w-4" />}
        />
      </div>

      <FieldGroup label="Service Mode">
        <div className="grid gap-3">
          <ToggleCard
            title="Available For Home Service"
            description="Travel to clients for appointments."
            checked={
              state.serviceLocation === "At Client Home" ||
              state.serviceLocation === "Both"
            }
            onToggle={() => toggleServiceLocation("home")}
          />
          <ToggleCard
            title="Available For Salon Visits"
            description="Accept clients at your salon or studio."
            checked={
              state.serviceLocation === "At My Salon" ||
              state.serviceLocation === "Both"
            }
            onToggle={() => toggleServiceLocation("salon")}
          />
        </div>
      </FieldGroup>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectBox
          value={state.serviceRadius}
          onChange={(value) => updateState("serviceRadius", value)}
          label="Service Radius"
          placeholder="Select radius"
          options={serviceRadiusOptions}
        />
        <TextInput
          label="Area / Locality"
          value={state.area}
          onChange={(event) => updateState("area", event.target.value)}
          icon={<MapPin className="h-4 w-4" />}
        />
      </div>
    </StepBody>
  );
}

export function VerificationTrustStep({
  state,
  updateState,
  toggleArrayValue,
  mockUpload,
}: {
  state: FormState;
  updateState: UpdateState;
  toggleArrayValue: ToggleArrayValue;
  mockUpload: (key: keyof FormState, fileName: string) => void;
}) {
  return (
    <StepBody>
      <SectionIntro
        title="Verification (Optional)"
        description="Add documents to build more trust."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <UploadBox
          title="Government ID"
          subtitle="Aadhaar, PAN, etc."
          value={state.governmentId}
          onUpload={() => mockUpload("governmentId", "aadhaar-card.pdf")}
          icon={<FileBadge className="h-5 w-5" />}
        />
        <UploadBox
          title="Certificate"
          subtitle="Professional certificate"
          value={state.beautyCertificate}
          onUpload={() =>
            mockUpload("beautyCertificate", "professional-certificate.pdf")
          }
          icon={<Award className="h-5 w-5" />}
        />
        <UploadBox
          title="Instagram Profile"
          subtitle="Add your Instagram link"
          value={state.instagram}
          onUpload={() => updateState("instagram", "@priyabeautystudio")}
          icon={<Link2 className="h-5 w-5" />}
        />
      </div>

      <FieldGroup label="Languages">
        <div className="flex flex-wrap gap-3">
          {languageOptions.map((language) => (
            <CheckboxChip
              key={language}
              label={language}
              checked={state.languages.includes(language)}
              onToggle={() => toggleArrayValue("languages", language)}
            />
          ))}
        </div>
      </FieldGroup>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          label="Instagram Profile"
          value={state.instagram}
          onChange={(event) => updateState("instagram", event.target.value)}
          icon={<Link2 className="h-4 w-4" />}
        />
        <TextInput
          label="Google Maps Location"
          value={state.mapsLocation}
          onChange={(event) => updateState("mapsLocation", event.target.value)}
          icon={<MapPin className="h-4 w-4" />}
        />
      </div>
    </StepBody>
  );
}

export function PreviewSubmitStep({ state }: { state: FormState }) {
  return (
    <StepBody>
      <SectionIntro
        title="Review before publishing"
        description="Make a final pass through your setup details before you publish your profile."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[22px] border border-[#F0DDE2] bg-white p-5 shadow-[0_14px_30px_rgba(90,0,31,0.04)]">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#AB8291]">
            Identity
          </p>
          <div className="mt-4 space-y-3 text-sm text-[#694F5D]">
            <div className="flex items-center justify-between rounded-[14px] bg-[#FFF8FA] px-4 py-3">
              <span>Full Name</span>
              <span className="font-semibold text-[#4E2334]">
                {state.fullName}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-[14px] bg-[#FFF8FA] px-4 py-3">
              <span>Phone</span>
              <span className="font-semibold text-[#4E2334]">
                {state.phone}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-[14px] bg-[#FFF8FA] px-4 py-3">
              <span>City</span>
              <span className="font-semibold text-[#4E2334]">{state.city}</span>
            </div>
            <div className="flex items-center justify-between rounded-[14px] bg-[#FFF8FA] px-4 py-3">
              <span>Title</span>
              <span className="font-semibold text-[#4E2334]">
                {state.primaryCategory}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-[22px] border border-[#F0DDE2] bg-white p-5 shadow-[0_14px_30px_rgba(90,0,31,0.04)]">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#AB8291]">
            Marketplace Setup
          </p>
          <div className="mt-4 space-y-3 text-sm text-[#694F5D]">
            <div className="flex items-center justify-between rounded-[14px] bg-[#FFF8FA] px-4 py-3">
              <span>Services</span>
              <span className="font-semibold text-[#4E2334]">
                {state.servicesOffered.length} selected
              </span>
            </div>
            <div className="flex items-center justify-between rounded-[14px] bg-[#FFF8FA] px-4 py-3">
              <span>Portfolio</span>
              <span className="font-semibold text-[#4E2334]">
                {state.portfolioPhotos.length} items
              </span>
            </div>
            <div className="flex items-center justify-between rounded-[14px] bg-[#FFF8FA] px-4 py-3">
              <span>Starting price</span>
              <span className="font-semibold text-[#8A1238]">
                {formatStartingPrice(state.pricing)}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-[14px] bg-[#FFF8FA] px-4 py-3">
              <span>Availability</span>
              <span className="font-semibold text-[#4E2334]">
                {state.workingDays.length} days active
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[22px] border border-[#F0DDE2] bg-[linear-gradient(135deg,#FFF8FA_0%,#FFF2F5_100%)] p-5 text-[1rem] leading-7 text-[#715A65] shadow-[0_14px_30px_rgba(90,0,31,0.04)]">
        Your profile details look polished and ready for review. You can still
        go back to update services, pricing, portfolio, or verification before
        publishing.
      </div>
    </StepBody>
  );
}

export function SuccessStep() {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[linear-gradient(145deg,#FFE5EE_0%,#FFD2E1_100%)] text-[#C82D67] shadow-[0_18px_32px_rgba(138,18,56,0.16)]">
        <ShieldCheck className="h-10 w-10" />
      </div>
      <div>
        <h2 className="text-[1.9rem] text-[#5A001F] [font-family:var(--font-playfair-nav,Georgia)]">
          Congratulations!
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#7A6771]">
          Your profile is live now. You can start receiving bookings from
          clients.
        </p>
      </div>
    </div>
  );
}
