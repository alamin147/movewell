import { forwardRef } from "react"

const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className || ""}`}
    {...props}
  />
))
Card.displayName = "Card"

export { Card }