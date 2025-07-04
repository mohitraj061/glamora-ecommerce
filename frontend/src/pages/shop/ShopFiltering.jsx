
const ShopFiltering = ({ filters, filterState, setFilterState, clearFilters }) => {
    return (
        <div className="space-y-5 flex-shrink-0">
            <h3>Filters</h3>

            {/* categories */}
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium text-lg'>Category</h4>
                <hr />
                {
                    filters.categories.map((category) => (
                        <label key={category} className='capitalize cursor-pointer'>
                            <input
                                type="radio"
                                name="category"
                                id='category'
                                value={category}
                                checked={filterState.category === category}
                                onChange={(e) => setFilterState({ ...filterState, category: e.target.value })}
                            />
                            <span className='ml-1'>{category}</span>
                        </label>
                    ))
                }
            </div>

            {/* colors */}
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium text-lg'>Colors</h4>
                <hr />
                {
                    filters.colors.map((color) => (
                        <label key={color} className='capitalize cursor-pointer'>
                            <input
                                type="radio"
                                name="color"
                                id='color'
                                value={color}
                                checked={filterState.colors === color}
                                onChange={(e) => setFilterState({ ...filterState, colors: e.target.value })}
                            />
                            <span className='ml-1'>{color}</span>
                        </label>
                    ))
                }
            </div>

            {/* price range */}
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium text-lg'>Price Range</h4>
                <hr />
                {
                    filters.priceRange.map((range) => (
                        <label key={range.label} className='capitalize cursor-pointer'>
                            <input
                                type="radio"
                                name="priceRange"
                                id="priceRange"
                                value={`${range.min}-${range.max}`}
                                checked={filterState.priceRange === `${range.min}-${range.max}`}
                                onChange={(e) => setFilterState({ ...filterState, priceRange: e.target.value })}
                            />
                            <span className='ml-1'>{range.label}</span>
                        </label>
                    ))
                }
            </div>

            {/* clear filters */}
            <button
                className='bg-primary py-1 px-4 text-white rounded hover:bg-primary-dark transition-colors'
                onClick={clearFilters}
            >
                Clear All Filters
            </button>
        </div>
    );
};

export default ShopFiltering;