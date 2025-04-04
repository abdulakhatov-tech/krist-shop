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
import noImage from "@/public/no-image.svg";
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
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<div>
							{loading ? (
								<Loading />
							) : (
								<div className="flex flex-col lg:flex-row gap-4">
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
											className="px-4 w-full lg:w-[110px] h-[110px] bg-[#000a14] text-white rounded-md flex flex-col justify-center items-center gap-2 cursor-pointer"
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
											className="w-full lg:w-[110px] h-[110px] bg-[#000a14] text-white rounded-md flex flex-col justify-center items-center gap-2 cursor-pointer"
										>
											Select Files <Upload />
										</div>
									)}

									<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
										{/* Preview Images */}
										{[...Array(4)].map((_, index: number) => (
											<div key={crypto.randomUUID()} className="relative">
												<Image
													src={previews[index] || noImage}
													className={cn(
														!previews[index]
															? "p-8 bg-[#556080] border object-contain"
															: "object-cover",
														"rounded-lg w-full lg:w-[110px] h-[110px] border border-solid",
													)}
													alt="Uploaded Preview"
												/>
												{uploading[index] && (
													<div className="absolute inset-0 bg-black rounded-lg bg-opacity-50 flex items-center justify-center">
														<LoadingSpinner className="text-white" />
													</div>
												)}
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
										accept="image/jpeg, image/png, image/gif"
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
