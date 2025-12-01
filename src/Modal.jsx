import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // usestate => nge-render ulang, useref dia tidak render ulang.
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  // 1. <div></div>

  useEffect(() => {
    // menyimpan insance dari si element modal. <div id='modal'></div>
    const modalRoot = document.getElementById("modal");
    // menambahkan div dari elRef.current ke dalam modalRoot.
    modalRoot.appendChild(elRef.current);
    // flush --> setelah komponen/modalnya dipakai.
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // untuk menambahkan si children ke dalam elRef.current
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
