import { Head, Link, usePage } from '@inertiajs/react';
import Footer from '../Layouts/Footer.jsx';
import Navbar from '../Layouts/Navbar.jsx';
import SelectInput from '../Components/SelectInput.jsx';
import SearchInput from '../Components/SearchInput.jsx';
import { Fragment, React, useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Welcome({ auth }) {

    // daca products, data, categories, selectedCategory nu sunt definite din usePage props, seteaza ca si un array gol
    const { products = { data: [] }, categories = [], selectedCategory: initialSelectedCategory, searchTerm } = usePage().props;

    //foloseste useState hook cu categoria initiala selectata, daca nu lasa campul gol
    const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory || '');

    //defineste searchTerm daca nu lasa campul gol
    const [term, setTerm] = useState(searchTerm || '');

    //daca se selecteaza o categorie din dropdown, declanseaza instructiunile din interiorul functiei
    const handleFilterChange = (e) => {
        const selectedCategory = e.target.value;
        setSelectedCategory(selectedCategory);
        //trimite ca si raspuns catre ruta home si functia index din controler parametrii category_id e.target.value
        Inertia.get(route('home.index'), {
            category_id: e.target.value,
            search_term: term
        });
    };

    //search event
    const handleSearch = (e) => {
        e.preventDefault();
        Inertia.get(route('home.index'), {
            category_id: selectedCategory,
            search_term: term
        });
    };
    //manipulare input change
    const handleInputChange = (e) => {
        setTerm(e.target.value);
    };

    //manipulare resetare input
    const handleReset = () => {
        // Reset the state values
        setSelectedCategory('');
        setTerm('');

        //sterge parametry din url
        const url = new URL(window.location);
        url.searchParams.delete('category');
        url.searchParams.delete('search');
        window.history.replaceState({}, '', url);

        // trage toate produsele prin resetarea filtrului        
        Inertia.get(route('home.index'), {
            category_id: '',
            search_term: ''
        });
    };

    return (<>
        <Head title="Welcome" />
        <div className="flex flex-col min-h-screen">
            <Navbar
                auth={auth}
            />
            <main className="container flex-1 mx-auto">
                <h1 className={'text-3xl mt-6 mb-4'}>Products</h1>

                <div className='flex justify-center p-5'>
                    <div className='flex flex-row items-center p-5' htmlFor="FilterBar">
                        <label className='font-bold text-l'>
                            Filter by category:
                        </label>
                        <SelectInput
                            options={categories}
                            value={selectedCategory || ''}
                            onChange={handleFilterChange}
                            id="FilterBar"
                            className={'ml-5 w-24 md:w-56 lg:w-64'}
                        />
                    </div>
                    <div className='flex flex-row items-center p-5'>
                        <form onSubmit={handleSearch} className='flex flex-row items-center p-5'>
                            <label className='font-bold text-l' htmlFor="SearchBar">
                                Search
                            </label>
                            <SearchInput
                                placeholder="Search for products..."
                                value={term}
                                onChange={handleInputChange}
                                className={'ml-5 w-24 md:w-56 lg:w-64'}
                                id="SearchBar"
                            />
                            <PrimaryButton type="submit" className='ml-2'>Search</PrimaryButton>
                            <PrimaryButton onClick={handleReset} className='ml-2 bg-red-500 hover:bg-red-300'>
                                Reset
                            </PrimaryButton>
                        </form>
                    </div>
                </div>

                {products && products.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-3">
                            {products.data.map((product) => (<div className={'w-full p-4'} key={product.id}>
                                <div className={'bg-blue-300 border-4 border-blue-600 rounded-lg'}>
                                    <div className="flex items-center justify-center overflow-hidden h-40">
                                        {product.images.length > 0 && (<img src={product.images[0].url} alt={''} className={'w-full'} height={200} />)}
                                    </div>
                                    <div className='text-lg font-bold px-2 mt-2 leading-7'>{product.name}</div>
                                    <div className={'px-2 mt-2 text-red-600 font-medium'}>#{product.category.name}</div>
                                    <div className={'px-2 mt-2 font-medium'}>&euro;{product.price}</div>
                                </div>
                            </div>
                            ))
                            }
                        </div>
                        <div className={'flex justify-center mt-4 mb-6'}>
                            {products.links.map((link, key) => (
                                <Fragment key={key}>
                                    {link.url && !link.active &&
                                        <Link className={'bg-blue-500 p-2 text-white mr-2'} href={link.url}>
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        </Link>
                                    }
                                    {link.url && link.active && <span className={'bg-gray-500 p-2 text-white mr-2'}>{link.label}</span>
                                    }
                                </Fragment>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='flex flex-row justify-center text-xl font-bold'>Sorry, no products found 😢</div>
                )}
            </main >
            <Footer />
        </div >
    </>);
};