export function DockIcon({ id }: { id: string }) {
  switch (id) {
    case "figma":
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full">
          <rect width="48" height="48" rx="12" fill="#1e1e1e" />
          <circle cx="24" cy="31" r="6" fill="#0acf83" />
          <circle cx="30" cy="19" r="6" fill="#a259ff" />
          <path d="M18 13h6v12h-6a6 6 0 0 1 0-12Z" fill="#f24e1e" />
          <path d="M24 13h6a6 6 0 1 1 0 12h-6V13Z" fill="#ff7262" />
          <path d="M18 25h6v12h-6a6 6 0 0 1 0-12Z" fill="#ffc107" />
        </svg>
      )
    case "illustrator":
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full">
          <rect width="48" height="48" rx="12" fill="#310000" />
          <rect x="3" y="3" width="42" height="42" rx="10" fill="#ff9a00" />
          <text x="24" y="31" textAnchor="middle" fontSize="16" fontWeight="700" fill="#310000" fontFamily="ui-sans-serif, system-ui">
            Ai
          </text>
        </svg>
      )
    case "premiere":
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full">
          <rect width="48" height="48" rx="12" fill="#2b0052" />
          <rect x="3" y="3" width="42" height="42" rx="10" fill="#9999ff" />
          <text x="24" y="31" textAnchor="middle" fontSize="16" fontWeight="700" fill="#2b0052" fontFamily="ui-sans-serif, system-ui">
            Pr
          </text>
        </svg>
      )
    case "claude":
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full">
          <rect width="48" height="48" rx="14" fill="#d97746" />
          <path
            fill="#fff7ed"
            d="M24 8l2.4 11.2L36 16l-7.2 8.8L36 32l-9.6-3.2L24 40l-2.4-11.2L12 32l7.2-8.8L12 16l9.6 3.2L24 8Z"
          />
        </svg>
      )
    case "lovable":
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full">
          <rect width="48" height="48" rx="14" fill="#fff" />
          <path
            fill="url(#lovable)"
            d="M24 38s-11-7.2-14.5-13.4C6.8 20.2 8.6 14 14 13.2c3.2-.5 6.1 1.2 7.6 3.8 1.5-2.6 4.4-4.3 7.6-3.8 5.4.8 7.2 7 4.5 11.4C35 30.8 24 38 24 38Z"
          />
          <defs>
            <linearGradient id="lovable" x1="10" y1="12" x2="36" y2="36">
              <stop offset="0%" stopColor="#ff8a4c" />
              <stop offset="100%" stopColor="#ff4d8d" />
            </linearGradient>
          </defs>
        </svg>
      )
    case "canva":
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full">
          <rect width="48" height="48" rx="12" fill="#00c4cc" />
          <text x="24" y="29" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="ui-sans-serif, system-ui">
            Canva
          </text>
        </svg>
      )
    case "meta":
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full">
          <rect width="48" height="48" rx="14" fill="#0082fb" />
          <path
            fill="none"
            stroke="#fff"
            strokeWidth="3.2"
            d="M14 30c2.5-8 6-16 10-16s5.2 6 7 10 3.4 6 5.6 6c2.6 0 4.4-3.2 4.4-7s-2-10-6.2-10c-2.6 0-4.6 2.4-6.8 7.2"
          />
        </svg>
      )
    default:
      return <div className="h-full w-full rounded-xl bg-zinc-200" />
  }
}
