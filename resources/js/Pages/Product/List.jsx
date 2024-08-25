import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import SelectInput from '../../Components/SelectInput.jsx';
import { Inertia } from '@inertiajs/inertia';
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function List({ product, categories, initialSelectedCategory }) {


    //foloseste useState hook cu categoria initiala selectata, daca nu lasa campul gol
    const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory || '');

    const { delete: deleteProduct } = useForm({});

    //sterge produs din tabel
    const handleDeleteProduct = (id) => {
        deleteProduct(route('product.delete', [id]), {
            onFinish: () => {
                router.reload({ only: ['product'] });
            },
        });
    }

    //daca se selecteaza o categorie din dropdown, declanseaza instructiunile din interiorul functiei
    const handleFilterChange = (e) => {
        const selectedCategory = e.target.value;
        setSelectedCategory(selectedCategory);

        //trimite ca si raspuns catre ruta home si functia index din controler parametrii category_id e.target.value
        Inertia.get(route('product.list'), {
            category_id: selectedCategory,
        });
    };

    // functionalitate resetare filtru
    const handleReset = () => {
        //restart categorie selectate
        setSelectedCategory('');

        // sterge parametri categoriei din url
        const url = new URL(window.location);
        url.searchParams.delete('category');
        window.history.replaceState({}, '', url);

        // trage toate produsele prin resetarea filtrului
        Inertia.get(route('product.list'), {
            category_id: '',
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Products list" />
            <div className='w-full'>
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>Products</div>

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
                            <PrimaryButton onClick={handleReset} className='ml-2 bg-red-500 hover:bg-red-300'>
                                Reset
                            </PrimaryButton>
                        </div>
                    </div>

                    <div className={'flex justify-end my-2'}>
                        <Link href={route('product.create')}>
                            <FontAwesomeIcon icon={faPlus} /> Add new product
                        </Link>
                    </div>
                    {product && product.data.length > 0 ? (
                        <>
                            <div className="mt-6">
                                <div className='grid grid-cols-7'>
                                    <div className='font-bold mb-3'>ID</div>
                                    <div className='font-bold mb-3'>Name</div>
                                    <div className='font-bold mb-3'>Description</div>
                                    <div className='font-bold mb-3'>Category</div>
                                    <div className='font-bold mb-3'>Price</div>
                                    <div className='font-bold mb-3'>Quantity</div>
                                    <div className='font-bold mb-3'>Actions</div>

                                    {product.data.map((product, index) => {
                                        return <Fragment key={index}>
                                            <div className='mb-2'>{product.id}</div>
                                            <div className='mb-2'>{product.name}</div>
                                            <div className='mb-2'>{product.description}</div>
                                            <div className='mb-2'>{product.category.name}</div>
                                            <div className='mb-2'>{product.price}</div>
                                            <div className='mb-2'>{product.quantity}</div>
                                            <div className={'mb-2 flex items-center'}>
                                                <Link href={route('product.update', [product.id])}>
                                                    <FontAwesomeIcon icon={faPencil} className={'text-blue-600'} />
                                                </Link>

                                                {/* Form for deleting the category */}
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        handleDeleteProduct(product.id);
                                                    }}
                                                    className={"inline-block ml-2"}
                                                >
                                                    <button type="submit">
                                                        <FontAwesomeIcon icon={faTrash} className={'text-red-600'} />
                                                    </button>
                                                </form>
                                            </div>
                                        </Fragment>
                                    })}
                                </div>
                                <div className={'flex justify-center mt-4 mb-6'}>
                                    {product.links.map((link, key) => (<Fragment key={key}>
                                        {link.url && !link.active && <Link className={'bg-blue-500 p-2 text-white mr-2'} href={link.url}>
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} /></Link>}
                                        {link.url && link.active && <span className={'bg-gray-500 p-2 text-white mr-2'}>{link.label}</span>}
                                    </Fragment>))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div><div className='flex flex-row justify-center text-xl font-bold'>Sorry, no products found 😢</div></div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout >
    );
}