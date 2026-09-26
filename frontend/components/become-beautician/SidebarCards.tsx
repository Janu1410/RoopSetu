"use client";

import type { ReactNode } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  Globe,
  Home,
  IndianRupee,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  previewPortfolio,
  statusFlow,
  trustBadges,
} from "@/components/become-beautician/constants";
import { CompletionListItem } from "@/components/become-beautician/WizardUI";
import type { FormState } from "@/components/become-beautician/types";
import {
  formatStartingPrice,
  getCompletionItems,
} from "@/components/become-beautician/utils";

export function CompletionMeter({ state }: { state: FormState }) {
  const items = getCompletionItems(state);
  const completion = Math.round(
    (items.filter((item) => item.done).length / items.length) * 100,
  );

  return (
    <div className="rounded-[30px] border border-[#F1DDE3] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,250,251,0.92))] p-5 shadow-[0_22px_60px_rgba(90,0,31,0.06)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#5A2034]">
            Profile Completion
          </p>
          <p className="mt-1 text-xs text-[#8A7781]">
            Complete the essentials to boost approval confidence.
          </p>
        </div>
        <div className="rounded-full bg-[#FFF1F4] px-3 py-1 text-sm font-semibold text-[#8A1238]">
          {completion}%
        </div>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#F4E7EA]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#8A1238] to-[#E3A4B5]"
          style={{ width: `${completion}%` }}
        />
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <CompletionListItem
            key={item.label}
            done={item.done}
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
}

export function StatusFlow() {
  return (
    <div className="rounded-[30px] border border-[#F1DDE3] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,250,251,0.92))] p-5 shadow-[0_22px_60px_rgba(90,0,31,0.06)]">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#A14969]" />
        <p className="text-sm font-semibold text-[#5A2034]">
          Review Status Flow
        </p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {statusFlow.map((status, index) => (
          <div key={status} className="flex items-center gap-2">
            <div
              className={`rounded-full px-3 py-2 text-xs font-semibold ${
                index === 0
                  ? "bg-[#8A1238] text-white"
                  : "border border-[#EBD5DC] bg-[#FFF9FA] text-[#7D6672]"
              }`}
            >
              {status}
            </div>
            {index < statusFlow.length - 1 ? (
              <ChevronRight className="h-4 w-4 text-[#C39AA8]" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewMeta({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#F3E4E8] bg-[#FFFCFD] px-4 py-3 text-sm text-[#5A4451]">
      <span className="text-[#B25E7C]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export function ProfilePreviewCard({ state }: { state: FormState }) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-[#F0DADF] bg-white shadow-[0_24px_60px_rgba(90,0,31,0.09)]">
      <div className="bg-gradient-to-r from-[#5A001F] via-[#8A1238] to-[#C56B87] p-5 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-lg font-semibold">
            {state.fullName
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              {state.fullName || "Beautician Name"}
            </h3>
            <p className="mt-1 text-sm text-white/80">
              {state.primaryCategory || "Primary Category"}
            </p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified Beautician
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5 bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF9FA_100%)] p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <PreviewMeta
            icon={<MapPin className="h-4 w-4" />}
            label={`${state.city}, ${state.area}`}
          />
          <PreviewMeta
            icon={<BriefcaseBusiness className="h-4 w-4" />}
            label={`${state.yearsOfExperience || "0"} years experience`}
          />
          <PreviewMeta
            icon={<IndianRupee className="h-4 w-4" />}
            label={`Starting from ${formatStartingPrice(state.pricing)}`}
          />
          <PreviewMeta
            icon={<Globe className="h-4 w-4" />}
            label={state.languages.join(", ") || "Languages"}
          />
          <PreviewMeta
            icon={<Home className="h-4 w-4" />}
            label={state.serviceLocation}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <span
                key={badge.label}
                className="inline-flex items-center gap-2 rounded-full border border-[#F0D7DD] bg-[#FFF8FA] px-3 py-2 text-xs font-semibold text-[#7C4A5F]"
              >
                <Icon className="h-3.5 w-3.5" />
                {badge.label}
              </span>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {previewPortfolio.map((item, index) => (
            <div
              key={item}
              className={`rounded-[22px] p-4 text-white ${
                index % 4 === 0
                  ? "bg-gradient-to-br from-[#B4456B] to-[#E4A6B8]"
                  : index % 4 === 1
                    ? "bg-gradient-to-br from-[#D4A36A] to-[#F0D6B6]"
                    : index % 4 === 2
                      ? "bg-gradient-to-br from-[#734B62] to-[#B585A0]"
                      : "bg-gradient-to-br from-[#566A87] to-[#90A4C2]"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.16em] text-white/80">
                Portfolio
              </p>
              <p className="mt-6 text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          disabled
          className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-[#EBDDE2] px-5 py-3 text-sm font-semibold text-[#8E7580]"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export function ApplicationSummary({
  state,
  startingPrice,
}: {
  state: FormState;
  startingPrice: string;
}) {
  return (
    <div className="rounded-[30px] border border-[#F1DDE3] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,250,251,0.92))] p-5 shadow-[0_22px_60px_rgba(90,0,31,0.06)]">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-[#A14969]" />
        <p className="text-sm font-semibold text-[#5A2034]">
          Application summary
        </p>
      </div>
      <div className="mt-4 grid gap-3 text-sm text-[#6D5963]">
        <div className="flex items-center justify-between rounded-2xl bg-[#FFF8FA] px-4 py-3">
          <span>Primary category</span>
          <span className="font-semibold text-[#4F2637]">
            {state.primaryCategory}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-[#FFF8FA] px-4 py-3">
          <span>Starting price</span>
          <span className="font-semibold text-[#4F2637]">{startingPrice}</span>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-[#FFF8FA] px-4 py-3">
          <span>Portfolio items</span>
          <span className="font-semibold text-[#4F2637]">
            {state.portfolioPhotos.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ApprovalTips() {
  return (
    <div className="rounded-[30px] border border-[#F1DDE3] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,250,251,0.92))] p-5 shadow-[0_22px_60px_rgba(90,0,31,0.06)]">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-[#A14969]" />
        <p className="text-sm font-semibold text-[#5A2034]">
          What improves approval?
        </p>
      </div>
      <div className="mt-4 space-y-3 text-sm text-[#6D5963]">
        {[
          "Use a clear, professional profile photo.",
          "Add at least 3 polished bridal or service images.",
          "Keep pricing transparent and realistic.",
          "Mention certificates and consistent availability.",
        ].map((tip) => (
          <div
            key={tip}
            className="flex items-start gap-3 rounded-2xl bg-[#FFF8FA] px-4 py-3"
          >
            <span className="mt-0.5 rounded-full bg-[#FCE8EE] p-1 text-[#A14969]">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
