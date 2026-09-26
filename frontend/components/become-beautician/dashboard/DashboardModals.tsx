"use client";

import type { ChangeEvent, PointerEvent, RefObject } from "react";
import { ImagePlus, RefreshCcw, Upload, X } from "lucide-react";
import {
  Field,
  SelectField,
} from "@/components/become-beautician/dashboard/DashboardFormFields";

type PortfolioInfo = {
  title: string;
  category: string;
  mediaType: "Photo" | "Video";
  uploadedFileName: string;
  uploadedPreviewUrl: string;
};

type ProfilePhotoDraft = {
  src: string;
  scale: number;
  offsetX: number;
  offsetY: number;
  naturalWidth: number;
  naturalHeight: number;
};

type ProfilePhotoRenderMetrics = {
  renderWidth: number;
  renderHeight: number;
  maxOffsetX: number;
  maxOffsetY: number;
};

export function GalleryUploadModal({
  isOpen,
  onClose,
  uploadInputRef,
  accept,
  onPickFile,
  previewUrl,
  isVideoUpload,
  galleryTypeLabel,
  galleryPickerDescription,
  mediaType,
  onMediaTypeChange,
  portfolioInfo,
  onPortfolioInfoChange,
  galleryCategoryLabel,
  galleryNameLabel,
  galleryNamePlaceholder,
  galleryCategoryOptions,
  fieldErrors,
  onSave,
  galleryHasDraft,
}: {
  isOpen: boolean;
  onClose: () => void;
  uploadInputRef: RefObject<HTMLInputElement | null>;
  accept: string;
  onPickFile: (event: ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string;
  isVideoUpload: boolean;
  galleryTypeLabel: string;
  galleryPickerDescription: string;
  mediaType: PortfolioInfo["mediaType"];
  onMediaTypeChange: (type: PortfolioInfo["mediaType"]) => void;
  portfolioInfo: PortfolioInfo;
  onPortfolioInfoChange: (key: keyof PortfolioInfo, value: string) => void;
  galleryCategoryLabel: string;
  galleryNameLabel: string;
  galleryNamePlaceholder: string;
  galleryCategoryOptions: readonly string[];
  fieldErrors: Record<string, string>;
  onSave: () => void;
  galleryHasDraft: boolean;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D2230]/45 px-4 py-6 backdrop-blur-[3px]">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-[680px] overflow-visible rounded-[1.7rem] border border-[#F0D9E0] bg-[linear-gradient(180deg,#FFFDFD_0%,#FFF6F9_100%)] shadow-[0_30px_80px_-35px_rgba(90,0,31,0.5)]">
        <div className="flex items-center justify-between border-b border-[#F2E3E7] px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A98391]">
              Work Gallery
            </p>
            <h3 className="mt-1 text-[1.35rem] font-semibold text-[#2D2230]">
              Upload photo or video
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E9D9DC] bg-white text-[#8A1238] transition hover:bg-[#FFF1F5]"
            aria-label="Close upload modal"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="grid gap-5 px-5 py-5 sm:px-6 sm:py-6">
          <input
            ref={uploadInputRef}
            type="file"
            accept={accept}
            onChange={onPickFile}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => uploadInputRef.current?.click()}
            className={`group rounded-[1.3rem] border border-dashed bg-white px-5 py-10 text-center transition hover:border-[#C42E5D] hover:bg-[#FFF8FA] ${
              fieldErrors["portfolioInfo.uploadedPreviewUrl"]
                ? "border-[#C42E5D] shadow-[0_0_0_4px_rgba(196,46,93,0.12)]"
                : "border-[#E8B8C8]"
            }`}
          >
            {previewUrl ? (
              <div className="mx-auto h-28 w-28 overflow-hidden rounded-[1.1rem] border border-[#F0D7DE] bg-[#FFF7FA] shadow-[0_18px_30px_-24px_rgba(90,0,31,0.28)]">
                {isVideoUpload ? (
                  <video
                    src={previewUrl}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="Selected gallery preview"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            ) : (
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FFF1F5_0%,#FFE6EE_100%)] text-[#B11F4D]">
                <Upload className="h-7 w-7" />
              </div>
            )}
            <h4 className="mt-5 text-[1.1rem] font-semibold text-[#2D2230]">
              Choose a {galleryTypeLabel} from your device
            </h4>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              {galleryPickerDescription}
            </p>
          </button>
          {fieldErrors["portfolioInfo.uploadedPreviewUrl"] ? (
            <span className="-mt-2 text-sm text-[#B4234D]">
              {fieldErrors["portfolioInfo.uploadedPreviewUrl"]}
            </span>
          ) : null}

          <div className="inline-flex w-full max-w-[240px] rounded-full border border-[#E8D3DA] bg-[#FFF6F8] p-1 shadow-[0_12px_24px_-24px_rgba(90,0,31,0.45)]">
            {(["Photo", "Video"] as const).map((type) => {
              const active = mediaType === type;

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onMediaTypeChange(type)}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-[linear-gradient(135deg,#8A1238_0%,#B11F4D_100%)] text-white shadow-[0_16px_24px_-20px_rgba(138,18,56,0.8)]"
                      : "bg-transparent text-[#7D4B5F] hover:text-[#8A1238]"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label={galleryCategoryLabel}
              value={portfolioInfo.category}
              onChange={(value) => onPortfolioInfoChange("category", value)}
              options={galleryCategoryOptions}
              placeholder="Select category"
              error={fieldErrors["portfolioInfo.category"]}
            />
            <Field
              label={galleryNameLabel}
              placeholder={galleryNamePlaceholder}
              value={portfolioInfo.title}
              onChange={(value) => onPortfolioInfoChange("title", value)}
              required={false}
              error={fieldErrors["portfolioInfo.title"]}
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-[#E7CAD3] bg-white px-5 py-3 text-sm font-semibold text-[#8A1238] transition hover:bg-[#FFF3F6]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={!galleryHasDraft}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                galleryHasDraft
                  ? "bg-[#8A1238] hover:bg-[#730F30]"
                  : "cursor-not-allowed bg-[#D8A8B8]"
              }`}
            >
              <Upload className="h-4 w-4" />
              Upload Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfilePhotoEditorModal({
  isOpen,
  onClose,
  frameRef,
  draft,
  metrics,
  safeOffsetX,
  safeOffsetY,
  editorSize,
  onPointerDown,
  onPointerMove,
  onPointerEnd,
  onScaleChange,
  onOffsetXChange,
  onOffsetYChange,
  initials,
  onChooseAnotherPhoto,
  onReset,
  onRemoveCurrentPhoto,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  frameRef: RefObject<HTMLDivElement | null>;
  draft: ProfilePhotoDraft;
  metrics: ProfilePhotoRenderMetrics;
  safeOffsetX: number;
  safeOffsetY: number;
  editorSize: number;
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  onPointerEnd: (event: PointerEvent<HTMLDivElement>) => void;
  onScaleChange: (value: number) => void;
  onOffsetXChange: (value: number) => void;
  onOffsetYChange: (value: number) => void;
  initials: string;
  onChooseAnotherPhoto: () => void;
  onReset: () => void;
  onRemoveCurrentPhoto: () => void;
  onSave: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2D2230]/50 px-3 py-3 backdrop-blur-[4px] sm:px-4 sm:py-5">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-full w-full items-center justify-center">
        <div className="relative z-10 flex w-full max-w-[min(780px,90vw)] flex-col overflow-hidden rounded-[1.35rem] border border-[#F0D9E0] bg-[linear-gradient(180deg,#FFFDFD_0%,#FFF6F9_100%)] shadow-[0_30px_80px_-35px_rgba(90,0,31,0.52)] sm:rounded-[1.55rem]">
          <div className="flex items-center justify-between border-b border-[#F2E3E7] px-4 py-3.5 sm:px-5 sm:py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A98391]">
                Profile Photo
              </p>
              <h3 className="mt-1 text-[1.18rem] font-semibold text-[#2D2230] sm:text-[1.3rem]">
                Adjust your profile picture
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E9D9DC] bg-white text-[#8A1238] transition hover:bg-[#FFF1F5]"
              aria-label="Close profile photo editor"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="max-h-[calc(100vh-5.75rem)] overflow-y-auto overscroll-contain">
            <div className="grid gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div className="space-y-3">
                <div className="rounded-[1.15rem] border border-[#F0D9E0] bg-white/95 p-3 shadow-[0_20px_36px_-28px_rgba(90,0,31,0.35)]">
                  <div
                    ref={frameRef}
                    className="mx-auto overflow-hidden rounded-[1.2rem] border border-dashed border-[#EABCC9] bg-[linear-gradient(180deg,#FFF8FA_0%,#FFF1F5_100%)] p-2.5"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#A98391] sm:text-xs">
                      <span>Drag to position</span>
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.62rem] tracking-[0.12em] text-[#8A1238] shadow-[0_12px_20px_-18px_rgba(90,0,31,0.3)]">
                        Zoom below
                      </span>
                    </div>
                    <div
                      className="relative mx-auto overflow-hidden rounded-[1.2rem] bg-[#F8E8EE] touch-none"
                      style={{ width: editorSize, height: editorSize }}
                      onPointerDown={onPointerDown}
                      onPointerMove={onPointerMove}
                      onPointerUp={onPointerEnd}
                      onPointerCancel={onPointerEnd}
                    >
                      {draft.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={draft.src}
                          alt="Profile photo editor"
                          className="absolute max-w-none select-none"
                          draggable={false}
                          style={{
                            width: metrics.renderWidth,
                            height: metrics.renderHeight,
                            left: `calc(50% + ${safeOffsetX}px)`,
                            top: `calc(50% + ${safeOffsetY}px)`,
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      ) : null}
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#F4D4DD]" />
                      <div className="pointer-events-none absolute inset-4 rounded-full border border-white/85 shadow-[0_0_0_999px_rgba(45,34,48,0.18)]" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 rounded-[1.15rem] border border-[#F0D9E0] bg-white/95 p-3 shadow-[0_20px_36px_-28px_rgba(90,0,31,0.18)] sm:grid-cols-2">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-sm font-semibold text-[#2D2230]">
                      <span>Zoom</span>
                      <span>{draft.scale.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="2.8"
                      step="0.1"
                      value={draft.scale}
                      onChange={(event) =>
                        onScaleChange(Number(event.target.value))
                      }
                      className="w-full accent-[#8A1238]"
                    />
                  </div>

                  <div className="hidden sm:block">
                    <div className="mb-1.5 flex items-center justify-between text-sm font-semibold text-[#2D2230]">
                      <span>Move Left / Right</span>
                      <span>{Math.round(safeOffsetX)} px</span>
                    </div>
                    <input
                      type="range"
                      min={String(-metrics.maxOffsetX)}
                      max={String(metrics.maxOffsetX)}
                      step="1"
                      value={safeOffsetX}
                      onChange={(event) =>
                        onOffsetXChange(Number(event.target.value))
                      }
                      className="w-full accent-[#8A1238]"
                    />
                  </div>

                  <div className="hidden sm:block sm:col-span-2">
                    <div className="mb-1.5 flex items-center justify-between text-sm font-semibold text-[#2D2230]">
                      <span>Move Up / Down</span>
                      <span>{Math.round(safeOffsetY)} px</span>
                    </div>
                    <input
                      type="range"
                      min={String(-metrics.maxOffsetY)}
                      max={String(metrics.maxOffsetY)}
                      step="1"
                      value={safeOffsetY}
                      onChange={(event) =>
                        onOffsetYChange(Number(event.target.value))
                      }
                      className="w-full accent-[#8A1238]"
                    />
                  </div>

                  <p className="text-sm leading-5 text-[#64748B] sm:hidden">
                    Drag the photo with your finger to center your face inside
                    the circle.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="rounded-[1.15rem] border border-[#F0D9E0] bg-white/95 p-3.5 text-center shadow-[0_20px_36px_-28px_rgba(90,0,31,0.18)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#A98391]">
                    Live Preview
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="h-24 w-24 overflow-hidden rounded-full border-[5px] border-[#F6D6DE] bg-white p-1.5 shadow-[0_16px_28px_-22px_rgba(90,0,31,0.32)] sm:h-28 sm:w-28">
                      {draft.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={draft.src}
                          alt="Profile photo preview"
                          className="h-full w-full rounded-full object-cover"
                          style={{
                            objectPosition: `${50 + (safeOffsetX / Math.max(metrics.maxOffsetX || 1, 1)) * 50}% ${50 + (safeOffsetY / Math.max(metrics.maxOffsetY || 1, 1)) * 50}%`,
                            transform: `scale(${draft.scale})`,
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#FFF7F9_0%,#FDECEF_100%)] text-[2rem] font-semibold text-[#8A1238]">
                          {initials}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-5 text-[#64748B]">
                    Make sure your face is centered and clearly visible for a
                    polished RoopSetu profile.
                  </p>
                </div>

                <div className="rounded-[1.15rem] border border-[#F0D9E0] bg-white/95 p-3.5 shadow-[0_20px_36px_-28px_rgba(90,0,31,0.18)]">
                  <button
                    type="button"
                    onClick={onChooseAnotherPhoto}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E7CAD3] bg-white px-4 py-2.5 text-sm font-semibold text-[#8A1238] transition hover:bg-[#FFF3F6]"
                  >
                    <ImagePlus className="h-4 w-4" />
                    Choose another photo
                  </button>
                  <button
                    type="button"
                    onClick={onReset}
                    className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E7CAD3] bg-white px-4 py-2.5 text-sm font-semibold text-[#8A1238] transition hover:bg-[#FFF3F6]"
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Reset adjustments
                  </button>
                  <button
                    type="button"
                    onClick={onRemoveCurrentPhoto}
                    className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#F1D7DD] bg-white px-4 py-2.5 text-sm font-semibold text-[#B11F4D] transition hover:bg-[#FFF5F7]"
                  >
                    Remove current photo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2.5 border-t border-[#F2E3E7] bg-white/80 px-4 py-3 sm:flex-row sm:justify-end sm:px-5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-[#E7CAD3] bg-white px-5 py-2.5 text-sm font-semibold text-[#8A1238] transition hover:bg-[#FFF3F6]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              className="inline-flex items-center justify-center rounded-xl bg-[#8A1238] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#730F30]"
            >
              Save profile photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
