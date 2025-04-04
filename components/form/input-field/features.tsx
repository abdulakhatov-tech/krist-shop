"use client";

import type { FieldValues } from "react-hook-form";

import { isEmail } from "@/utils/helper-fns/email";
import { formatPhoneNumber } from "@/utils/helper-fns/phone";
import type { FormInputFieldPropsI } from "./interface";

const useInputFieldFeatures = ({
	onChange,
	name,
}: Pick<FormInputFieldPropsI<FieldValues>, "onChange" | "name">) => {
	const handleIdentifier = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: { onChange: (value: string) => void },
	) => {
		const value = isEmail(e.target.value)
			? e.target.value
			: formatPhoneNumber(e.target.value);

		field.onChange(value);

		if (onChange) {
			onChange(e);
		}
	};

	const onChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: { onChange: (value: string) => void },
	) => {
		// Check if the name is 'identifier' and handle accordingly
		if (name === "identifier") {
			handleIdentifier(e, field);
		} else {
			const value = e.target.value;
			field.onChange(value);
			if (onChange) onChange(e);
		}
	};

	return { onChangeHandler };
};

export default useInputFieldFeatures;
