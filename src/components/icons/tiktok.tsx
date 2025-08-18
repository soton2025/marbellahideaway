interface TikTokIconProps {
  className?: string
  size?: number
}

export function TikTokIcon({ className = "", size = 16 }: TikTokIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.367-1.958-1.367-3.338h-2.926v14.346c0 1.54-1.25 2.79-2.791 2.79s-2.791-1.25-2.791-2.79 1.25-2.791 2.791-2.791c.308 0 .604.05.879.144V10.04c-.275-.036-.559-.055-.848-.055-3.076 0-5.565 2.489-5.565 5.565s2.489 5.565 5.565 5.565 5.565-2.489 5.565-5.565V9.026a8.898 8.898 0 0 0 5.232 1.678v-2.743a6.197 6.197 0 0 1-2.164-2.399z"/>
    </svg>
  )
}