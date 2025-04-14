"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
	rating: number; // 0 to 5
	reviewCount?: number;
	maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
	rating,
	reviewCount,
	maxStars = 5,
}) => {
	return (
		<div className="flex items-center gap-2">
			<div className="flex items-center gap-0">
				{[...Array(maxStars)].map((_, index) => (
					<Star
						key={crypto.randomUUID()}
						className={`w-5 h-5 ${
							index < Math.floor(rating)
								? "fill-[orange] text-[orange]"
								: "fill-[grey] text-[grey]"
						}`}
					/>
				))}
			</div>
			<span>{rating}</span>
			{reviewCount ? <span>({reviewCount})</span> : ""}
		</div>
	);
};

export default StarRating;
