"use client";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString from "libphonenumber-js";
import { postContactUs } from "@/actions/action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

const contactUsFormValidation = (t: (arg: string) => string) =>
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
    subject: z.string().min(1, t("subject.errors.required")),
    message: z.string().min(10, t("message.errors.minimum")),
  });

export default function ContactUsForm() {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const subjectId = useId();
  const messageId = useId();
  const t = useTranslations("ContactUs.form");
  const contactUsFormValidationTranslateable = contactUsFormValidation(t);

  type ContactUsFormState = z.infer<
    typeof contactUsFormValidationTranslateable
  >;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ContactUsFormState>({
    resolver: zodResolver(contactUsFormValidationTranslateable),
  });

  const contactUsMutation = useMutation({
    mutationFn: postContactUs,
  });

  const onSubmit = (data: ContactUsFormState) => {
    contactUsMutation.mutate(
      {
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        subject: data.subject,
        message: data.message,
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
    <form className="text-left" onSubmit={handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <div className="grid md:grid-cols-2 gap-5">
            <Field orientation="responsive">
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
            <Field orientation="responsive">
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
          <div className="grid md:grid-cols-2 gap-5">
            <Field orientation="responsive">
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
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                />
                <FieldError>{errors.phone?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field orientation="responsive">
              <FieldContent data-invalid={!!errors.subject}>
                <FieldLabel htmlFor={subjectId}>
                  <div>
                    <span>{t("subject.label")}</span>
                    <span className="text-destructive">*</span>
                  </div>
                </FieldLabel>
                <Input
                  id={subjectId}
                  type="text"
                  placeholder={t("subject.placeholder")}
                  {...register("subject")}
                  aria-invalid={!!errors.subject}
                />
                <FieldError>{errors.subject?.message}</FieldError>
              </FieldContent>
            </Field>
          </div>
          <Field orientation="responsive">
            <FieldContent data-invalid={!!errors.message}>
              <FieldLabel htmlFor={messageId}>
                <div>
                  <span>{t("message.label")}</span>
                  <span className="text-destructive">*</span>
                </div>
              </FieldLabel>
              <Textarea
                id={messageId}
                placeholder={t("message.placeholder")}
                className="min-h-[140px] resize-none"
                {...register("message")}
                aria-invalid={!!errors.message}
              />
              <FieldError>{errors.message?.message}</FieldError>
            </FieldContent>
          </Field>
          <Field orientation="responsive" className="justify-center">
            <Button
              disabled={contactUsMutation.isPending}
              type="submit"
              className="w-full"
            >
              {contactUsMutation.isPending ? <Spinner /> : t("submit")}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
