"use client";
import { useState } from "react";
import Folder from "./_components/folder";
import explorer from "@/data/explorerData";
import useTraverseTree from "@/hooks/use-traverse-tree";

export default function Home() {
  const [explorerData, setExplorerData] = useState<ExplorerDataProps>(explorer);

  const { insertNode, updateNode, deleteNode } = useTraverseTree();

  const handleInsertNode = (
    folderId: string,
    fileFolderName: string,
    isFolder: boolean
  ) => {
    const finalTree = insertNode(
      explorerData,
      folderId,
      fileFolderName,
      isFolder
    );
    setExplorerData(finalTree);
  };
  const handleUpdateNode = (fileFolderId: string, fileFolderName: string) => {
    const finalTree = updateNode(explorerData, fileFolderId, fileFolderName);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (fileFolderId: string) => {
    const finalTree = deleteNode(explorerData, fileFolderId);
    setExplorerData(finalTree);
  };
  return (
    <main className="flex p-4 border border-red-300 rounded-xl w-[500px] m-auto mt-10 align-items-center justify-items-center">
      <Folder
        handleInsertNode={handleInsertNode}
        handleUpdateNode={handleUpdateNode}
        handleDeleteNode={handleDeleteNode}
        explorer={explorerData}
      />
    </main>
  );
}
