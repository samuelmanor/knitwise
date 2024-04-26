import { FC } from "react";
import {
	SortableContext,
	arrayMove,
	horizontalListSortingStrategy,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem, SortableItemProps } from "./SortableItem";
import { DndContext, MouseSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { reorderBlocks, reorderRows } from "../../reducers/projectReducer";
import { useDispatch } from "react-redux";

interface SortableListProps {
	items: SortableItemProps[];
	direction: "horizontal" | "vertical";
}

/**
 * Creates a container for items which can be sorted via drag and drop.
 * @param items The items to be rendered.
 * @param direction The direction in which the items should be displayed.
 * @param itemType The type of item being sorted.
 */
export const SortableList: FC<SortableListProps> = ({ items, direction }) => {
	const dispatch = useDispatch();

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
	);

	/**
	 * Determines the type of item being sorted.
	 */
	const testItemType = (): "block" | "row" | "stitch" => {
		if (items[0].item.props.hasOwnProperty("currentBlockRow")) {
			return "block";
		} else if (items[0].item.props.hasOwnProperty("rowIndex")) {
			return "row";
		} else if (items[0].item.props.hasOwnProperty("abbreviation")) {
			return "stitch";
		}
	};

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

		// extract the relevant props from the items and update the store
		if (testItemType() === "block") {
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
		} else if (testItemType() === "row") {
			const stitches = reorderedItems.map(item => item.item.props.stitches);
			dispatch(reorderRows({ stitches, blockIndex: reorderedItems[0].item.props.blockIndex }));
		}
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
