import { useState } from 'react';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRange: [
        { label: 'Under $50', min: 0, max: 50 },
        { label: '$50 - $100', min: 50, max: 100 },
        { label: '$100 - $200', min: 100, max: 200 },
        { label: '$200 and above', min: 200, max: Infinity },
    ]
};

const ShopPage = () => {
    const [filterState, setFilterState] = useState({
        category: 'all',
        colors: 'all',
        priceRange: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    const { category, colors, priceRange } = filterState;
    const [minPrice, maxPrice] = priceRange
        ? priceRange.split('-').map(Number)
        : [undefined, undefined];

    const {
        data: { products = [], totalPages, totalProducts } = {},
        error,
        isLoading
    } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: colors !== 'all' ? colors : '',
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: productsPerPage
    });

    const handlePageChange = (pageNumber) => {
        console.log(`Changing to page: ${pageNumber}`);
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        };
    };

    // clear filters
    const clearFilters = () => {
        setFilterState({
            category: 'all',
            colors: 'all',
            priceRange: ''
        });
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading products.</p>;

    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>
                    Shop Page
                </h2>
                <p className='section__subheader'>
                    Discover the Hottest Picks: Elevate Your Style With Our Curated Collection of Trending Women's Fashion Products.
                </p>
            </section>

            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                    {/* left side */}
                    <ShopFiltering
                        filters={filters}
                        filterState={filterState}
                        setFilterState={setFilterState}
                        clearFilters={clearFilters}
                    />

                    {/* right side */}
                    <div>
                        <h3 className='text-xl font-medium mb-4'>
                            Showing {startProduct} to {endProduct} of {totalProducts} products
                        </h3>
                        <ProductCards products={products} />

                        {/* Pagination controls */}
                        <div className='mt-6 flex justify-center'>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopPage;