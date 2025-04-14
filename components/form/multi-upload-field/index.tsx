"use client";

import { Upload } from "lucide-react";
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
import { LoadingSpinner } from "@/tools";
import useFormMultiUploadFieldFeatures from "./features";
import type { FormMultiUploadFieldPropsI } from "./interface";
import Loading from "./loading";

const FormMultiUploadField = <T extends FieldValues>({
	form,
	name,
	label,
	loading,
}: FormMultiUploadFieldPropsI<T>) => {
	const {
		files,
		previews,
		inputRef,
		uploading,
		uploadAllFiles,
		handleFileChange,
		handleButtonClick,
	} = useFormMultiUploadFieldFeatures(form.getValues(name));

	return (
		<FormField
			name={name}
			control={form.control}
			render={({ field }) => (
				<FormItem className="w-full overflow-hidden">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<div>
							{loading ? (
								<Loading />
							) : (
								<div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4">
									{/* Upload Button */}

									{/* Upload All Button - Only shown when files are selected */}
									{files.length === 4 ? (
										<div
											onClick={uploadAllFiles}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													uploadAllFiles();
												}
											}}
											className="p-4 w-full lg:w-[120px] h-[100px] md:h-[120px] bg-[#000a14] text-white rounded-md flex flex-col justify-center items-center gap-2 cursor-pointer"
										>
											Upload All
										</div>
									) : (
										<div
											onClick={handleButtonClick}
											onKeyDown={(e) => {
												if (e.key === "Enter" || e.key === " ") {
													handleButtonClick();
												}
											}}
											className="p-4 w-full lg:w-[120px] h-[100px] md:h-[120px] bg-[#000a14] text-white rounded-md flex flex-col justify-center items-center gap-2 cursor-pointer"
										>
											Select Files <Upload />
										</div>
									)}

									<div className="grid auto-cols-max grid-flow-col sm:grid-cols-4 gap-4 max-w-fit overflow-x-auto pr-4">
										{/* Preview Images */}
										{[...Array(4)].map((_, index: number) => (
											<div key={crypto.randomUUID()} className="relative w-fit">
												<Image
													src={previews[index] || noImage}
													width={110}
													height={110}
													className={cn(
														!previews[index]
															? "p-3 border object-contain"
															: "object-cover",
														"rounded-lg w-[100px] h-[100px] md:w-[120px] md:h-[120px] border border-solid",
													)}
													alt="Uploaded Preview"
												/>
												<div className="absolute bottom-2 -right-3">
													<span
														className={cn(
															"w-7 h-7 p-[2px] center rounded-full shadow-2xl custom-shadow cursor-pointer bg-gray-200 border-2 border-gray-300 text-[#6C6C6C]",
														)}
													>
														{uploading[index] ? <LoadingSpinner /> : index + 1}
													</span>
												</div>
											</div>
										))}
									</div>

									{/* Hidden Input for Image Selection */}
									<Input
										ref={inputRef}
										type="file"
										multiple
										onChange={(e) => handleFileChange(e, field.onChange)}
										className="hidden"
										accept="image/jpeg, image/png, image/gif, image/svg+xml, image/webp"
									/>
								</div>
							)}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default FormMultiUploadField;
