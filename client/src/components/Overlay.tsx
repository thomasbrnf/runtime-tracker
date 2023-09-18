import "../styles/components/Overlay.css";

export function Overlay({
  close,
  children,
}: {
  close?: () => void;
  children: any;
}) {
  return (
    <div className="overlay">
      <div className="overlayContent">{children}</div>
      <div className="bgBlur" onClick={close}></div>
    </div>
  );
}
