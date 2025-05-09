import { forwardRef } from "react"

const Switch = forwardRef(({ className, ...props }, ref) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        ref={ref}
        {...props}
      />
      <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ${className || ""}`}></div>
    </label>
  )
})
Switch.displayName = "Switch"

export { Switch }