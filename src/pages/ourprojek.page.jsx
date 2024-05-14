import { useState, useEffect } from "react";
import AnimationWrapper from "../common/page-animation";

const OurProjek = () => {
    const filters = ['Data Science', 'NLP', 'Machine Learning', 'Python', 'Deep Learning', 'Computer Vision'];
    const [selectedFilter, setSelectedFilter] = useState('Data Science');
    const [projek, setProjek] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortType, setSortType] = useState('name'); // Default sort by name

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/${selectedFilter}.json`);
            const data = await response.json();
            setProjek(data);
        };

        fetchData();
    }, [selectedFilter]);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.trim());
        setCurrentPage(1);
    };

    const handleSort = (type) => {
        setSortType(type);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const filterProjek = () => {
        if (!projek) return [];
        let filteredData = projek;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredData = projek.filter(item => {
                const name = item.name ? item.name.toLowerCase() : '';
                const description = item.description ? item.description.toLowerCase() : '';
                return name.includes(query) || description.includes(query);
            });
        }
        // Sorting
        filteredData.sort((a, b) => {
            if (sortType === 'name') {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) return sortDirection === 'asc' ? -1 : 1;
                if (nameA > nameB) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            } else if (sortType === 'id') {
                return sortDirection === 'asc' ? a.ID - b.ID : b.ID - a.ID;
            }
        });
        return filteredData;
    };

    const itemsPerPage = 10;
    const totalPages = Math.ceil(filterProjek().length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = currentPage * itemsPerPage;

    return (
        <AnimationWrapper>
            <div className="container mx-auto max-w-4xl mt-5">
                <div className="flex justify-center items-center">
                    <img src="/dashboard-projek.png" className="max-w-[500px] max-h-[500px]"/>
                </div>
                <h1 className="text-3xl font-bold">Projek Sains Data Portofolio</h1>
                <div className="mt-5">
                    <p className="mt-3"> Created and Modifying by Ardika Satria, Miftahul Huda, Shula Talitha. </p>
                </div>
                
                <div className="my-8 flex flex-wrap gap-5">
                    {filters.map((filter, index) => (
                        <button 
                            key={index} 
                            className={"py-2 flex btn " + (selectedFilter === filter ? "btn-dark" : "btn-light")}
                            onClick={() => handleFilterChange(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="my-4">
                    <input 
                        type="text" 
                        placeholder="Cari Projek..." 
                        value={searchQuery} 
                        onChange={handleSearch} 
                        className="search-input bg-grey text-black"
                    />
                    <p> Klik Kolom ID untuk urutan projek paling baru</p>
                </div>

                <div>
                    <h2>{selectedFilter}</h2>
                    <table className="table-transparent">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')} style={{ cursor: 'pointer' }}>ID</th>
                                <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Name (Link GoogleColab)</th>
                                <th>Description</th>
                                <th>Download Data</th> {/* Kolom baru untuk download data */}
                            </tr>
                        </thead>
                        <tbody>
                            {filterProjek().slice(startIdx, endIdx).map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ID}</td>
                                    <td><a href={item.link} target="_blank" rel="noopener noreferrer" className="text-md text-light-green font-bold">{item.name} </a></td>
                                    <td className="text-left">{item.description}</td>
                                    <td>
                                        {item.dataUrl ? ( // Cek apakah ada URL data
                                            <a href={item.dataUrl} target="_blank" rel="noopener noreferrer" className="text-xl text-light-blue">
                                                <i className="fi fi-rr-file-download text-2xl text-twitter" aria-hidden="true" />
                                            </a>
                                        ) : (
                                            'No Data' // Tampilkan 'No Data' jika tidak ada URL
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    {totalPages > 1 && (
                        <div>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button 
                                    key={index} 
                                    className={currentPage === index + 1 ? 'btn btn-dark mx-1 mt-5' : 'btn btn-light mx-1 mt-5'}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AnimationWrapper>
    );
};

export default OurProjek;
