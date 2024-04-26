import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";

import { useSortable } from "@dnd-kit/sortable";

export interface SortableItemProps {
	id: number;
	item: any;
	controls?: React.ReactNode;
}

/**
 * A sortable item.
 * @param id The id of the item.
 * @param item The item to be rendered.
 */
export const SortableItem: FC<SortableItemProps> = ({ id, item, controls }) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: id,
		transition: { duration: 400, easing: "cubic-bezier(0.25, 1, 0.5, 1)" },
		animateLayoutChanges: () => false,
	});

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};

	return (
		<>
			<div ref={setNodeRef} {...attributes} {...listeners} style={style}>
				{item}
			</div>
			{controls}
		</>
	);
};
