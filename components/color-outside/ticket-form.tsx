"use client";

import { type ReactNode, useActionState, useState } from "react";

import {
  type RegistrationState,
  submitRegistration,
} from "@/app/actions/register";
import type { HappilyEnv, PublicForm } from "@/lib/happily/types";

import { CTAArrow, ctaClassName } from "./primitives";

const INITIAL: RegistrationState = { ok: false };

const FIELD = "co-input co-focus";

function inputType(t: string) {
  if (t === "email") return "email";
  if (t === "tel" || t === "phone") return "tel";
  if (t === "number") return "number";
  if (t === "date") return "date";
  return "text";
}

/** Splits a typed name on the last space; the action wants the two halves. */
function splitName(full: string) {
  const trimmed = full.trim().replace(/\s+/g, " ");
  const cut = trimmed.lastIndexOf(" ");
  if (cut === -1) return { firstName: trimmed, lastName: "" };
  return {
    firstName: trimmed.slice(0, cut),
    lastName: trimmed.slice(cut + 1),
  };
}

export function TicketForm({
  eventId,
  env,
  form,
  cta,
  intro,
}: {
  eventId: string;
  env: HappilyEnv;
  form: PublicForm;
  cta: string;
  /**
   * Copy rendered alongside the fields. It lives inside the <form> so the
   * submit button can span the whole card rather than just the field column.
   */
  intro?: ReactNode;
}) {
  const action = submitRegistration.bind(null, {
    eventId,
    env,
    formId: form.id,
    formType: 2,
    redirectTo: "/confirmation",
  });
  const [state, formAction, isPending] = useActionState(action, INITIAL);
  const [fullName, setFullName] = useState("");

  if (!form.is_active) {
    return (
      <p className="mt-8 text-base font-semibold">Registration is closed.</p>
    );
  }
  if (form.at_capacity) {
    return (
      <p className="mt-8 text-base font-semibold">We&apos;re at capacity.</p>
    );
  }

  const props = form.content.formSchema.properties;
  const field = (id: string) => props[id];
  const marketing = field("marketingOptIn");
  const { firstName, lastName } = splitName(fullName);

  return (
    <form action={formAction}>
      {/* The API models a first/last pair; the page asks for one name and
          splits it, so the request shape stays unchanged. */}
      <input type="hidden" name="firstName" value={firstName} />
      <input type="hidden" name="lastName" value={lastName} />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {intro ? <div className="lg:col-span-5">{intro}</div> : null}

        <div
          className={`grid gap-4 sm:grid-cols-2 ${
            intro ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-12"
          }`}
        >
          <div>
            <label htmlFor="co-fullName" className="co-micro mb-2 block">
              Full name *
            </label>
            <input
              id="co-fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={FIELD}
            />
          </div>

          {field("title")?.enabled ? (
            <div>
              <label htmlFor="co-title" className="co-micro mb-2 block">
                Creative role{field("title").required ? " *" : ""}
              </label>
              <input
                id="co-title"
                name="title"
                type="text"
                required={field("title").required}
                autoComplete="organization-title"
                className={FIELD}
              />
            </div>
          ) : null}

          {field("emailAddress")?.enabled ? (
            <div>
              <label htmlFor="co-email" className="co-micro mb-2 block">
                {field("emailAddress").title}
                {field("emailAddress").required ? " *" : ""}
              </label>
              <input
                id="co-email"
                name="email"
                type={inputType(field("emailAddress").inputType)}
                required={field("emailAddress").required}
                autoComplete="email"
                className={FIELD}
              />
            </div>
          ) : null}

          {field("phoneNumber")?.enabled ? (
            <div>
              <label htmlFor="co-phone" className="co-micro mb-2 block">
                {field("phoneNumber").title}
                {field("phoneNumber").required ? " *" : ""}
              </label>
              <input
                id="co-phone"
                name="phoneNumber"
                type={inputType(field("phoneNumber").inputType)}
                required={field("phoneNumber").required}
                autoComplete="tel"
                className={FIELD}
              />
            </div>
          ) : null}

          {marketing?.enabled && marketing.items?.enum?.length ? (
            <fieldset className="sm:col-span-2">
              <legend className="co-micro mb-2">
                {marketing.title}
                {marketing.required ? " *" : ""}
              </legend>
              {marketing.items.enum.map((option) => (
                <label
                  key={option}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                >
                  <input
                    type="checkbox"
                    name="marketingOptIn"
                    value={option}
                    required={marketing.required}
                    className="co-check co-focus mt-0.5"
                  />
                  {option}
                </label>
              ))}
            </fieldset>
          ) : null}
        </div>
      </div>

      {state.message ? (
        <p
          role="status"
          className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${
            state.ok ? "bg-mint text-ink" : "bg-ink text-cream"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <div className="mt-8">
        <button
          type="submit"
          disabled={isPending}
          className={ctaClassName({ tone: "butter", block: true })}
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            {isPending ? "Sending…" : cta}
          </span>
          <CTAArrow />
        </button>
      </div>
    </form>
  );
}
