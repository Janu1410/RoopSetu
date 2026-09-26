"use client";

import {
  useState,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  IndianRupee,
  MoveRight,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { steps } from "@/components/become-beautician/constants";
import type { ServiceRow } from "@/components/become-beautician/types";

export function Stepper({
  currentStep,
  completion,
  onBack,
  onSkip,
}: {
  currentStep: number;
  completion: number;
  onBack: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="premium-card premium-reveal relative z-20 rounded-[20px] border border-[#F0DCE2] bg-white/95 px-3 py-3 shadow-[0_18px_42px_rgba(90,0,31,0.06)] backdrop-blur-xl sm:px-4 sm:py-4 md:sticky md:top-4 md:rounded-[24px]">
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onBack}
          className="premium-interactive inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#EFD9E0] bg-[#FFF8FA] text-[#672E42] transition hover:bg-white sm:h-10 sm:w-10"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1 text-center">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#A47B89] sm:text-[0.68rem] sm:tracking-[0.18em]">
            Step {currentStep + 1} of {steps.length}
          </p>
          <p className="mt-1 truncate text-[0.92rem] font-semibold text-[#4F2133] sm:text-sm">
            {steps[currentStep]}
          </p>
        </div>

        <button
          type="button"
          onClick={onSkip}
          className="text-xs font-semibold text-[#8A1238] transition hover:opacity-75 sm:text-sm"
        >
          Skip
        </button>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#F3E4E8] sm:mt-4">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#E23670] via-[#C6235E] to-[#F1A5B8] transition-all duration-500"
          style={{ width: `${completion}%` }}
        />
      </div>
    </div>
  );
}

export function FormCard({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="premium-card premium-reveal premium-delay-1 relative overflow-hidden rounded-[22px] border border-[#F1DDE2] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(255,248,250,0.94))] shadow-[0_20px_50px_rgba(90,0,31,0.08)] sm:rounded-[28px] sm:shadow-[0_24px_70px_rgba(90,0,31,0.08)]">
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#E9A8BB] to-transparent" />
      <div className="pointer-events-none absolute -right-10 top-8 h-36 w-36 rounded-full bg-[#FFE4EC] blur-3xl" />
      <div className="pointer-events-none absolute -left-12 bottom-8 h-32 w-32 rounded-full bg-[#FBE7E0] blur-3xl" />
      <div className="relative p-3.5 sm:p-6 lg:p-8">{children}</div>
      {footer ? (
        <div className="sticky bottom-0 z-20 border-t border-[#F2E3E7] bg-[linear-gradient(180deg,rgba(255,251,252,0.88),rgba(255,247,249,0.98))] px-3.5 py-3.5 backdrop-blur-xl sm:px-6 sm:py-4 lg:px-8">
          {footer}
        </div>
      ) : null}
    </section>
  );
}

export function SectionIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="premium-reveal premium-delay-1 max-w-2xl">
      <h2 className="text-[1.65rem] leading-[1.08] text-[#5A001F] [font-family:var(--font-playfair-nav,Georgia)] sm:text-[2.2rem] lg:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-3 text-[0.95rem] leading-6 text-[#7D6772] sm:mt-4 sm:text-[1.04rem] sm:leading-8">
        {description}
      </p>
    </div>
  );
}

export function FieldGroup({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center gap-2">
        <span className="text-[0.94rem] font-semibold text-[#56283A] sm:text-[1.05rem]">
          {label}
        </span>
        {required ? (
          <span className="text-[0.94rem] font-semibold text-[#B4234D] sm:text-[1.05rem]">
            *
          </span>
        ) : null}
      </div>
      {children}
      {hint ? (
        <p className="text-[0.82rem] text-[#9A7F8A] sm:text-sm">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextInput(
  props: InputHTMLAttributes<HTMLInputElement> & {
    icon?: ReactNode;
    label: string;
  },
) {
  const { icon, className, label, value, defaultValue, ...rest } = props;
  const id = useId();
  const hasValue = Boolean(value ?? defaultValue);

  return (
    <label className="group block">
      <div className="rounded-[16px] border border-[#F0DDE2] bg-white px-3.5 shadow-[0_10px_24px_rgba(90,0,31,0.04)] transition focus-within:border-[#D77593] focus-within:shadow-[0_0_0_4px_rgba(138,18,56,0.08)] sm:px-4">
        <div className="flex min-h-[62px] items-center gap-3 sm:min-h-[74px] sm:gap-3.5">
          {icon ? (
            <span className="text-[#C06484] [&_svg]:h-[18px] [&_svg]:w-[18px]">
              {icon}
            </span>
          ) : null}
          <div className="relative flex-1">
            <input
              {...rest}
              id={id}
              value={value}
              defaultValue={defaultValue}
              placeholder=" "
              className={`peer h-[62px] w-full bg-transparent pb-2.5 pt-6 text-[0.95rem] font-medium text-[#2D2230] outline-none sm:h-[74px] sm:pb-3 sm:pt-7 sm:text-[1.04rem] ${className ?? ""}`}
            />
            <span
              className={`pointer-events-none absolute left-0 transition-all ${
                hasValue
                  ? "top-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8A1238]"
                  : "top-1/2 -translate-y-1/2 text-[0.95rem] text-[#9E8791] peer-focus:top-4 peer-focus:text-[0.72rem] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-[#8A1238] sm:text-[1.04rem]"
              }`}
            >
              {label}
            </span>
          </div>
        </div>
      </div>
    </label>
  );
}

export function TextArea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string },
) {
  const { className, label, value, defaultValue, ...rest } = props;
  const hasValue = Boolean(value ?? defaultValue);

  return (
    <label className="group relative block">
      <textarea
        {...rest}
        value={value}
        defaultValue={defaultValue}
        placeholder=" "
        className={`peer min-h-[148px] w-full rounded-[16px] border border-[#F0DDE2] bg-white px-3.5 pb-4 pt-8 text-[0.95rem] font-medium text-[#2D2230] outline-none shadow-[0_10px_24px_rgba(90,0,31,0.04)] transition focus:border-[#D77593] focus:shadow-[0_0_0_4px_rgba(138,18,56,0.08)] sm:min-h-[168px] sm:px-4 sm:pt-9 sm:text-[1.04rem] ${className ?? ""}`}
      />
      <span
        className={`pointer-events-none absolute left-4 transition-all ${
          hasValue
            ? "top-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8A1238]"
            : "top-5 text-[0.95rem] text-[#9E8791] peer-focus:top-4 peer-focus:text-[0.72rem] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-[#8A1238] sm:top-6 sm:text-[1.04rem]"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export function SelectBox({
  value,
  onChange,
  options,
  label,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
  placeholder: string;
}) {
  const floating = Boolean(value);

  return (
    <label className="relative block">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-[62px] w-full rounded-[16px] border border-[#F0DDE2] bg-white px-3.5 pb-2.5 pt-7 text-[0.95rem] font-medium text-[#2D2230] outline-none shadow-[0_10px_24px_rgba(90,0,31,0.04)] transition focus:border-[#D77593] focus:shadow-[0_0_0_4px_rgba(138,18,56,0.08)] sm:min-h-[74px] sm:px-4 sm:pb-3 sm:pt-8 sm:text-[1.04rem]"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span
        className={`pointer-events-none absolute left-4 transition-all ${
          floating
            ? "top-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#8A1238]"
            : "top-1/2 -translate-y-1/2 text-[0.95rem] text-[#9E8791] sm:text-[1.04rem]"
        }`}
      >
        {label}
      </span>
    </label>
  );
}

export function CheckboxChip({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-2.5 rounded-[16px] border px-3.5 py-3 text-[0.9rem] font-medium transition-all sm:px-4 sm:py-3.5 sm:text-[1rem] ${
        checked
          ? "border-[#D86083] bg-[linear-gradient(135deg,#FFF2F6_0%,#FFE7EE_100%)] text-[#8A1238] shadow-[0_14px_28px_rgba(138,18,56,0.1)]"
          : "border-[#F0DDE2] bg-white text-[#694E5B] hover:border-[#E4BBC7] hover:bg-[#FFF9FB]"
      }`}
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          checked
            ? "border-[#8A1238] bg-[#8A1238] text-white"
            : "border-[#D9BBC5]"
        }`}
      >
        {checked ? <Check className="h-3 w-3" /> : null}
      </span>
      {label}
    </button>
  );
}

export function UploadBox({
  title,
  subtitle,
  value,
  onUpload,
  icon,
}: {
  title: string;
  subtitle: string;
  value?: string | null;
  onUpload: () => void;
  icon?: ReactNode;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const uploaded = Boolean(value);

  return (
    <button
      type="button"
      onClick={onUpload}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        onUpload();
      }}
      className={`group relative flex min-h-[180px] w-full flex-col items-start justify-between overflow-hidden rounded-[20px] border px-4 py-4 text-left transition sm:min-h-[210px] sm:rounded-[24px] sm:px-5 sm:py-5 ${
        uploaded
          ? "border-[#E8CDD6] bg-[linear-gradient(145deg,#FFFFFF_0%,#FFF6F8_100%)] shadow-[0_18px_40px_rgba(90,0,31,0.08)]"
          : isDragging
            ? "border-dashed border-[#C93E6E] bg-[linear-gradient(145deg,#FFF9FB_0%,#FFEFF5_100%)] shadow-[0_18px_40px_rgba(138,18,56,0.12)]"
            : "border-dashed border-[#E4B4C3] bg-[linear-gradient(145deg,#FFFFFF_0%,#FFF8FA_100%)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(90,0,31,0.08)]"
      }`}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[#FFE7EE] blur-3xl" />
      <div className="relative flex w-full items-start justify-between gap-4">
        <div className="rounded-[18px] bg-white/95 p-3 text-[#B34D72] shadow-[0_10px_24px_rgba(90,0,31,0.07)]">
          {icon ?? <Upload className="h-5 w-5" />}
        </div>
        <span className="rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#A06D80]">
          {uploaded ? "Uploaded" : isDragging ? "Drop Here" : "Upload"}
        </span>
      </div>

      <div className="relative">
        <p className="text-[0.98rem] font-semibold text-[#57273A] sm:text-base">
          {title}
        </p>
        <p className="mt-2 text-[0.9rem] leading-6 text-[#816873] sm:text-[0.98rem] sm:leading-7">
          {uploaded
            ? value
            : isDragging
              ? "Release to attach this file and continue your setup."
              : subtitle}
        </p>
      </div>

      <div className="relative inline-flex items-center gap-2 text-[0.9rem] font-semibold text-[#8A1238] sm:text-[0.98rem]">
        {uploaded ? "Replace file" : "Drag & drop or choose file"}
        <MoveRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </button>
  );
}

export function PricingTable({
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
    <div className="space-y-3">
      {pricing.map((row) => (
        <div
          key={row.id}
          className="grid gap-3 rounded-[20px] border border-[#F0DDE2] bg-white p-3 shadow-[0_12px_28px_rgba(90,0,31,0.04)] md:grid-cols-[1.4fr_1fr_1fr_auto]"
        >
          <TextInput
            label="Service"
            value={row.name}
            onChange={(event) => onChange(row.id, "name", event.target.value)}
          />
          <TextInput
            label="Price"
            value={row.price}
            onChange={(event) => onChange(row.id, "price", event.target.value)}
            icon={<IndianRupee className="h-4 w-4" />}
          />
          <TextInput
            label="Duration"
            value={row.duration}
            onChange={(event) =>
              onChange(row.id, "duration", event.target.value)
            }
            icon={<Clock3 className="h-4 w-4" />}
          />
          <button
            type="button"
            onClick={() => onRemove(row.id)}
            className="inline-flex h-14 items-center justify-center rounded-[16px] border border-[#F2DCE3] bg-[#FFF7F9] px-4 text-[#A33F63] transition hover:bg-[#FFF0F4] sm:h-16"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex w-full items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#8A1238] to-[#C12C63] px-5 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_34px_rgba(138,18,56,0.16)] transition hover:-translate-y-0.5 sm:w-auto sm:text-sm"
      >
        <Plus className="h-4 w-4" />
        Add Another Service
      </button>
    </div>
  );
}

export function ToggleCard({
  title,
  description,
  checked,
  onToggle,
}: {
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center justify-between rounded-[18px] border p-4 text-left transition ${
        checked
          ? "border-[#D97F9B] bg-[linear-gradient(180deg,#FFF7FA_0%,#FFF0F4_100%)] shadow-[0_14px_28px_rgba(138,18,56,0.07)]"
          : "border-[#F0DDE2] bg-white hover:border-[#E3B7C4]"
      }`}
    >
      <div className="pr-4">
        <p className="text-sm font-semibold text-[#553240]">{title}</p>
        <p className="mt-1 text-sm text-[#86717B]">{description}</p>
      </div>
      <span
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
          checked ? "bg-[#8A1238]" : "bg-[#E7D7DC]"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </span>
    </button>
  );
}

export function CompletionListItem({
  done,
  label,
}: {
  done: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full ${
          done ? "bg-[#E8F7EE] text-[#23925A]" : "bg-[#F8EEF1] text-[#BE8396]"
        }`}
      >
        {done ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5" />
        )}
      </span>
      <span className={done ? "text-[#365244]" : "text-[#7C6973]"}>
        {label}
      </span>
    </div>
  );
}
