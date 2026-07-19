{/* Modal Content - Series အလိုက် Grid နဲ့စီခြင်း */}
<div className="flex-1 overflow-y-auto px-5 pb-5 space-y-8">
  {groupedOptions.map((group) => (
    <div key={group.label} className="space-y-4">
      {/* Series ခေါင်းစဉ် */}
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 pb-2">
        {group.label}
      </h3>
      
      {/* Grid Layout - 2 columns or 3 columns on larger screens */}
      <div className="grid grid-cols-2 gap-3">
        {group.options.map((model) => {
          const isSelected = model.value === selectedModelId;
          return (
            <button
              key={model.value}
              onClick={() => handleModelChange(model.value)}
              className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl transition-all duration-200 border text-center ${
                isSelected 
                  ? 'bg-blue-600/10 border-blue-500/30 shadow-md' 
                  : 'bg-gray-50 dark:bg-[#2c2c2e] border-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Smartphone className={`w-6 h-6 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-sm font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-700 dark:text-gray-200'}`}>
                {model.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  ))}
</div>
