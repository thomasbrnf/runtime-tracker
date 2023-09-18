import { useState } from "react";

export function useCardActions() {
  const [actionOpened, setActionOpened] = useState(false);
  const [editorOpened, setEditorOpened] = useState(false);
  const [loaderOpened, setLoaderOpened] = useState(false);
  const [createOpened, setCreateOpened] = useState(false);
  const [downloaderOpened, setDownloaderOpened] = useState(false);
  const [response, setResponse] = useState<Response>();

  function openActionOverlay() {
    setActionOpened(true);
    document.body.classList.add("overlay-active");
  }

  function closeActionOverlay() {
    setActionOpened(false);
    document.body.classList.remove("overlay-active");
  }
  function openEditorOverlay() {
    setEditorOpened(true);
    document.body.classList.add("overlay-active");
  }

  function closeEditorOverlay() {
    setEditorOpened(false);
    document.body.classList.remove("overlay-active");
  }

  function openDownloaderOverlay() {
    setDownloaderOpened(true);
    document.body.classList.add("overlay-active");
  }

  function closeDownloaderOverlay() {
    setDownloaderOpened(false);
    document.body.classList.remove("overlay-active");
  }
  function openLoaderOverlay() {
    setLoaderOpened(true);
    document.body.classList.add("overlay-active");
  }

  function closeLoaderOverlay() {
    setLoaderOpened(false);
    document.body.classList.remove("overlay-active");
  }
  function openCreateOverlay() {
    setCreateOpened(true);
    document.body.classList.add("overlay-active");
  }

  function closeCreateOverlay() {
    setCreateOpened(false);
    document.body.classList.remove("overlay-active");
  }

  return {
    createOpened,
    actionOpened,
    editorOpened,
    loaderOpened,
    downloaderOpened,
    openActionOverlay,
    openEditorOverlay,
    openLoaderOverlay,
    openDownloaderOverlay,
    openCreateOverlay,
    closeActionOverlay,
    closeEditorOverlay,
    closeLoaderOverlay,
    closeDownloaderOverlay,
    closeCreateOverlay,
    setResponse,
    response,
  };
}
