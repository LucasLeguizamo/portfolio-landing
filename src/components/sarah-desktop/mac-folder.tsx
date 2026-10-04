export function MacFolder({ color }: { color: string }) {
  const light = color
  const id = `folder-${color.replace("#", "")}`
  return (
    <svg viewBox="0 0 88 72" className="h-[72px] w-[88px] drop-shadow-[0_10px_16px_rgba(60,40,30,0.16)]" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} stopOpacity="1" />
          <stop offset="100%" stopColor={light} stopOpacity="0.82" />
        </linearGradient>
      </defs>
      <path
        d="M8 18c0-3.3 2.7-6 6-6h18.2c1.5 0 2.9.7 3.8 1.9L40 20h34c3.3 0 6 2.7 6 6v32c0 3.3-2.7 6-6 6H14c-3.3 0-6-2.7-6-6V18Z"
        fill={`url(#${id})`}
      />
      <path
        d="M8 26h72v32c0 3.3-2.7 6-6 6H14c-3.3 0-6-2.7-6-6V26Z"
        fill={light}
      />
      <path
        d="M8 18c0-3.3 2.7-6 6-6h18.2c1.5 0 2.9.7 3.8 1.9L40 20H14c-3.3 0-6-1.3-6-2Z"
        fill={light}
        opacity="0.75"
      />
      <path
        d="M12 28h64a3 3 0 0 1 3 3v24a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V31a3 3 0 0 1 3-3Z"
        fill="rgba(255,255,255,0.28)"
      />
    </svg>
  )
}
