import { FC } from "react";
import {
	SortableContext,
	arrayMove,
	horizontalListSortingStrategy,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { reorderBlocks } from "../../reducers/projectReducer";
import { useDispatch } from "react-redux";

export interface SortableListItem {
	id: number;
	item: any;
}

interface SortableListProps {
	items: SortableListItem[];
	direction: "horizontal" | "vertical";
	itemType: "block" | "row" | "stitch";
}

/**
 * Creates a container for items which can be sorted via drag and drop.
 * @param items The items to be rendered.
 * @param direction The direction in which the items should be displayed.
 * @param itemType The type of item being sorted.
 */
export const SortableList: FC<SortableListProps> = ({ items, direction, itemType }) => {
	const dispatch = useDispatch();

	/**
	 * Reorders the blocks to match the new positions.
	 */
	const handleDragEnd = event => {
		const { active, over } = event;

		// cancel if no active or over
		if (!over) return;

		// cancel if dragging back to original position
		if (active.id === over.id) return;

		// reorder blocks to match new positions
		const reorderedItems = arrayMove(
			items,
			items.findIndex(item => item.id === active.id),
			items.findIndex(item => item.id === over.id),
		);

		if (itemType === "block") {
			dispatch(
				reorderBlocks(
					reorderedItems.map(item => {
						return {
							currentBlockRow: item.item.props.currentBlockRow,
							stitches: item.item.props.stitches,
							blockName: item.item.props.blockName,
						};
					}),
				),
			);
		}
	};

	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
