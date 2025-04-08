"use client";

import { Camera } from "lucide-react";
import Image from "next/image";
import type { FieldValues } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import noImage from "@/public/no-image2.png";
import noUser from "@/public/no-user.svg";
import { LoadingSpinner } from "@/tools";
import useFormUploadFieldFeatures from "./feautes";
import type { FormUploadFieldPropsI } from "./interface";
import Loading from "./loading";

const FormUploadField = <T extends FieldValues>({
	form,
	name,
	label,
	loading,
}: FormUploadFieldPropsI<T>) => {
	const { preview, uploading, inputRef, handleFileChange } =
		useFormUploadFieldFeatures(form.getValues(name));

	return (
		<FormField
			name={name}
			control={form.control}
			render={({ field }) => {
				return (
					<FormItem>
						<FormLabel>{label}</FormLabel>
						<FormControl>
							{loading ? (
								<Loading name={name} />
							) : (
								<div className="flex items-center">
									<div className="relative">
										<Image
											src={preview || (name === "imageUrl" ? noImage : noUser)}
											width={120}
											height={120}
											className={cn(
												name === "profilePhoto" && "rounded-full ",
												name === "imageUrl" && "p-3 rounded-lg",
												"object-cover w-[100px] h-[100px] md:w-[120px] md:h-[120px] border border-solid",
											)}
											alt="Uploaded Preview"
										/>
										<div
											onClick={() => inputRef.current?.click()}
											onKeyUp={() => inputRef.current?.click()}
											className={cn(
												name === "profilePhoto" ? "-right-0" : "-right-3",
												"bg-[#F6F6F6] flex items-center justify-center absolute bottom-2 border w-7 h-7 rounded-full shadow-2xl custom-shadow cursor-pointer p-1",
											)}
										>
											{uploading ? (
												<LoadingSpinner
													className={cn(
														name === "imageUrl" && "border-gray-300",
														name === "profilePhoto" && "text-black",
														"text-[20px]",
													)}
													size="sm"
												/>
											) : (
												<Camera className={cn("text-[22px] text-[#6C6C6C]")} />
											)}
										</div>
										<Input
											ref={inputRef}
											type="file"
											onChange={(e) => handleFileChange(e, field.onChange)} // Pass field.onChange to update form value
											className="hidden"
											accept="image/jpeg, image/png, image/gif, image/svg+xml, image/webp"
											disabled={uploading}
										/>
									</div>
								</div>
							)}
						</FormControl>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};

export default FormUploadField;
