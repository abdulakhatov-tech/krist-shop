"use client";

import { get } from "lodash";
import { Trash2 } from "lucide-react";

import { FormInput, FormSelect } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/tools";
import useStockFormModalFeatures from "./features";

const StockFormModal = () => {
	const {
		form,
		isOpen,
		fields,
		append,
		remove,
		initialValue,
		handleFormSubmit,
		handleOpenChange,
		handleNameChange,
		isProductDataLoading,
	} = useStockFormModalFeatures();

	const error = get(form.formState.errors, "items")?.message;
	const { isSubmitting, isDirty } = form.formState;

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent className="md:min-w-[750px] lg:min-w-[1000px] xl:min-w-[1200px]">
				<DialogTitle>Increase Stock</DialogTitle>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleFormSubmit)}
						className="flex flex-col gap-4 max-h-[82vh] overflow-y-scroll"
					>
						{fields?.map((field, index) => (
							<div
								key={field.id}
								className="relative border p-4 rounded-xl shadow-sm"
							>
								<div className="flex items-center justify-between mb-2">
									<h4 className="font-bold">Stock {index + 1}</h4>
									<Button
										type="button"
										variant={"outline"}
										onClick={() => remove(index)}
										className="text-destructive hover:opacity-70 transition"
									>
										<Trash2 size={18} />
									</Button>
								</div>

								<div className="grid gap-2 md:gap-4 grid-cols-1 items-start sm:grid-cols-2 lg:grid-cols-4">
									<FormInput
										form={form}
										type="color"
										name={`items.${index}.color`}
										label="Color"
										placeholder="Enter color"
										onChange={(e) => handleNameChange(e.target.value, index)}
										loading={isProductDataLoading}
									/>

									<FormInput
										form={form}
										name={`items.${index}.colorText`}
										label="Color Text (#ffffff)"
										placeholder="Enter color text"
										onChange={(e) => handleNameChange(e.target.value, index)}
										loading={isProductDataLoading}
									/>

									<FormSelect
										form={form}
										name={`items.${index}.size`}
										label="Size"
										items={[
											{ name: "S", id: "s" },
											{ name: "M", id: "m" },
											{ name: "L", id: "l" },
											{ name: "XL", id: "xl" },
											{ name: "XXL", id: "xxl" },
										]}
										placeholder="Select size"
										loading={isProductDataLoading}
									/>

									<FormInput
										form={form}
										name={`items.${index}.quantity`}
										type="number"
										label="Quantity"
										placeholder="Enter quantity amount"
										loading={isProductDataLoading}
									/>
								</div>
							</div>
						))}

						{error && (
							<p className="text-sm text-red-500 mt-1 text-center">{error}</p>
						)}

						<Button
							type="button"
							onClick={() => append(initialValue)}
							variant="outline"
							className="w-full mt-4"
						>
							+ Add Stock Option
						</Button>

						<Button
							type="submit"
							size="lg"
							disabled={isSubmitting || !isDirty}
							className={cn(error && "button-error")}
						>
							{isSubmitting ? <LoadingSpinner /> : ""} Save Changes
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default StockFormModal;
