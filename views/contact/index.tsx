"use client";

import { FormInput, FormTextarea } from "@/components/form";
import GenericBreadcrumb from "@/components/generics/breadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import { contactPageLinks } from "@/utils/mock-data/breadcrumbs";
import { Mail, Phone } from "lucide-react";
import useContactFeatures from "./features";

const ContactPageView = () => {
	const { form, hasErrors, handleFormSubmit } = useContactFeatures();
	const { isSubmitting } = form.formState;

	return (
		<section id="contact-page" className="pb-20">
			<div className="container">
				<GenericBreadcrumb links={contactPageLinks} />

				<div className="grid lg:grid-cols-[1fr_2.5fr] gap-4">
					<div className="grid md:grid-cols-2 lg:grid-cols-1 gap-4 bg-accent p-8 shadow-md">
						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-full bg-[#DB4444] w-fit text-white">
									<Phone />
								</div>
								<h4 className="text-lg font-medium leading-[24px]">
									Call To Us
								</h4>
							</div>
							<p>We are available 24/7, 7 days a week.</p>
							<p>Phone: +998991111111</p>
						</div>

						<Separator className="hidden lg:block" />

						<div className="flex flex-col gap-2">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-full bg-[#DB4444] w-fit text-white">
									<Mail />
								</div>
								<h4 className="text-lg font-medium leading-[24px]">
									Write To Us
								</h4>
							</div>
							<p>Fill out our form and we will contact you within 24 hours.</p>
							<p>Emails: islomabdulakhatov@gmail.com</p>
						</div>
					</div>

					<div className="bg-accent p-8 shadow-md">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(handleFormSubmit)}
								className="flex flex-col gap-4"
							>
								<div className="grid md:grid-cols-3 gap-4">
									<FormInput form={form} name="name" label="Name" />
									<FormInput form={form} name="email" label="Email" />
									<FormInput
										form={form}
										name="phoneNumber"
										label="Phone Number"
									/>
								</div>
								<FormTextarea
									form={form}
									name="message"
									label="Message"
									rows={16}
								/>

								{/* Button */}
								<Button
									type="submit"
									disabled={isSubmitting}
									className={cn(hasErrors && "button-error", "mt-4")}
								>
									{isSubmitting ? <LoadingSpinner /> : ""}{" "}
									{isSubmitting ? "Signing In..." : "Sign In"}
								</Button>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactPageView;
