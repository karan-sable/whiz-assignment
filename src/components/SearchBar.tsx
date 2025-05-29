import React from 'react'

type SearchBarProps = {
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const SearchBarComponent: React.FC<SearchBarProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <div className='sticky top-4 z-2'>
      <div className='flex items-center justify-center'>
        <div className='relative w-full'>
          <input
            type='text'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder='Search products...'
            className='w-full px-4 py-2 pr-10 border border-blue-200 rounded-full shadow-md focus:outline-none focus:ring focus:ring-blue-400 bg-white'
          />
          {filter && (
            <div className='absolute right-5 top-1/2 transform -translate-y-1/2 group'>
              <button
                type='button'
                onClick={() => setFilter('')}
                className='cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none'
              >
                <span className='text-lg'>X</span>
              </button>
              <div className='absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-500 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap'>
                Clear filter
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const SearchBar = React.memo(
  SearchBarComponent,
  (prev, next) => prev.filter === next.filter
)

export default SearchBar
