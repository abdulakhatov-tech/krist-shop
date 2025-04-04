import { isAxiosError } from "axios";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { useAxios } from "@/services/api/axios.service";

const useFormMultiUploadFieldFeatures = (defaultValues: string[] = []) => {
	const $axios = useAxios();
	const inputRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useState<File[]>([]);
	const [uploading, setUploading] = useState<boolean[]>([]);
	const [previews, setPreviews] = useState<string[]>(defaultValues);

	const handleFileChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: string[]) => void,
	) => {
		const selectedFiles = e.target.files;
		if (!selectedFiles || selectedFiles.length === 0) {
			return toast.error("No files selected.");
		}

		// Limit to 4 files
		const filesArray = Array.from(selectedFiles).slice(0, 4);
		setFiles(filesArray);

		// Generate previews
		const newPreviews: string[] = [...previews]; // Start with existing previews
		const newUploading: boolean[] = [];

		const fileReaders = filesArray.map((file, index) => {
			return new Promise<void>((resolve) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					newPreviews[index] = reader.result as string;
					newUploading[index] = false;
					resolve();
				};
				reader.readAsDataURL(file);
			});
		});

		await Promise.all(fileReaders);
		setPreviews(newPreviews);
		onChange(newPreviews);
	};

	const uploadAllFiles = async () => {
		if (files.length === 0) {
			return toast.error("Please select files first.");
		}

		if (files.length < 4) {
			return toast.error("Please upload 4 images");
		}

		// Set uploading state for each file
		setUploading(files.map(() => true));

		try {
			const formData = new FormData();
			for (const file of files) {
				formData.append("images", file);
			}

			const response = await $axios.post(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/images`,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } },
			);

			const { data } = response.data;
			const newPreviews = data?.image_urls || [];
			setPreviews(newPreviews);
			setFiles([]); // Clear files after upload
			toast.success("Images uploaded successfully!");
		} catch (error) {
			if (isAxiosError(error)) {
				toast.error(error?.response?.data?.message);
			} else {
				toast.error("Failed to upload images.");
			}
		} finally {
			setUploading([]);
		}
	};

	const handleButtonClick = () => {
		inputRef.current?.click(); // Trigger file input
	};

	return {
		files,
		previews,
		inputRef,
		uploading,
		uploadAllFiles,
		handleFileChange,
		handleButtonClick,
	};
};

export default useFormMultiUploadFieldFeatures;
