import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function ButtonGroup({ id }: { id: string }) {
  return (
    <span className="flex gap-4">
      <EditButton />
      <DeleteButton id={id} />
    </span>
  );
}
