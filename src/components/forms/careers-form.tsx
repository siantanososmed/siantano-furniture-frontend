"use client";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useMutation } from "@tanstack/react-query";
import { postCareers } from "@/actions/action";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

const careersFormValidation = (t: (arg: string) => string) =>
  z.object({
    name: z.string().min(1, t("name.errors.required")),
    email: z.email(t("email.errors.invalid")),
    phone: z
      .string()
      .trim()
      .refine(
        (value) => {
          const phone = parsePhoneNumberFromString(value);
          return phone?.isValid() ?? false;
        },
        {
          message: t("phoneNumber.errors.invalid"),
        }
      )
      .transform((value) => {
        const phone = parsePhoneNumberFromString(value);
        return phone ? phone.number : value;
      }),
    cv: z
      .any()
      .refine((file) => file?.length === 1, t("cv.errors.required"))
      .transform((file) => file?.[0]),
  });

export default function CareersForm({
  jobSlug,
  experience,
  position,
}: {
  jobSlug: string;
  position: string;
  experience: string;
}) {
  const subjectId = useId();
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const cvId = useId();
  const t = useTranslations("Careers.form");

  const careersFormValidationTranslateable = careersFormValidation(t);
  type CareersFormState = z.infer<typeof careersFormValidationTranslateable>;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CareersFormState>({
    resolver: zodResolver(careersFormValidationTranslateable),
  });

  const applyCareersMutation = useMutation({
    mutationFn: postCareers,
  });

  const onSubmit = (data: CareersFormState) => {
    applyCareersMutation.mutate(
      {
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        cv: data.cv,
        jobSlug,
      },
      {
        onSuccess: () => {
          toast.success(t("successMessage"));
          reset();
        },
        onError: () => {
          toast.error(t("errorMessage"));
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Field data-aos="fade-left" orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor={subjectId}>{t("subject.label")}</FieldLabel>
              <Input
                id={subjectId}
                disabled
                value={t("subject.prefix", {
                  job: `${position} - ${experience}`,
                })}
                className="md:min-w-96 text-primary disabled:opacity-75"
                required
                tabIndex={-1}
              />
            </FieldContent>
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field data-aos="fade-right" orientation="vertical">
              <FieldContent data-invalid={!!errors.name}>
                <FieldLabel htmlFor={nameId}>
                  <div>
                    <span>{t("name.label")}</span>
                    <span className="text-destructive">*</span>
                  </div>
                </FieldLabel>
                <Input
                  id={nameId}
                  placeholder={t("name.placeholder")}
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                <FieldError>{errors.name?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field data-aos="fade-left" orientation="vertical">
              <FieldContent data-invalid={!!errors.email}>
                <FieldLabel htmlFor={emailId}>
                  <div>
                    <span>{t("email.label")}</span>
                    <span className="text-destructive">*</span>
                  </div>
                </FieldLabel>
                <Input
                  id={emailId}
                  type="email"
                  placeholder={t("email.placeholder")}
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                <FieldError>{errors.email?.message}</FieldError>
              </FieldContent>
            </Field>
          </div>
          <Field data-aos="fade-right" orientation="responsive">
            <FieldContent data-invalid={!!errors.phone}>
              <FieldLabel htmlFor={phoneId}>
                <div>
                  <span>{t("phoneNumber.label")}</span>
                  <span className="text-destructive">*</span>
                </div>
              </FieldLabel>
              <Input
                id={phoneId}
                type="tel"
                placeholder={t("phoneNumber.placeholder")}
                className="md:min-w-96"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
              <FieldError>{errors.phone?.message}</FieldError>
            </FieldContent>
          </Field>
          <Field data-aos="fade-left" orientation="responsive">
            <FieldContent data-invalid={!!errors.cv}>
              <FieldLabel htmlFor={cvId}>
                <div>
                  <span>{t("cv.label")}</span>
                  <span className="text-destructive">*</span>
                </div>
              </FieldLabel>
              <Input
                id={cvId}
                type="file"
                className="md:min-w-96"
                {...register("cv")}
                aria-invalid={!!errors.cv}
              />
              <FieldError>{errors.cv?.message?.toString()}</FieldError>
            </FieldContent>
          </Field>
          <FieldSeparator data-aos="fade-up" />
          <Field orientation="responsive">
            <Button
              disabled={applyCareersMutation.isPending}
              type="submit"
              className="min-w-full"
            >
              {applyCareersMutation.isPending ? <Spinner /> : t("submit")}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
