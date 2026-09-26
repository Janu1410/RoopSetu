"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { CalendarDays, Check, ChevronDown, Clock3 } from "lucide-react";

const controlShellClass =
  "flex min-h-[52px] items-center gap-3 rounded-xl border border-[#E9D9DC] bg-white px-4 shadow-[0_8px_18px_-16px_rgba(90,0,31,0.28)] transition-all duration-200 focus-within:border-[#C42E5D] focus-within:shadow-[0_0_0_4px_rgba(196,46,93,0.12)]";

export function Field({
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  full = false,
  type = "text",
  required = true,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ComponentType<{ className?: string }>;
  full?: boolean;
  type?: "text" | "email" | "tel" | "date" | "time";
  required?: boolean;
  error?: string;
}) {
  return (
    <label className={`grid gap-2 ${full ? "md:col-span-2" : ""}`}>
      <span className="text-sm font-semibold text-[#2D2230]">
        {label} {required ? <span className="text-[#C42E5D]">*</span> : null}
      </span>
      <div
        className={`${controlShellClass} ${
          error
            ? "border-[#C42E5D] shadow-[0_0_0_4px_rgba(196,46,93,0.12)]"
            : ""
        }`}
      >
        {Icon ? <Icon className="h-4.5 w-4.5 text-[#A98391]" /> : null}
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full border-none bg-transparent text-[0.96rem] text-[#334155] outline-none placeholder:text-[#94A3B8] [color-scheme:light]"
        />
      </div>
      {error ? <span className="text-sm text-[#B4234D]">{error}</span> : null}
    </label>
  );
}

export function DatalistField({
  label,
  placeholder,
  value,
  onChange,
  options,
  required = true,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  required?: boolean;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [openUpward, setOpenUpward] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.trim().toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!open || !containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const dropdownHeight = 260;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setOpenUpward(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
  }, [open]);

  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#2D2230]">
        {label} {required ? <span className="text-[#C42E5D]">*</span> : null}
      </span>
      <div ref={containerRef} className="relative">
        <div
          className={`${controlShellClass} ${
            error
              ? "border-[#C42E5D] shadow-[0_0_0_4px_rgba(196,46,93,0.12)]"
              : ""
          }`}
        >
          <input
            type="text"
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="w-full border-none bg-transparent pr-2 text-[0.96rem] text-[#334155] outline-none placeholder:text-[#94A3B8]"
          />
          <button
            type="button"
            onClick={() => setOpen((previous) => !previous)}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#A98391] transition hover:bg-[#FFF1F5] hover:text-[#8A1238]"
            aria-label={`Toggle ${label} options`}
          >
            <ChevronDown
              className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {open ? (
          <div
            className={`absolute left-0 right-0 z-30 overflow-hidden rounded-[1.15rem] border border-[#E8D7DC] bg-white shadow-[0_22px_36px_-22px_rgba(90,0,31,0.34)] ${
              openUpward ? "bottom-[calc(100%+10px)]" : "top-[calc(100%+10px)]"
            }`}
          >
            <div className="max-h-64 overflow-y-auto py-2">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const selected = option === value;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        onChange(option);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-3 text-left text-[0.96rem] transition ${
                        selected
                          ? "bg-[#FFF1F5] font-semibold text-[#8A1238]"
                          : "text-[#334155] hover:bg-[#FFF8FA] hover:text-[#8A1238]"
                      }`}
                    >
                      <span>{option}</span>
                      {selected ? (
                        <Check className="h-4 w-4 text-[#8A1238]" />
                      ) : null}
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-sm text-[#7C6A74]">
                  Keep typing to add a custom service name.
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
      {error ? <span className="text-sm text-[#B4234D]">{error}</span> : null}
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = true,
  error,
  compact = false,
  hideLabel = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  required?: boolean;
  error?: string;
  compact?: boolean;
  hideLabel?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [openUpward, setOpenUpward] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!open || !containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const dropdownHeight = 260;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setOpenUpward(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
  }, [open]);

  return (
    <label className="grid gap-2">
      {hideLabel ? null : (
        <span
          className={`${compact ? "text-[11px]" : "text-sm"} font-semibold text-[#2D2230]`}
        >
          {label} {required ? <span className="text-[#C42E5D]">*</span> : null}
        </span>
      )}
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className={`${compact ? "min-h-[44px] rounded-[0.9rem] border border-[#E9D9DC] bg-[#FFF9FB] px-3 py-2 shadow-none" : controlShellClass} w-full justify-between text-left ${
            open || error
              ? "border-[#C42E5D] shadow-[0_0_0_4px_rgba(196,46,93,0.12)]"
              : ""
          }`}
        >
          <span
            className={`${compact ? "text-sm" : ""} ${value ? "text-[#334155]" : "text-[#94A3B8]"}`}
          >
            {value || placeholder}
          </span>
          <span
            className={`text-[#A98391] transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </span>
        </button>

        {open ? (
          <div
            className={`absolute left-0 right-0 z-30 max-h-[240px] overflow-y-auto overscroll-contain rounded-[1rem] border border-[#E8CAD4] bg-[linear-gradient(180deg,#FFFDFD_0%,#FFF5F8_100%)] p-2 shadow-[0_24px_48px_-20px_rgba(90,0,31,0.32)] backdrop-blur ${
              openUpward
                ? "bottom-[calc(100%+0.5rem)]"
                : "top-[calc(100%+0.5rem)]"
            }`}
          >
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className={`flex w-full items-center rounded-[0.85rem] px-3 py-3 text-left text-[0.96rem] transition ${
                !value
                  ? "bg-gradient-to-r from-[#8A1238] to-[#A11743] font-semibold text-white"
                  : "text-[#5B4A58] hover:bg-[#FFF0F4] hover:text-[#8A1238]"
              }`}
            >
              {placeholder}
            </button>
            {options.map((option) => {
              const active = value === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`mt-1 flex w-full items-center justify-between rounded-[0.85rem] px-3 py-3 text-left text-[0.96rem] transition ${
                    active
                      ? "bg-gradient-to-r from-[#8A1238] to-[#A11743] font-semibold text-white shadow-[0_12px_24px_-18px_rgba(138,18,56,0.8)]"
                      : "text-[#5B4A58] hover:bg-[#FFF0F4] hover:text-[#8A1238]"
                  }`}
                >
                  <span>{option}</span>
                  {active ? <Check className="h-4 w-4" /> : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
      {error ? <span className="text-sm text-[#B4234D]">{error}</span> : null}
    </label>
  );
}

export function DateField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#2D2230]">
        {label} <span className="text-[#C42E5D]">*</span>
      </span>
      <button
        type="button"
        onClick={() => {
          inputRef.current?.focus();
          inputRef.current?.showPicker?.();
        }}
        className={`rounded-xl border bg-white px-2.5 py-2.5 text-left shadow-[0_8px_18px_-16px_rgba(90,0,31,0.28)] transition-all duration-200 sm:px-3 sm:py-3 ${
          error
            ? "border-[#C42E5D] shadow-[0_0_0_4px_rgba(196,46,93,0.12)]"
            : "border-[#E9D9DC] hover:border-[#D9AAB9] hover:bg-[#FFF9FB]"
        }`}
      >
        <div className="relative flex min-h-[24px] items-center sm:min-h-[28px]">
          {!value ? (
            <span className="pointer-events-none absolute left-0 text-[12px] tracking-[0.06em] text-[#A98391] sm:text-sm sm:tracking-[0.08em]">
              dd:mm:yyyy
            </span>
          ) : null}
          <input
            ref={inputRef}
            type="date"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className={`w-full cursor-pointer bg-transparent pr-5 text-[12px] outline-none [color-scheme:light] sm:pr-8 sm:text-sm [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-3.5 [&::-webkit-calendar-picker-indicator]:w-3.5 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 sm:[&::-webkit-calendar-picker-indicator]:h-5 sm:[&::-webkit-calendar-picker-indicator]:w-5 ${
              value ? "text-[#5A2034]" : "text-transparent"
            }`}
          />
          <CalendarDays
            className="pointer-events-none absolute right-0 h-3 w-3 text-[#A14969] sm:h-4 sm:w-4"
            aria-hidden="true"
          />
        </div>
      </button>
      {error ? <span className="text-sm text-[#B4234D]">{error}</span> : null}
    </label>
  );
}

export function TimeField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#2D2230]">
        {label} <span className="text-[#C42E5D]">*</span>
      </span>
      <button
        type="button"
        onClick={() => {
          inputRef.current?.focus();
          inputRef.current?.showPicker?.();
        }}
        className={`rounded-xl border bg-white px-2.5 py-2.5 shadow-[0_8px_18px_-16px_rgba(90,0,31,0.28)] transition-all duration-200 sm:px-3 sm:py-3 ${
          error
            ? "border-[#C42E5D] shadow-[0_0_0_4px_rgba(196,46,93,0.12)]"
            : "border-[#E9D9DC] hover:border-[#D9AAB9] hover:bg-[#FFF9FB]"
        }`}
      >
        <div className="relative flex min-h-[24px] items-center sm:min-h-[28px]">
          {!value ? (
            <span className="pointer-events-none absolute left-0 text-[12px] tracking-[0.06em] text-[#A98391] sm:text-sm sm:tracking-[0.08em]">
              hh:mm
            </span>
          ) : null}
          <input
            ref={inputRef}
            type="time"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className={`w-full cursor-pointer bg-transparent pr-5 text-[12px] outline-none [color-scheme:light] sm:pr-8 sm:text-sm [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-3.5 [&::-webkit-calendar-picker-indicator]:w-3.5 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 sm:[&::-webkit-calendar-picker-indicator]:h-5 sm:[&::-webkit-calendar-picker-indicator]:w-5 ${
              value ? "text-[#5A2034]" : "text-transparent"
            }`}
          />
          <Clock3
            className="pointer-events-none absolute right-0 h-3 w-3 text-[#A14969] sm:h-4 sm:w-4"
            aria-hidden="true"
          />
        </div>
      </button>
      {error ? <span className="text-sm text-[#B4234D]">{error}</span> : null}
    </label>
  );
}

export function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  required = true,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#2D2230]">
        {label} {required ? <span className="text-[#C42E5D]">*</span> : null}
      </span>
      <div
        className={`rounded-xl border bg-white px-4 py-3 shadow-[0_8px_18px_-16px_rgba(90,0,31,0.28)] transition-all duration-200 focus-within:border-[#C42E5D] focus-within:shadow-[0_0_0_4px_rgba(196,46,93,0.12)] ${
          error
            ? "border-[#C42E5D] shadow-[0_0_0_4px_rgba(196,46,93,0.12)]"
            : "border-[#E9D9DC]"
        }`}
      >
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full resize-none border-none bg-transparent text-[0.96rem] text-[#334155] outline-none placeholder:text-[#94A3B8]"
        />
      </div>
      {error ? <span className="text-sm text-[#B4234D]">{error}</span> : null}
    </label>
  );
}
