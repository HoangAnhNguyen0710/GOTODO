import React from "react";

export default function ToolTipOnHover({
  textContent,
  limit,
}: {
  textContent: string;
  limit: number;
}) {
  const [show, setShow] = React.useState(false);
  const hasToolTip = textContent.length > limit;
  return (
    <div className="relative">
      <button
        className={hasToolTip ?"cursor-pointer" :""}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {hasToolTip ? `${textContent.slice(0, limit)}...` : textContent}
      </button>
      {show && hasToolTip && (
        <div className="absolute bottom-10 z-99 left-0 inline-block p-2 text-sm font-medium rounded-lg shadow-sm text-white bg-slate-900 min-w-210">
          {textContent}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
}
