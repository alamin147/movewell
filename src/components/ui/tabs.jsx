import { createContext, forwardRef, useContext, useState } from "react"

const TabsContext = createContext({})

const Tabs = forwardRef(({ defaultValue, className, children, onValueChange, ...props }, ref) => {
  const [value, setValue] = useState(defaultValue)

  const handleValueChange = (newValue) => {
    setValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
})
Tabs.displayName = "Tabs"

const TabsList = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md bg-gray-100 p-1 ${className || ""}`}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = forwardRef(({ className, value, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = useContext(TabsContext)
  const isSelected = selectedValue === value
  
  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 
      ${isSelected
        ? "bg-white text-blue-700 shadow-sm"
        : "text-gray-700 hover:text-gray-900"
      } ${className || ""}`}
      onClick={() => onValueChange(value)}
      {...props}
    />
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = forwardRef(({ className, value, ...props }, ref) => {
  const { value: selectedValue } = useContext(TabsContext)
  
  if (selectedValue !== value) return null
  
  return (
    <div
      ref={ref}
      className={`mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className || ""}`}
      {...props}
    />
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }