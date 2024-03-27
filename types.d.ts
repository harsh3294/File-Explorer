type ExplorerDataProps = {
  id: string;
  name: string;
  isFolder: boolean;
  items: ExplorerDataProps[];
};

type FolderProps = {
  explorer: ExplorerDataProps;
  handleInsertNode: (
    folderId: string,
    fileFolderName: string,
    isFolder: boolean
  ) => void;
  handleUpdateNode: (fileFolderId: string, fileFolderName: string) => void;
  handleDeleteNode: (fileFolderId: string) => void;
};

type ShowInputProps = {
  isFolder: boolean | null;
  isVisible: boolean;
};
