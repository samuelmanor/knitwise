import { FC } from "react";
import {
	SortableContext,
	arrayMove,
	horizontalListSortingStrategy,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem, SortableItemProps } from "./SortableItem";
import { DndContext, MouseSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";

interface SortableListProps {
	items: SortableItemProps[];
	direction: "horizontal" | "vertical";
	onSortEnd?: (items: SortableItemProps[]) => void;
}

/**
 * Creates a container for items which can be sorted via drag and drop.
 * @param items The items to be rendered.
 * @param direction The direction in which the items should be displayed.
 * @param onSortEnd Callback function to be called when sorting ends, with the new order of items.
 */
export const SortableList: FC<SortableListProps> = ({ items, direction, onSortEnd }) => {
	/**
	 * Initializes the sensors for drag and drop functionality.
	 */
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
	);

	/**
	 * Reorders the blocks to match the new positions.
	 */
	const handleDragEnd = event => {
		const { active, over } = event;

		// cancel if invalid drop
		if (!over) return;

		// cancel if dragging back to original position
		if (active.id === over.id) return;

		// reorder blocks to match new positions and call onSortEnd callback
		onSortEnd(
			arrayMove(
				items,
				items.findIndex(item => item.id === active.id),
				items.findIndex(item => item.id === over.id),
			),
		);
	};

	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
			<SortableContext
				items={items}
				strategy={direction === "vertical" ? verticalListSortingStrategy : horizontalListSortingStrategy}
			>
				{items.map((item, i) => (
					<SortableItem key={i} {...item} />
				))}
			</SortableContext>
		</DndContext>
	);
};
