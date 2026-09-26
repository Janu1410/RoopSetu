import type {
  FormState,
  ServiceRow,
} from "@/components/become-beautician/types";

const requiredByStep: Record<number, (state: FormState) => boolean> = {
  0: () => true,
  1: (state) =>
    Boolean(state.profilePhoto && state.fullName && state.phone && state.city),
  2: (state) => Boolean(state.primaryCategory && state.about),
  3: (state) => state.servicesOffered.length > 0,
  4: (state) => state.portfolioPhotos.length >= 3,
  5: (state) => state.pricing.length > 0,
  6: (state) =>
    Boolean(
      state.workingDays.length &&
      state.startTime &&
      state.endTime &&
      state.serviceLocation,
    ),
  7: () => true,
  8: () => true,
};

export function getCompletionItems(state: FormState) {
  return [
    { label: "Add profile photo", done: Boolean(state.profilePhoto) },
    { label: "Complete your bio", done: Boolean(state.about) },
    { label: "Choose services", done: state.servicesOffered.length > 0 },
    {
      label: "Add 3 portfolio photos",
      done: state.portfolioPhotos.length >= 3,
    },
    { label: "Set starting prices", done: state.pricing.length > 0 },
    {
      label: "Add work availability",
      done: Boolean(
        state.workingDays.length && state.startTime && state.endTime,
      ),
    },
    {
      label: "Add trust proof",
      done: Boolean(
        state.instagram || state.beautyCertificate || state.governmentId,
      ),
    },
  ];
}

export function formatStartingPrice(pricing: ServiceRow[]) {
  const values = pricing
    .map((item) => Number(item.price))
    .filter((value) => Number.isFinite(value) && value > 0);

  if (!values.length) {
    return "Rs. 0";
  }

  return `Rs. ${Math.min(...values)}`;
}

export function getStepError(step: number, state: FormState) {
  if (requiredByStep[step](state)) {
    return "";
  }

  const messages = [
    "",
    "Please complete your basic profile details before continuing.",
    "Please add your professional title and bio.",
    "Please choose at least one service.",
    "Please add at least 3 portfolio items.",
    "Please keep at least one service price.",
    "Please complete your schedule and service mode.",
    "",
    "",
  ];

  return messages[step];
}
