import { isAxiosError } from "axios";
import { useEffect, useRef, useState } from "react";

import { useAxios } from "@/services/api/axios.service";
import { toast } from "sonner";

const useFormUploadFieldFeatures = (defaultValue?: string) => {
	const $axios = useAxios();
	const inputRef = useRef<HTMLInputElement>(null);
	const [uploading, setUploading] = useState(false);
	const [preview, setPreview] = useState<string | null>(defaultValue || null);

	const handleFileChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: string) => void,
	) => {
		const file = e.target.files?.[0];
		if (!file) return toast.error("No file selected.");

		setUploading(true);

		try {
			// Show preview immediately
			const reader = new FileReader();
			reader.onloadend = () => setPreview(reader.result as string);
			reader.readAsDataURL(file);

			// Upload to server
			const formData = new FormData();
			formData.append("image", file);

			const response = await $axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/image`,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } },
			);

			const { data } = response.data;
			onChange(data?.image_url); // Update form value with image URL
		} catch (error) {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error("Failed to upload image.", {
					description: "Please check your connection and try again.",
				});
			}
		} finally {
			setUploading(false);
		}
	};

	// Effect to update preview on the defaultValue change (for editing case)
	useEffect(() => {
		setPreview(defaultValue || null);
	}, [defaultValue]);

	return {
		preview,
		uploading,
		inputRef,
		handleFileChange,
	};
};

export default useFormUploadFieldFeatures;
