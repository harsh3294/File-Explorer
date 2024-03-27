import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Trash } from "lucide-react";
import { useState } from "react";

function Folder({
  handleInsertNode,
  handleUpdateNode,
  handleDeleteNode,
  explorer,
}: FolderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showInput, setShowInput] = useState<ShowInputProps>({
    isFolder: null,
    isVisible: false,
  });
  const [activeItemId, setActiveItemId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleShowInput = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isFolder: boolean
  ) => {
    event.stopPropagation();
    setIsOpen(true);
    setShowInput({ isVisible: true, isFolder });
  };

  const handleCreateNewFileOrFolder = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    let input = event.target as HTMLInputElement;
    if (event.key === "Enter" && input.value) {
      handleInsertNode(explorer.id, input.value, showInput.isFolder ?? false);

      setShowInput({ ...showInput, isVisible: false });
    }
  };

  const handleRename = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    fileFolderId: string,
    fileFolderName: string
  ) => {
    event.stopPropagation();
    setIsEditing(true);
    setActiveItemId(fileFolderId); // Set the active item being edited
    setRenameValue(fileFolderName);
  };

  const handleRenameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRenameValue(event.target.value);
  };

  const handleRenameSubmit =
    (fileFolderId: string) =>
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleUpdateNode(fileFolderId, renameValue);
        setActiveItemId(""); // Reset active item after update
      }
    };

  //delete

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileFolderId: string
  ) => {
    handleDeleteNode(fileFolderId);
  };

  return (
    <div className="mt-5 w-full">
      <div
        onClick={toggleOpen}
        className="cursor-pointer flex justify-between "
      >
        <span
          onDoubleClick={(e) => handleRename(e, explorer.id, explorer.name)}
        >
          {isEditing && explorer.id === activeItemId ? (
            <input
              type="text"
              className="border border-rose-400 rounded-lg focus:outline-none p-2"
              value={renameValue}
              onBlur={() => {
                setActiveItemId("");
                setIsEditing(false);
              }}
              onChange={handleRenameChange}
              onKeyDown={handleRenameSubmit(explorer.id)}
            />
          ) : (
            <span className="flex items-center">
              <span
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
              >
                {isOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </span>
              {`📂 ${explorer.name}`}
            </span>
          )}
        </span>
        <div className="space-x-3">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleShowInput(e, true)
            }
          >
            📂
          </button>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleShowInput(e, false)
            }
          >
            📄
          </button>
          <button
            className="ml-2"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleDelete(e, explorer.id)
            }
          >
            <Trash size={14} />
          </button>
        </div>
      </div>
      <div className={cn("pl-3", isOpen ? "block" : "hidden")}>
        {showInput.isVisible && (
          <div className="mt-5">
            <span> {showInput.isFolder ? "📂" : "📄"}</span>
            <input
              className="border border-rose-400 rounded-lg focus:outline-none p-2"
              type="text"
              autoFocus
              onKeyDown={(event) => handleCreateNewFileOrFolder(event)}
              onBlur={() => setShowInput({ ...showInput, isVisible: false })}
            />
          </div>
        )}
        {explorer.items
          .filter((item) => item.isFolder)
          .map((data: ExplorerDataProps) => (
            <Folder
              handleInsertNode={handleInsertNode}
              handleUpdateNode={handleUpdateNode}
              handleDeleteNode={handleDeleteNode}
              explorer={data}
              key={data.id}
            />
          ))}
        {explorer.items
          .filter((item) => !item.isFolder)
          .map((data: ExplorerDataProps) => (
            <div className="flex flex-col mt-3 cursor-default" key={data.id}>
              <span
                onDoubleClick={(e) => handleRename(e, data.id, data.name)}
                className="flex items-center"
              >
                {data.id === activeItemId && isEditing ? (
                  <input
                    type="text"
                    className="border border-rose-400 rounded-lg focus:outline-none p-2"
                    value={renameValue}
                    onBlur={() => {
                      setActiveItemId("");
                      setIsEditing(false);
                    }} // Reset active item on blur
                    onChange={handleRenameChange}
                    onKeyDown={handleRenameSubmit(data.id)}
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <span> 📄 {data.name} </span>
                    <button
                      className="ml-2"
                      onClick={(e) => handleDelete(e, data.id)}
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                )}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Folder;
