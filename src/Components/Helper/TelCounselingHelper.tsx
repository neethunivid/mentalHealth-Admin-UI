export const downloadFile = (data: any, fileName: string, fileType: string) => {
    const blob = new Blob(["\ufeff" + data], { type: fileType || "text/csv;charset=UTF-8" });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };