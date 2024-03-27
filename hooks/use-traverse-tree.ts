import { v4 as uuidv4 } from "uuid";

const useTraverseTree = () => {
  const insertNode = function (
    explorerData: ExplorerDataProps,
    folderId: string,
    fileFolderName: string,
    isFolder: boolean
  ): ExplorerDataProps {
    if (explorerData.id === folderId && explorerData.isFolder) {
      explorerData.items.unshift({
        id: uuidv4(),
        name: fileFolderName,
        isFolder: isFolder,
        items: [],
      });

      return explorerData;
    }
    let updatedExplorerData = [];
    updatedExplorerData = explorerData.items.map((obj) => {
      return insertNode(obj, folderId, fileFolderName, isFolder);
    });

    return { ...explorerData, items: updatedExplorerData };
  };

  const updateNode = (
    explorerData: ExplorerDataProps,
    fileFolderId: string,
    newName: string
  ): ExplorerDataProps => {
    if (explorerData.id === fileFolderId) {
      return { ...explorerData, name: newName };
    }

    const updatedItems = explorerData.items.map((item) =>
      updateNode(item, fileFolderId, newName)
    );

    return { ...explorerData, items: updatedItems };
  };

  const deleteNode = (
    explorerData: ExplorerDataProps,
    nodeId: string
  ): ExplorerDataProps => {
    const updatedItems = explorerData.items.filter(
      (item) => item.id !== nodeId
    );

    const updatedExplorerData = {
      ...explorerData,
      items: updatedItems.map((item) => deleteNode(item, nodeId)),
    };

    return updatedExplorerData;
  };

  return { insertNode, updateNode, deleteNode };
};

export default useTraverseTree;
